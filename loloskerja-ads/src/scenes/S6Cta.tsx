import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, mono, prog, snap } from "../theme";
import { Background, Check, Chip, Logo, Rise, Sfx, shake, useT } from "../common";

// VO: "Sekali bayar empat puluh sembilan ribu, jalan tanpa kuota. Latihan mulai malam ini. Cek link di bio."
export const S6_DUR = 6.6;

export const S6Cta: React.FC = () => {
  const t = useT();
  const price = prog(t, 0.85, 1.15, snap);
  const ticker = Math.round(prog(t, 0.85, 1.75) * 49);
  const cta = prog(t, 4.8, 5.15, snap);
  const pulse = t > 5.2 ? 1 + Math.sin((t - 5.2) * 7) * 0.035 : 1;
  const bounce = Math.abs(Math.sin(t * 5)) * 26;
  return (
    <AbsoluteFill style={{ translate: shake(t, 0.9, 0.35, 20) }}>
      <Background flash={Math.max(0, 1 - Math.abs(t - 0.9) / 0.1) * 0.25} />

      <div style={{ position: "absolute", top: 130, width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ opacity: prog(t, 0, 0.3), scale: String(0.8 + 0.2 * prog(t, 0, 0.4, snap)) }}>
          <Logo size={92} />
        </div>
      </div>

      <div style={{ position: "absolute", top: 400, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 64, color: C.mute }}>
          <Rise at={0.06}>Sekali</Rise> <Rise at={0.36}>bayar</Rise>
        </div>
        <div
          style={{
            fontFamily: display,
            fontWeight: 800,
            fontSize: 230,
            letterSpacing: -8,
            lineHeight: 1.05,
            color: C.fg,
            opacity: prog(t, 0.85, 0.95),
            scale: String(1.8 - 0.8 * price),
            textShadow: "0 0 80px rgba(255,59,71,0.45)",
          }}
        >
          <span style={{ fontSize: 110, color: C.red, verticalAlign: "top", marginRight: 10 }}>Rp</span>
          <span style={{ fontFamily: display }}>{ticker}</span>
          <span style={{ fontFamily: mono, fontSize: 150 }}>.000</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 820,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        <Chip at={2.15}>
          <Check /> Jalan tanpa kuota
        </Chip>
        <Chip at={2.5}>
          <Check /> Bisa dipasang di HP
        </Chip>
        <Chip at={2.85}>
          <Check /> Garansi 7 hari
        </Chip>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1250,
          width: "100%",
          textAlign: "center",
          fontFamily: display,
          fontWeight: 800,
          fontSize: 92,
          letterSpacing: -2,
          color: C.fg,
          lineHeight: 1.05,
        }}
      >
        <Rise at={3.35}>Latihan</Rise> <Rise at={3.75}>mulai</Rise>
        <br />
        <Rise at={3.98} style={{ color: C.red }}>
          malam ini.
        </Rise>
      </div>

      <div
        style={{
          position: "absolute",
          top: 1530,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            opacity: prog(t, 4.8, 4.9),
            scale: String((0.5 + 0.5 * cta) * pulse),
            background: C.red,
            color: C.redInk,
            fontFamily: body,
            fontWeight: 800,
            fontSize: 64,
            padding: "30px 70px",
            borderRadius: 999,
            boxShadow: "0 0 80px rgba(255,59,71,0.7)",
          }}
        >
          Cek link di bio
        </div>
        <svg
          width="90"
          height="90"
          viewBox="0 0 24 24"
          fill="none"
          stroke={C.red}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginTop: 18, translate: `0px ${bounce}px`, opacity: prog(t, 5.1, 5.3) }}
        >
          <path d="M12 4v15M5 12l7 7 7-7" />
        </svg>
      </div>

      <Sfx at={0.85} src="impact" volume={0.7} />
      <Sfx at={1.75} src="ding" volume={0.45} />
      <Sfx at={2.15} src="pop" volume={0.4} />
      <Sfx at={2.5} src="pop" volume={0.4} />
      <Sfx at={2.85} src="pop" volume={0.4} />
      <Sfx at={4.8} src="impact" volume={0.5} />
    </AbsoluteFill>
  );
};
