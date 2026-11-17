// GET/POST /api/admin/config — Scalev connection settings (header x-admin-key).
import { json, isAdmin } from "../../_util.js";
import { getCfg, putCfg, verifyScalev } from "../../_scalev.js";

export async function onRequestGet({ request, env }) {
  if (!isAdmin(request, env)) return json({ error: "Kunci admin salah." }, 401);
  const c = await getCfg(env);
  const t = JSON.parse((await env.CODES.get("cfg:scalev:last_test")) || "null");
  let lastTest = null;
  if (t) {
    // re-check the stored test against the secret saved now (the secret is often pasted after Scalev sent its test)
    const okNow = t.body != null ? await verifyScalev(c.secret, new TextEncoder().encode(t.body), t.sig) : null;
    lastTest = { at: t.at, signed_ok: okNow == null ? t.signed_ok : okNow, has_sig: t.has_sig };
  }
  const lastBad = JSON.parse((await env.CODES.get("cfg:scalev:last_bad")) || "null");
  return json({ hasSecret: !!c.secret, variants: c.variants, webhookUrl: new URL("/api/scalev/webhook", request.url).href, lastTest, lastBad });
}

export async function onRequestPost({ request, env }) {
  if (!isAdmin(request, env)) return json({ error: "Kunci admin salah." }, 401);
  let b;
  try { b = await request.json(); } catch { return json({ error: "Format tidak valid." }, 400); }
  const c = await getCfg(env);
  if (typeof b.secret === "string" && b.secret.trim()) c.secret = b.secret.trim();
  if (Array.isArray(b.variants)) c.variants = b.variants.map((v) => String(v).trim()).filter((v) => /^variant_[A-Za-z0-9_-]+$/.test(v));
  await putCfg(env, c);
  return json({ ok: true, hasSecret: !!c.secret, variants: c.variants });
}
