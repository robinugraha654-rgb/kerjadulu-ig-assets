import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { C, body, display, f, mono, prog, snap } from "../theme";
import { Background, Chip, Logo, Overlay, Phone, Rise, Sfx, shake, useT } from "../common";

// Angle: loker palsu. VO = public/vo/lokerpalsu.mp3 (word timestamps from transcription).
export const LP_TOTAL = 34.0;

/* ---------- 1. WA chat: "Selamat diterima… transfer biaya seragam" (0–4.6) ---------- */
const Bubble: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const t = useT();
  const p = prog(t, at, at + 0.35, snap);
  return (
    <div
      style={{
        alignSelf: "flex-start",
        maxWidth: 800,
        padding: "26px 32px",
        borderRadius: "10px 40px 40px 40px",
        background: "#202c33",
        color: "#e9edef",
        fontFamily: body,
        fontWeight: 600,
        fontSize: 46,
        lineHeight: 1.3,
        opacity: prog(t, at, at + 0.12),
        scale: String(0.6 + 0.4 * p),
        transformOrigin: "top left",
        boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
      }}
    >
      {children}
      <div style={{ textAlign: "right", fontSize: 26, color: "#8696a0", marginTop: 6 }}>08.12</div>
    </div>
  );
};

const SceneChat: React.FC = () => {
  const t = useT();
  const hl = prog(t, 3.16, 3.5);
  const dur = 4.6;
  const out = prog(t, dur - 0.25, dur);
  return (
    <AbsoluteFill style={{ opacity: 1 - out, scale: String(1 + out * 0.1), filter: `blur(${out * 12}px)` }}>
      <Background />
      <div style={{ position: "absolute", top: 120, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 52, color: C.mute }}>
          <Rise at={0.06}>Dapet</Rise> <Rise at={0.36}>chat</Rise> <Rise at={0.5}>kayak</Rise> <Rise at={0.6}>gini?</Rise>
        </div>
      </div>
      {/* phone-ish chat panel */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 270,
          height: 820,
          borderRadius: 50,
          background: "#0b141a",
          border: `3px solid ${C.line}`,
          overflow: "hidden",
          boxShadow: "0 50px 100px rgba(0,0,0,0.6)",
          opacity: prog(t, 0, 0.25),
          translate: `0px ${(1 - prog(t, 0, 0.45, snap)) * 200}px`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22, padding: "30px 36px", background: "#202c33" }}>
          <div style={{ width: 86, height: 86, borderRadius: "50%", background: "#3b4a54" }} />
          <div style={{ fontFamily: body, color: "#e9edef" }}>
            <div style={{ fontSize: 40, fontWeight: 800 }}>HRD PT ____</div>
            <div style={{ fontSize: 28, color: "#8696a0" }}>online</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26, padding: "40px 36px" }}>
          <Bubble at={0.8}>
            Selamat, Anda{" "}
            <span style={{ color: C.ok, fontWeight: 800, textShadow: `0 0 ${12 + Math.sin(t * 8) * 6}px rgba(61,220,151,0.8)` }}>DITERIMA</span> bekerja di PT
            kami 🎉
          </Bubble>
          <Bubble at={2.62}>
            Silakan{" "}
            <span
              style={{
                color: hl > 0 ? "#fff" : "#e9edef",
                fontWeight: 800,
                background: `rgba(255,59,71,${0.85 * hl})`,
                borderRadius: 10,
                padding: "0 6px",
                boxDecorationBreak: "clone",
                WebkitBoxDecorationBreak: "clone",
                boxShadow: hl > 0 ? "0 0 24px rgba(255,59,71,0.6)" : "none",
              }}
            >
              transfer biaya seragam Rp350.000
            </span>{" "}
            hari ini ya, biar bisa langsung masuk kerja.
          </Bubble>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1190,
          width: "100%",
          textAlign: "center",
          fontFamily: display,
          fontWeight: 800,
          fontSize: 104,
          letterSpacing: -2.5,
          color: C.fg,
          lineHeight: 1.05,
        }}
      >
        <Rise at={2.62}>tapi</Rise> <Rise at={2.84}>disuruh</Rise>
        <br />
        <Rise at={3.14} style={{ color: C.red }}>
          transfer dulu?
        </Rise>
      </div>
      <Sfx at={0.8} src="pop" volume={0.5} />
      <Sfx at={2.62} src="pop" volume={0.5} />
      <Sfx at={3.16} src="glitch" volume={0.35} />
    </AbsoluteFill>
  );
};

