import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, mono } from "../theme";
import { Background, Logo, Overlay, Phone } from "../common";

// Video thumbnails / covers, 1080x1920. Key content stays inside the 4:5 safe area
// (y ≈ 285–1635) so it survives the Feed crop.

const Thumb: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
    <Background />
    {children}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1520, display: "flex", justifyContent: "center" }}>
      <Logo size={64} />
    </div>
    <Overlay />
  </AbsoluteFill>
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
      border: `6px solid ${C.red}`,
      boxShadow: "0 0 40px rgba(255,59,71,0.8)",
    }}
  />
);

const Stamp: React.FC<{ children: React.ReactNode; rotate?: number; style?: React.CSSProperties }> = ({ children, rotate = -5, style }) => (
  <div
    style={{
      display: "inline-block",
      border: `10px solid ${C.red}`,
      borderRadius: 28,
      padding: "6px 30px 14px",
      fontFamily: display,
      fontWeight: 800,
      color: C.red,
      rotate: `${rotate}deg`,
      background: "rgba(11,11,12,0.85)",
      boxShadow: "0 0 70px rgba(255,59,71,0.5)",
      textShadow: "0 0 40px rgba(255,59,71,0.6)",
      ...style,
    }}
  >
    {children}
  </div>
);

/* Hook 1 — Lulusan SMK, panggilan tes */
export const Thumb1: React.FC = () => (
  <Thumb>
    <div style={{ position: "absolute", left: 70, right: 70, top: 300 }}>
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          padding: "22px 26px",
          borderRadius: 34,
          background: "rgba(30,30,34,0.95)",
          border: `2px solid ${C.line}`,
          width: 760,
        }}
      >
        <div style={{ width: 70, height: 70, borderRadius: 20, background: "#25D366", flexShrink: 0 }} />
        <div style={{ fontFamily: body, color: C.fg }}>
          <div style={{ fontSize: 28, fontWeight: 800 }}>HRD Rekrutmen</div>
          <div style={{ fontSize: 30, fontWeight: 500, color: "#dcdce0" }}>
            Anda diundang <b style={{ color: C.fg }}>tes seleksi</b> besok 07.00
          </div>
        </div>
      </div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 150, lineHeight: 0.95, letterSpacing: -5, color: C.fg, marginTop: 50 }}>
        Lulusan{" "}
        <span style={{ background: C.red, color: C.redInk, padding: "0 22px", borderRadius: 24, display: "inline-block", rotate: "-3deg" }}>SMK?</span>
      </div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 104, lineHeight: 1, letterSpacing: -3, color: C.fg, marginTop: 24 }}>
        Besok tes <span style={{ color: C.red }}>pabrik?</span>
      </div>
      <div style={{ marginTop: 50 }}>
        <Stamp style={{ fontSize: 64 }}>Tonton sebelum tes!</Stamp>
      </div>
    </div>
    <div style={{ position: "absolute", right: -70, top: 900, rotate: "10deg" }}>
      <Phone src="shots/11-koran-jalan.png" width={330} />
    </div>
  </Thumb>
);

/* Hook 7 — Mengapa kami harus memilih Anda? */
export const Thumb7: React.FC = () => (
  <Thumb>
    <div style={{ position: "absolute", left: 70, right: 70, top: 300 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: mono, fontWeight: 800, fontSize: 34, color: C.mute }}>
        <span style={{ width: 24, height: 24, borderRadius: "50%", background: C.red, boxShadow: "0 0 16px rgba(255,59,71,0.9)" }} />
        REC · INTERVIEW HRD
      </div>
      <div
        style={{
          marginTop: 26,
          padding: "40px 44px",
          borderRadius: "54px 54px 54px 14px",
          background: C.fg,
          color: C.bg,
          fontFamily: display,
          fontWeight: 800,
          fontSize: 104,
          lineHeight: 1,
          letterSpacing: -3.5,
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 80px rgba(255,59,71,0.35)",
        }}
      >
        “Mengapa kami harus <span style={{ color: "#D7111D" }}>memilih Anda?</span>”
      </div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 120, letterSpacing: -4, color: C.red, marginTop: 40, lineHeight: 1, textShadow: "0 0 60px rgba(255,59,71,0.6)" }}>
        Kamu jawab apa?
      </div>
    </div>
    <div style={{ position: "absolute", right: 60, top: 1060, rotate: "5deg" }}>
      <Phone src="shots/22-interview-jawaban.png" width={250}>
        <Mark left={4} top={59.5} width={92} height={21.5} />
      </Phone>
    </div>
    <div style={{ position: "absolute", left: 70, top: 1120, width: 560 }}>
      <Stamp rotate={-4} style={{ fontSize: 50, whiteSpace: "nowrap" }}>
        Jangan jawab asal!
      </Stamp>
      <div style={{ fontFamily: body, fontWeight: 700, fontSize: 40, color: "#d4d4da", marginTop: 34, lineHeight: 1.3 }}>
        Ini contoh jawaban yang dicari HRD 👉
      </div>
    </div>
  </Thumb>
);

