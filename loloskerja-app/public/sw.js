// LolosKerja service worker: app shell + content cached so the app opens offline.
const V = "lk-shell-v2";
const DATA = "lk-data-v1";
const FONTS = "lk-fonts-v1";
const SHELL = ["/", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png", "/icons/apple-180.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => ![V, DATA, FONTS].includes(k)).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // fonts: cache first
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then(async (c) => (await c.match(req)) || fetch(req).then((r) => { c.put(req, r.clone()); return r; })));
    return;
  }
  if (url.origin !== location.origin) return;

  // content: network first, cached copy when offline, dropped when access is revoked
  if (url.pathname === "/api/kit") {
    e.respondWith((async () => {
      const c = await caches.open(DATA);
      try {
        const r = await fetch(req);
        if (r.ok) await c.put("/api/kit", r.clone());
        else if (r.status === 401 || r.status === 403) await c.delete("/api/kit");
        return r;
      } catch (err) {
        const hit = await c.match("/api/kit");
        if (hit) return hit;
        throw err;
      }
    })());
    return;
  }
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) return;

  // app shell: serve cached, refresh in background
  e.respondWith((async () => {
    const c = await caches.open(V);
    const key = req.mode === "navigate" ? "/" : req;
    const hit = await c.match(key);
    const net = fetch(req).then((r) => { if (r.ok) c.put(key, r.clone()); return r; }).catch(() => null);
    return hit || (await net) || new Response("Offline", { status: 503 });
  })());
});
