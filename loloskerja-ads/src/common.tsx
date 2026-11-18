import React from "react";
import { AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig, random } from "remotion";
import { Audio } from "@remotion/media";
import { C, body, display, prog, snap, f } from "./theme";

/** Current time in seconds, relative to the enclosing Sequence */
export const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

/** Animated dark background with red glow, grain and vignette */
export const Background: React.FC<{ flash?: number }> = ({ flash = 0 }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const gx = 50 + Math.sin(t * 0.7) * 18;
  const gy = 30 + Math.cos(t * 0.5) * 12;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,59,71,0.28), rgba(255,59,71,0) 55%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${100 - gx}% ${85 - gy / 3}%, rgba(255,59,71,0.14), rgba(255,59,71,0) 50%)`,
        }}
      />
      {/* subtle grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          backgroundPosition: `0px ${(t * 40) % 90}px`,
          maskImage: "radial-gradient(circle at 50% 45%, black 20%, transparent 75%)",
        }}
      />
      <AbsoluteFill style={{ backgroundColor: C.red, opacity: flash }} />
    </AbsoluteFill>
  );
};

/** Film grain + vignette on top of everything */
export const Overlay: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = frame % 8;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.65) 100%)" }}
      />
      <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.09, mixBlendMode: "overlay" }}>
        <filter id={`n${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#n${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Screen shake offset, decaying from `at` over `dur` seconds */
export const shake = (t: number, at: number, dur = 0.45, amp = 26) => {
  if (t < at || t > at + dur) return "0px 0px";
  const k = 1 - (t - at) / dur;
  const i = Math.floor(t * 60);
  return `${(random(`x${i}`) - 0.5) * 2 * amp * k}px ${(random(`y${i}`) - 0.5) * 2 * amp * k}px`;
};

/** A word that slams in at time `at` */
export const Slam: React.FC<{
  at: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  from?: number;
}> = ({ at, children, style, from = 1.8 }) => {
  const t = useT();
  const p = prog(t, at, at + 0.28, snap);
  const o = prog(t, at, at + 0.12);
  return (
    <span
      style={{
        display: "inline-block",
        opacity: o,
        scale: String(from + (1 - from) * p),
        filter: `blur(${(1 - o) * 14}px)`,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

/** A word that rises in at time `at` */
export const Rise: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties; dist?: number }> = ({
  at,
  children,
  style,
  dist = 50,
}) => {
  const t = useT();
  const p = prog(t, at, at + 0.4);
  return (
    <span
      style={{
        display: "inline-block",
        opacity: prog(t, at, at + 0.18),
        translate: `0px ${(1 - p) * dist}px`,
        ...style,
      }}
    >
      {children}
    </span>
  );
};

/** Scene wrapper: quick zoom-blur in and out */
export const SceneFade: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const t = useT();
  const i = prog(t, 0, 0.25);
  const o = prog(t, dur - 0.2, dur);
  return (
    <AbsoluteFill
      style={{
        opacity: Math.min(i, 1 - o),
        scale: String(1 + (1 - i) * 0.08 - o * 0.06),
        filter: `blur(${(1 - i) * 10 + o * 12}px)`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** iPhone-like frame around an app screenshot */
export const Phone: React.FC<{ src: string; width: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  src,
  width,
  style,
  children,
}) => {
  const h = width * (1688 / 780);
  const pad = width * 0.035;
  return (
    <div
      style={{
        width: width + pad * 2,
        height: h + pad * 2,
        borderRadius: width * 0.14,
        background: "linear-gradient(145deg,#3a3a40,#121214 40%,#2a2a2e)",
        padding: pad,
        boxShadow: "0 60px 120px rgba(0,0,0,0.7), 0 0 90px rgba(255,59,71,0.25), inset 0 0 0 2px rgba(255,255,255,0.08)",
        position: "relative",
        ...style,
      }}
    >
      <div style={{ width, height: h, borderRadius: width * 0.115, overflow: "hidden", position: "relative" }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", display: "block" }} />
        {children}
      </div>
    </div>
  );
};

/** Pill caption */
export const Chip: React.FC<{ at: number; children: React.ReactNode; red?: boolean; style?: React.CSSProperties }> = ({
  at,
  children,
  red,
  style,
}) => {
  const t = useT();
  const p = prog(t, at, at + 0.35, snap);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 34px",
        borderRadius: 999,
        fontFamily: body,
        fontWeight: 800,
        fontSize: 46,
        color: red ? C.redInk : C.fg,
        background: red ? C.red : "rgba(23,23,26,0.92)",
        border: red ? "none" : `2px solid ${C.line}`,
        boxShadow: red ? "0 0 50px rgba(255,59,71,0.55)" : "0 20px 40px rgba(0,0,0,0.4)",
        opacity: prog(t, at, at + 0.15),
        scale: String(0.6 + 0.4 * p),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Check: React.FC<{ size?: number; color?: string }> = ({ size = 40, color = C.ok }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

/** Logo: red circle with check + wordmark */
export const Logo: React.FC<{ size?: number; draw?: number }> = ({ size = 120, draw = 1 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.28 }}>
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: C.red,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 60px rgba(255,59,71,0.6)",
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke={C.redInk} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" strokeDasharray={24} strokeDashoffset={24 * (1 - draw)} />
      </svg>
    </div>
    <span style={{ fontFamily: display, fontWeight: 800, fontSize: size * 0.82, color: C.fg, letterSpacing: -size * 0.02 }}>
      loloskerja
    </span>
  </div>
);

/** One-shot sound effect at time (seconds, relative to parent) */
export const Sfx: React.FC<{ at: number; src: string; volume?: number }> = ({ at, src, volume = 0.6 }) => (
  <Sequence from={f(at)} layout="none">
    <Audio src={staticFile(`sfx/${src}.wav`)} volume={volume} />
  </Sequence>
);
