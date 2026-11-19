import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { C, body, display, f, mono, prog, snap } from "../theme";
import { Background, Chip, Logo, Overlay, Phone, Rise, Sfx, useT } from "../common";

// Angle: orang tua / kakak (target 35–55). VO = public/vo/orangtua.mp3, voice "Gendhis".
export const OT_TOTAL = 34.5;
const AMBER = "#FFB547";

const fade = (t: number, dur: number) => {
  const o = prog(t, dur - 0.25, dur);
  return { opacity: 1 - o, filter: `blur(${o * 10}px)` } as React.CSSProperties;
};

/** Warm night room: lamp glow + silhouette looking at a phone (back view) */
const NightRoom: React.FC<{ t: number; notif?: number }> = ({ t, notif = 0 }) => {
  const flicker = 0.92 + Math.sin(t * 3) * 0.04;
  return (
    <AbsoluteFill>
      {/* lamp glow */}
      <div
        style={{
          position: "absolute",
          left: -200,
          top: 700,
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,181,71,${0.28 * flicker}) 0%, rgba(255,181,71,0) 60%)`,
        }}
      />
      {/* window */}
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 780,
          width: 300,
          height: 380,
          borderRadius: 16,
          border: "10px solid #26262b",
          background: "linear-gradient(180deg,#0f1630,#1b2347)",
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 10, background: "#26262b" }} />
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 10, background: "#26262b" }} />
        <div style={{ position: "absolute", right: 40, top: 40, width: 46, height: 46, borderRadius: "50%", background: "#f2ead6", boxShadow: "0 0 30px rgba(242,234,214,0.6)" }} />
      </div>
      {/* table */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 1540, height: 60, background: "linear-gradient(180deg,#3a2a1c,#22180f)" }} />
      {/* silhouette (back view) */}
      <svg width="560" height="620" viewBox="0 0 560 620" style={{ position: "absolute", left: 200, top: 930 }}>
        <circle cx="280" cy="170" r="105" fill="#1a1a1e" />
        <path d="M60 620 C60 420 150 300 280 300 C410 300 500 420 500 620 Z" fill="#1a1a1e" />
      </svg>
      {/* phone glow in hands */}
      <div
        style={{
          position: "absolute",
          left: 420,
          top: 1360,
          width: 140,
          height: 90,
          borderRadius: 14,
          background: `rgba(220,230,255,${0.75 * flicker})`,
          boxShadow: `0 0 ${80 + notif * 60}px rgba(200,215,255,0.65)`,
        }}
      />
    </AbsoluteFill>
  );
};

/* ---------- 1. Anak baru lulus SMK (0–4.1) ---------- */
const SceneIntro: React.FC = () => {
  const t = useT();
  const dur = 4.1;
  const notif = prog(t, 1.9, 2.3, snap);
  return (
    <AbsoluteFill style={fade(t, dur)}>
      <Background />
      <NightRoom t={t} notif={notif} />
      <div style={{ position: "absolute", top: 250, left: 70, right: 70, textAlign: "center" }}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 100, letterSpacing: -3, color: C.fg, lineHeight: 1.04 }}>
          <Rise at={0.12}>Anak</Rise> <Rise at={0.38}>baru</Rise> <Rise at={0.62}>lulus</Rise>{" "}
          <Rise at={0.96} style={{ color: AMBER }}>
            SMK?
          </Rise>
        </div>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 56, color: "#d8d8de", marginTop: 26 }}>
          <Rise at={2.0}>Sekarang</Rise> <Rise at={2.66}>lagi</Rise> <Rise at={2.86}>sibuk</Rise> <Rise at={3.14}>cari kerja.</Rise>
        </div>
      </div>
      {/* notification bubble */}
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 1180,
          padding: "16px 24px",
          borderRadius: 22,
          background: "rgba(30,30,34,0.95)",
          border: `2px solid ${C.line}`,
          fontFamily: body,
          fontWeight: 700,
          fontSize: 30,
          color: C.fg,
          opacity: prog(t, 1.9, 2.05),
          scale: String(0.6 + 0.4 * notif),
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        🔔 Undangan tes seleksi
      </div>
      <Sfx at={1.9} src="pop" volume={0.35} />
    </AbsoluteFill>
  );
};

/* ---------- 2. Berjuang sendiri (4.1–10.6) ---------- */
const PRESSURES: [string, number, number, number][] = [
  ["Tes psikotes", 2.64, 120, 760],
  ["Tes koran", 3.84, 600, 690],
  ["Interview HRD", 4.88, 330, 600],
];
const SceneSendiri: React.FC = () => {
  const t = useT(); // local 0 = 4.1
  const dur = 6.5;
  return (
    <AbsoluteFill style={fade(t, dur)}>
      <Background />
      <NightRoom t={t + 4.1} />
      <div style={{ position: "absolute", top: 250, left: 70, right: 70, textAlign: "center" }}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 96, letterSpacing: -3, color: C.fg, lineHeight: 1.05 }}>
          <Rise at={0.16}>Seringnya</Rise> <Rise at={0.68}>mereka</Rise>
          <br />
          <Rise at={1.0}>berjuang</Rise>{" "}
          <Rise at={1.44} style={{ color: AMBER }}>
            sendiri.
          </Rise>
        </div>
      </div>
      {PRESSURES.map(([label, at, x, y]) => {
        const p = prog(t, at, at + 0.4, snap);
        const bob = Math.sin((t - at) * 2.2) * 10;
        return (
          <div
            key={label}
            style={{
              position: "absolute",
              left: x,
              top: y + bob,
              padding: "20px 34px",
              borderRadius: 999,
              background: "rgba(23,23,26,0.95)",
              border: `3px solid ${C.red}`,
              fontFamily: body,
              fontWeight: 800,
              fontSize: 44,
              color: C.fg,
              opacity: prog(t, at, at + 0.15),
              scale: String(0.5 + 0.5 * p),
              boxShadow: "0 0 40px rgba(255,59,71,0.35)",
            }}
          >
            {label}
          </div>
        );
      })}
      {PRESSURES.map(([, at], i) => (
        <Sfx key={i} at={at} src="pop" volume={0.4} />
      ))}
    </AbsoluteFill>
  );
};

/* ---------- 3. LolosKerja bantu latihan (10.6–21.1) ---------- */
const FEATS: [string, string, number][] = [
  ["shots/11-koran-jalan.png", "Simulasi tes koran", 3.78],
  ["shots/09-soal-jawab.png", "150 soal psikotes + pembahasan", 5.18],
  ["shots/22-interview-jawaban.png", "40 contoh jawaban interview", 8.36],
];
const SceneApp: React.FC = () => {
  const t = useT(); // local 0 = 10.6
  const dur = 10.5;
  const idx = FEATS.reduce((a, [, , at], i) => (t >= at ? i : a), -1);
  return (
    <AbsoluteFill style={fade(t, dur)}>
      <Background />
      <div style={{ position: "absolute", top: 110, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ opacity: prog(t, 0.08, 0.25), scale: String(0.6 + 0.4 * prog(t, 0.08, 0.5, snap)) }}>
          <Logo size={96} />
        </div>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 50, color: "#d8d8de", textAlign: "center", lineHeight: 1.3 }}>
          <Rise at={0.94}>bantu mereka latihan</Rise>
          <br />
          <Rise at={2.1} style={{ color: C.fg, fontWeight: 800 }}>
            langsung dari HP.
          </Rise>
        </div>
      </div>
      {/* phone stage */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 470, height: 1000 }}>
        {FEATS.map(([src, , at], i) => {
          const inP = prog(t, at, at + 0.5, snap);
          const isOld = i < idx;
          if (t < at - 0.05) return null;
          return (
            <div
              key={src}
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                translate: `${-50 + (isOld ? -38 - (idx - i - 1) * 14 : 0)}% ${(1 - inP) * 1200}px`,
                rotate: `${isOld ? -10 : (1 - inP) * 10}deg`,
                scale: String(isOld ? 0.78 : 1),
                opacity: isOld ? 0.5 : 1,
                zIndex: i,
              }}
            >
              <Phone src={src} width={380} />
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 1560, width: "100%", display: "flex", justifyContent: "center" }}>
        {FEATS.map(([, label, at], i) =>
          i === idx ? (
            <Chip key={label} at={at} red style={{ fontSize: 42 }}>
              {label}
            </Chip>
          ) : null,
        )}
      </div>
      <Sfx at={0.08} src="ding" volume={0.3} />
      {FEATS.map(([, , at], i) => (
        <Sfx key={i} at={at} src="whoosh" volume={0.4} />
      ))}
    </AbsoluteFill>
  );
};

/* ---------- 4. Anti lowongan palsu (21.1–25.4) ---------- */
const SceneAman: React.FC = () => {
  const t = useT(); // local 0 = 21.1
  const dur = 4.3;
  const ph = prog(t, 0.6, 1.2, snap);
  return (
    <AbsoluteFill style={fade(t, dur)}>
      <Background />
      <div style={{ position: "absolute", top: 150, left: 70, right: 70, textAlign: "center" }}>
        <svg width="130" height="130" viewBox="0 0 24 24" style={{ opacity: prog(t, 0.1, 0.3), scale: String(0.6 + 0.4 * prog(t, 0.1, 0.5, snap)) }}>
          <path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3z" fill={C.ok} opacity="0.18" stroke={C.ok} strokeWidth="1.6" />
          <path d="M8 12.5l3 3 5-6" stroke={C.ok} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 80, letterSpacing: -2.5, color: C.fg, lineHeight: 1.06, marginTop: 10 }}>
          <Rise at={0.34}>Panduan supaya terhindar dari</Rise>{" "}
          <Rise at={2.36} style={{ color: C.red }}>
            lowongan palsu
          </Rise>
        </div>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 46, color: "#d8d8de", marginTop: 16 }}>
          <Rise at={3.18}>yang minta bayaran.</Rise>
        </div>
      </div>
      <div style={{ position: "absolute", left: "50%", top: 820, translate: `-50% ${(1 - ph) * 1100}px` }}>
        <Phone src="shots/32-modul4-tanda.png" width={380}>
          <div
            style={{
              position: "absolute",
              left: "3%",
              width: "94%",
              top: "26%",
              height: "23.5%",
              borderRadius: 22,
              border: `6px solid ${C.red}`,
              boxShadow: "0 0 40px rgba(255,59,71,0.8)",
              opacity: prog(t, 1.4, 1.6),
            }}
          />
        </Phone>
      </div>
      <Sfx at={0.6} src="whoosh" volume={0.4} />
    </AbsoluteFill>
  );
};

/* ---------- 5. Rencana 7 hari (25.4–29.8) ---------- */
const SceneRencana: React.FC = () => {
  const t = useT(); // local 0 = 25.4
  const dur = 4.4;
  const ph = prog(t, 0.2, 0.8, snap);
  return (
    <AbsoluteFill style={fade(t, dur)}>
      <Background />
      <div style={{ position: "absolute", top: 150, left: 70, right: 70, textAlign: "center" }}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 92, letterSpacing: -3, color: C.fg, lineHeight: 1.05 }}>
          <Rise at={0.1}>Rencana latihan</Rise>{" "}
          <Rise at={1.62} style={{ color: AMBER }}>
            7 hari
          </Rise>
        </div>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 48, color: "#d8d8de", marginTop: 18 }}>
          <Rise at={2.5}>Jelas harus mulai dari mana.</Rise>
        </div>
      </div>
      <div style={{ position: "absolute", left: "50%", top: 520, translate: `-50% ${(1 - ph) * 1100}px` }}>
        <Phone src="shots/50-rencana7.png" width={430}>
          {/* tick marks appearing on the day circles */}
          {[0, 1, 2].map((i) => {
            const at = 1.4 + i * 0.4;
            const tops = [24.6, 36.6, 44.9];
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "12.05%",
                  top: `${tops[i]}%`,
                  width: "6.4%",
                  aspectRatio: "1",
                  borderRadius: "50%",
                  background: C.ok,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: prog(t, at, at + 0.1),
                  scale: String(0.4 + 0.6 * prog(t, at, at + 0.3, snap)),
                }}
              >
                <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" stroke={C.bg} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </div>
            );
          })}
        </Phone>
      </div>
      <Sfx at={0.2} src="whoosh" volume={0.4} />
      {[0, 1, 2].map((i) => (
        <Sfx key={i} at={1.4 + i * 0.4} src="tick" volume={0.5} />
      ))}
    </AbsoluteFill>
  );
};

/* ---------- 6. CTA (29.8–34.5) ---------- */
const SceneCta: React.FC = () => {
  const t = useT(); // local 0 = 29.8
  const cta = prog(t, 2.78, 3.1, snap);
  const pulse = t > 3.15 ? 1 + Math.sin((t - 3.15) * 7) * 0.035 : 1;
  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", top: 240, left: 60, right: 60, textAlign: "center" }}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 96, letterSpacing: -3, color: C.fg, lineHeight: 1.06 }}>
          <Rise at={0.14}>Bekal kecil</Rise> <Rise at={0.94}>untuk langkah</Rise>
          <br />
          <Rise at={1.6} style={{ color: AMBER }}>
            pertama mereka.
          </Rise>
        </div>
      </div>
      <div style={{ position: "absolute", top: 820, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ opacity: prog(t, 1.9, 2.1) }}>
          <Logo size={90} />
        </div>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 42, color: C.mute, opacity: prog(t, 2.0, 2.2) }}>Sekali bayar</div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 170, letterSpacing: -6, lineHeight: 1, color: C.fg, opacity: prog(t, 2.1, 2.25), textShadow: "0 0 70px rgba(255,59,71,0.45)" }}>
          <span style={{ fontSize: 86, color: C.red, verticalAlign: "top" }}>Rp</span>49.000
        </div>
        <div style={{ fontFamily: mono, fontWeight: 700, fontSize: 32, color: C.mute, opacity: prog(t, 2.2, 2.4) }}>dipasang di HP · tanpa kuota</div>
      </div>
      <div style={{ position: "absolute", top: 1450, width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            opacity: prog(t, 2.78, 2.88),
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
      <Sfx at={2.1} src="impact" volume={0.45} />
      <Sfx at={2.78} src="ding" volume={0.4} />
    </AbsoluteFill>
  );
};

const SCENES: [string, React.FC, number, number][] = [
  ["OT-1-Intro", SceneIntro, 0, 4.1],
  ["OT-2-Sendiri", SceneSendiri, 4.1, 6.5],
  ["OT-3-App", SceneApp, 10.6, 10.5],
  ["OT-4-Aman", SceneAman, 21.1, 4.3],
  ["OT-5-Rencana", SceneRencana, 25.4, 4.4],
  ["OT-6-CTA", SceneCta, 29.8, OT_TOTAL - 29.8],
];

export const AdOrangTua: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    {SCENES.map(([id, Scene, start, dur]) => (
      <Sequence key={id} name={id} from={f(start)} durationInFrames={f(dur)}>
        <Scene />
      </Sequence>
    ))}
    <Overlay />
    <Audio src={staticFile("vo/orangtua.mp3")} />
  </AbsoluteFill>
);
