import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, mono } from "../theme";
import { Background, Check, Logo, Overlay, Phone } from "../common";

// Carousel ad cards, 1080x1080 (1:1). 6 cards: hook → 4 features → offer.
const TOTAL = 6;

const Card: React.FC<{ n: number; children: React.ReactNode; swipe?: boolean }> = ({ n, children, swipe = true }) => (
  <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
    <Background />
    {children}
    {/* step dots */}
    <div style={{ position: "absolute", left: 60, bottom: 50, display: "flex", gap: 10, alignItems: "center" }}>
      {Array.from({ length: TOTAL }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i + 1 === n ? 46 : 14,
            height: 14,
            borderRadius: 999,
            background: i + 1 === n ? C.red : "rgba(245,245,246,0.25)",
          }}
        />
      ))}
    </div>
    {swipe ? (
      <div
        style={{
          position: "absolute",
          right: 0,
          bottom: 30,
          background: C.red,
          color: C.redInk,
          borderRadius: "999px 0 0 999px",
          padding: "16px 26px 16px 32px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontFamily: body,
          fontWeight: 800,
          fontSize: 30,
          boxShadow: "0 0 40px rgba(255,59,71,0.55)",
        }}
      >
        Geser
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={C.redInk} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </div>
    ) : null}
    <Overlay />
  </AbsoluteFill>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: body, fontWeight: 800, fontSize: 28, letterSpacing: 6, color: C.red }}>{children}</div>
);

const Title: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 80 }) => (
  <div style={{ fontFamily: display, fontWeight: 800, fontSize: size, lineHeight: 1, letterSpacing: -2.5, color: C.fg, marginTop: 14 }}>
    {children}
  </div>
);

const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: body, fontWeight: 600, fontSize: 32, lineHeight: 1.4, color: "#d4d4da", marginTop: 26 }}>{children}</div>
);

const Mark: React.FC<{ left: number; top: number; width: number; height: number }> = ({ left, top, width, height }) => (
  <div
    style={{
      position: "absolute",
      left: `${left}%`,
      top: `${top}%`,
      width: `${width}%`,
      height: `${height}%`,
      borderRadius: 22,
      border: `5px solid ${C.red}`,
      boxShadow: "0 0 34px rgba(255,59,71,0.75)",
    }}
  />
);

/** Phone bleeding off the bottom edge on the right */
const SidePhone: React.FC<{ src: string; top?: number; children?: React.ReactNode }> = ({ src, top = 150, children }) => (
  <div style={{ position: "absolute", right: 70, top, rotate: "4deg" }}>
    <Phone src={src} width={370}>
      {children}
    </Phone>
  </div>
);

const LEFT: React.CSSProperties = { position: "absolute", left: 60, top: 90, width: 530 };

/* 1 — Hook */
export const Car1Hook: React.FC = () => (
  <Card n={1}>
    <div style={{ position: "absolute", left: 60, right: 60, top: 90 }}>
      <Eyebrow>LULUSAN SMA/SMK</Eyebrow>
      <Title size={104}>
        Besok tes pabrik,
        <br />
        <span style={{ color: C.red }}>malam ini latihan apa?</span>
      </Title>
    </div>
    <div style={{ position: "absolute", left: 60, top: 520, width: 640 }}>
      {["Tes koran per lajur", "150 soal psikotes + pembahasan", "40 jawaban interview HRD"].map((t) => (
        <div key={t} style={{ display: "flex", alignItems: "center", gap: 18, fontFamily: body, fontWeight: 800, fontSize: 40, color: C.fg, marginBottom: 22 }}>
          <Check size={44} /> {t}
        </div>
      ))}
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 32, color: C.mute, marginTop: 20 }}>Semua latihan di satu app, langsung di HP.</div>
    </div>
    <div style={{ position: "absolute", right: -40, top: 470, rotate: "10deg", opacity: 0.9 }}>
      <Phone src="shots/01-beranda.png" width={300} />
    </div>
  </Card>
);

/* 2 — Tes koran */
export const Car2Koran: React.FC = () => (
  <Card n={2}>
    <div style={LEFT}>
      <Eyebrow>01 · TES KORAN</Eyebrow>
      <Title>
        Simulasi tes koran <span style={{ color: C.red }}>per lajur.</span>
      </Title>
      <Text>Jumlahkan dua angka, tulis angka belakangnya. Waktu jalan per lajur, persis kayak di kertas.</Text>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 30 }}>
        <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 30, color: C.fg }}>Sprint 1 menit · 4 lajur</div>
        <div style={{ fontFamily: mono, fontWeight: 800, fontSize: 30, color: C.fg }}>Ketahanan 5 menit · 10 lajur</div>
      </div>
    </div>
    <SidePhone src="shots/11-koran-jalan.png">
      <Mark left={27} top={25} width={22} height={16} />
    </SidePhone>
  </Card>
);

