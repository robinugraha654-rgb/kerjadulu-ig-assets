"""Build dist/ and deploy it to Cloudflare Pages through the account API (direct upload, files inline)."""
import hashlib, json, mimetypes, os, shutil, subprocess, sys, urllib.request, uuid
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")
ACC = "eb4c905a6b3c038ae2f05dfff6724f3a"; PROJECT = "loloskerja"
branch = sys.argv[1] if len(sys.argv) > 1 else "main"
shutil.rmtree(DIST, ignore_errors=True); os.makedirs(DIST)
# embed every file of public/ into the worker
import base64
TYPES = {".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".webmanifest": "application/manifest+json", ".png": "image/png", ".json": "application/json"}
static = {}
for d, _, fs in os.walk(os.path.join(ROOT, "public")):
    for f in fs:
        fp = os.path.join(d, f); rel = "/" + os.path.relpath(fp, os.path.join(ROOT, "public")).replace(os.sep, "/")
        ext = os.path.splitext(f)[1]; data = open(fp, "rb").read()
        cache = "no-cache" if ext in (".html", ".js", ".webmanifest") else "public, max-age=86400"
        entry = {"type": TYPES.get(ext, "application/octet-stream"), "cache": cache}
        if ext == ".png": entry["b64"] = base64.b64encode(data).decode()
        else: entry["text"] = data.decode("utf-8")
        static[rel] = entry
open(os.path.join(ROOT, "build/static.gen.js"), "w").write("export default " + json.dumps(static, ensure_ascii=False) + ";\n")
subprocess.run(["npx", "--yes", "esbuild@0.25.0", os.path.join(ROOT, "build/worker-entry.js"), "--bundle", "--format=esm", "--minify", "--platform=neutral", f"--outfile={DIST}/_worker.js"], check=True)
if "--build-only" in sys.argv: print("built", DIST); sys.exit()
SPECIAL = {"_worker.js", "_routes.json", "_headers"}
mimetypes.add_type("application/manifest+json", ".webmanifest")
manifest, parts = {}, []
for d, _, fs in os.walk(DIST):
    for f in fs:
        p = os.path.join(d, f); rel = "/" + os.path.relpath(p, DIST).replace(os.sep, "/")
        data = open(p, "rb").read()
        if f in SPECIAL and d == DIST:
            parts.append((f, f, data, "application/javascript+module" if f.endswith(".js") else "text/plain")); continue
        h = hashlib.md5(data + rel.encode()).hexdigest()
        manifest[rel] = h
        parts.append((h, f, data, mimetypes.guess_type(f)[0] or "application/octet-stream"))
bnd = uuid.uuid4().hex; body = b""
def field(name, val, filename=None, ctype="text/plain"):
    global body
    disp = f'form-data; name="{name}"' + (f'; filename="{filename}"' if filename else "")
    body += f"--{bnd}\r\nContent-Disposition: {disp}\r\nContent-Type: {ctype}\r\n\r\n".encode() + val + b"\r\n"
field("manifest", json.dumps(manifest).encode(), ctype="application/json")
field("branch", branch.encode())
for name, fn, data, ct in parts: field(name, data, fn, ct)
body += f"--{bnd}--\r\n".encode()
req = urllib.request.Request(f"https://api.cloudflare.com/client/v4/accounts/{ACC}/pages/projects/{PROJECT}/deployments", data=body, method="POST", headers={"content-type": f"multipart/form-data; boundary={bnd}", "authorization": "Bearer proxy-injected"})
res = json.load(urllib.request.urlopen(req))
r = res.get("result") or {}
print(res.get("success"), res.get("errors"), r.get("id"), r.get("url"), "files:", len(manifest), "bytes:", len(body))
