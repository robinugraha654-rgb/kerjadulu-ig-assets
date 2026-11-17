// Admin API (header x-admin-key).
// GET  /api/admin/codes             -> list codes
// POST /api/admin/codes {action:"create", count, label, max}
// POST /api/admin/codes {action:"reset"|"disable"|"enable"|"delete", code}
import { json, isAdmin, newCode, normCode, getRec, putRec } from "../../_util.js";

export async function onRequestGet({ request, env }) {
  if (!isAdmin(request, env)) return json({ error: "Kunci admin salah." }, 401);
  const out = [];
  let cursor;
  do {
    const page = await env.CODES.list({ prefix: "code:", cursor });
    for (const k of page.keys) {
      const rec = JSON.parse((await env.CODES.get(k.name)) || "null");
      if (rec) out.push({ code: k.name.slice(5), ...rec });
    }
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor && out.length < 2000);
  out.sort((a, b) => (b.created || "").localeCompare(a.created || ""));
  return json({ codes: out });
}

export async function onRequestPost({ request, env }) {
  if (!isAdmin(request, env)) return json({ error: "Kunci admin salah." }, 401);
  let b;
  try { b = await request.json(); } catch { return json({ error: "Format tidak valid." }, 400); }

  if (b.action === "create") {
    const count = Math.max(1, Math.min(100, parseInt(b.count, 10) || 1));
    const max = Math.max(1, Math.min(5, parseInt(b.max, 10) || 2));
    const label = String(b.label || "").slice(0, 120);
    const made = [];
    for (let i = 0; i < count; i++) {
      let code = newCode();
      while (await getRec(env, code)) code = newCode();
      await putRec(env, code, { label, max, active: true, created: new Date().toISOString(), devices: [] });
      made.push(code);
    }
    return json({ created: made });
  }

  const code = normCode(b.code);
  const rec = await getRec(env, code);
  if (!rec) return json({ error: "Kode tidak ditemukan." }, 404);
  if (b.action === "reset") rec.devices = [];
  else if (b.action === "disable") rec.active = false;
  else if (b.action === "enable") rec.active = true;
  else if (b.action === "delete") { await env.CODES.delete(`code:${code}`); return json({ ok: true }); }
  else return json({ error: "Aksi tidak dikenal." }, 400);
  await putRec(env, code, rec);
  return json({ ok: true, code, ...rec });
}