/* 3 — Grafik per lajur */
export const Car3Grafik: React.FC = () => (
  <Card n={3}>
    <div style={LEFT}>
      <Eyebrow>02 · HASIL & GRAFIK</Eyebrow>
      <Title>
        Tahu ritmemu <span style={{ color: C.red }}>drop</span> di lajur mana.
      </Title>
      <Text>Habis latihan langsung keluar jawaban per menit, ketelitian, dan grafik kerja per lajur.</Text>
      <div
        style={{
          marginTop: 28,
          padding: "20px 24px",
          borderRadius: 24,
          background: "rgba(23,23,26,0.95)",
          borderLeft: `8px solid ${C.red}`,
          fontFamily: body,
          fontWeight: 600,
          fontSize: 27,
          lineHeight: 1.38,
          color: "#d4d4da",
        }}
      >
        “Jumlahmu turun di lajur akhir. Latih ketahanan supaya ritmenya bertahan sampai selesai.”
      </div>
    </div>
    <SidePhone src="shots/20-koran-hasil-drop.png" top={110}>
      <Mark left={6} top={50} width={90} height={17} />
    </SidePhone>
  </Card>
);

/* 4 — Psikotes */
export const Car4Psikotes: React.FC = () => (
  <Card n={4}>
    <div style={LEFT}>
      <Eyebrow>03 · PSIKOTES</Eyebrow>
      <Title>
        <span style={{ color: C.red }}>150 soal</span> lengkap dengan pembahasan.
      </Title>
      <Text>5 set: hitung dasar, deret angka, logika, pengetahuan umum, dan K3. Bisa latihan santai atau simulasi pakai timer.</Text>
      <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
        {["5 set × 30 soal", "Kunci + pembahasan"].map((t) => (
          <div
            key={t}
            style={{
              padding: "12px 22px",
              borderRadius: 999,
              border: `2px solid ${C.line}`,
              background: "rgba(23,23,26,0.92)",
              fontFamily: body,
              fontWeight: 800,
              fontSize: 26,
              color: C.fg,
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
    <SidePhone src="shots/09-soal-jawab.png" top={60}>
      <Mark left={4} top={75.5} width={92} height={6.5} />
    </SidePhone>
  </Card>
);

/* 5 — Interview */
export const Car5Interview: React.FC = () => (
  <Card n={5}>
    <div style={LEFT}>
      <Eyebrow>04 · INTERVIEW HRD</Eyebrow>
      <Title>
        <span style={{ color: C.red }}>40 pertanyaan</span> HRD + contoh jawaban.
      </Title>
      <Text>Tiap kartu ada maksud HRD, contoh jawaban, dan hal yang harus dihindari. Termasuk soal shift, lembur, dan gaji.</Text>
    </div>
    <SidePhone src="shots/22-interview-jawaban.png" top={60}>
      <Mark left={4} top={59.5} width={92} height={21.5} />
    </SidePhone>
  </Card>
);

/* 6 — Offer */
export const Car6Offer: React.FC = () => (
  <Card n={6} swipe={false}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 80, display: "flex", justifyContent: "center" }}>
      <Logo size={80} />
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 220, textAlign: "center" }}>
      <div style={{ fontFamily: body, fontWeight: 800, fontSize: 40, color: C.mute }}>Sekali bayar</div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 200, letterSpacing: -7, lineHeight: 1, color: C.fg, textShadow: "0 0 70px rgba(255,59,71,0.45)" }}>
        <span style={{ fontSize: 96, color: C.red, verticalAlign: "top", marginRight: 8 }}>Rp</span>49.000
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 520, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      {["Tes koran + 150 soal psikotes + 40 kartu HRD", "Bisa dipasang di HP, jalan tanpa kuota", "Bonus panduan PDF 120 halaman", "Garansi 7 hari"].map((t) => (
        <div
          key={t}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 28px",
            borderRadius: 999,
            border: `2px solid ${C.line}`,
            background: "rgba(23,23,26,0.92)",
            fontFamily: body,
            fontWeight: 800,
            fontSize: 32,
            color: C.fg,
          }}
        >
          <Check size={32} /> {t}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 870, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: C.red,
          color: C.redInk,
          fontFamily: body,
          fontWeight: 800,
          fontSize: 44,
          padding: "22px 60px",
          borderRadius: 999,
          boxShadow: "0 0 60px rgba(255,59,71,0.6)",
        }}
      >
        Ambil kit sekarang
      </div>
    </div>
  </Card>
);
