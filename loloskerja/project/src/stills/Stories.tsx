import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, mono } from "../theme";
import { Background, Check, Logo, Overlay, Phone } from "../common";

// Instagram Story slides for the "Isi App" highlight, 1080x1920.
// Key content stays inside y ≈ 250–1670 (IG covers the top and bottom of Stories).

const Mark: React.FC<{ left: number; top: number; width: number; height: number }> = ({ left, top, width, height }) => (
  <div
    style={{
      position: "absolute",
      left: `${left}%`,
      top: `${top}%`,
      width: `${width}%`,
      height: `${height}%`,
      borderRadius: 22,
      border: `6px solid ${C.red}`,
      boxShadow: "0 0 40px rgba(255,59,71,0.8)",
    }}
  />
);

const Pill: React.FC<{ children: React.ReactNode; red?: boolean }> = ({ children, red }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "12px 26px",
      borderRadius: 999,
      fontFamily: body,
      fontWeight: 800,
      fontSize: 32,
      color: red ? C.redInk : C.fg,
      background: red ? C.red : "rgba(23,23,26,0.92)",
      border: red ? "none" : `2px solid ${C.line}`,
    }}
  >
    {children}
  </div>
);

type Slide = {
  n: string;
  title: React.ReactNode;
  text: string;
  src: string;
  mark?: [number, number, number, number];
  pills?: string[];
  note?: string;
};

const SLIDES: Record<string, Slide> = {
  koran: {
    n: "01 · TES KORAN",
    title: (
      <>
        Simulasi tes koran <span style={{ color: C.red }}>per lajur.</span>
      </>
    ),
    text: "Jumlahkan dua angka, tulis angka belakangnya. Waktu jalan per lajur, persis kayak di kertas.",
    src: "shots/11-koran-jalan.png",
    mark: [27, 25, 22, 16],
    pills: ["Sprint 1 menit", "Ketahanan 5 menit"],
  },
  hasil: {
    n: "02 · HASIL & GRAFIK",
    title: (
      <>
        Tahu ritmemu <span style={{ color: C.red }}>drop</span> di lajur mana.
      </>
    ),
    text: "Habis latihan keluar jawaban per menit, ketelitian, dan grafik kerja per lajur.",
    src: "shots/20-koran-hasil-drop.png",
    mark: [6, 50, 90, 17],
    note: "Contoh tampilan hasil",
  },
  psikotes: {
    n: "03 · PSIKOTES",
    title: (
      <>
        <span style={{ color: C.red }}>150 soal</span> dalam 5 set.
      </>
    ),
    text: "Hitung dasar, deret angka, logika, pengetahuan umum, dan K3. Bisa mode latihan atau simulasi bertimer.",
    src: "shots/02-latihan.png",
    mark: [4, 26, 92, 45],
  },
  bahas: {
    n: "04 · PEMBAHASAN",
    title: (
      <>
        Tiap soal ada <span style={{ color: C.red }}>kunci</span> & pembahasan.
      </>
    ),
    text: "Salah jawab? Langsung kelihatan kenapa, jadi nggak salah di soal yang sama.",
    src: "shots/09-soal-jawab.png",
    mark: [4, 75.5, 92, 6.5],
  },
  interview: {
    n: "05 · INTERVIEW HRD",
    title: (
      <>
        <span style={{ color: C.red }}>40 pertanyaan</span> + contoh jawaban.
      </>
    ),
    text: "Tiap kartu ada maksud HRD, contoh jawaban, dan hal yang harus dihindari.",
    src: "shots/22-interview-jawaban.png",
    mark: [4, 59.5, 92, 21.5],
  },
  panduan: {
    n: "06 · PANDUAN",
    title: (
      <>
        <span style={{ color: C.red }}>6 modul</span> panduan.
      </>
    ),
    text: "Peta seleksi, dokumen lamaran, tes tertulis, interview HRD, anti penipuan, dan strategi cari loker.",
    src: "shots/30-panduan.png",
  },
  dokumen: {
    n: "07 · DOKUMEN LAMARAN",
    title: (
      <>
        Checklist berkas & <span style={{ color: C.red }}>template CV.</span>
      </>
    ),
    text: "Daftar dokumen yang disiapkan, 3 template CV, dan contoh pesan WA ke HRD.",
    src: "shots/42-modul1-checklist.png",
    mark: [3, 54.5, 94, 21],
  },
  loker: {
    n: "08 · ANTI LOKER PALSU",
    title: (
      <>
        Kenali ciri <span style={{ color: C.red }}>loker palsu.</span>
      </>
    ),
    text: "Tabel tanda yang patut dicurigai, lengkap dengan apa yang harus kamu lakukan.",
    src: "shots/32-modul4-tanda.png",
    mark: [3, 26, 94, 23.5],
  },
  rencana: {
    n: "09 · RENCANA 7 HARI",
    title: (
      <>
        Jelas harus <span style={{ color: C.red }}>mulai dari mana.</span>
      </>
    ),
    text: "Dari Hari 1 Diagnosa sampai Hari 7 Simulasi penuh, ada jadwal latihannya.",
    src: "shots/50-rencana7.png",
    mark: [9, 18.7, 82, 14.8],
  },
};

const StoryFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
    <Background />
    {children}
    <Overlay />
  </AbsoluteFill>
);