/* Hook 12 — Ngebut di awal = gugur */
export const Thumb12: React.FC = () => (
  <Thumb>
    <div style={{ position: "absolute", left: 70, right: 70, top: 300 }}>
      <div style={{ fontFamily: body, fontWeight: 800, fontSize: 36, letterSpacing: 7, color: C.red }}>TES KORAN</div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 170, lineHeight: 0.92, letterSpacing: -6, color: C.fg, marginTop: 14, fontStyle: "italic" }}>
        NGEBUT
      </div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 96, lineHeight: 1, letterSpacing: -3, color: C.fg, marginTop: 8 }}>di awal?</div>
      <div style={{ marginTop: 36 }}>
        <Stamp style={{ fontSize: 130, letterSpacing: -3 }}>GUGUR.</Stamp>
      </div>
    </div>
    <div style={{ position: "absolute", right: 60, top: 820, rotate: "6deg" }}>
      <Phone src="shots/20-koran-hasil-drop.png" width={300}>
        <Mark left={6} top={50} width={90} height={17} />
      </Phone>
    </div>
    <div style={{ position: "absolute", left: 70, top: 1180, width: 520 }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 58, lineHeight: 1.05, letterSpacing: -1.5, color: C.fg }}>
        Ini yang <span style={{ color: C.red }}>dinilai</span> penguji
      </div>
      <div style={{ fontFamily: body, fontWeight: 700, fontSize: 38, color: C.mute, marginTop: 14 }}>Bukan cepatnya.</div>
    </div>
  </Thumb>
);

/* Hook 13 — Challenge deret */
export const Thumb13: React.FC = () => (
  <Thumb>
    <div style={{ position: "absolute", left: 70, right: 70, top: 300, textAlign: "center" }}>
      <div style={{ fontFamily: body, fontWeight: 800, fontSize: 36, letterSpacing: 7, color: C.red }}>SOAL PSIKOTES PABRIK</div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 120, lineHeight: 1, letterSpacing: -4, color: C.fg, marginTop: 16 }}>
        Bisa jawab <span style={{ color: C.red, whiteSpace: "nowrap" }}>5 detik?</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 620, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
      {["2", "4", "8", "16", "32", "?"].map((v) => (
        <div
          key={v}
          style={{
            height: 190,
            borderRadius: 40,
            background: v === "?" ? "rgba(255,59,71,0.14)" : C.surface,
            border: `5px solid ${v === "?" ? C.red : C.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: display,
            fontWeight: 800,
            fontSize: 140,
            color: v === "?" ? C.red : C.fg,
            boxShadow: v === "?" ? "0 0 70px rgba(255,59,71,0.6)" : "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          {v}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1110, display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
      <div style={{ width: 190, height: 190, position: "relative" }}>
        <svg width="190" height="190" viewBox="0 0 190 190">
          <circle cx="95" cy="95" r="80" stroke={C.line} strokeWidth="14" fill="rgba(23,23,26,0.9)" />
          <circle
            cx="95"
            cy="95"
            r="80"
            stroke={C.red}
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 80}
            strokeDashoffset={2 * Math.PI * 80 * 0.4}
            transform="rotate(-90 95 95)"
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: mono, fontWeight: 800, fontSize: 96, color: C.red }}>
          3
        </div>
      </div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 62, lineHeight: 1.05, letterSpacing: -1.5, color: C.fg }}>
        Jawabannya
        <br />
        <span style={{ color: C.red }}>di video 👇</span>
      </div>
    </div>
  </Thumb>
);
