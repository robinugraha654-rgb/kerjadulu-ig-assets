import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display } from "../theme";
import { Background, Check, Logo, Overlay, Phone } from "../common";

// Instagram highlights #2–#4: "Cara Klaim", "FAQ", "Anti Loker Palsu". 1080x1920 Story slides.
// Key content stays inside y ≈ 250–1670 (IG covers the top and bottom of Stories).
// All facts come from the LolosKerja landing page, the app, and its Modul 4 (anti-penipuan).

const WA = "0895-3407-93245";

const StoryFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
    <Background />
    {children}
    <Overlay />
  </AbsoluteFill>
);

const Mark: React.FC<{ box: [number, number, number, number] }> = ({ box }) => (
  <div
    style={{
      position: "absolute",
      left: `${box[0]}%`,
      top: `${box[1]}%`,
      width: `${box[2]}%`,
      height: `${box[3]}%`,
      borderRadius: 22,
      border: `6px solid ${C.red}`,
      boxShadow: "0 0 40px rgba(255,59,71,0.8)",
    }}
  />
);

const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.red }) => (
  <div style={{ fontFamily: body, fontWeight: 800, fontSize: 30, letterSpacing: 6, color }}>{children}</div>
);

const Pill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 26px",
      borderRadius: 999,
      fontFamily: body,
      fontWeight: 800,
      fontSize: 32,
      color: C.fg,
      background: "rgba(23,23,26,0.92)",
      border: `2px solid ${C.line}`,
    }}
  >
    {children}
  </div>
);

/* ---------------- generic intro ---------------- */
const IntroStory: React.FC<{ eyebrow: string; title: React.ReactNode; sub: string; icon: React.ReactNode }> = ({ eyebrow, title, sub, icon }) => (
  <StoryFrame>
    <div style={{ position: "absolute", left: 70, right: 70, top: 300, textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: C.red,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 110px rgba(255,59,71,0.65)",
          }}
        >
          {icon}
        </div>
      </div>
      <div style={{ marginTop: 56 }}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 106, lineHeight: 1.02, letterSpacing: -3.5, color: C.fg, marginTop: 16 }}>{title}</div>
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 38, lineHeight: 1.35, color: "#d4d4da", marginTop: 26 }}>{sub}</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Logo size={64} />
    </div>
  </StoryFrame>
);

const KeyIcon = (
  <svg width="130" height="130" viewBox="0 0 24 24" fill="none" stroke={C.redInk} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="15" r="4.2" />
    <path d="M11 12l9-9M16 7l3 3M14 9l2 2" />
  </svg>
);
const QuestionIcon = (
  <svg width="130" height="130" viewBox="0 0 24 24" fill="none" stroke={C.redInk} strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 9a3.5 3.5 0 1 1 5.4 2.9c-1 .7-1.9 1.3-1.9 2.6" />
    <circle cx="12" cy="18.3" r="0.4" fill={C.redInk} />
  </svg>
);
const ShieldIcon = (
  <svg width="130" height="130" viewBox="0 0 24 24" fill="none" stroke={C.redInk} strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.5l7.5 2.8v5.7c0 4.7-3.2 8.8-7.5 10.5-4.3-1.7-7.5-5.8-7.5-10.5V5.3L12 2.5z" />
    <path d="M12 8v5" strokeWidth={2.3} />
    <circle cx="12" cy="16.2" r="0.4" fill={C.redInk} />
  </svg>
);

/* ======================= CARA KLAIM ======================= */
const StepStory: React.FC<{
  n: number;
  title: string;
  text: string;
  src?: string;
  marks?: [number, number, number, number][];
  pills?: string[];
}> = ({ n, title, text, src, marks, pills }) => (
  <StoryFrame>
    <div style={{ position: "absolute", left: 70, right: 70, top: 250 }}>
      <Eyebrow>LANGKAH {n} DARI 3</Eyebrow>
      <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 16 }}>
        <div
          style={{
            width: 120,
            height: 120,
            flexShrink: 0,
            borderRadius: "50%",
            background: C.red,
            color: C.redInk,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: display,
            fontWeight: 800,
            fontSize: 80,
            boxShadow: "0 0 60px rgba(255,59,71,0.6)",
          }}
        >
          {n}
        </div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 78, lineHeight: 1.02, letterSpacing: -2.5, color: C.fg }}>{title}</div>
      </div>
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 35, lineHeight: 1.38, color: "#d4d4da", marginTop: 24 }}>{text}</div>
      {pills ? (
        <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
          {pills.map((p) => (
            <Pill key={p}>{p}</Pill>
          ))}
        </div>
      ) : null}
    </div>
    {src ? (
      <div style={{ position: "absolute", left: "50%", top: pills ? 800 : 760, translate: "-50% 0px" }}>
        <Phone src={src} width={pills ? 430 : 460}>
          {marks?.map((m, i) => (
            <Mark key={i} box={m} />
          ))}
        </Phone>
      </div>
    ) : null}
  </StoryFrame>
);

