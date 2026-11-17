// Single Pages worker (advanced mode): API routes, and every static file served from memory
// (the files are embedded at build time in ./static.gen.js).
import { onRequestPost as activate } from "../functions/api/activate.js";
import { onRequestGet as kit } from "../functions/api/kit.js";
import { onRequestGet as adminList, onRequestPost as adminPost } from "../functions/api/admin/codes.js";
import STATIC from "./static.gen.js";

const bytes = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

function serveStatic(pathname) {
  let p = pathname;
  if (p === "/" || p === "/index.html") p = "/index.html";
  else if (p === "/admin" || p === "/admin/") p = "/admin/index.html";
  const f = STATIC[p];
  if (!f) return null;
  const headers = { "content-type": f.type, "cache-control": f.cache, "x-content-type-options": "nosniff" };
  if (p.startsWith("/admin")) headers["x-robots-tag"] = "noindex, nofollow";
  return new Response(f.b64 ? bytes(f.b64) : f.text, { headers });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const m = request.method, ctx = { request, env };
    if (pathname === "/api/activate" && m === "POST") return activate(ctx);
    if (pathname === "/api/kit" && m === "GET") return kit(ctx);
    if (pathname === "/api/admin/codes" && m === "GET") return adminList(ctx);
    if (pathname === "/api/admin/codes" && m === "POST") return adminPost(ctx);
    if (pathname.startsWith("/api/")) return new Response(JSON.stringify({ error: "Tidak ditemukan." }), { status: 404, headers: { "content-type": "application/json" } });
    if (m === "GET" || m === "HEAD") {
      const r = serveStatic(pathname);
      if (r) return r;
    }
    return new Response("Halaman tidak ditemukan.", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  },
};
