
/* ================= access gate + offline boot ================= */
const AKEY = "loloskerja-akses-v1";
let ACC = null;
try { ACC = JSON.parse(localStorage.getItem(AKEY) || "null"); } catch (e) {}
const saveAcc = () => { try { ACC ? localStorage.setItem(AKEY, JSON.stringify(ACC)) : localStorage.removeItem(AKEY); } catch (e) {} };
const newDevice = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

async function loadKit() {
  const r = await fetch("/api/kit", { headers: { authorization: `Bearer ${ACC.token}` } });
  if (r.status === 401 || r.status === 403) {
    const e = await r.json().catch(() => ({}));
    const err = new Error(e.error || "Akses untuk HP ini sudah tidak berlaku."); err.revoked = true; throw err;
  }
  if (!r.ok) throw new Error("Isi app belum bisa dimuat.");
  return r.json();
}

function gateView(note, retryOnly) {
  document.body.classList.add("locked");
  app.innerHTML = `
    <section class="gate">
      <div class="brand" style="font-size:24px"><span class="logo" style="width:40px;height:40px">${CHECK}</span>loloskerja</div>
      <h1>Masuk ke app latihan.</h1>
      ${retryOnly ? `<p class="muted">${esc(note || "")}</p><button class="btn" id="gate-retry" type="button">Coba lagi</button>` : `
      <p class="muted">Masukkan kode akses yang kamu terima setelah pembelian. Formatnya LK-XXXX-XXXX.</p>
      <form id="gate-form" class="gate-form" autocomplete="off">
        <label for="gate-code" class="small muted">Kode akses</label>
        <input id="gate-code" class="gate-input" inputmode="text" autocapitalize="characters" spellcheck="false" placeholder="LK-XXXX-XXXX" maxlength="12" required>
        <button class="btn" type="submit" id="gate-btn">Aktifkan <span class="arr">→</span></button>
        ${note ? `<p class="gate-err" role="alert">${esc(note)}</p>` : ""}
      </form>
      <ul class="gate-notes">
        <li>Cukup sekali. Setelah aktif, app bisa dibuka tanpa internet.</li>
        <li>1 kode bisa dipakai di 2 HP.</li>
      </ul>
      ${installCard(true)}`}
    </section>`;
  const inp = document.getElementById("gate-code");
  if (inp) {
    inp.addEventListener("input", () => {
      const raw = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, "").replace(/^LK/, "").slice(0, 8);
      inp.value = raw.length ? `LK-${raw.slice(0, 4)}${raw.length > 4 ? "-" + raw.slice(4) : ""}` : "";
    });
    setTimeout(() => inp.focus(), 50);
  }
  const rb = document.getElementById("gate-retry"); if (rb) rb.addEventListener("click", boot);
}

document.addEventListener("submit", async (e) => {
  if (e.target.id !== "gate-form") return;
  e.preventDefault();
  const btn = document.getElementById("gate-btn"), code = document.getElementById("gate-code").value;
  btn.disabled = true; btn.textContent = "Memeriksa…";
  const device = (ACC && ACC.device) || newDevice();
  try {
    const r = await fetch("/api/activate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code, device }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { gateView(d.error || "Kode belum bisa dipakai."); return; }
    ACC = { token: d.token, code: d.code, device }; saveAcc();
    boot();
  } catch (err) {
    gateView("Tidak ada koneksi internet. Aktivasi pertama butuh internet sebentar.");
  }
});

async function boot() {
  if (!ACC || !ACC.token) { gateView(); return; }
  document.body.classList.remove("locked");
  app.innerHTML = `<section class="gate"><div class="brand" style="font-size:24px"><span class="logo" style="width:40px;height:40px">${CHECK}</span>loloskerja</div><p class="muted">Menyiapkan latihanmu…</p></section>`;
  try {
    KIT = await loadKit();
    lastKey = null; lastTab = null;
    render();
  } catch (err) {
    if (err.revoked) { ACC = null; saveAcc(); gateView(err.message); }
    else { document.body.classList.add("locked"); gateView("Isi app belum tersimpan di HP ini dan sekarang tidak ada internet. Sambungkan internet sekali, lalu coba lagi.", true); }
  }
}

if ("serviceWorker" in navigator) {
  addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
boot();
