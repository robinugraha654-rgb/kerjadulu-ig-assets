// GET /api/kit  (Authorization: Bearer <token>)  ->  the app's content
import KIT from "../_kit.js";
import { json, readToken, getRec } from "../_util.js";

export async function onRequestGet({ request, env }) {
  const auth = request.headers.get("authorization") || "";
  const tok = await readToken(env, auth.replace(/^Bearer\s+/i, ""));
  if (!tok) return json({ error: "Perlu aktivasi kode akses." }, 401);
  const rec = await getRec(env, tok.c);
  if (!rec || !rec.active || !rec.devices.some((d) => d.id === tok.d)) return json({ error: "Akses untuk HP ini sudah dicabut." }, 403);
  return json(KIT, 200, { "cache-control": "private, no-store" });
}
