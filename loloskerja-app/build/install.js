
/* ================= install to home screen ================= */
let installEvt = null;
const UA = navigator.userAgent || "";
const IS_IOS = /iphone|ipad|ipod/i.test(UA) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const IN_APP = /Instagram|FBAN|FBAV|FB_IAB|Line\/|TikTok|musical_ly|Bytedance|; wv\)/i.test(UA);
const isInstalled = () => { try { return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; } catch (e) { return false; } };
const IKEY = "loloskerja-install-hide";
const installHidden = () => { try { return Date.now() < +(localStorage.getItem(IKEY) || 0); } catch (e) { return false; } };

addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); installEvt = e; refreshInstall(); });
addEventListener("appinstalled", () => { installEvt = null; closeSheet(); refreshInstall(); if (typeof toast === "function") toast("LolosKerja sudah terpasang di layar utama"); });

function installCard(compact) {
  if (isInstalled() || (!compact && installHidden())) return "";
  return `<section class="card install-card${compact ? " compact" : ""}" id="install-card">
    <div class="ic-row">
      <img src="/icons/icon-192.png" alt="" width="52" height="52">
      <div class="ic-text"><b>Pasang di layar utama</b><span>Buka langsung dari HP seperti app biasa, bisa tanpa internet.</span></div>
    </div>
    <div class="ic-btns"><button class="btn" type="button" data-install>Pasang app</button>${compact ? "" : `<button class="linkbtn" type="button" data-install-later>Nanti saja</button>`}</div>
  </section>`;
}
function refreshInstall() {
  const c = document.getElementById("install-card");
  if (c && isInstalled()) c.remove();
}

const SHARE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3M8 7l4-4 4 4"/><path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>`;
const DOTS_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>`;
function sheetHTML() {
  if (IN_APP) return `<h2>Buka dulu di Chrome atau Safari</h2>
    <p class="muted">Kamu sedang membuka link dari dalam Instagram, Facebook, atau TikTok. Browser bawaan aplikasi itu tidak bisa memasang app ke layar utama.</p>
    <ol class="steps-list">
      <li>Ketuk tombol <span class="key-ic">${DOTS_ICON}</span> atau <b>…</b> di pojok kanan atas.</li>
      <li>Pilih <b>Buka di browser</b> / <b>Buka di Chrome</b>${IS_IOS ? " / <b>Buka di Safari</b>" : ""}.</li>
      <li>Setelah terbuka, ketuk <b>Pasang app</b> lagi.</li>
    </ol>
    <p class="muted small">Atau salin link ini dan tempel di Chrome${IS_IOS ? "/Safari" : ""}:</p>
    <div class="copyrow"><code>${location.origin}</code><button class="btn sm" type="button" data-copy-link>Salin link</button></div>`;
  if (IS_IOS) return `<h2>Pasang di iPhone</h2>
    <p class="muted">Pastikan kamu membuka halaman ini di <b>Safari</b>.</p>
    <ol class="steps-list">
      <li>Ketuk tombol <b>Bagikan</b> <span class="key-ic">${SHARE_ICON}</span> di bagian bawah (atau atas) layar.</li>
      <li>Gulir ke bawah, pilih <b>Tambah ke Layar Utama</b> (Add to Home Screen).</li>
      <li>Ketuk <b>Tambah</b>. Ikon LolosKerja muncul di layar utama.</li>
    </ol>`;
  return `<h2>Pasang di HP Android</h2>
    <p class="muted">Paling lancar di <b>Google Chrome</b>.</p>
    <ol class="steps-list">
      <li>Ketuk tombol menu <span class="key-ic">${DOTS_ICON}</span> di pojok kanan atas Chrome.</li>
      <li>Pilih <b>Instal aplikasi</b> atau <b>Tambahkan ke layar utama</b>.</li>
      <li>Ketuk <b>Instal</b>. Ikon LolosKerja muncul di layar utama.</li>
    </ol>
    <p class="muted small">Kalau pilihan itu tidak ada, buka link ini di Chrome:</p>
    <div class="copyrow"><code>${location.origin}</code><button class="btn sm" type="button" data-copy-link>Salin link</button></div>`;
}
function openSheet() {
  closeSheet();
  const el = document.createElement("div");
  el.className = "sheet-wrap"; el.id = "install-sheet";
  el.innerHTML = `<div class="sheet-bg" data-sheet-close></div><div class="sheet" role="dialog" aria-modal="true" aria-label="Cara memasang app">${sheetHTML()}<button class="btn ghost" type="button" data-sheet-close style="width:100%">Mengerti</button></div>`;
  document.body.appendChild(el);
}
function closeSheet() { const s = document.getElementById("install-sheet"); if (s) s.remove(); }

document.addEventListener("click", async (e) => {
  const t = e.target.closest("[data-install],[data-install-later],[data-sheet-close],[data-copy-link]"); if (!t) return;
  if (t.hasAttribute("data-install")) {
    if (installEvt && !IN_APP) {
      installEvt.prompt();
      const r = await installEvt.userChoice.catch(() => null);
      installEvt = null;
      if (r && r.outcome !== "accepted") openSheet();
    } else openSheet();
  } else if (t.hasAttribute("data-install-later")) {
    try { localStorage.setItem(IKEY, String(Date.now() + 3 * 864e5)); } catch (err) {}
    const c = document.getElementById("install-card"); if (c) c.remove();
  } else if (t.hasAttribute("data-sheet-close")) closeSheet();
  else if (t.hasAttribute("data-copy-link")) {
    try { await navigator.clipboard.writeText(location.origin); t.textContent = "Tersalin ✓"; }
    catch (err) { const c = t.previousElementSibling; const r = document.createRange(); r.selectNodeContents(c); const s = getSelection(); s.removeAllRanges(); s.addRange(r); t.textContent = "Teks dipilih, tekan salin"; }
  }
});
