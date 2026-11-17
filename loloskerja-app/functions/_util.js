// Shared helpers for the access-code system (files starting with "_" are not routes).
const enc = new TextEncoder();

export const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra } });

const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const b64uStr = (s) => b64u(enc.encode(s));
const fromB64uStr = (s) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0)));

async function hmac(secret, data) {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64u(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

export async function signToken(env, payload) {
  const body = b64uStr(JSON.stringify(payload));
  return `${body}.${await hmac(env.TOKEN_SECRET, body)}`;
}

export async function readToken(env, token) {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  if ((await hmac(env.TOKEN_SECRET, body)) !== sig) return null;
  try { return JSON.parse(fromB64uStr(body)); } catch { return null; }
}

// Codes look like LK-7F3K-9Q2M (no 0/O/1/I to avoid typos).
const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function newCode() {
  let s = "LK";
  while (s.startsWith("LK")) s = Array.from(crypto.getRandomValues(new Uint8Array(8)), (n) => ALPHA[n % ALPHA.length]).join("");
  return `LK-${s.slice(0, 4)}-${s.slice(4)}`;
}
export const normCode = (c) => String(c || "").toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^LK/, "").replace(/^(.{4})(.{4}).*$/, "LK-$1-$2");

export const getRec = async (env, code) => { const v = await env.CODES.get(`code:${code}`); return v ? JSON.parse(v) : null; };
export const putRec = (env, code, rec) => env.CODES.put(`code:${code}`, JSON.stringify(rec));

export const isAdmin = (request, env) => {
  const k = request.headers.get("x-admin-key") || "";
  return env.ADMIN_KEY && k.length > 0 && k === env.ADMIN_KEY;
};
