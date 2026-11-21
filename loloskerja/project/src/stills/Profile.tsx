import React from "react";
import { AbsoluteFill } from "remotion";
import { C, display } from "../theme";

// Instagram profile pictures, 1080x1080. IG crops to a circle, so everything
// important stays inside the central circle (radius ≈ 440px).

const Check: React.FC<{ size: number; color: string; stroke?: number }> = ({ size, color, stroke = 3.4 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/* 1 — Dark brand look: red check badge with glow */
export const ProfileDark: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,59,71,0.38), rgba(255,59,71,0) 58%)" }} />
    <AbsoluteFill
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage: "radial-gradient(circle at 50% 50%, black 25%, transparent 70%)",
      }}
    />
    <div
      style={{
        width: 620,
        height: 620,
        borderRadius: "50%",
        background: C.red,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 140px rgba(255,59,71,0.7), inset 0 -20px 60px rgba(120,0,10,0.35)",
      }}
    >
      <Check size={360} color={C.redInk} stroke={3.6} />
    </div>
  </AbsoluteFill>
);

/* 2 — Solid red: maximum contrast in tiny sizes */
export const ProfileRed: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.red, justifyContent: "center", alignItems: "center" }}>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.18), rgba(255,255,255,0) 55%)" }} />
    <div
      style={{
        width: 620,
        height: 620,
        borderRadius: "50%",
        background: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 30px 80px rgba(80,0,8,0.45)",
      }}
    >
      <Check size={360} color={C.red} stroke={3.6} />
    </div>
  </AbsoluteFill>
);

/* 3 — Monogram "LK" with check as the dot: reads as a brand even without the wordmark */
export const ProfileMono: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg, justifyContent: "center", alignItems: "center" }}>
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,59,71,0.30), rgba(255,59,71,0) 60%)" }} />
    <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 470, letterSpacing: -22, color: C.fg, lineHeight: 0.9, marginTop: -20 }}>
        L<span style={{ color: C.red }}>K</span>
      </div>
      <div
        style={{
          position: "absolute",
          right: -62,
          top: -34,
          width: 190,
          height: 190,
          borderRadius: "50%",
          background: C.red,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 70px rgba(255,59,71,0.7)",
          border: `10px solid ${C.bg}`,
        }}
      >
        <Check size={110} color={C.redInk} stroke={3.8} />
      </div>
    </div>
  </AbsoluteFill>
);
