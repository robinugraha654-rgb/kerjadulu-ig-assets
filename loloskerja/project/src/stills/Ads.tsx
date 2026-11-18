import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, mono } from "../theme";
import { Background, Check, Logo, Overlay, Phone } from "../common";

// Static single-image ads, 1080x1350 (4:5 feed). Same look as the video ads.

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Background />
    {children}
    <Overlay />
  </AbsoluteFill>
);

const Footer: React.FC<{ note?: string }> = ({ note = "Sekali bayar · jalan tanpa kuota" }) => (
  <div
    style={{
      position: "absolute",
      left: 60,
      right: 60,
      bottom: 54,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Logo size={64} />
    <div style={{ textAlign: "right" }}>
      <div
        style={{
          display: "inline-block",
          background: C.red,
          color: C.redInk,
          fontFamily: display,
          fontWeight: 800,
          fontSize: 50,
          padding: "8px 30px",
          borderRadius: 999,
          boxShadow: "0 0 40px rgba(255,59,71,0.55)",
        }}
      >
        Rp49.000
      </div>
      <div style={{ fontFamily: body, fontWeight: 700, fontSize: 26, color: C.mute, marginTop: 8 }}>{note}</div>
    </div>
  </div>
);

const Pill: React.FC<{ children: React.ReactNode; red?: boolean; size?: number }> = ({ children, red, size = 34 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 24px",
      borderRadius: 999,
      fontFamily: body,
      fontWeight: 800,
      fontSize: size,
      color: red ? C.redInk : C.fg,
      background: red ? C.red : "rgba(23,23,26,0.92)",
      border: red ? "none" : `2px solid ${C.line}`,
    }}
  >
    {children}
  </div>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: body, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: C.red }}>{children}</div>
);

/* 1 — Lulusan SMK, ada panggilan tes */
export const AdPanggilan: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 70, top: 80, width: 640 }}>
      <Eyebrow>LULUSAN SMA/SMK</Eyebrow>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 90, lineHeight: 0.98, letterSpacing: -3, color: C.fg, marginTop: 16 }}>
        Minggu ini ada <span style={{ color: C.red }}>panggilan tes pabrik?</span>
      </div>
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 38, lineHeight: 1.35, color: "#d4d4da", marginTop: 30 }}>
        Latihan dulu malam ini, biar besok nggak kaget sama soalnya.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 40, alignItems: "flex-start" }}>
        <Pill>
          <Check size={30} /> Simulasi tes koran
        </Pill>
        <Pill>
          <Check size={30} /> 150 soal psikotes
        </Pill>
        <Pill>
          <Check size={30} /> 40 jawaban interview HRD
        </Pill>
      </div>
    </div>
    <div style={{ position: "absolute", right: -110, top: 170, rotate: "8deg" }}>
      <Phone src="shots/11-koran-jalan.png" width={400} />
    </div>
    <Footer />
  </Frame>
);

/** Red highlight box drawn on top of a phone screenshot (percentages of the screen) */
const Mark: React.FC<{ left: number; top: number; width: number; height: number; color?: string }> = ({
  left,
  top,
  width,
  height,
  color = C.red,
}) => (
  <div
    style={{
      position: "absolute",
      left: `${left}%`,
      top: `${top}%`,
      width: `${width}%`,
      height: `${height}%`,
      borderRadius: 22,
      border: `5px solid ${color}`,
      boxShadow: `0 0 34px ${color === C.red ? "rgba(255,59,71,0.75)" : "rgba(61,220,151,0.6)"}`,
    }}
  />
);

/* 2 — Mengapa kami harus memilih Anda? */
export const AdHRD: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 60, top: 70, width: 560 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: mono, fontWeight: 800, fontSize: 28, color: C.mute }}>
        <span style={{ width: 20, height: 20, borderRadius: "50%", background: C.red, boxShadow: "0 0 14px rgba(255,59,71,0.9)" }} />
        INTERVIEW HRD
      </div>
      <div
        style={{
          marginTop: 24,
          padding: "34px 38px",
          borderRadius: "44px 44px 44px 12px",
          background: C.fg,
          color: C.bg,
          fontFamily: display,
          fontWeight: 800,
          fontSize: 72,
          lineHeight: 1.02,
          letterSpacing: -2.5,
          boxShadow: "0 30px 70px rgba(0,0,0,0.6), 0 0 70px rgba(255,59,71,0.3)",
        }}
      >
        “Mengapa kami harus <span style={{ color: "#D7111D" }}>memilih Anda?</span>”
      </div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 80, letterSpacing: -2.5, color: C.red, marginTop: 30, textShadow: "0 0 50px rgba(255,59,71,0.5)" }}>
        Kamu jawab apa?
      </div>
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 34, lineHeight: 1.4, color: "#d4d4da", marginTop: 26 }}>
        Di LolosKerja ada <b style={{ color: C.fg }}>40 kartu interview</b>: maksud HRD, contoh jawaban, dan yang harus dihindari.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 30, alignItems: "flex-start" }}>
        <Pill size={28}>
          <Check size={24} /> Yang dicari HRD
        </Pill>
        <Pill size={28}>
          <Check size={24} /> Contoh jawaban siap pakai
        </Pill>
      </div>
    </div>
    <div style={{ position: "absolute", right: 46, top: 150, rotate: "4deg" }}>
      <Phone src="shots/22-interview-jawaban.png" width={350}>
        <Mark left={4} top={59.5} width={92} height={21.5} />
      </Phone>
    </div>
    <Footer note="Plus 150 soal psikotes & tes koran" />
  </Frame>
);

