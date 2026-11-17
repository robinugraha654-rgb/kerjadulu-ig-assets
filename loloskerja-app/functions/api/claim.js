// POST /api/claim { phone }  ->  access code(s) for paid Scalev orders made with that WhatsApp number
import { json } from "../_util.js";
import { normPhone, getOrder } from "../_scalev.js";

export async function onRequestPost({ request, env }) {
  const ip = request.headers.get("cf-connecting-ip") || "x";
  const rlKey = `rl:claim:${ip}`;
  const n = parseInt((await env.CODES.get(rlKey)) || "0", 10);
  if (n >= 20) return json({ error: "Terlalu banyak percobaan. Tunggu 10 menit, lalu coba lagi." }, 429);
  await env.CODES.put(rlKey, String(n + 1), { expirationTtl: 600 });

  let body;
  try { body = await request.json(); } catch { return json({ error: "Format permintaan tidak valid." }, 400); }
  const phone = normPhone(body.phone);
  if (!phone) return json({ error: "Nomor WhatsApp belum benar. Contoh: 0812 3456 7890." }, 400);

  const ids = JSON.parse((await env.CODES.get(`phone:${phone}`)) || "[]");
  const orders = (await Promise.all(ids.map((id) => getOrder(env, id)))).filter(Boolean);
  const since = Date.now() - 1000 * 60 * 60 * 24 * 60;
  const ready = orders.filter((o) => o.code && Date.parse(o.issued_at || o.created || 0) > since);
  if (ready.length) return json({ codes: ready.map((o) => ({ code: o.code, order_id: o.order_id })) });
  if (orders.length) return json({ pending: true, message: "Pesananmu sudah tercatat, tapi pembayarannya belum terkonfirmasi. Halaman ini akan mengecek ulang otomatis." });
  return json({ error: "Belum ada pembayaran LolosKerja dengan nomor ini. Pastikan nomornya sama dengan yang kamu isi saat checkout." }, 404);
}
