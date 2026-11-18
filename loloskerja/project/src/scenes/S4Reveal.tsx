import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, prog, snap } from "../theme";
import { Background, Logo, Phone, Rise, Sfx, useT } from "../common";

// VO: "Nah, di Lolos Kerja kamu bisa simulasi persis kayak gitu."
export const S4_DUR = 3.3;

export const S4Reveal: React.FC = () => {
  const t = useT();
  const logoIn = prog(t, 0.55, 0.9, snap);
  const up = prog(t, 1.2, 1.65);
  const phone = prog(t, 1.25, 1.85, snap);
  const ring = prog(t, 0.6, 1.3);
  return (
    <AbsoluteFill>
      <Background flash={Math.max(0, 1 - Math.abs(t - 0.6) / 0.1) * 0.25} />

      {/* burst ring */}
      <div
        style={{
          position: "absolute",
          left: 540 - 400,
          top: 900 - 400,
          width: 800,
          height: 800,
          borderRadius: "50%",
          border: `6px solid ${C.red}`,
          opacity: (1 - ring) * (ring > 0 ? 0.9 : 0),
          scale: String(0.2 + ring * 1.6),
        }}
      />

      <div style={{ position: "absolute", top: 640 - up * 420, width: "100%", textAlign: "center" }}>
        <div
          style={{
            fontFamily: body,
            fontWeight: 800,
            fontSize: 80,
            color: C.mute,
            opacity: 1 - up,
            height: 120 * (1 - up),
          }}
        >
          <Rise at={0.08}>Nah,</Rise> <Rise at={0.45}>di</Rise>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            opacity: prog(t, 0.55, 0.65),
            scale: String((0.4 + 0.6 * logoIn) * (1 - up * 0.42)),
          }}
        >
          <Logo size={150} draw={prog(t, 0.7, 1.1)} />
        </div>
        <div
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 74,
            color: C.fg,
            letterSpacing: -1.5,
            marginTop: 10,
            opacity: up,
          }}
        >
          <Rise at={1.7}>simulasi</Rise>{" "}
          <Rise at={2.2} style={{ color: C.red }}>
            persis
          </Rise>{" "}
          <Rise at={2.65}>kayak gitu.</Rise>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 540,
          translate: `-50% ${(1 - phone) * 1300}px`,
          rotate: `${(1 - phone) * 12}deg`,
        }}
      >
        <Phone src="shots/11-koran-jalan.png" width={540} />
      </div>

      <Sfx at={0.55} src="impact" volume={0.55} />
      <Sfx at={0.65} src="ding" volume={0.35} />
      <Sfx at={1.2} src="whoosh" volume={0.5} />
    </AbsoluteFill>
  );
};
