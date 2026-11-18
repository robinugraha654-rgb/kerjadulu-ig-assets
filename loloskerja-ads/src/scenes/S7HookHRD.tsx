import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, mono, prog, snap } from "../theme";
import { Background, Rise, Sfx, shake, useT } from "../common";

// VO (trimmed): "Mengapa kami harus memilih Anda?" … "Kamu jawab apa?" "Kalau masih mikir, kamu nggak sendirian."
export const S7_DUR = 7.1;

const Q_WORDS: [string, number][] = [
  ["Mengapa", 0.12],
  ["kami", 0.52],
  ["harus", 0.82],
  ["memilih", 1.1],
  ["Anda?", 1.52],
];

const Person: React.FC<{ size: number; color: string; glow?: boolean }> = ({ size, color, glow }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ filter: glow ? "drop-shadow(0 0 14px rgba(255,59,71,0.9))" : "none" }}>
    <circle cx="12" cy="7.5" r="4.2" fill={color} />
    <path d="M3.5 22c0-5 3.8-8.2 8.5-8.2s8.5 3.2 8.5 8.2z" fill={color} />
  </svg>
);

export const S7HookHRD: React.FC = () => {
  const t = useT();
  const bubble = prog(t, 0.0, 0.35, snap);
  const tension = prog(t, 1.9, 2.85, (x) => x);
  const beat = t > 1.95 && t < 2.9 ? Math.max(0, Math.sin((t - 1.95) * Math.PI * 2 * 1.6)) : 0;
  const phase2 = prog(t, 2.8, 3.05);
  const phase3 = prog(t, 4.3, 4.55);
  const rec = Math.floor(t * 2) % 2 === 0;
  const typed = t > 3.7 ? "eee…".slice(0, Math.min(4, Math.floor((t - 3.7) / 0.12))) : "";
  const crowd = prog(t, 5.9, 6.5);
  const exit = prog(t, S7_DUR - 0.2, S7_DUR);

  return (
    <AbsoluteFill style={{ translate: shake(t, 3.66, 0.35, 20) }}>
      <Background flash={Math.max(0, 1 - Math.abs(t - 3.66) / 0.1) * 0.3} />
      {/* darkening during the silence */}
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: tension * 0.45 * (1 - phase2) }} />

      {/* REC bar */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: mono,
          fontWeight: 800,
          fontSize: 36,
          color: C.mute,
          opacity: prog(t, 0, 0.3) * (1 - phase3),
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 26, height: 26, borderRadius: "50%", background: C.red, opacity: rec ? 1 : 0.25, boxShadow: "0 0 18px rgba(255,59,71,0.9)" }} />
          INTERVIEW HRD
        </span>
        <span>00:00:{String(Math.floor(t + 12)).padStart(2, "0")}</span>
      </div>

      {/* Phase 1: HRD asks */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          opacity: 1 - phase2,
          scale: String(1 + tension * 0.12 + beat * 0.015 - phase2 * 0.2),
          translate: `0px ${-phase2 * 200}px`,
          filter: `blur(${phase2 * 14}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 34, opacity: prog(t, 0, 0.25) }}>
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              background: C.surface,
              border: `3px solid ${C.line}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Person size={70} color={C.mute} />
          </div>
          <div style={{ fontFamily: body, fontWeight: 800, fontSize: 46, color: C.fg }}>
            HRD
            <div style={{ fontFamily: body, fontWeight: 500, fontSize: 32, color: C.mute }}>Pewawancara</div>
          </div>
        </div>
        <div
          style={{
            margin: "0 80px",
            padding: "56px 60px",
            borderRadius: "60px 60px 60px 14px",
            background: C.fg,
            color: C.bg,
            fontFamily: display,
            fontWeight: 800,
            fontSize: 112,
            lineHeight: 1.02,
            letterSpacing: -3,
            opacity: prog(t, 0, 0.15),
            scale: String(0.6 + 0.4 * bubble),
            boxShadow: `0 40px 90px rgba(0,0,0,0.6), 0 0 ${60 + beat * 80}px rgba(255,59,71,${0.25 + beat * 0.35})`,
          }}
        >
          {Q_WORDS.map(([w, at]) => (
            <React.Fragment key={w}>
              <Rise at={at} dist={30} style={w === "memilih" || w === "Anda?" ? { color: "#D7111D" } : undefined}>
                {w}
              </Rise>{" "}
            </React.Fragment>
          ))}
        </div>
        {/* empty answer box with blinking cursor */}
        <div
          style={{
            marginTop: 60,
            width: 880,
            padding: "30px 40px",
            borderRadius: 30,
            border: `3px dashed ${C.line}`,
            fontFamily: body,
            fontWeight: 700,
            fontSize: 44,
            color: C.mute,
            opacity: prog(t, 1.85, 2.1),
          }}
        >
          Jawaban kamu:{" "}
          <span style={{ display: "inline-block", width: 5, height: 50, background: C.red, verticalAlign: "middle", opacity: Math.floor(t * 3) % 2 ? 1 : 0 }} />
        </div>
      </AbsoluteFill>

      {/* Phase 2: Kamu jawab apa? */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          opacity: phase2 * (1 - phase3),
          filter: `blur(${phase3 * 14}px)`,
          scale: String(1 - phase3 * 0.15),
        }}
      >
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 200, color: C.fg, letterSpacing: -6, lineHeight: 1 }}>
          <Rise at={2.86}>Kamu</Rise>
        </div>
        <div
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 190,
            color: C.red,
            letterSpacing: -6,
            lineHeight: 1,
            textShadow: "0 0 80px rgba(255,59,71,0.6)",
            opacity: prog(t, 3.64, 3.72),
            scale: String(1.8 - 0.8 * prog(t, 3.64, 3.92, snap)),
          }}
        >
          jawab apa?
        </div>
        <div
          style={{
            marginTop: 70,
            width: 800,
            padding: "28px 40px",
            borderRadius: 30,
            background: C.surface,
            border: `2px solid ${C.line}`,
            fontFamily: body,
            fontWeight: 700,
            fontSize: 52,
            color: C.mute,
            opacity: prog(t, 3.7, 3.85),
          }}
        >
          {typed}
          <span style={{ display: "inline-block", width: 5, height: 54, background: C.red, verticalAlign: "middle", marginLeft: 6, opacity: Math.floor(t * 3) % 2 ? 1 : 0 }} />
        </div>
      </AbsoluteFill>

      {/* Phase 3: you're not alone */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", opacity: phase3 * (1 - exit) }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 76, color: C.mute }}>
          <Rise at={4.43}>Kalau</Rise> <Rise at={4.67}>masih</Rise> <Rise at={4.93}>mikir…</Rise>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 104px)", gap: 18, margin: "70px 0" }}>
          {Array.from({ length: 21 }).map((_, i) => {
            const at = 5.3 + ((i * 7) % 21) * 0.025;
            const p = prog(t, at, at + 0.3, snap);
            const me = i === 10;
            return (
              <div key={i} style={{ opacity: prog(t, at, at + 0.1), scale: String(0.3 + 0.7 * p) }}>
                <Person size={104} color={me ? C.red : `rgba(163,163,171,${0.35 + crowd * 0.4})`} glow={me} />
              </div>
            );
          })}
        </div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 104, color: C.fg, letterSpacing: -3, lineHeight: 1.05, textAlign: "center" }}>
          <Rise at={5.97}>kamu</Rise> <Rise at={6.19}>nggak</Rise>
          <br />
          <Rise at={6.33} style={{ color: C.red }}>
            sendirian.
          </Rise>
        </div>
      </AbsoluteFill>

      <Sfx at={0.0} src="pop" volume={0.45} />
      <Sfx at={1.95} src="heartbeat" volume={0.9} />
      <Sfx at={2.55} src="heartbeat" volume={0.9} />
      <Sfx at={3.64} src="impact" volume={0.7} />
      <Sfx at={3.66} src="glitch" volume={0.35} />
      {[0, 1, 2, 3].map((i) => (
        <Sfx key={i} at={3.7 + i * 0.12} src="tick" volume={0.4} />
      ))}
      <Sfx at={4.3} src="whoosh" volume={0.4} />
      <Sfx at={5.3} src="whoosh" volume={0.3} />
      <Sfx at={6.33} src="ding" volume={0.3} />
      <Sfx at={6.9} src="whoosh" volume={0.45} />
    </AbsoluteFill>
  );
};