const IphoneStory: React.FC = () => (
  <StoryFrame>
    <div style={{ position: "absolute", left: 70, right: 70, top: 260 }}>
      <Eyebrow>PAKAI IPHONE?</Eyebrow>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 96, lineHeight: 1.02, letterSpacing: -3, color: C.fg, marginTop: 12 }}>
        Bisa. Ini <span style={{ color: C.red }}>caranya.</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 640, display: "flex", flexDirection: "column", gap: 24 }}>
      {[
        ["1", "Buka link app di Safari", "Bukan lewat aplikasi lain, ya."],
        ["2", "Masukkan kode akses", "Format kodenya LK-XXXX-XXXX."],
        ["3", "Ketuk Bagikan, lalu Tambah ke Layar Utama", "Ikon LolosKerja muncul di layar utama."],
      ].map(([n, t, s]) => (
        <div
          key={n}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            padding: "30px 34px",
            borderRadius: 38,
            background: C.surface,
            border: `3px solid ${C.line}`,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              width: 90,
              height: 90,
              flexShrink: 0,
              borderRadius: 26,
              background: C.red,
              color: C.redInk,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: display,
              fontWeight: 800,
              fontSize: 58,
            }}
          >
            {n}
          </div>
          <div>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 46, lineHeight: 1.1, letterSpacing: -1, color: C.fg }}>{t}</div>
            <div style={{ fontFamily: body, fontWeight: 600, fontSize: 30, color: C.mute, marginTop: 6 }}>{s}</div>
          </div>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 1400, textAlign: "center", fontFamily: body, fontWeight: 700, fontSize: 34, color: "#d4d4da" }}>
      Petunjuknya juga muncul di dalam app.
    </div>
  </StoryFrame>
);