/* ---------- 2. STOP (4.6–6.5) ---------- */
const SceneStop: React.FC = () => {
  const t = useT(); // local 0 = 4.6
  const s = prog(t, 0.2, 0.48, snap);
  const dur = 1.9;
  const out = prog(t, dur - 0.2, dur);
  return (
    <AbsoluteFill style={{ translate: shake(t, 0.22, 0.45, 34), opacity: 1 - out }}>
      <Background flash={Math.max(0, 1 - Math.abs(t - 0.22) / 0.1) * 0.55} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div
          style={{
            width: 520,
            height: 520,
            background: C.red,
            clipPath: "polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: display,
            fontWeight: 800,
            fontSize: 170,
            color: "#fff",
            letterSpacing: -4,
            opacity: prog(t, 0.2, 0.28),
            scale: String(2.4 - 1.4 * s),
            rotate: `${(1 - s) * -20}deg`,
            filter: "drop-shadow(0 0 80px rgba(255,59,71,0.7))",
          }}
        >
          STOP
        </div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 110, color: C.fg, letterSpacing: -3, marginTop: 70 }}>
          <Rise at={0.88}>Jangan</Rise>{" "}
          <Rise at={1.22} style={{ color: C.red }}>
            transfer.
          </Rise>
        </div>
      </AbsoluteFill>
      <Sfx at={0.2} src="impact" volume={0.85} />
      <Sfx at={0.88} src="impact" volume={0.4} />
    </AbsoluteFill>
  );
};

/* ---------- 3. Kemnaker quote (6.5–11.95) ---------- */
const SceneKemnaker: React.FC = () => {
  const t = useT(); // local 0 = 6.5
  const card = prog(t, 0.05, 0.45, snap);
  const hl = prog(t, 3.66, 4.0);
  const dur = 5.45;
  const out = prog(t, dur - 0.2, dur);
  const w = (s: string, at: number, st?: React.CSSProperties) => (
    <>
      <Rise at={at} dist={24} style={st}>
        {s}
      </Rise>{" "}
    </>
  );
  return (
    <AbsoluteFill style={{ opacity: 1 - out, filter: `blur(${out * 10}px)` }}>
      <Background />
      <div style={{ position: "absolute", top: 230, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: C.red }}>
          <Rise at={0.1}>MENURUT KEMNAKER</Rise>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 380,
          padding: "70px 64px",
          borderRadius: 56,
          background: C.surface,
          border: `2px solid ${C.line}`,
          boxShadow: "0 50px 100px rgba(0,0,0,0.6)",
          opacity: prog(t, 0.05, 0.2),
          scale: String(0.8 + 0.2 * card),
        }}
      >
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 200, color: C.red, lineHeight: 0.6, height: 90 }}>“</div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 82, lineHeight: 1.12, letterSpacing: -2, color: C.fg }}>
          {w("Kalau", 1.2)}
          {w("ada", 1.48)}
          <span style={{ background: hl > 0 ? "rgba(255,59,71,0.18)" : "transparent", borderRadius: 14 }}>
            {w("pungutan", 1.66, { color: C.red })}
            {w("biaya", 2.06, { color: C.red })}
          </span>
          {w("di", 2.4)}
          {w("proses", 2.54)}
          {w("rekrutmen,", 2.9)}
          {w("hampir", 3.64, { color: C.red })}
          {w("pasti", 4.14, { color: C.red })}
          {w("itu", 4.6)}
          <span style={{ display: "inline-block", position: "relative" }}>
            <Rise at={4.78} dist={24} style={{ background: C.red, color: C.redInk, padding: "0 18px", borderRadius: 16 }}>
              penipuan.
            </Rise>
          </span>
        </div>
        <div style={{ fontFamily: body, fontWeight: 600, fontSize: 30, color: C.mute, marginTop: 44, opacity: prog(t, 1.2, 1.5) }}>
          Kemnaker, via Antara (13 Januari 2025)
        </div>
      </div>
      <Sfx at={0.05} src="whoosh" volume={0.4} />
      <Sfx at={4.78} src="impact" volume={0.55} />
    </AbsoluteFill>
  );
};

