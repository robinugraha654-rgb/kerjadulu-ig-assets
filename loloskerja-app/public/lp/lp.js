/* Isi link checkout di sini (misalnya link Scalev). Kalau kosong, tombol beli menggulir ke bagian harga. */
const CHECKOUT_URL = "https://mahirdigital-store.myscalev.com/cpkitkerja";

let REDUCE = false; try { REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const rnd = () => 1 + Math.floor(Math.random() * 9);

/* buy buttons */
if (CHECKOUT_URL) document.querySelectorAll("[data-buy]").forEach((a) => { a.href = CHECKOUT_URL + location.search; a.removeAttribute("target"); });

/* marquees */
function fill(id, items) {
  const el = document.getElementById(id); if (!el) return;
  const one = items.map((t) => `<span>${esc(t)}</span>`).join("");
  el.innerHTML = one + one;
}
fill("mq1", ["Tes koran", "Deret angka", "Hitung cepat", "Logika", "K3", "Interview HRD", "Cek loker palsu", "Latihan di HP"]);
fill("mq2", ["“Ceritakan tentang diri Anda.”", "“Kenapa melamar di sini?”", "“Apa kelebihan dan kekuranganmu?”", "“Siap kerja shift dan lembur?”", "“Kapan bisa mulai bekerja?”"]);
fill("mq3", ["“Kenapa harus kami terima?”", "“Pernah PKL di mana?”", "“Berapa gaji yang kamu harapkan?”", "“Ada pertanyaan untuk kami?”", "“Bagaimana kalau ditegur atasan?”"]);
fill("mq4", ["Rp49.000 sekali bayar", "App latihan + bonus PDF", "Jalan tanpa internet", "1 kode untuk 2 HP", "Garansi 7 hari", "Tanpa langganan"]);

/* hero: self-running tes koran sheet */
(function heroSheet() {
  const strip = $("#h-strip"), timer = $("#h-timer"), lane = $("#h-lane"); if (!strip) return;
  const RH = 50; let nums = [], pos = 0, laneNo = 1, left = 15;
  const build = () => {
    nums = Array.from({ length: 60 }, rnd); pos = 0;
    strip.innerHTML = nums.map((n, i) => `<span class="row" style="bottom:${i * RH}px"><i>${n}</i></span>`).join("");
    strip.style.transform = "translateY(0)";
  };
  build();
  if (REDUCE) {
    for (let i = 0; i < 3; i++) { strip.insertAdjacentHTML("beforeend", `<span class="ans" style="bottom:${i * RH + RH / 2}px">${(nums[i] + nums[i + 1]) % 10}</span>`); }
    pos = 3; strip.style.transform = `translateY(${pos * RH}px)`; return;
  }
  setInterval(() => {
    strip.insertAdjacentHTML("beforeend", `<span class="ans" style="bottom:${pos * RH + RH / 2}px">${(nums[pos] + nums[pos + 1]) % 10}</span>`);
    pos++; strip.style.transform = `translateY(${pos * RH}px)`;
    if (pos > 50) build();
  }, 900);
  setInterval(() => {
    left--; if (left < 0) { left = 15; laneNo = laneNo % 4 + 1; lane.textContent = `Lajur ${laneNo} · contoh berjalan`; build(); }
    timer.textContent = `00:${String(left).padStart(2, "0")}`; timer.classList.toggle("urgent", left <= 5);
  }, 1000);
})();

/* hero video: sound toggle */
(function () {
  const v = document.getElementById("demo-vid"), b = document.getElementById("sound"); if (!v || !b) return;
  if (REDUCE) { v.removeAttribute("autoplay"); v.pause(); v.controls = true; }
  b.addEventListener("click", () => {
    const on = v.muted;
    v.muted = !on;
    if (on) { v.currentTime = 0; v.play().catch(() => {}); }
    b.setAttribute("aria-pressed", String(on));
    b.querySelector("span").textContent = on ? "Matikan suara" : "Nyalakan suara";
    document.getElementById("snd-wave").setAttribute("d", on ? "M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11" : "M16 9l5 6M21 9l-5 6");
  });
})();

/* count-up + reveal (content is visible at rest; motion starts when scrolled to) */
function countUp(el) {
  const to = +el.dataset.count; if (REDUCE || !to) return;
  const t0 = performance.now(), dur = 1100;
  const step = (now) => { const p = Math.min(1, (now - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
if ("IntersectionObserver" in window && !REDUCE) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const t = e.target;
    if (t.dataset.count) countUp(t); else t.classList.remove("pre");
    io.unobserve(t);
  }), { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
  document.querySelectorAll(".rv").forEach((el, i) => {
    if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("pre"); el.style.transitionDelay = `${(i % 4) * 70}ms`; }
    io.observe(el);
  });
}

/* sticky buy bar after the hero */
const bar = $("#buybar"), hero = $(".hero"), price = $("#harga");
addEventListener("scroll", () => {
  const past = hero.getBoundingClientRect().bottom < 0;
  const pr = price.getBoundingClientRect(), atPrice = pr.top < innerHeight && pr.bottom > 0;
  bar.classList.toggle("on", past && !atPrice);
}, { passive: true });

/* ================= APP DEMO ================= */
const DESC = {
  koran: ["Tes koran per lajur", "Jumlahkan dua angka di kotak, ketik angka terakhirnya. Di demo ini kamu dapat 1 lajur 20 detik. Di app ada mode sprint 4 lajur dan ketahanan 10 lajur, lengkap dengan grafik per lajur."],
  soal: ["150 soal psikotes", "Contoh soal hitung dari Set 1. Pilih jawabanmu, langsung kelihatan benar atau salah beserta pembahasannya. Di app juga ada mode simulasi dengan timer seperti tes asli."],
  iv: ["40 kartu interview HRD", "Jawab dulu pakai suaramu sendiri, baru buka contohnya. Tiap kartu menjelaskan apa yang dicari HRD dan jawaban yang sebaiknya dihindari."],
  grafik: ["Grafik kesiapan 7 hari", "Gabungan skor soal, interview, tes koran, berkas, dan rencana latihan. Garisnya naik setiap hari kamu latihan."],
};
const screen = $("#screen"), desc = $("#demo-desc");
let demo = "koran", KD = null;

function showDemo(name) {
  demo = name;
  document.querySelectorAll("[data-demo]").forEach((b) => b.setAttribute("aria-selected", b.dataset.demo === name));
  desc.innerHTML = `<h3>${DESC[name][0]}</h3><p>${DESC[name][1]}</p>`;
  desc.classList.remove("swap"); void desc.offsetWidth; desc.classList.add("swap");
  if (KD && KD.timer) clearInterval(KD.timer);
  KD = null;
  ({ koran: koranIdle, soal: soalView, iv: ivView, grafik: grafikView })[name]();
  const p = screen.firstElementChild; if (p) { p.classList.add("in"); }
}
document.querySelectorAll("[data-demo]").forEach((b) => b.addEventListener("click", () => showDemo(b.dataset.demo)));

/* -- tes koran demo -- */
const KRH = 40, KSEC = 20;
function koranShell() {
  return `<div class="pane">
    <div class="k-head"><div><b>Tes Koran</b><span>Lajur 1 dari 1 · demo</span></div><span class="k-timer" id="k-timer">00:${KSEC}</span></div>
    <div class="k-bar"><i id="k-bar"></i></div>
    <div class="k-view"><div class="k-col"><div class="k-frame" id="k-frame"></div><div class="k-strip" id="k-strip"></div><span class="k-caret"></span></div><div id="k-over"></div></div>
    <div class="k-count"><span>Lajur ini<b id="k-n">0</b></span><span>Salah<b id="k-w">0</b></span></div>
    <div class="k-pad">${[1,2,3,4,5,6,7,8,9,0].map((d) => `<button type="button" class="${d === 0 ? "z" : ""}" data-k="${d}" aria-label="Jawab ${d}">${d}</button>`).join("")}</div>
  </div>`;
}
function koranStrip(nums, pos) {
  return nums.map((n, i) => `<span class="k-n${i === pos || i === pos + 1 ? " act" : ""}" data-i="${i}" style="bottom:${i * KRH}px">${n}</span>`).join("");
}
function koranIdle(result) {
  screen.innerHTML = koranShell();
  const nums = Array.from({ length: 12 }, rnd);
  $("#k-strip").innerHTML = koranStrip(nums, 0);
  $("#k-over").innerHTML = `<div class="k-over">${result ? `
      <b>Waktu habis</b>
      <div class="k-res"><div><strong>${result.n}</strong><span>jawaban dalam 20 detik</span></div><div><strong>${result.acc}%</strong><span>ketelitian</span></div></div>
      <p>${result.n >= 10 ? "Lumayan cepat. Di tes asli, ritme ini harus bertahan berlajur-lajur." : "Wajar kalau masih kagok. Makin sering latihan, makin cepat."}</p>
      <button class="btn" type="button" id="k-go">Ulangi</button>`
    : `<b>Siap coba?</b><p>Kamu dapat 20 detik. Jumlahkan dua angka di kotak, ketik angka terakhirnya.</p><button class="btn" type="button" id="k-go">Mulai 20 detik</button>`}</div>`;
  $("#k-go").addEventListener("click", koranStart);
}
function koranStart() {
  screen.innerHTML = koranShell();
  KD = { nums: Array.from({ length: 80 }, rnd), pos: 0, right: 0, wrong: 0, end: Date.now() + KSEC * 1000 };
  $("#k-strip").innerHTML = koranStrip(KD.nums, 0);
  KD.timer = setInterval(koranPaint, 200);
}
function koranPaint() {
  if (!KD) return;
  const ms = Math.max(0, KD.end - Date.now()), s = Math.ceil(ms / 1000);
  const t = $("#k-timer"); if (!t) return;
  t.textContent = `00:${String(s).padStart(2, "0")}`; t.classList.toggle("urgent", s <= 5);
  $("#k-bar").style.width = `${(1 - ms / (KSEC * 1000)) * 100}%`;
  if (ms <= 0) {
    clearInterval(KD.timer);
    const n = KD.right + KD.wrong, res = { n, acc: n ? Math.round((KD.right / n) * 100) : 0 };
    KD = null; koranIdle(res);
  }
}
function koranKey(d) {
  if (!KD) return;
  const ok = d === (KD.nums[KD.pos] + KD.nums[KD.pos + 1]) % 10;
  ok ? KD.right++ : KD.wrong++;
  const strip = $("#k-strip");
  strip.insertAdjacentHTML("beforeend", `<span class="k-a${ok ? "" : " bad"}" style="bottom:${KD.pos * KRH + KRH / 2}px">${d}</span>`);
  strip.querySelectorAll(".k-n.act").forEach((r) => r.classList.remove("act"));
  KD.pos++;
  [KD.pos, KD.pos + 1].forEach((i) => { const r = strip.querySelector(`[data-i="${i}"]`); if (r) r.classList.add("act"); });
  strip.style.transform = `translateY(${KD.pos * KRH}px)`;
  $("#k-n").textContent = KD.right + KD.wrong; $("#k-w").textContent = KD.wrong;
  const key = screen.querySelector(`[data-k="${d}"]`), fr = $("#k-frame");
  [[key, "hit-"], [fr, ""]].forEach(([el, p]) => { if (!el) return; el.classList.remove(p + "ok", p + "bad"); void el.offsetWidth; el.classList.add(p + (ok ? "ok" : "bad")); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove(p + "ok", p + "bad"), 200); });
}
screen.addEventListener("click", (e) => { const b = e.target.closest("[data-k]"); if (b) koranKey(+b.dataset.k); });
addEventListener("keydown", (e) => { if (KD && /^[0-9]$/.test(e.key)) koranKey(+e.key); });

/* -- soal demo -- */
const Q = { q: "Upah lembur Rp15.000 per jam. Jika lembur 3 jam per hari selama 6 hari, total upah lembur ...", opts: ["Rp270.000", "Rp255.000", "Rp285.000", "Rp225.000", "Rp360.000"], a: 0, why: "15.000 × 3 × 6 = 270.000." };
function soalView(pick) {
  const done = pick != null;
  screen.innerHTML = `<div class="pane">
    <div class="q-meta"><span>Set 1 · Hitung dasar</span><span>19/30</span></div>
    <p class="q-text">${esc(Q.q)}</p>
    <div class="q-opts">${Q.opts.map((o, k) => {
      const cls = !done ? "" : k === Q.a ? "right" : k === pick ? "wrong" : "dim";
      const mk = !done ? "" : k === Q.a ? "✓" : k === pick ? "✕" : "";
      return `<button type="button" class="q-opt ${cls}" data-pick="${k}" ${done ? "disabled" : ""}><span class="l">${"ABCDE"[k]}</span><span>${esc(o)}</span><span>${mk}</span></button>`;
    }).join("")}</div>
    ${done ? `<div class="q-why"><b>${pick === Q.a ? "Benar." : "Kunci: A."}</b> ${esc(Q.why)}</div><button type="button" class="iv-btn" id="q-again">Coba lagi</button>` : ""}
  </div>`;
  screen.querySelectorAll("[data-pick]").forEach((b) => b.addEventListener("click", () => soalView(+b.dataset.pick)));
  const ag = $("#q-again"); if (ag) ag.addEventListener("click", () => soalView());
}

/* -- interview demo -- */
const IV = {
  q: "Silakan perkenalkan diri Anda.",
  cari: "Cara bicara, kepercayaan diri, dan apakah kamu bisa merangkum diri dengan singkat.",
  contoh: "\"Selamat pagi, Bapak/Ibu. Nama saya [nama lengkap], lulusan [jurusan] dari [nama sekolah] tahun [tahun lulus]. Saya tinggal di [daerah]. Selama sekolah saya belajar [satu keterampilan utama], dan saya pernah PKL di [tempat PKL]. Saya melamar di sini karena ingin mulai berkarier di bidang produksi.\"",
  hindari: "Menyebut umur, hobi, dan nama orang tua secara panjang, atau menjawab hanya \"nama saya [nama]\" lalu diam.",
};
function ivView(open) {
  screen.innerHTML = `<div class="pane">
    <div class="iv-card">
      <span class="q-meta"><span>Pertanyaan 1 · Perkenalan</span><span>1/40</span></span>
      <p class="iv-q">${esc(IV.q)}</p>
      ${open ? `<div class="iv-ans">
        <div><h4>Yang dicari HRD</h4><p>${esc(IV.cari)}</p></div>
        <div><h4>Contoh jawaban</h4><p class="iv-quote">${esc(IV.contoh)}</p></div>
        <div><h4 style="color:var(--bad)">Hindari</h4><p class="muted">${esc(IV.hindari)}</p></div>
      </div>` : `<p class="muted" style="font-size:13.5px">Jawab dulu dengan suaramu sendiri, 30 sampai 60 detik. Lebih bagus sambil direkam di HP.</p><button type="button" class="iv-btn" id="iv-open">Sudah jawab? Lihat contoh jawaban</button>`}
    </div>
  </div>`;
  const b = $("#iv-open"); if (b) b.addEventListener("click", () => { ivView(true); screen.firstElementChild.classList.remove("in"); });
}

/* -- grafik demo (contoh data) -- */
function grafikView() {
  const vals = [5, 12, 20, 24, 31, 38, 45], days = ["Rab", "Kam", "Jum", "Sab", "Min", "Sen", "Sel"];
  const X = (i) => 14 + i * (292 / 6), Y = (v) => 120 - v * 1.6;
  const pts = vals.map((v, i) => [X(i), Y(v)]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L306 120 L14 120 Z`, end = pts[6];
  screen.innerHTML = `<div class="pane">
    <div class="g-card">
      <span class="stk">Gas terus!</span>
      <span class="q-meta"><span>Kesiapan kamu</span><span></span></span>
      <div class="g-top"><span class="g-big"><span id="g-n">45</span><small>%</small></span><span class="g-delta">▲ +7% hari ini</span></div>
      <svg class="g-svg" viewBox="0 0 320 132" aria-hidden="true">
        <line x1="14" y1="120" x2="306" y2="120" stroke="#202024" stroke-width="1.5"/>
        <line x1="14" y1="56" x2="306" y2="56" stroke="#202024" stroke-dasharray="4 5"/>
        <text x="14" y="51" fill="#A3A3AB" style="font:700 9px var(--body)">40%</text>
        <path d="${area}" fill="#FF3B47" fill-opacity=".16"/>
        <path class="g-line${REDUCE ? "" : " draw"}" pathLength="1" d="${line}"/>
        <circle cx="${end[0]}" cy="${end[1].toFixed(1)}" r="6" fill="#FF3B47" stroke="#151518" stroke-width="3"/>
      </svg>
      <div class="g-days">${days.map((d, i) => `<span${i === 6 ? ' style="color:var(--fg)"' : ""}>${d}</span>`).join("")}</div>
    </div>
    <div class="g-tiles"><div><b>84</b><span>skor soal /150</span></div><div><b>18/40</b><span>jawaban siap</span></div><div><b>31</b><span>koran /menit</span></div></div>
    <p class="example">Angka di layar ini contoh. Di app, grafiknya dari latihanmu sendiri.</p>
  </div>`;
  if (!REDUCE) { const el = $("#g-n"); let v = 0; const t = setInterval(() => { v += 3; if (v >= 45) { v = 45; clearInterval(t); } el.textContent = v; }, 30); }
}

showDemo("koran");
