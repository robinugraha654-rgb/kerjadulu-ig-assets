"""Assemble public/index.html from the app's style/markup (head.part) and script (script.part).
The kit content is NOT embedded: the page fetches it from /api/kit after a code is activated."""
import sys, re
head = open(sys.argv[1]).read()
script = open(sys.argv[2]).read()
gate = open(sys.argv[3]).read() + "\n" + "\n".join(open(f).read() for f in sys.argv[5:])
out = sys.argv[4]

cut = head.rindex("</style>") + len("</style>")
head_part, body_part = head[:cut], head[cut:]

def rep(s, a, b, n=1):
    assert s.count(a) == n, (a[:70], s.count(a))
    return s.replace(a, b)

script = rep(script, 'const KIT = JSON.parse(document.getElementById("kit-data").textContent);', "let KIT = null;")
script = rep(script, '<span class="proto">Prototipe</span>', "")
script = rep(script, "Lima modul, urut dari persiapan sampai hari-H.", "Enam modul, urut dari peta seleksi sampai hari-H.")
script = rep(script, "function render(o = {}) {\n", "function render(o = {}) {\n  if (!KIT) return;\n")
# replace the final boot call with the gate
script = script.rstrip()
assert script.endswith("render();\n</script>") or script.endswith("render();\n</script>".strip())
script = script[: script.rindex("render();")] + gate + "\n</script>\n"

gate_css = """
  /* access gate */
  body.locked .tabs { display: none; }
  .gate { min-height: calc(100vh - 60px); min-height: calc(100dvh - 60px); display: flex; flex-direction: column; justify-content: center; gap: 18px; padding-block: 24px; }
  .gate h1 { font-size: clamp(38px, 11vw, 48px); letter-spacing: -.045em; line-height: 1; }
  .gate-form { display: flex; flex-direction: column; gap: 10px; }
  .gate-input { width: 100%; font: 800 26px var(--mono); letter-spacing: .06em; text-align: center; padding: 18px 14px; border-radius: 20px; border: 2px solid var(--line); background: var(--surface); color: var(--fg); text-transform: uppercase; }
  .gate-input:focus { outline: none; border-color: var(--or); box-shadow: 0 0 0 5px var(--or-soft); }
  .gate .btn { width: 100%; padding: 17px; font-size: 17px; }
  .gate-err { background: var(--or-soft); color: var(--fg); border-radius: 14px; padding: 12px 14px; font-size: 14px; font-weight: 600; }
  .gate-notes { margin: 6px 0 0; padding-left: 18px; color: var(--mute); font-size: 13.5px; display: flex; flex-direction: column; gap: 6px; }
  .gate-notes li::marker { color: var(--or); }
  /* install to home screen */
  .install-card { gap: 14px; background: linear-gradient(135deg, rgba(255,59,71,.16), var(--surface) 60%); }
  .install-card.compact { margin-top: 8px; }
  .ic-row { display: flex; align-items: center; gap: 14px; }
  .ic-row img { width: 52px; height: 52px; border-radius: 14px; flex: none; }
  .ic-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .ic-text b { font: 800 18px var(--display); letter-spacing: -.02em; }
  .ic-text span { font-size: 13px; color: var(--mute); }
  .ic-btns { display: flex; align-items: center; gap: 14px; }
  .ic-btns .btn { padding: 12px 20px; }
  .gate .install-card .btn { width: auto; padding: 12px 20px; font-size: 15px; }
  .sheet-wrap { position: fixed; inset: 0; z-index: 60; display: flex; align-items: flex-end; justify-content: center; }
  .sheet-bg { position: absolute; inset: 0; background: rgba(0,0,0,.6); animation: fadeIn .25s both; }
  .sheet { position: relative; width: min(100%, 520px); background: var(--surface); border-radius: 28px 28px 0 0; padding: 24px max(20px, env(safe-area-inset-left, 0px)) calc(22px + env(safe-area-inset-bottom, 0px)); display: flex; flex-direction: column; gap: 14px; animation: sheetUp .35s var(--out) both; max-height: 90vh; overflow-y: auto; }
  @keyframes sheetUp { from { transform: translateY(100%); } }
  @keyframes fadeIn { from { opacity: 0; } }
  .sheet h2 { font-size: 26px; }
  .steps-list { margin: 0; padding-left: 22px; display: flex; flex-direction: column; gap: 12px; font-size: 15.5px; }
  .steps-list li::marker { color: var(--or); font-weight: 800; }
  .key-ic { display: inline-grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; background: var(--surface2); vertical-align: middle; margin: 0 2px; }
  .key-ic svg { width: 17px; height: 17px; }
  .copyrow { display: flex; align-items: center; gap: 10px; background: var(--surface2); border-radius: 14px; padding: 8px 8px 8px 14px; }
  .copyrow code { flex: 1; min-width: 0; overflow-wrap: anywhere; font: 700 14px var(--mono); }
"""
head_part = head_part.replace("</style>", gate_css + "</style>")

doc = f"""<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0B0B0C">
<meta name="robots" content="noindex">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="icon" href="/icons/icon-192.png">
<link rel="apple-touch-icon" href="/icons/apple-180.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="LolosKerja">
<style>:root{{box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}body{{margin:0;padding:0}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
{head_part.replace('<title>LolosKerja App</title>', '<title>LolosKerja</title>')}
</head>
<body>
{body_part}
{script}
</body>
</html>
"""
open(out, "w").write(doc)
print("written", out, len(doc))
