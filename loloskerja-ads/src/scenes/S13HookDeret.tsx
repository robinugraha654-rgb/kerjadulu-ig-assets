import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, mono, prog, snap } from "../theme";
import { Background, Check, Rise, Sfx, shake, useT } from "../common";

// VO (sped up 1.1x, 1.5s countdown gap inserted):
// "Dua, empat, delapan, enam belas, tiga puluh dua, terus berapa? Jawab sebelum waktunya habis.
//  [countdown] Enam puluh empat! Dikali dua tiap langkah. Soal kayak gini sering keluar di psikotes pabrik."
// Question is the real one from the app (Set 2 · Deret Angka dan Huruf).
export const S13_DUR = 13.5;

const TILES: [string, number][] = [
  ["2", 0.09],
  ["4", 0.76],
  ["8", 1.45],
  ["16", 2.29],
  ["32", 3.18],
  ["?", 4.45],
];
const OPTS: [string, string][] = [
  ["A", "61"],
  ["B", "128"],
  ["C", "64"],
  ["D", "60"],
  ["E", "69"],
];
const CORRECT = 2;
const T_START = 5.35;
const T_END = 8.45;
const REVEAL = 8.48;

export const S13HookDeret: React.FC = () => {
  const t = useT();
  const remain = Math.max(0, 5 - ((t - T_START) / (T_END - T_START)) * 5);
  const timerOn = prog(t, T_START - 0.1, T_START + 0.2, snap);
  const urgent = t > 6.4 && t < REVEAL;
  const revealed = t >= REVEAL;
  const rv = prog(t, REVEAL, REVEAL + 0.35, snap);
  const outro = prog(t, 10.9, 11.3);

  return (
    <AbsoluteFill style={{ translate: shake(t, REVEAL, 0.35, 18) }}>
      <Background flash={urgent ? Math.max(0, Math.sin((t - 6.4) * Math.PI * 1.6)) * 0.12 : Math.max(0, 1 - Math.abs(t - REVEAL) / 0.1) * 0.2} />

      {/* header */}
      <div style={{ position: "absolute", top: 120, left: 80, right: 80, opacity: 1 - outro * 0.0 }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 36, letterSpacing: 6, color: C.red, opacity: prog(t, 0, 0.3) }}>
          PSIKOTES · DERET ANGKA
        </div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 64, color: C.fg, letterSpacing: -1.5, marginTop: 6, opacity: prog(t, 0, 0.3) }}>
          Lanjutkan deret:
        </div>
      </div>

      {/* countdown ring */}
      <div
        style={{
          position: "absolute",
          top: 90,
          right: 70,
          width: 190,
          height: 190,
          opacity: timerOn * (1 - prog(t, REVEAL + 0.2, REVEAL + 0.5)),
          scale: String((0.4 + 0.6 * timerOn) * (urgent ? 1 + Math.max(0, Math.sin((t - 6.4) * 20)) * 0.06 : 1)),
        }}
      >
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
            strokeDashoffset={2 * Math.PI * 80 * (1 - remain / 5)}
            transform="rotate(-90 95 95)"
            style={{ filter: "drop-shadow(0 0 10px rgba(255,59,71,0.9))" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: mono,
            fontWeight: 800,
            fontSize: 92,
            color: urgent ? C.red : C.fg,
          }}
        >
          {Math.ceil(remain)}
        </div>
      </div>

      {/* sequence tiles */}
      <div
        style={{
          position: "absolute",
          top: 330,
          left: 80,
          right: 80,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 26,
          scale: String(1 - outro * 0.12),
          translate: `0px ${-outro * 60}px`,
        }}
      >
        {TILES.map(([v, at], i) => {
          const p = prog(t, at, at + 0.35, snap);
          const isQ = v === "?";
          const flip = isQ ? prog(t, REVEAL, REVEAL + 0.3) : 0;
          const showAns = isQ && flip > 0.5;
          return (
            <div
              key={i}
              style={{
                height: 170,
                borderRadius: 36,
                background: isQ ? (showAns ? "rgba(61,220,151,0.15)" : "rgba(255,59,71,0.12)") : C.surface,
                border: `4px solid ${isQ ? (showAns ? C.ok : C.red) : C.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: display,
                fontWeight: 800,
                fontSize: 120,
                color: isQ ? (showAns ? C.ok : C.red) : C.fg,
                opacity: prog(t, at, at + 0.12),
                scale: String(0.4 + 0.6 * p),
                rotate: `x ${Math.sin(flip * Math.PI) * 80}deg`,
                boxShadow: isQ ? `0 0 ${showAns ? 60 : 40 + (urgent ? 30 : 0)}px ${showAns ? "rgba(61,220,151,0.5)" : "rgba(255,59,71,0.45)"}` : "0 20px 40px rgba(0,0,0,0.4)",
                position: "relative",
              }}
            >
              {showAns ? "64" : v}
              {/* ×2 badge between tiles */}
              {i < 5 && i !== 2 ? (
                <div
                  style={{
                    position: "absolute",
                    right: -36,
                    top: -22,
                    padding: "4px 14px",
                    borderRadius: 999,
                    background: C.red,
                    color: C.redInk,
                    fontFamily: mono,
                    fontWeight: 800,
                    fontSize: 30,
                    opacity: prog(t, 9.5 + i * 0.12, 9.62 + i * 0.12),
                    scale: String(0.5 + 0.5 * prog(t, 9.5 + i * 0.12, 9.8 + i * 0.12, snap)),
                    zIndex: 2,
                  }}
                >
                  ×2
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* options */}
      <div
        style={{
          position: "absolute",
          top: 760,
          left: 80,
          right: 80,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          opacity: 1 - outro,
          translate: `0px ${outro * 80}px`,
        }}
      >
        {OPTS.map(([k, v], i) => {
          const at = 4.5 + i * 0.07;
          const p = prog(t, at, at + 0.35, snap);
          const good = revealed && i === CORRECT;
          const dim = revealed && i !== CORRECT;
          return (
            <div
              key={k}
              style={{
                height: 108,
                borderRadius: 30,
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "0 30px",
                background: good ? "rgba(61,220,151,0.16)" : C.surface,
                border: `4px solid ${good ? C.ok : C.line}`,
                opacity: prog(t, at, at + 0.15) * (dim ? 0.4 : 1),
                translate: `${(1 - p) * 300}px 0px`,
                scale: String(good ? 1 + rv * 0.04 : 1),
                boxShadow: good ? `0 0 ${50 * rv}px rgba(61,220,151,0.5)` : "none",
              }}
            >
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: "50%",
                  background: good ? C.ok : "#232327",
                  color: good ? C.bg : C.mute,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: body,
                  fontWeight: 800,
                  fontSize: 34,
                }}
              >
                {k}
              </div>
              <div style={{ flex: 1, fontFamily: body, fontWeight: 700, fontSize: 52, color: C.fg }}>{v}</div>
              {good ? <Check size={56} /> : null}
            </div>
          );
        })}
      </div>

      {/* Jawab sebelum waktunya habis */}
      <div
        style={{
          position: "absolute",
          top: 1450,
          width: "100%",
          textAlign: "center",
          fontFamily: display,
          fontWeight: 800,
          fontSize: 76,
          letterSpacing: -1.5,
          color: C.fg,
          opacity: 1 - prog(t, REVEAL - 0.1, REVEAL + 0.1),
        }}
      >
        <Rise at={5.35}>Jawab</Rise> <Rise at={5.6}>sebelum</Rise>
        <br />
        <Rise at={5.82}>waktunya</Rise>{" "}
        <Rise at={6.09} style={{ color: C.red }}>
          habis!
        </Rise>
      </div>

      {/* Kunci */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1440,
          padding: "30px 40px",
          borderRadius: 30,
          background: "rgba(23,23,26,0.95)",
          borderLeft: `10px solid ${C.red}`,
          fontFamily: body,
          fontSize: 50,
          color: "#dcdce0",
          opacity: prog(t, 9.5, 9.65) * (1 - outro),
          translate: `0px ${(1 - prog(t, 9.5, 9.85, snap)) * 80}px`,
        }}
      >
        <b style={{ color: C.fg }}>Kunci: C.</b> Dikali 2 tiap langkah, jadi 32 × 2 = 64.
      </div>

      {/* outro line */}
      <div
        style={{
          position: "absolute",
          top: 1000,
          left: 70,
          right: 70,
          textAlign: "center",
          fontFamily: display,
          fontWeight: 800,
          fontSize: 100,
          letterSpacing: -3,
          lineHeight: 1.05,
          color: C.fg,
          opacity: outro,
        }}
      >
        <Rise at={11.08}>Soal</Rise> <Rise at={11.3}>kayak</Rise> <Rise at={11.52}>gini</Rise>
        <br />
        <Rise at={11.86} style={{ color: C.red }}>
          sering
        </Rise>{" "}
        <Rise at={12.1}>keluar</Rise>
        <br />
        <Rise at={12.44} style={{ fontSize: 76, color: C.mute }}>
          di psikotes pabrik.
        </Rise>
      </div>

      {TILES.map(([, at], i) => (
        <Sfx key={`t${i}`} at={at} src={i === 5 ? "impact" : "pop"} volume={i === 5 ? 0.5 : 0.4} />
      ))}
      <Sfx at={4.5} src="whoosh" volume={0.35} />
      {Array.from({ length: 5 }).map((_, i) => (
        <Sfx key={`c${i}`} at={T_START + i * ((T_END - T_START) / 5)} src={i >= 3 ? "heartbeat" : "tick"} volume={i >= 3 ? 0.8 : 0.6} />
      ))}
      <Sfx at={REVEAL} src="ding" volume={0.6} />
      <Sfx at={REVEAL} src="impact" volume={0.5} />
      <Sfx at={9.5} src="pop" volume={0.4} />
      <Sfx at={10.9} src="whoosh" volume={0.4} />
      <Sfx at={13.3} src="whoosh" volume={0.45} />
    </AbsoluteFill>
  );
};