/* ---------- 4. 5 tanda loker palsu (11.95–23.05) ---------- */
const TANDA: [string, string, number][] = [
  ["Diminta bayar apa pun", "administrasi, seragam, pelatihan", 1.1],
  ["Gaji tinggi tanpa wawancara", "syarat gampang, langsung kerja", 2.56],
  ["Dihubungi cuma lewat WA", "email @gmail, bukan email perusahaan", 4.78],
  ["Diminta selfie pegang KTP / kode OTP", "data bisa dipakai buat pinjol", 6.46],
  ["Disuruh install aplikasi", "atau klik link dari orang asing", 9.3],
];
const SceneTanda: React.FC = () => {
  const t = useT(); // local 0 = 11.95
  const dur = 11.1;
  const out = prog(t, dur - 0.2, dur);
  const active = TANDA.reduce((a, [, , at], i) => (t >= at ? i : a), -1);
  return (
    <AbsoluteFill style={{ opacity: 1 - out, filter: `blur(${out * 10}px)` }}>
      <Background />
      <div style={{ position: "absolute", top: 130, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: C.red }}>
          <Rise at={0.07}>WASPADA</Rise>
        </div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 104, letterSpacing: -3, color: C.fg, lineHeight: 1.05 }}>
          <Rise at={0.1}>5 tanda</Rise>{" "}
          <Rise at={0.4} style={{ color: C.red }}>
            loker palsu
          </Rise>
        </div>
      </div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 430, display: "flex", flexDirection: "column", gap: 26 }}>
        {TANDA.map(([title, sub, at], i) => {
          const p = prog(t, at, at + 0.4, snap);
          const isActive = i === active;
          return (
            <div
              key={title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                padding: "30px 36px",
                borderRadius: 36,
                background: isActive ? "rgba(255,59,71,0.14)" : C.surface,
                border: `3px solid ${isActive ? C.red : C.line}`,
                boxShadow: isActive ? "0 0 50px rgba(255,59,71,0.45)" : "0 20px 40px rgba(0,0,0,0.35)",
                opacity: prog(t, at, at + 0.15) * (isActive || active < i ? 1 : 0.55),
                translate: `${(1 - p) * 500}px 0px`,
                scale: String(isActive ? 1.02 : 1),
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  flexShrink: 0,
                  borderRadius: 28,
                  background: isActive ? C.red : "#2a1517",
                  color: isActive ? C.redInk : C.red,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: mono,
                  fontWeight: 800,
                  fontSize: 54,
                }}
              >
                {i + 1}
              </div>
              <div>
                <div style={{ fontFamily: display, fontWeight: 800, fontSize: 52, color: C.fg, letterSpacing: -1, lineHeight: 1.1 }}>{title}</div>
                <div style={{ fontFamily: body, fontWeight: 600, fontSize: 34, color: C.mute, marginTop: 6 }}>{sub}</div>
              </div>
            </div>
          );
        })}
      </div>
      {TANDA.map(([, , at], i) => (
        <Sfx key={i} at={at} src="pop" volume={0.45} />
      ))}
    </AbsoluteFill>
  );
};

