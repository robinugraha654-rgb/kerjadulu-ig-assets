import React from "react";
import { AbsoluteFill, random } from "remotion";
import { C, body, display, mono, prog, snap } from "../theme";
import { Background, Rise, Sfx, shake, useT } from "../common";

// VO: "Banyak yang gugur bukan karena nggak pintar, tapi karena kaget sama soalnya."
export const S2_DUR = 4.65;

const FlyingBits: React.FC<{ start: number }> = ({ start }) => {
  const t = useT();
  const items = ["7", "3", "+", "9", "?", "4", "8", "?", "2", "6", "5", "?", "1", "×", "0", "?"];
  return (
    <AbsoluteFill style={{ perspective: 900, overflow: "hidden" }}>
      {items.map((ch, i) => {
        const delay = random(`d${i}`) * 1.2;
        const life = 1.3;
        const local = (t - start - delay) / life;
        if (local < 0 || local > 1) return null;
        const ang = random(`a${i}`) * Math.PI * 2;
        const r = 120 + local * 900;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 540 + Math.cos(ang) * r - 40,
              top: 960 + Math.sin(ang) * r * 1.4 - 60,
              fontFamily: mono,
              fontWeight: 800,
              fontSize: 70 + local * 170,
              color: ch === "?" ? C.red : "rgba(245,245,246,0.5)",
              opacity: Math.sin(local * Math.PI) * 0.9,
              filter: `blur(${local * 4}px)`,
            }}
          >
            {ch}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const S2Problem: React.FC = () => {
  const t = useT();
  const strike = prog(t, 2.35, 2.6);
  const phaseB = prog(t, 2.75, 3.05);
  const kaget = prog(t, 3.35, 3.6, snap);
  const jitter = t > 3.4 ? `${(random(`j${Math.floor(t * 30)}`) - 0.5) * 14}px ${(random(`k${Math.floor(t * 30)}`) - 0.5) * 14}px` : "0px 0px";
  return (
    <AbsoluteFill style={{ translate: shake(t, 0.6, 0.4, 22) }}>
      <Background flash={Math.max(0, 1 - Math.abs(t - 3.39) / 0.1) * 0.35} />
      <FlyingBits start={3.3} />

      {/* Phase A */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          opacity: 1 - phaseB,
          translate: `0px ${-phaseB * 220}px`,
          filter: `blur(${phaseB * 12}px)`,
        }}
      >
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 70, color: C.mute }}>
          <Rise at={0.06}>Banyak</Rise> <Rise at={0.38}>yang</Rise>
        </div>
        <div style={{ display: "flex", marginTop: 10 }}>
          {"GUGUR".split("").map((ch, i) => {
            const at = 0.55 + i * 0.05;
            const p = prog(t, at, at + 0.35, snap);
            return (
              <span
                key={i}
                style={{
                  fontFamily: display,
                  fontWeight: 800,
                  fontSize: 250,
                  color: C.red,
                  letterSpacing: -6,
                  lineHeight: 1,
                  display: "inline-block",
                  opacity: prog(t, at, at + 0.1),
                  translate: `0px ${(1 - p) * -400}px`,
                  rotate: `${(1 - p) * (i % 2 ? 25 : -25) + (i % 2 ? 4 : -4)}deg`,
                  textShadow: "0 0 70px rgba(255,59,71,0.55)",
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 72, color: C.fg, marginTop: 70, position: "relative" }}>
          <Rise at={1.27}>bukan</Rise> <Rise at={1.55}>karena</Rise> <Rise at={1.75}>nggak</Rise>{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            <Rise at={1.97}>pintar</Rise>
            <span
              style={{
                position: "absolute",
                left: -10,
                top: "52%",
                height: 14,
                width: `${strike * 110}%`,
                background: C.red,
                borderRadius: 8,
                rotate: "-4deg",
                boxShadow: "0 0 24px rgba(255,59,71,0.8)",
              }}
            />
          </span>
        </div>
      </AbsoluteFill>

      {/* Phase B */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", opacity: phaseB }}>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 72, color: C.mute }}>
          <Rise at={2.83}>tapi</Rise> <Rise at={3.03}>karena</Rise>
        </div>
        <div
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 290,
            letterSpacing: -10,
            color: C.fg,
            lineHeight: 1,
            marginTop: 10,
            opacity: prog(t, 3.35, 3.45),
            scale: String(2.2 - 1.2 * kaget),
            translate: jitter,
            textShadow: `${-8}px 0 0 rgba(255,59,71,0.85), 8px 0 0 rgba(80,200,255,0.35)`,
          }}
        >
          KAGET
        </div>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 76, color: C.fg, marginTop: 40 }}>
          <Rise at={3.77}>sama</Rise>{" "}
          <Rise at={3.99} style={{ background: C.red, color: C.redInk, padding: "4px 24px", borderRadius: 18 }}>
            soalnya.
          </Rise>
        </div>
      </AbsoluteFill>

      <Sfx at={0.55} src="impact" volume={0.6} />
      <Sfx at={2.35} src="whoosh" volume={0.35} />
      <Sfx at={3.35} src="impact" volume={0.7} />
      <Sfx at={3.36} src="glitch" volume={0.45} />
      <Sfx at={4.45} src="whoosh" volume={0.45} />
    </AbsoluteFill>
  );
};
