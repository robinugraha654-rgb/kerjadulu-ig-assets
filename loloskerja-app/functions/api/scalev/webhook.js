// POST /api/scalev/webhook  — Scalev signed webhook (X-Scalev-Hmac-Sha256).
// order.created / order.updated  -> remember the order if it contains a Loloskerja variant
// payment.received (paid|settled) -> mark paid and issue one access code per order
import { json } from "../../_util.js";
import { getCfg, verifyScalev, normPhone, getOrder, putOrder, indexPhone, issueCode } from "../../_scalev.js";

const PAID = ["paid", "settled"];

export async function onRequestPost({ request, env }) {
  const raw = new Uint8Array(await request.arrayBuffer());
  let ev;
  try { ev = JSON.parse(new TextDecoder().decode(raw)); } catch { return json({ error: "invalid json" }, 400); }

  const cfg = await getCfg(env);
  // Scalev sends a test event when the webhook settings are saved; accept it so saving works.
  if (ev.event === "business.test_event") {
    await env.CODES.put("cfg:scalev:last_test", JSON.stringify({ at: new Date().toISOString(), signed_ok: await verifyScalev(cfg.secret, raw, request.headers.get("x-scalev-hmac-sha256")) }));
    return new Response(null, { status: 204 });
  }
  if (!cfg.secret) return json({ error: "signing secret not configured" }, 503);
  if (!(await verifyScalev(cfg.secret, raw, request.headers.get("x-scalev-hmac-sha256")))) return json({ error: "invalid signature" }, 401);
  if (!ev.unique_id || !ev.data || !ev.data.id) return json({ error: "missing fields" }, 400);
  if (await env.CODES.get(`evt:${ev.unique_id}`)) return new Response(null, { status: 204 });

  const d = ev.data;
  if (ev.event === "order.created" || ev.event === "order.updated") {
    const lines = Array.isArray(d.orderlines) ? d.orderlines : [];
    if (lines.some((l) => cfg.variants.includes(l.variant_unique_id))) {
      const o = (await getOrder(env, d.id)) || { id: d.id };
      const addr = d.destination_address || {}, cust = d.customer || {};
      Object.assign(o, {
        relevant: true, order_id: d.order_id || o.order_id || "",
        name: addr.name || cust.name || o.name || "",
        phone: normPhone(addr.phone || cust.phone) || o.phone || "",
        email: addr.email || cust.email || o.email || "",
        created: o.created || d.created_at || new Date().toISOString(),
      });
      if (PAID.includes(d.payment_status)) o.paid = true;
      await putOrder(env, o);
      await indexPhone(env, o.phone, o.id);
      if (o.paid) await issueCode(env, o);
    }
  } else if (ev.event === "payment.received" || ev.event === "order.payment_status_changed") {
    if (PAID.includes(d.payment_status)) {
      const o = (await getOrder(env, d.id)) || { id: d.id, relevant: false };
      const cust = d.customer || {};
      o.paid = true;
      o.order_id = o.order_id || d.order_id || "";
      o.phone = o.phone || normPhone(cust.phone);
      o.name = o.name || cust.name || "";
      await putOrder(env, o);
      if (o.relevant) { await indexPhone(env, o.phone, o.id); await issueCode(env, o); }
      // not relevant yet: order.created may still arrive and will issue the code then
    }
  }

  await env.CODES.put(`evt:${ev.unique_id}`, "1", { expirationTtl: 60 * 60 * 24 * 14 });
  return new Response(null, { status: 204 });
}
