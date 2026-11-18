import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, hand, mono, out, prog, snap } from "../theme";
import { Background, Chip, Rise, Sfx, useT } from "../common";

// VO: "Kayak tes koran, jumlahin dua angka, tulis angka belakangnya. Perlajur dikejar waktu."
export const S3_DUR = 5.25;

const D = [7, 8, 5, 9, 2, 7, 4, 6, 1, 8, 5, 3, 9, 6, 2, 8, 7, 4, 3, 9, 5, 6, 8, 2, 7, 1, 9, 4];
const ROW = 128;
const FAST_START = 3.3;
const STEP = 0.2;

const pairIndex = (t: number) => {
  if (t < FAST_START) return 0;
  const s = (t - FAST_START) / STEP + 1;
  const whole = Math.floor(s);
  return whole - 1 + out(Math.min(1, (s - whole) / 0.6));
};

export const S3Koran: React.FC = () => {
  const t = useT();
  const k = pairIndex(t);
  const card = prog(t, 0.05, 0.5, snap);
  const plus = prog(t, 1.1, 1.3, snap);
  const sum = prog(t, 1.5, 1.75, snap);
  const pick = prog(t, 2.3, 2.6);
  const fly = prog(t, 2.6, 2.95, out);
  const fast = t >= FAST_START;
  const secs = Math.max(0, 15 - Math.max(0, t - 0.5) * 1.5 - Math.max(0, t - FAST_START) * 3.5);
  const urgent = t > 4.15;
  const pulse = urgent ? 1 + Math.max(0, Math.sin((t - 4.15) * 18)) * 0.08 : 1;
  const laneFill = prog(t, 3.45, 5.1, (x) => x);
  const lane = Math.min(4, 1 + Math.floor(laneFill * 4));
  const cy = 450;
  const cardTop = 380;

  // number of answers already written below the current pair
  const written = fast ? Math.floor(k + 0.001) + 1 : fly >= 1 ? 1 : 0;

  return (
    <AbsoluteFill>
      <Background />

      {/* Title */}
      <div style={{ position: "absolute", top: 120, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: C.red }}>
          <Rise at={0.1}>TES KORAN · KRAEPELIN</Rise>
        </div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 120, color: C.fg, letterSpacing: -3, lineHeight: 1.05 }}>
          <Rise at={0.12}>Kayak</Rise> <Rise at={0.3}>tes</Rise>{" "}
          <Rise at={0.48} style={{ color: C.red }}>
            koran
          </Rise>
        </div>
      </div>

      {/* Test card */}
      <div
        style={{
          position: "absolute",
          left: 150,
          top: cardTop,
          width: 780,
          height: 900,
          borderRadius: 56,
          background: C.surface,
          border: `2px solid ${C.line}`,
          overflow: "hidden",
          opacity: prog(t, 0.05, 0.2),
          scale: String(0.7 + 0.3 * card),
          translate: `0px ${(1 - card) * 200}px`,
          boxShadow: "0 50px 100px rgba(0,0,0,0.6)",
        }}
      >
        {/* header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "36px 44px 0" }}>
          <div>
            <div style={{ fontFamily: display, fontWeight: 800, fontSize: 46, color: C.fg }}>Tes Koran</div>
            <div style={{ fontFamily: body, fontWeight: 500, fontSize: 30, color: C.mute }}>Lajur {lane} dari 4</div>
          </div>
          <div
            style={{
              fontFamily: mono,
              fontWeight: 800,
              fontSize: 78,
              color: urgent ? C.red : C.fg,
              scale: String(pulse),
              textShadow: urgent ? "0 0 30px rgba(255,59,71,0.8)" : "none",
            }}
          >
            00:{String(Math.ceil(secs)).padStart(2, "0")}
          </div>
        </div>
        {/* lane bars */}
        <div style={{ display: "flex", gap: 14, padding: "26px 44px 0" }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ flex: 1, height: 10, borderRadius: 6, background: C.line, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${Math.max(0, Math.min(1, laneFill * 4 - i)) * 100}%`,
                  background: C.red,
                  boxShadow: "0 0 12px rgba(255,59,71,0.9)",
                }}
              />
            </div>
          ))}
        </div>

        {/* digit column */}
        <div style={{ position: "absolute", inset: 0, maskImage: "linear-gradient(transparent 0px, transparent 190px, black 300px, black 640px, transparent 800px)" }}>
          {D.map((d, i) => {
            const y = cy + (k + 0.5 - i) * ROW;
            if (y < 120 || y > 980) return null;
            const inPair = Math.abs(i - (k + 0.5)) < 0.6;
            const fade = 1 - Math.min(1, Math.abs(y - cy) / 420);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 230,
                  top: y,
                  width: 120,
                  textAlign: "center",
                  fontFamily: display,
                  fontWeight: 800,
                  fontSize: 104,
                  lineHeight: "120px",
                  translate: "0px -60px",
                  color: inPair ? C.fg : `rgba(163,163,171,${0.25 + fade * 0.5})`,
                }}
              >
                {d}
              </div>
            );
          })}
          {/* red box */}
          <div
            style={{
              position: "absolute",
              left: 215,
              top: cy - ROW - 10,
              width: 150,
              height: ROW * 2 + 20,
              border: `7px solid ${C.red}`,
              borderRadius: 34,
              boxShadow: "0 0 40px rgba(255,59,71,0.5), inset 0 0 30px rgba(255,59,71,0.15)",
            }}
          />
          {/* plus sign during explanation */}
          <div
            style={{
              position: "absolute",
              left: 120,
              top: cy - 60,
              fontFamily: display,
              fontWeight: 800,
              fontSize: 110,
              lineHeight: "120px",
              color: C.red,
              opacity: plus * (1 - prog(t, 3.1, 3.3)),
              scale: String(0.4 + 0.6 * plus),
            }}
          >
            +
          </div>
          {/* sum bubble 7+8 = 15 */}
          <div
            style={{
              position: "absolute",
              left: 420,
              top: cy - 70,
              height: 140,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: display,
              fontWeight: 800,
              fontSize: 120,
              opacity: sum * (1 - fly),
              scale: String(0.5 + 0.5 * sum),
            }}
          >
            <span style={{ color: C.mute, fontSize: 80 }}>=</span>
            <span style={{ color: C.fg, opacity: 1 - pick * 0.8, scale: String(1 - pick * 0.2) }}>1</span>
            <span
              style={{
                color: pick > 0 ? C.red : C.fg,
                scale: String(1 + pick * 0.35),
                textShadow: pick > 0 ? "0 0 40px rgba(255,59,71,0.9)" : "none",
              }}
            >
              5
            </span>
          </div>
          {/* flying 5 */}
          {fly > 0 && fly < 1 ? (
            <div
              style={{
                position: "absolute",
                left: 560 - fly * 140,
                top: cy - 60,
                fontFamily: display,
                fontWeight: 800,
                fontSize: 100 - fly * 30,
                lineHeight: "120px",
                color: C.red,
              }}
            >
              5
            </div>
          ) : null}
          {/* written answers */}
          {Array.from({ length: written }).map((_, j) => {
            const y = cy + (k - j) * ROW;
            if (y < 120 || y > 980) return null;
            const ans = (D[j] + D[j + 1]) % 10;
            const isNew = j === written - 1 && fast;
            const wp = isNew ? Math.min(1, (k - Math.floor(k + 0.001)) * 3 + 0.4) : 1;
            return (
              <div
                key={j}
                style={{
                  position: "absolute",
                  left: 400,
                  top: y - 50,
                  width: 120,
                  textAlign: "center",
                  fontFamily: hand,
                  fontWeight: 700,
                  fontSize: 92,
                  lineHeight: "100px",
                  color: j === 0 && !fast ? C.red : "#e9e3d4",
                  opacity: wp,
                }}
              >
                {ans}
              </div>
            );
          })}
          {/* upward arrow */}
          <div style={{ position: "absolute", left: 640, top: cy - 50, fontFamily: body, fontSize: 80, color: C.mute, opacity: 0.6 * prog(t, FAST_START, FAST_START + 0.3) }}>
            ↑
          </div>
        </div>
        {/* counters */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "26px 44px",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: body,
            fontWeight: 700,
            fontSize: 34,
            color: C.mute,
            background: "linear-gradient(transparent, rgba(11,11,12,0.95) 40%)",
          }}
        >
          <span>
            Lajur ini <b style={{ color: C.fg, fontFamily: mono }}>{written}</b>
          </span>
          <span>
            Total <b style={{ color: C.fg, fontFamily: mono }}>{written}</b>
          </span>
        </div>
      </div>

      {/* Captions */}
      <div
        style={{
          position: "absolute",
          top: 1330,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        <Chip at={1.1}>
          <span style={{ color: C.red }}>1</span> Jumlahin 2 angka
        </Chip>
        <Chip at={2.26}>
          <span style={{ color: C.red }}>2</span> Tulis angka belakangnya
        </Chip>
        <Chip at={3.46} red>
          Per lajur · dikejar waktu
        </Chip>
      </div>

      <Sfx at={0.05} src="whoosh" volume={0.4} />
      <Sfx at={1.1} src="pop" volume={0.45} />
      <Sfx at={1.5} src="pop" volume={0.45} />
      <Sfx at={2.6} src="whoosh" volume={0.3} />
      {Array.from({ length: Math.floor((S3_DUR - FAST_START - 0.15) / STEP) }).map((_, i) => (
        <Sfx key={i} at={FAST_START + i * STEP} src="tick" volume={0.55} />
      ))}
    </AbsoluteFill>
  );
};
