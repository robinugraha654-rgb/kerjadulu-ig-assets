// Scalev integration: config, signature check, phone normalisation, order records.
import { newCode, getRec, putRec } from "./_util.js";

export const DEFAULT_VARIANTS = ["variant_oVdznuKJg9KiXTXbG2GLeGp7"]; // Scalev product "Loloskerja Kit"

export async function getCfg(env) {
  const v = await env.CODES.get("cfg:scalev");
  const c = v ? JSON.parse(v) : {};
  return { secret: c.secret || "", variants: c.variants && c.variants.length ? c.variants : DEFAULT_VARIANTS };
}
export const putCfg = (env, c) => env.CODES.put("cfg:scalev", JSON.stringify(c));

export async function verifyScalev(secret, rawBytes, sigB64) {
  if (!secret || !sigB64) return false;
  let received;
  try { received = Uint8Array.from(atob(sigB64.trim()), (c) => c.charCodeAt(0)); } catch { return false; }
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const expected = new Uint8Array(await crypto.subtle.sign("HMAC", key, rawBytes));
  if (received.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected[i] ^ received[i];
  return diff === 0;
}

// 0812..., 812..., +62812..., 62812... -> 62812...
export function normPhone(p) {
  let d = String(p || "").replace(/\D/g, "");
  if (d.startsWith("0")) d = "62" + d.slice(1);
  else if (d.startsWith("8")) d = "62" + d;
  return d.length >= 9 && d.length <= 16 ? d : "";
}

export const getOrder = async (env, id) => { const v = await env.CODES.get(`order:${id}`); return v ? JSON.parse(v) : null; };
export const putOrder = (env, o) => env.CODES.put(`order:${o.id}`, JSON.stringify(o));

export async function indexPhone(env, phone, id) {
  if (!phone) return;
  const key = `phone:${phone}`;
  const list = JSON.parse((await env.CODES.get(key)) || "[]");
  if (!list.includes(id)) { list.unshift(id); await env.CODES.put(key, JSON.stringify(list.slice(0, 10))); }
}

// Give a paid, relevant order exactly one access code.
export async function issueCode(env, o) {
  if (o.code) return o.code;
  let code = newCode();
  while (await getRec(env, code)) code = newCode();
  await putRec(env, code, {
    label: [o.name, o.order_id].filter(Boolean).join(" · ") || "Scalev",
    max: 2, active: true, created: new Date().toISOString(), devices: [],
    source: "scalev", order: o.id, phone: o.phone || "",
  });
  o.code = code; o.issued_at = new Date().toISOString();
  await putOrder(env, o);
  return code;
}