/* 3 — Ngebut di awal tes koran (real result screen from the app) */
export const AdNgebut: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 70, right: 70, top: 80 }}>
      <Eyebrow>TES KORAN · KRAEPELIN</Eyebrow>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 96, lineHeight: 0.98, letterSpacing: -3.5, color: C.fg, marginTop: 14 }}>
        <span style={{ fontStyle: "italic" }}>Ngebut</span> di awal justru bisa bikin <span style={{ color: C.red }}>gugur.</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 70, top: 470, width: 540 }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 52, lineHeight: 1.08, letterSpacing: -1.5, color: C.fg }}>
        Penilai lihat grafik <span style={{ color: C.red, whiteSpace: "nowrap" }}>per lajur.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 30, alignItems: "flex-start" }}>
        <Pill size={30}>Tinggi di awal</Pill>
        <Pill size={30} red>
          Anjlok di akhir ↓
        </Pill>
      </div>
      <div
        style={{
          marginTop: 34,
          padding: "24px 28px",
          borderRadius: 26,
          background: "rgba(23,23,26,0.95)",
          borderLeft: `8px solid ${C.red}`,
          fontFamily: body,
          fontWeight: 600,
          fontSize: 30,
          lineHeight: 1.38,
          color: "#d4d4da",
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.red, marginBottom: 6 }}>CATATAN DARI APP</div>
        Jumlahmu turun di lajur akhir. Latih ketahanan supaya ritmenya bertahan sampai selesai.
      </div>
    </div>
    <div style={{ position: "absolute", right: 50, top: 410, rotate: "5deg" }}>
      <Phone src="shots/20-koran-hasil-drop.png" width={320}>
        <Mark left={6} top={50} width={90} height={17} />
      </Phone>
    </div>
    <Footer note="Simulasi tes koran + 150 soal psikotes" />
  </Frame>
);

/* 4 — Challenge deret (real question from the app) */
export const AdDeret: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 70, right: 70, top: 80 }}>
      <Eyebrow>PSIKOTES · DERET ANGKA</Eyebrow>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 88, lineHeight: 1, letterSpacing: -3, color: C.fg, marginTop: 14 }}>
        Bisa jawab dalam <span style={{ color: C.red, whiteSpace: "nowrap" }}>5 detik?</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 330, display: "flex", gap: 14 }}>
      {["2", "4", "8", "16", "32", "?"].map((v) => (
        <div
          key={v}
          style={{
            flex: 1,
            height: 120,
            borderRadius: 26,
            background: v === "?" ? "rgba(255,59,71,0.12)" : C.surface,
            border: `4px solid ${v === "?" ? C.red : C.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: display,
            fontWeight: 800,
            fontSize: 72,
            color: v === "?" ? C.red : C.fg,
            boxShadow: v === "?" ? "0 0 40px rgba(255,59,71,0.45)" : "none",
          }}
        >
          {v}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 70, top: 540, width: 520 }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 60, lineHeight: 1.05, letterSpacing: -2, color: C.fg }}>
        A, B, C, D, atau E?
      </div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 48, lineHeight: 1.1, letterSpacing: -1.5, color: C.red, marginTop: 18 }}>
        Tulis jawabanmu di komentar.
      </div>
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 32, lineHeight: 1.4, color: "#d4d4da", marginTop: 30 }}>
        Ini soal asli dari app. Ada <b style={{ color: C.fg }}>150 soal</b> kayak gini, lengkap dengan <b style={{ color: C.fg }}>pembahasan</b>.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28, alignItems: "flex-start" }}>
        <Pill size={28}>
          <Check size={24} /> Ada simulasi bertimer
        </Pill>
      </div>
    </div>
    <div style={{ position: "absolute", right: 50, top: 480, rotate: "5deg" }}>
      <Phone src="shots/21-soal-deret.png" width={295}>
        <Mark left={6} top={24} width={88} height={8.5} />
      </Phone>
    </div>
    <Footer />
  </Frame>
);

/* 5 — Product / offer */
export const AdKit: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center" }}>
      <Eyebrow>APP LATIHAN TES PABRIK</Eyebrow>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 84, lineHeight: 1, letterSpacing: -3, color: C.fg, marginTop: 14, padding: "0 60px" }}>
        Tes koran, psikotes &amp; interview HRD. <span style={{ color: C.red, whiteSpace: "nowrap" }}>Satu app.</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 420, height: 560 }}>
      <div style={{ position: "absolute", left: 130, top: 60, rotate: "-10deg", opacity: 0.95 }}>
        <Phone src="shots/09-soal-jawab.png" width={220} />
      </div>
      <div style={{ position: "absolute", right: 130, top: 60, rotate: "10deg", opacity: 0.95 }}>
        <Phone src="shots/03-interview.png" width={220} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 0, translate: "-50% 0px" }}>
        <Phone src="shots/11-koran-jalan.png" width={260} />
      </div>
    </div>
    <div style={{ position: "absolute", left: 40, right: 40, top: 1050, display: "flex", justifyContent: "center", gap: 12 }}>
      <Pill size={27}>
        <Check size={24} /> 150 soal + pembahasan
      </Pill>
      <Pill size={27}>
        <Check size={24} /> 40 kartu HRD
      </Pill>
      <Pill size={27}>
        <Check size={24} /> Tanpa kuota
      </Pill>
    </div>
    <Footer note="Sekali bayar · garansi 7 hari" />
  </Frame>
);
