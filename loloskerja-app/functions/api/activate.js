// POST /api/activate  { code, device }  ->  { token }
import { json, normCode, getRec, putRec, signToken } from "../_util.js";

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "Format permintaan tidak valid." }, 400); }
  const code = normCode(body.code);
  const device = String(body.device || "").slice(0, 64);
  if (!/^LK-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code) || device.length < 8) return json({ error: "Kode harus berformat LK-XXXX-XXXX." }, 400);

  const rec = await getRec(env, code);
  if (!rec) return json({ error: "Kode tidak ditemukan. Cek lagi huruf dan angkanya." }, 404);
  if (!rec.active) return json({ error: "Kode ini sudah dinonaktifkan. Hubungi admin." }, 403);

  const known = rec.devices.find((d) => d.id === device);
  if (!known) {
    if (rec.devices.length >= (rec.max || 2)) return json({ error: `Kode ini sudah dipakai di ${rec.max || 2} HP. Hubungi admin kalau kamu ganti HP.` }, 403);
    rec.devices.push({ id: device, at: new Date().toISOString(), ua: (request.headers.get("user-agent") || "").slice(0, 120) });
    await putRec(env, code, rec);
  }
  const token = await signToken(env, { c: code, d: device, t: Date.now() });
  return json({ token, code, label: rec.label || "" });
}