/* ---------- 5. Proof in app (23.05–29.3) ---------- */
const SceneApp: React.FC = () => {
  const t = useT(); // local 0 = 23.05
  const phone = prog(t, 0.1, 0.7, snap);
  const dur = 6.25;
  const out = prog(t, dur - 0.2, dur);
  return (
    <AbsoluteFill style={{ opacity: 1 - out, filter: `blur(${out * 10}px)` }}>
      <Background />
      <div style={{ position: "absolute", top: 120, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 76, letterSpacing: -2, color: C.fg, lineHeight: 1.08 }}>
          <Rise at={0.1}>Semua ciri</Rise> <Rise at={0.85}>+ cara ngeceknya</Rise>
          <br />
          <Rise at={2.0} style={{ color: C.mute, fontSize: 56 }}>
            ada di
          </Rise>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20, opacity: prog(t, 2.3, 2.45), scale: String(0.6 + 0.4 * prog(t, 2.3, 2.7, snap)) }}>
          <Logo size={86} />
        </div>
      </div>
      <div style={{ position: "absolute", left: "50%", top: 560, translate: `-50% ${(1 - phone) * 1300}px`, rotate: `${(1 - phone) * 10 - 3}deg` }}>
        <Phone src="shots/32-modul4-tanda.png" width={430}>
          <div
            style={{
              position: "absolute",
              left: "3%",
              width: "94%",
              top: "26%",
              height: "23.5%",
              borderRadius: 24,
              border: `6px solid ${C.red}`,
              boxShadow: "0 0 40px rgba(255,59,71,0.8)",
              opacity: prog(t, 1.0, 1.2),
            }}
          />
        </Phone>
      </div>
      <div style={{ position: "absolute", top: 1560, width: "100%", display: "flex", justifyContent: "center", gap: 16 }}>
        <Chip at={3.33} red style={{ fontSize: 38, padding: "16px 28px" }}>
          + Tes koran
        </Chip>
        <Chip at={4.43} red style={{ fontSize: 38, padding: "16px 28px" }}>
          + Psikotes
        </Chip>
        <Chip at={5.25} red style={{ fontSize: 38, padding: "16px 28px" }}>
          + Interview HRD
        </Chip>
      </div>
      <Sfx at={0.1} src="whoosh" volume={0.5} />
      <Sfx at={2.3} src="ding" volume={0.35} />
      <Sfx at={3.33} src="pop" volume={0.4} />
      <Sfx at={4.43} src="pop" volume={0.4} />
      <Sfx at={5.25} src="pop" volume={0.4} />
    </AbsoluteFill>
  );
};

/* ---------- 6. CTA (29.3–34.0) ---------- */
const SceneCta: React.FC = () => {
  const t = useT(); // local 0 = 29.3
  const cta = prog(t, 3.0, 3.35, snap);
  const pulse = t > 3.4 ? 1 + Math.sin((t - 3.4) * 7) * 0.035 : 1;
  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", top: 260, left: 70, right: 70, textAlign: "center" }}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 96, letterSpacing: -3, color: C.fg, lineHeight: 1.06 }}>
          <Rise at={0.12}>Jangan sampai</Rise> <Rise at={0.82}>kerja belum dapet,</Rise>
          <br />
          <Rise at={1.94} style={{ color: C.red }}>
            uang udah hilang.
          </Rise>
        </div>
      </div>
      <div style={{ position: "absolute", top: 900, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ opacity: prog(t, 2.2, 2.4), scale: String(0.7 + 0.3 * prog(t, 2.2, 2.6, snap)) }}>
          <Logo size={100} />
        </div>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 44, color: C.mute, opacity: prog(t, 2.3, 2.5) }}>Sekali bayar</div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 180, letterSpacing: -6, lineHeight: 1, color: C.fg, opacity: prog(t, 2.4, 2.55), textShadow: "0 0 70px rgba(255,59,71,0.45)" }}>
          <span style={{ fontSize: 90, color: C.red, verticalAlign: "top" }}>Rp</span>49.000
        </div>
      </div>
      <div style={{ position: "absolute", top: 1470, width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            opacity: prog(t, 3.0, 3.1),
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
      </div>
      <Sfx at={2.4} src="impact" volume={0.6} />
      <Sfx at={3.0} src="ding" volume={0.4} />
    </AbsoluteFill>
  );
};

const SCENES: [string, React.FC, number, number][] = [
  ["LP-1-Chat", SceneChat, 0, 4.6],
  ["LP-2-Stop", SceneStop, 4.6, 1.9],
  ["LP-3-Kemnaker", SceneKemnaker, 6.5, 5.45],
  ["LP-4-Tanda", SceneTanda, 11.95, 11.1],
  ["LP-5-App", SceneApp, 23.05, 6.25],
  ["LP-6-CTA", SceneCta, 29.3, LP_TOTAL - 29.3],
];

export const AdLokerPalsu: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    {SCENES.map(([id, Scene, start, dur]) => (
      <Sequence key={id} name={id} from={f(start)} durationInFrames={f(dur)}>
        <Scene />
      </Sequence>
    ))}
    <Overlay />
    <Audio src={staticFile("vo/lokerpalsu.mp3")} />
  </AbsoluteFill>
);