const HelpStory: React.FC<{ title: React.ReactNode }> = ({ title }) => (
  <StoryFrame>
    <div style={{ position: "absolute", left: 70, right: 70, top: 300, textAlign: "center" }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 98, lineHeight: 1.03, letterSpacing: -3, color: C.fg }}>{title}</div>
    </div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 760, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ padding: "34px 40px", borderRadius: 38, background: "rgba(61,220,151,0.10)", border: `4px solid ${C.ok}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Check size={56} />
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 56, letterSpacing: -1.5, color: C.fg }}>Garansi 7 hari uang kembali</div>
        </div>
        <div style={{ fontFamily: body, fontWeight: 600, fontSize: 32, lineHeight: 1.38, color: "#d4d4da", marginTop: 14 }}>
          Kalau LolosKerja tidak sesuai harapanmu, chat admin dalam 7 hari setelah pembelian.
        </div>
      </div>
      <div style={{ padding: "34px 40px", borderRadius: 38, background: C.surface, border: `3px solid ${C.line}` }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 30, letterSpacing: 5, color: C.mute }}>CHAT ADMIN</div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 64, letterSpacing: -2, color: C.fg, marginTop: 8 }}>
          WhatsApp <span style={{ color: C.red }}>{WA}</span>
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1500, display: "flex", justifyContent: "center" }}>
      <Logo size={64} />
    </div>
  </StoryFrame>
);

const CLAIM_STORIES: [string, React.FC][] = [
  [
    "Klaim-00-Intro",
    () => <IntroStory eyebrow="CARA KLAIM" title={<>Habis bayar, <span style={{ color: C.red }}>ngapain?</span></>} sub="Tiga langkah, langsung bisa latihan." icon={KeyIcon} />,
  ],
  [
    "Klaim-01-Kode",
    () => (
      <StepStory
        n={1}
        title="Ambil kode akses"
        text="Buka halaman klaim dari email pembayaranmu, lalu masukkan nomor WhatsApp yang kamu isi saat checkout. Kode aksesmu langsung muncul."
        src="shots/60-klaim.png"
        marks={[[4, 55, 92, 17]]}
      />
    ),
  ],
  [
    "Klaim-02-Pasang",
    () => (
      <StepStory
        n={2}
        title="Masukkan kode, pasang di HP"
        text="Buka link di Chrome atau Safari, masukkan kode, lalu ketuk Pasang app. Ikon LolosKerja muncul di layar utama."
        src="shots/61-login.png"
        marks={[
          [4, 38, 92, 9.5],
          [4, 69.4, 92, 19],
        ]}
      />
    ),
  ],
  [
    "Klaim-03-Latihan",
    () => (
      <StepStory
        n={3}
        title="Latihan kapan saja"
        text="Setelah aktif, app tetap bisa dibuka tanpa internet."
        src="shots/01-beranda.png"
        pills={["Tanpa kuota", "1 kode untuk 2 HP"]}
      />
    ),
  ],
  ["Klaim-04-iPhone", () => <IphoneStory />],
  ["Klaim-05-Bantuan", () => <HelpStory title={<>Ada kendala? <span style={{ color: C.red }}>Tenang.</span></>} />],
];

/* ======================= FAQ ======================= */
const QAStory: React.FC<{ i: number; total: number; emoji: string; q: string; a: React.ReactNode }> = ({ i, total, emoji, q, a }) => (
  <StoryFrame>
    <div style={{ position: "absolute", left: 70, right: 70, top: 260 }}>
      <Eyebrow>
        PERTANYAAN {i} DARI {total}
      </Eyebrow>
      <div style={{ fontSize: 130, marginTop: 24, lineHeight: 1 }}>{emoji}</div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 90, lineHeight: 1.03, letterSpacing: -3, color: C.fg, marginTop: 24 }}>{q}</div>
    </div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 920 }}>
      <div
        style={{
          padding: "46px 46px 50px",
          borderRadius: 48,
          background: C.surface,
          border: `3px solid ${C.line}`,
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 28, letterSpacing: 6, color: C.red }}>JAWABANNYA</div>
        <div style={{ fontFamily: body, fontWeight: 600, fontSize: 44, lineHeight: 1.38, color: C.fg, marginTop: 14 }}>{a}</div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1560, display: "flex", justifyContent: "center" }}>
      <Logo size={56} />
    </div>
  </StoryFrame>
);

const B: React.FC<{ children: React.ReactNode }> = ({ children }) => <b style={{ color: C.red }}>{children}</b>;

const QA: { emoji: string; q: string; a: React.ReactNode }[] = [
  {
    emoji: "📲",
    q: "Perlu download dari Play Store?",
    a: (
      <>
        <B>Tidak perlu.</B> App dibuka lewat link di browser HP, lalu bisa dipasang di layar utama supaya terbuka seperti app biasa.
      </>
    ),
  },
  {
    emoji: "📶",
    q: "Perlu internet terus?",
    a: (
      <>
        <B>Tidak.</B> Internet cuma dibutuhkan sekali saat memasukkan kode pertama kali. Setelah itu app jalan tanpa kuota.
      </>
    ),
  },
  {
    emoji: "📱",
    q: "Bisa dipakai di berapa HP?",
    a: (
      <>
        Satu kode bisa dipakai di <B>2 HP</B>. Ganti HP? Chat admin, kodenya kami atur ulang.
      </>
    ),
  },
  {
    emoji: "🍎",
    q: "Bisa di iPhone?",
    a: (
      <>
        <B>Bisa.</B> Buka link di Safari, masukkan kode, ketuk Bagikan, lalu pilih Tambah ke Layar Utama.
      </>
    ),
  },
  {
    emoji: "🎯",
    q: "Apakah ini menjamin saya diterima kerja?",
    a: (
      <>
        <B>Tidak ada latihan yang bisa menjamin itu.</B> LolosKerja bantu kamu lebih siap di tiap tahap: berkas, tes, dan interview. Keputusan akhir tetap di perusahaan.
      </>
    ),
  },
  {
    emoji: "💼",
    q: "Cocok untuk posisi apa saja?",
    a: (
      <>
        Fokusnya <B>operator produksi, staf pabrik, dan retail</B> untuk lulusan SMA/SMK. Bagian berkas, interview, dan anti-penipuan juga berguna buat lamaran lain.
      </>
    ),
  },
  {
    emoji: "✅",
    q: "Soal-soalnya ada pembahasannya?",
    a: (
      <>
        <B>Ada.</B> Tiap soal punya kunci dan pembahasan singkat. Pilih mode latihan atau simulasi dengan timer.
      </>
    ),
  },
  {
    emoji: "💾",
    q: "Progres latihan tersimpan di mana?",
    a: (
      <>
        Di <B>HP yang kamu pakai</B>. Pakai HP yang sama tiap latihan supaya grafik kesiapanmu tetap tersambung.
      </>
    ),
  },
  {
    emoji: "💳",
    q: "Perlu bayar lagi atau langganan?",
    a: (
      <>
        <B>Tidak.</B> Rp49.000, sekali bayar. Pembayaran lewat QRIS, e-wallet, atau transfer bank.
      </>
    ),
  },
  {
    emoji: "🖨️",
    q: "PDF bonusnya boleh dicetak?",
    a: (
      <>
        <B>Boleh</B>, untuk pemakaian pribadi. Halamannya berukuran A4 supaya enak dicetak.
      </>
    ),
  },
];

const FAQ_STORIES: [string, React.FC][] = [
  ["Faq-00-Intro", () => <IntroStory eyebrow="FAQ" title={<>Yang sering <span style={{ color: C.red }}>ditanyakan.</span></>} sub="Jawaban singkat sebelum kamu beli." icon={QuestionIcon} />],
  ...QA.map((x, i): [string, React.FC] => [
    `Faq-${String(i + 1).padStart(2, "0")}`,
    () => <QAStory i={i + 1} total={QA.length} emoji={x.emoji} q={x.q} a={x.a} />,
  ]),
  ["Faq-11-Bantuan", () => <HelpStory title={<>Masih ada yang mau <span style={{ color: C.red }}>ditanya?</span></>} />],
];

/* ======================= ANTI LOKER PALSU ======================= */
type Sign = { title: string; sub?: string; why: string; todo: string; src: string };
const SIGNS: Sign[] = [
  {
    title: "Diminta bayar apa pun",
    sub: "administrasi, pelatihan, seragam, “uang pelicin”",
    why: "Kemnaker menyebut: jika ada pungutan biaya dalam proses rekrutmen, hampir pasti itu modus penipuan.",
    todo: "Jangan transfer. Hentikan proses, simpan tangkapan layar permintaannya.",
    src: "Kemnaker, via Antara (13 Jan 2025)",
  },
  {
    title: "Gaji tinggi, syarat mudah, tanpa wawancara",
    why: "Upah sangat tinggi untuk posisi yang tidak jelas disebut Kemnaker sebagai ciri lowongan palsu.",
    todo: "Bandingkan dengan UMK daerahnya. Kalau jauh di atas wajar, anggap curiga.",
    src: "Kemnaker",
  },
  {
    title: "Tidak ada info perusahaan",
    sub: "alamat, tugas, dan syarat tidak jelas",
    why: "Perusahaan asli tidak punya alasan menyembunyikan nama dan lokasi pabriknya.",
    todo: "Minta nama PT dan alamat pabrik, lalu cek sendiri.",
    src: "Panduan LolosKerja, Modul 4",
  },
  {
    title: "Kontak cuma lewat WhatsApp atau Telegram",
    sub: "email Gmail/Yahoo, tulisan banyak salah",
    why: "Ciri umum menurut Kemnaker dan Kalibrr. Perusahaan resmi biasanya memakai email berdomain perusahaan.",
    todo: "Cek apakah domain emailnya sama dengan situs resmi perusahaan.",
    src: "Kemnaker, Kalibrr",
  },
  {
    title: "Wawancara instan lewat chat",
    sub: "nyaris tanpa tanya jawab, atau ditanya “bawa uang berapa”",
    why: "Pola yang disebut Kemnaker dan Kalibrr: diterima cepat, lalu diminta bayar seragam.",
    todo: "Minta wawancara di kantor atau video call resmi. Kalau menolak, mundur.",
    src: "Kemnaker, Kalibrr",
  },
  {
    title: "Diminta KTP, selfie pegang KTP, nomor rekening, atau OTP",
    why: "Data ini bisa dipakai untuk pinjol atau membobol rekening.",
    todo: "Jangan kirim. Jangan pernah berikan kode OTP ke siapa pun.",
    src: "Bisnis.com (7 Agu 2024)",
  },
  {
    title: "Disuruh “tugas” like atau review, lalu top-up",
    why: "Komisi kecil di awal cuma umpan supaya kamu setor uang lebih besar.",
    todo: "Berhenti di tugas pertama yang meminta uang. Jangan top-up.",
    src: "Kalibrr, CNA Indonesia",
  },
  {
    title: "Disuruh install aplikasi atau klik tautan",
    why: "Jangan klik tautan atau unduh file dari orang tak dikenal.",
    todo: "Jangan pasang aplikasi dari pewawancara.",
    src: "OJK",
  },
  {
    title: "Kerja luar negeri, gaji besar, berangkat pakai visa turis",
    why: "Pola ini terkait perdagangan orang dan scam online.",
    todo: "Jangan berangkat. Visa turis bukan izin kerja. Laporkan konten iklannya ke aduankonten.id.",
    src: "Komdigi, Bareskrim",
  },
];

const SignStory: React.FC<{ i: number; s: Sign }> = ({ i, s }) => (
  <StoryFrame>
    <div style={{ position: "absolute", left: 70, right: 70, top: 250 }}>
      <Eyebrow>
        TANDA {i} DARI {SIGNS.length}
      </Eyebrow>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 84, lineHeight: 1.03, letterSpacing: -2.5, color: C.fg, marginTop: 14 }}>
        <span style={{ color: C.red }}>⚠</span> {s.title}
      </div>
      {s.sub ? <div style={{ fontFamily: body, fontWeight: 600, fontSize: 34, color: C.mute, marginTop: 14 }}>{s.sub}</div> : null}
    </div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 780, display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ padding: "34px 40px", borderRadius: 40, background: C.surface, border: `3px solid ${C.line}` }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 26, letterSpacing: 5, color: C.mute }}>KENAPA MENCURIGAKAN</div>
        <div style={{ fontFamily: body, fontWeight: 600, fontSize: 38, lineHeight: 1.36, color: C.fg, marginTop: 10 }}>{s.why}</div>
      </div>
      <div style={{ padding: "34px 40px", borderRadius: 40, background: "rgba(61,220,151,0.10)", border: `4px solid ${C.ok}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: body, fontWeight: 800, fontSize: 26, letterSpacing: 5, color: C.ok }}>
          <Check size={34} /> YANG KAMU LAKUKAN
        </div>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 40, lineHeight: 1.34, color: C.fg, marginTop: 10 }}>{s.todo}</div>
      </div>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 1560, textAlign: "center", fontFamily: body, fontWeight: 600, fontSize: 26, color: C.mute }}>
      Sumber: {s.src}
    </div>
  </StoryFrame>
);