const FeatureStory: React.FC<{ s: Slide }> = ({ s }) => (
  <StoryFrame>
    <div style={{ position: "absolute", left: 70, right: 70, top: 250 }}>
      <div style={{ fontFamily: body, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: C.red }}>{s.n}</div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 82, lineHeight: 1.02, letterSpacing: -2.5, color: C.fg, marginTop: 12 }}>
        {s.title}
      </div>
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 34, lineHeight: 1.35, color: "#d4d4da", marginTop: 20 }}>{s.text}</div>
      {s.pills ? (
        <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
          {s.pills.map((p) => (
            <Pill key={p}>{p}</Pill>
          ))}
        </div>
      ) : null}
    </div>
    <div style={{ position: "absolute", left: "50%", top: s.pills ? 800 : s.note ? 760 : 740, translate: "-50% 0px" }}>
      <Phone src={s.src} width={s.pills ? 440 : 480}>
        {s.mark ? <Mark left={s.mark[0]} top={s.mark[1]} width={s.mark[2]} height={s.mark[3]} /> : null}
      </Phone>
    </div>
    {s.note ? (
      <div style={{ position: "absolute", left: 0, right: 0, top: 690, textAlign: "center", fontFamily: body, fontWeight: 700, fontSize: 28, color: C.mute }}>{s.note}</div>
    ) : null}
  </StoryFrame>
);

/* Intro slide */
export const StoryIntro: React.FC = () => (
  <StoryFrame>
    <div style={{ position: "absolute", left: 70, right: 70, top: 250, textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Logo size={78} />
      </div>
      <div style={{ fontFamily: body, fontWeight: 800, fontSize: 30, letterSpacing: 7, color: C.red, marginTop: 44 }}>ISI APP</div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 92, lineHeight: 1.02, letterSpacing: -3, color: C.fg, marginTop: 12 }}>
        Apa aja yang kamu dapat di <span style={{ color: C.red }}>LolosKerja?</span>
      </div>
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 34, color: "#d4d4da", marginTop: 20 }}>Ketuk buat lihat satu per satu 👉</div>
    </div>
    <div style={{ position: "absolute", left: "50%", top: 830, translate: "-50% 0px" }}>
      <Phone src="shots/01-beranda.png" width={440} />
    </div>
  </StoryFrame>
);

/* Closing slide */
export const StoryClosing: React.FC = () => (
  <StoryFrame>
    <div style={{ position: "absolute", left: 60, right: 60, top: 300, textAlign: "center" }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 96, lineHeight: 1.04, letterSpacing: -3, color: C.fg }}>
        Semua ini dalam <span style={{ color: C.red }}>satu app.</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 700, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <Logo size={86} />
      <div style={{ fontFamily: body, fontWeight: 800, fontSize: 42, color: C.mute, marginTop: 14 }}>Sekali bayar</div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 190, letterSpacing: -6, lineHeight: 1, color: C.fg, textShadow: "0 0 70px rgba(255,59,71,0.45)" }}>
        <span style={{ fontSize: 92, color: C.red, verticalAlign: "top" }}>Rp</span>49.000
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1160, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      {["Bisa dipasang di HP", "Jalan tanpa kuota", "Bonus panduan PDF 120 halaman"].map((t) => (
        <div
          key={t}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 30px",
            borderRadius: 999,
            border: `2px solid ${C.line}`,
            background: "rgba(23,23,26,0.92)",
            fontFamily: body,
            fontWeight: 800,
            fontSize: 34,
            color: C.fg,
          }}
        >
          <Check size={32} /> {t}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <div style={{ background: C.red, color: C.redInk, fontFamily: body, fontWeight: 800, fontSize: 56, padding: "26px 64px", borderRadius: 999, boxShadow: "0 0 70px rgba(255,59,71,0.65)" }}>
        Link di bio 👆
      </div>
    </div>
  </StoryFrame>
);

export const StoryKoran = () => <FeatureStory s={SLIDES.koran} />;
export const StoryHasil = () => <FeatureStory s={SLIDES.hasil} />;
export const StoryPsikotes = () => <FeatureStory s={SLIDES.psikotes} />;
export const StoryBahas = () => <FeatureStory s={SLIDES.bahas} />;
export const StoryInterview = () => <FeatureStory s={SLIDES.interview} />;
export const StoryPanduan = () => <FeatureStory s={SLIDES.panduan} />;
export const StoryDokumen = () => <FeatureStory s={SLIDES.dokumen} />;
export const StoryLoker = () => <FeatureStory s={SLIDES.loker} />;
export const StoryRencana = () => <FeatureStory s={SLIDES.rencana} />;

/* Highlight cover: icon centered inside the circle crop (1080x1920, circle ≈ central 640px) */
export const CoverIsiApp: React.FC = () => (
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
      }}
    >
      <svg width="270" height="270" viewBox="0 0 24 24" fill="none" stroke={C.redInk} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" />
        <path d="M10.5 5h3" />
        <path d="M9.4 12.4l2 2 3.4-3.8" strokeWidth={2} />
      </svg>
    </div>
    <div style={{ position: "absolute", top: 1300, fontFamily: mono, fontWeight: 800, fontSize: 1, color: "transparent" }}>.</div>
  </AbsoluteFill>
);
