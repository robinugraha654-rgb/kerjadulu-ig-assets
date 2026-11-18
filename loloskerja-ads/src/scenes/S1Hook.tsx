import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, prog, snap } from "../theme";
import { Background, Rise, Slam, Sfx, shake, useT } from "../common";

// VO: "Lulusan SMK, minggu ini ada panggilan tes pabrik? Berhenti scroll dulu!"
export const S1_DUR = 4.45;

const Notif: React.FC = () => {
  const t = useT();
  const p = prog(t, 1.15, 1.6, snap);
  const away = prog(t, 3.1, 3.35);
  return (
    <div
      style={{
        position: "absolute",
        top: 130,
        left: 70,
        right: 70,
        translate: `0px ${(1 - p) * -260 - away * 300}px`,
        opacity: prog(t, 1.15, 1.3) * (1 - away),
        background: "rgba(30,30,34,0.92)",
        border: `2px solid ${C.line}`,
        borderRadius: 44,
        padding: "30px 34px",
        display: "flex",
        gap: 26,
        alignItems: "center",
        boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 26,
          background: "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="58" height="58" viewBox="0 0 24 24" fill="#fff">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
        </svg>
      </div>
      <div style={{ fontFamily: body, color: C.fg, minWidth: 0 }}>
        <div style={{ fontSize: 34, fontWeight: 800, display: "flex", justifyContent: "space-between" }}>
          <span>HRD Rekrutmen</span>
          <span style={{ color: C.mute, fontWeight: 500, fontSize: 30 }}>sekarang</span>
        </div>
        <div style={{ fontSize: 36, fontWeight: 500, color: "#dcdce0", marginTop: 6, lineHeight: 1.3 }}>
          Anda diundang <b style={{ color: C.fg }}>tes seleksi</b>, Kamis 07.00 WIB. Bawa pensil 2B.
        </div>
      </div>
    </div>
  );
};

export const S1Hook: React.FC = () => {
  const t = useT();
  const stop = prog(t, 3.1, 3.4, snap);
  const flash = Math.max(0, 1 - Math.abs(t - 3.14) / 0.12) * 0.55;
  const textAway = prog(t, 3.05, 3.3);
  const exit = prog(t, S1_DUR - 0.2, S1_DUR);
  return (
    <AbsoluteFill style={{ translate: shake(t, 3.14, 0.5, 34) }}>
      <Background flash={flash} />
      <Notif />

      {/* Kinetic text */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          paddingTop: 140,
          opacity: 1 - textAway,
          scale: String(1 - textAway * 0.25),
          filter: `blur(${textAway * 16}px)`,
        }}
      >
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 150, color: C.fg, letterSpacing: -4, lineHeight: 1 }}>
          <Slam at={0.06}>Lulusan</Slam>{" "}
          <Slam at={0.5} style={{ background: C.red, color: C.redInk, padding: "0 26px", borderRadius: 28, rotate: "-3deg" }}>
            SMK,
          </Slam>
        </div>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 64, color: C.mute, marginTop: 60 }}>
          <Rise at={1.28}>minggu</Rise> <Rise at={1.56}>ini</Rise> <Rise at={1.72}>ada</Rise>
        </div>
        <div
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 118,
            color: C.fg,
            letterSpacing: -3,
            lineHeight: 1.02,
            textAlign: "center",
            marginTop: 20,
            padding: "0 70px",
          }}
        >
          <Slam at={1.88} from={1.4}>panggilan</Slam> <Slam at={2.18} from={1.4}>tes</Slam>{" "}
          <Slam at={2.34} from={1.6} style={{ color: C.red, textShadow: "0 0 50px rgba(255,59,71,0.6)" }}>
            pabrik?
          </Slam>
        </div>
      </AbsoluteFill>

      {/* BERHENTI SCROLL stamp */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: prog(t, 3.1, 3.18) * (1 - exit) }}>
        {/* hazard tapes */}
        {[-1, 1].map((d) => (
          <div
            key={d}
            style={{
              position: "absolute",
              width: 1600,
              height: 90,
              top: d < 0 ? 520 : 1310,
              rotate: `${d * -7}deg`,
              translate: `${(1 - stop) * d * 1600}px 0px`,
              background: `repeating-linear-gradient(45deg, ${C.red} 0 50px, ${C.bg} 50px 100px)`,
              boxShadow: "0 0 40px rgba(255,59,71,0.4)",
            }}
          />
        ))}
        <div
          style={{
            rotate: `${-6 + (1 - stop) * -10}deg`,
            scale: String(2.6 - 1.6 * stop),
            border: `14px solid ${C.red}`,
            borderRadius: 40,
            padding: "30px 60px 40px",
            textAlign: "center",
            background: "rgba(11,11,12,0.85)",
            boxShadow: "0 0 120px rgba(255,59,71,0.5)",
          }}
        >
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 170, color: C.red, lineHeight: 0.95, letterSpacing: -4 }}>
            BERHENTI
          </div>
          <div style={{ fontFamily: display, fontWeight: 800, fontSize: 170, color: C.fg, lineHeight: 0.95, letterSpacing: -4 }}>
            SCROLL
          </div>
          <div style={{ fontFamily: body, fontWeight: 800, fontSize: 54, color: C.mute, marginTop: 18, opacity: prog(t, 3.68, 3.9) }}>
            dulu.
          </div>
        </div>
      </AbsoluteFill>

      <Sfx at={0.04} src="impact" volume={0.55} />
      <Sfx at={0.48} src="impact" volume={0.4} />
      <Sfx at={1.15} src="pop" volume={0.5} />
      <Sfx at={2.32} src="impact" volume={0.4} />
      <Sfx at={3.1} src="glitch" volume={0.6} />
      <Sfx at={3.12} src="impact" volume={0.8} />
      <Sfx at={4.2} src="whoosh" volume={0.5} />
    </AbsoluteFill>
  );
};