const LokerClosing: React.FC = () => (
  <StoryFrame>
    <div style={{ position: "absolute", left: 60, right: 60, top: 270, textAlign: "center" }}>
      <Eyebrow>ATURAN EMAS</Eyebrow>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 98, lineHeight: 1.02, letterSpacing: -3, color: C.fg, marginTop: 14 }}>
        Jangan pernah <span style={{ color: C.red }}>bayar siapa pun</span> supaya diterima kerja.
      </div>
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 32, lineHeight: 1.4, color: "#d4d4da", marginTop: 22 }}>
        Satu tanda belum tentu penipuan, tapi makin banyak yang cocok, makin besar alasanmu untuk berhenti dan mengecek dulu.
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 850, textAlign: "center", fontFamily: body, fontWeight: 800, fontSize: 34, color: C.fg }}>
      Daftar lengkapnya ada di panduan LolosKerja (Modul 4)
    </div>
    <div style={{ position: "absolute", left: "50%", top: 930, translate: "-50% 0px" }}>
      <Phone src="shots/32-modul4-tanda.png" width={330}>
        <Mark box={[3, 26, 94, 23.5]} />
      </Phone>
    </div>
  </StoryFrame>
);

const LOKER_STORIES: [string, React.FC][] = [
  [
    "Loker-00-Intro",
    () => <IntroStory eyebrow="ANTI LOKER PALSU" title={<>Disuruh bayar biar <span style={{ color: C.red }}>diterima?</span></>} sub="Kenali 9 tanda loker palsu sebelum kamu transfer." icon={ShieldIcon} />,
  ],
  ...SIGNS.map((s, i): [string, React.FC] => [`Loker-${String(i + 1).padStart(2, "0")}`, () => <SignStory i={i + 1} s={s} />]),
  ["Loker-10-Penutup", LokerClosing],
];

/* ======================= covers (circle crop in the middle of 1080x1920) ======================= */
const Cover: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,59,71,0.4), rgba(255,59,71,0) 42%)" }} />
    <div
      style={{
        width: 520,
        height: 520,
        borderRadius: "50%",
        background: C.red,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 130px rgba(255,59,71,0.7)",
        scale: "1.0",
      }}
    >
      <div style={{ scale: "2.0", display: "flex" }}>{icon}</div>
    </div>
  </AbsoluteFill>
);

export const COVERS: [string, React.FC][] = [
  ["Cover-Klaim", () => <Cover icon={KeyIcon} />],
  ["Cover-Faq", () => <Cover icon={QuestionIcon} />],
  ["Cover-Loker", () => <Cover icon={ShieldIcon} />],
];

export const STORIES2: [string, React.FC][] = [...CLAIM_STORIES, ...FAQ_STORIES, ...LOKER_STORIES, ...COVERS];
