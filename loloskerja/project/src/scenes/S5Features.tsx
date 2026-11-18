import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, mono, prog, snap } from "../theme";
import { Background, Chip, Phone, Rise, Sfx, useT } from "../common";

// VO: "Plus seratus lima puluh soal psikotes lengkap pembahasannya
//      dan empat puluh pertanyaan HRD sama contoh jawabannya."
export const S5_DUR = 6.25;
const SWAP = 3.15;

const Highlight: React.FC<{ at: number; top: number; height: number }> = ({ at, top, height }) => {
  const t = useT();
  const p = prog(t, at, at + 0.35, snap);
  return (
    <div
      style={{
        position: "absolute",
        left: "3%",
        right: "3%",
        top: `${top}%`,
        height: `${height}%`,
        borderRadius: 30,
        border: `6px solid ${C.red}`,
        boxShadow: "0 0 50px rgba(255,59,71,0.75), inset 0 0 30px rgba(255,59,71,0.25)",
        opacity: prog(t, at, at + 0.1),
        scale: String(1.3 - 0.3 * p),
      }}
    />
  );
};

export const S5Features: React.FC = () => {
  const t = useT();
  const first = t < SWAP;
  const flip = t < SWAP ? prog(t, SWAP - 0.2, SWAP) : 1 - prog(t, SWAP, SWAP + 0.25);
  const count150 = Math.round(prog(t, 0.3, 1.05) * 150);
  const count40 = Math.round(prog(t, 3.38, 3.85) * 40);
  const zoom1 = prog(t, 1.95, 2.4) * (1 - prog(t, 2.9, 3.1));
  const zoom2 = prog(t, 5.25, 5.7);
  const blockB = prog(t, SWAP - 0.05, SWAP + 0.25);

  return (
    <AbsoluteFill>
      <Background />

      {/* Top counter block */}
      <div style={{ position: "absolute", top: 110, width: "100%", textAlign: "center", height: 420 }}>
        {/* A: 150 soal */}
        <div style={{ position: "absolute", width: "100%", opacity: 1 - blockB, translate: `0px ${-blockB * 80}px` }}>
          <div style={{ fontFamily: body, fontWeight: 800, fontSize: 56, color: C.mute }}>
            <Rise at={0.06}>Plus</Rise>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 26 }}>
            <span
              style={{
                fontFamily: mono,
                fontWeight: 800,
                fontSize: 210,
                color: C.red,
                lineHeight: 1,
                textShadow: "0 0 60px rgba(255,59,71,0.6)",
                opacity: prog(t, 0.28, 0.4),
              }}
            >
              {count150}
            </span>
            <span style={{ fontFamily: display, fontWeight: 800, fontSize: 84, color: C.fg, lineHeight: 1, textAlign: "left" }}>
              <Rise at={1.05}>soal</Rise>
              <br />
              <Rise at={1.27}>psikotes</Rise>
            </span>
          </div>
          <div style={{ marginTop: 34 }}>
            <Chip at={1.93} red>
              + lengkap pembahasannya
            </Chip>
          </div>
        </div>
        {/* B: 40 pertanyaan */}
        <div style={{ position: "absolute", width: "100%", opacity: blockB, translate: `0px ${(1 - blockB) * 80}px` }}>
          <div style={{ fontFamily: body, fontWeight: 800, fontSize: 56, color: C.mute }}>
            <Rise at={3.2}>dan</Rise>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: 26 }}>
            <span
              style={{
                fontFamily: mono,
                fontWeight: 800,
                fontSize: 210,
                color: C.red,
                lineHeight: 1,
                textShadow: "0 0 60px rgba(255,59,71,0.6)",
              }}
            >
              {count40}
            </span>
            <span style={{ fontFamily: display, fontWeight: 800, fontSize: 84, color: C.fg, lineHeight: 1, textAlign: "left" }}>
              <Rise at={3.8}>pertanyaan</Rise>
              <br />
              <Rise at={4.3} style={{ color: C.red }}>
                HRD
              </Rise>
            </span>
          </div>
          <div style={{ marginTop: 34 }}>
            <Chip at={5.25} red>
              + contoh jawabannya
            </Chip>
          </div>
        </div>
      </div>

      {/* Phone */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 660,
          translate: "-50% 0px",
          perspective: 1600,
        }}
      >
        <div
          style={{
            rotate: `y ${flip * 90}deg`,
            scale: String(1 + (first ? zoom1 : zoom2) * 0.06),
          }}
        >
          <Phone src={first ? "shots/09-soal-jawab.png" : "shots/03-interview.png"} width={490}>
            {first ? <Highlight at={1.95} top={75.5} height={6.5} /> : <Highlight at={5.25} top={50.6} height={6.5} />}
            {first ? <Highlight at={0.9} top={33.5} height={7.8} /> : null}
          </Phone>
        </div>
      </div>

      <Sfx at={0.3} src="whoosh" volume={0.35} />
      {Array.from({ length: 12 }).map((_, i) => (
        <Sfx key={`a${i}`} at={0.3 + i * 0.06} src="tick" volume={0.35} />
      ))}
      <Sfx at={1.93} src="pop" volume={0.5} />
      <Sfx at={SWAP - 0.2} src="whoosh" volume={0.5} />
      {Array.from({ length: 8 }).map((_, i) => (
        <Sfx key={`b${i}`} at={3.38 + i * 0.06} src="tick" volume={0.35} />
      ))}
      <Sfx at={5.25} src="pop" volume={0.5} />
      <Sfx at={6.05} src="whoosh" volume={0.45} />
    </AbsoluteFill>
  );
};
