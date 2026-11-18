import React from "react";
import { AbsoluteFill, random } from "remotion";
import { C, body, display, mono, prog, snap } from "../theme";
import { Background, Rise, Sfx, shake, useT } from "../common";

// VO: "Ngebut di awal tes koran… justru bisa bikin kamu gugur.
//      Penilai lihat grafik per lajur. Tinggi di awal, anjlok di akhir… itu tanda ritmemu nggak stabil."
export const S12_DUR = 9.75;

const BARS = [19, 18, 18, 16, 14, 12, 10, 8, 7, 6];
const MAX = 20;

const SpeedLines: React.FC<{ strength: number }> = ({ strength }) => {
  const t = useT();
  return (
    <AbsoluteFill style={{ overflow: "hidden", opacity: strength }}>
      {Array.from({ length: 26 }).map((_, i) => {
        const y = random(`y${i}`) * 1920;
        const len = 200 + random(`l${i}`) * 500;
        const speed = 2400 + random(`s${i}`) * 2400;
        const x = 1300 - ((t * speed + random(`o${i}`) * 3000) % 3000);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: len,
              height: 4 + random(`h${i}`) * 6,
              borderRadius: 4,
              background: i % 4 === 0 ? C.red : "rgba(245,245,246,0.35)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const S12HookNgebut: React.FC = () => {
  const t = useT();
  const partA = 1 - prog(t, 3.4, 3.7);
  const gugur = prog(t, 2.72, 3.0, snap);
  const chartIn = prog(t, 3.55, 4.0, snap);
  const hiTop = prog(t, 5.44, 5.7);
  const hiLow = prog(t, 6.48, 6.75);
  const trend = prog(t, 6.55, 7.3);
  const ideal = prog(t, 8.8, 9.3);
  const msg = prog(t, 7.7, 8.1, snap);

  const chartW = 840;
  const chartH = 560;
  const bw = 60;
  const gap = (chartW - bw * BARS.length) / (BARS.length - 1);

  return (
    <AbsoluteFill style={{ translate: shake(t, 2.74, 0.45, 30) }}>
      <Background flash={Math.max(0, 1 - Math.abs(t - 2.74) / 0.1) * 0.4} />
      <SpeedLines strength={prog(t, 0, 0.2) * (1 - prog(t, 1.5, 1.9))} />

      {/* Part A: Ngebut … gugur */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          opacity: partA,
          filter: `blur(${(1 - partA) * 14}px)`,
          scale: String(1 + (1 - partA) * 0.15),
        }}
      >
        <div
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 205,
            letterSpacing: -8,
            color: C.fg,
            lineHeight: 1,
            transform: "skewX(-12deg)",
            opacity: prog(t, 0.06, 0.14),
            translate: `${(1 - prog(t, 0.06, 0.4, snap)) * 900}px 0px`,
            textShadow: "-30px 0 0 rgba(255,59,71,0.45), -60px 0 0 rgba(255,59,71,0.18)",
          }}
        >
          NGEBUT
        </div>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 76, color: C.mute, marginTop: 20 }}>
          <Rise at={0.46}>di</Rise> <Rise at={0.58}>awal</Rise>{" "}
          <Rise at={0.76} style={{ color: C.fg }}>
            tes koran…
          </Rise>
        </div>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 72, color: C.fg, marginTop: 90 }}>
          <Rise at={1.7}>justru</Rise> <Rise at={2.04}>bisa</Rise> <Rise at={2.24}>bikin</Rise> <Rise at={2.46}>kamu</Rise>
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: display,
            fontWeight: 800,
            fontSize: 220,
            letterSpacing: -6,
            lineHeight: 1,
            color: C.red,
            border: `12px solid ${C.red}`,
            borderRadius: 36,
            padding: "10px 50px 26px",
            rotate: `${-5 + (1 - gugur) * -12}deg`,
            scale: String(2.4 - 1.4 * gugur),
            opacity: prog(t, 2.72, 2.8),
            boxShadow: "0 0 90px rgba(255,59,71,0.5)",
            textShadow: "0 0 50px rgba(255,59,71,0.6)",
          }}
        >
          GUGUR.
        </div>
      </AbsoluteFill>

      {/* Part B: chart */}
      <AbsoluteFill style={{ opacity: prog(t, 3.5, 3.7) }}>
        <div style={{ position: "absolute", top: 130, width: "100%", textAlign: "center" }}>
          <div style={{ fontFamily: body, fontWeight: 800, fontSize: 40, letterSpacing: 6, color: C.red }}>
            <Rise at={3.66}>PENILAI LIHAT</Rise>
          </div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 104, letterSpacing: -3, color: C.fg, lineHeight: 1.05 }}>
            <Rise at={4.34}>grafik</Rise> <Rise at={4.66}>per</Rise>{" "}
            <Rise at={4.8} style={{ color: C.red }}>
              lajur
            </Rise>
          </div>
        </div>

        {/* chart card */}
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 440,
            width: 960,
            height: 860,
            borderRadius: 56,
            background: C.surface,
            border: `2px solid ${C.line}`,
            boxShadow: "0 50px 100px rgba(0,0,0,0.6)",
            scale: String(0.75 + 0.25 * chartIn),
            translate: `0px ${(1 - chartIn) * 200}px`,
          }}
        >
          <div style={{ position: "absolute", top: 44, left: 60, fontFamily: body, fontWeight: 800, fontSize: 32, letterSpacing: 4, color: C.mute }}>
            GRAFIK KERJA PER LAJUR
          </div>
          <div style={{ position: "absolute", top: 40, right: 60, fontFamily: mono, fontWeight: 800, fontSize: 34, color: C.mute }}>
            jawaban / lajur
          </div>

          <div style={{ position: "absolute", left: 60, top: 150, width: chartW, height: chartH }}>
            {/* baseline */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: C.line }} />
            {BARS.map((v, i) => {
              const at = 4.3 + i * 0.08;
              const g = prog(t, at, at + 0.4, snap);
              const h = (v / MAX) * chartH * g;
              const isTop = i < 3;
              const isLow = i >= 7;
              const color = isLow && hiLow > 0 ? C.red : isTop && hiTop > 0 ? C.fg : "#5a5a62";
              const glow = isLow ? hiLow : isTop ? hiTop * (1 - hiLow * 0.6) : 0;
              return (
                <div key={i}>
                  <div
                    style={{
                      position: "absolute",
                      left: i * (bw + gap),
                      bottom: 0,
                      width: bw,
                      height: h,
                      borderRadius: "16px 16px 4px 4px",
                      background: color,
                      boxShadow: glow ? `0 0 ${40 * glow}px ${isLow ? "rgba(255,59,71,0.8)" : "rgba(245,245,246,0.5)"}` : "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: i * (bw + gap),
                      width: bw,
                      bottom: -56,
                      textAlign: "center",
                      fontFamily: mono,
                      fontWeight: 700,
                      fontSize: 28,
                      color: C.mute,
                      opacity: prog(t, at, at + 0.2),
                    }}
                  >
                    {i + 1}
                  </div>
                </div>
              );
            })}

            {/* trend line from top of bar 1 to top of bar 10 */}
            <svg width={chartW} height={chartH} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
              <path
                d={`M ${bw / 2} ${chartH - (BARS[0] / MAX) * chartH - 30} L ${chartW - bw / 2} ${chartH - (BARS[9] / MAX) * chartH - 30}`}
                stroke={C.red}
                strokeWidth={10}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={900}
                strokeDashoffset={900 * (1 - trend)}
                style={{ filter: "drop-shadow(0 0 12px rgba(255,59,71,0.9))" }}
              />
              {/* ideal flat line */}
              <path
                d={`M ${bw / 2} ${chartH - (14 / MAX) * chartH} L ${chartW - bw / 2} ${chartH - (14 / MAX) * chartH}`}
                stroke={C.ok}
                strokeWidth={6}
                strokeDasharray="22 16"
                fill="none"
                opacity={ideal}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: chartH - (14 / MAX) * chartH - 66,
                fontFamily: body,
                fontWeight: 800,
                fontSize: 34,
                color: C.ok,
                opacity: ideal,
              }}
            >
              yang dicari: rata
            </div>

            {/* labels */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: -10,
                padding: "10px 24px",
                borderRadius: 999,
                background: C.fg,
                color: C.bg,
                fontFamily: body,
                fontWeight: 800,
                fontSize: 36,
                opacity: hiTop,
                scale: String(0.6 + 0.4 * prog(t, 5.44, 5.75, snap)),
              }}
            >
              tinggi di awal
            </div>
            <div
              style={{
                position: "absolute",
                right: 0,
                top: chartH - (BARS[7] / MAX) * chartH - 120,
                padding: "10px 24px",
                borderRadius: 999,
                background: C.red,
                color: C.redInk,
                fontFamily: body,
                fontWeight: 800,
                fontSize: 36,
                opacity: hiLow,
                scale: String(0.6 + 0.4 * prog(t, 6.48, 6.8, snap)),
                boxShadow: "0 0 40px rgba(255,59,71,0.7)",
              }}
            >
              anjlok di akhir ↓
            </div>
          </div>
        </div>

        {/* app feedback message (real text from the app) */}
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 1360,
            padding: "34px 40px",
            borderRadius: 36,
            background: "rgba(23,23,26,0.95)",
            borderLeft: `10px solid ${C.red}`,
            fontFamily: body,
            fontWeight: 600,
            fontSize: 40,
            lineHeight: 1.35,
            color: "#dcdce0",
            opacity: prog(t, 7.7, 7.85),
            translate: `0px ${(1 - msg) * 120}px`,
          }}
        >
          <div style={{ fontFamily: body, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: C.red, marginBottom: 10 }}>
            CATATAN DARI APP
          </div>
          Jumlahmu turun di lajur akhir. Latih ketahanan supaya ritmenya bertahan sampai selesai.
        </div>
        <div style={{ position: "absolute", top: 1680, width: "100%", textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: display,
              fontWeight: 800,
              fontSize: 84,
              letterSpacing: -2,
              color: C.fg,
            }}
          >
            <Rise at={8.28}>ritme</Rise>{" "}
            <Rise at={8.64} style={{ color: C.red }}>
              nggak stabil.
            </Rise>
          </span>
        </div>
      </AbsoluteFill>

      <Sfx at={0.04} src="whoosh" volume={0.6} />
      <Sfx at={0.08} src="impact" volume={0.45} />
      <Sfx at={2.72} src="impact" volume={0.8} />
      <Sfx at={2.74} src="glitch" volume={0.45} />
      <Sfx at={3.45} src="whoosh" volume={0.45} />
      {BARS.map((_, i) => (
        <Sfx key={i} at={4.3 + i * 0.08} src="tick" volume={0.35} />
      ))}
      <Sfx at={5.44} src="pop" volume={0.4} />
      <Sfx at={6.48} src="impact" volume={0.45} />
      <Sfx at={7.7} src="pop" volume={0.4} />
      <Sfx at={9.55} src="whoosh" volume={0.45} />
    </AbsoluteFill>
  );
};
