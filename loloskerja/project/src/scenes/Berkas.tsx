import React from "react";
import { AbsoluteFill, Sequence, random, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { C, body, display, f, mono, prog, snap } from "../theme";
import { Background, Check, Chip, Logo, Overlay, Phone, Rise, Sfx, shake, useT } from "../common";

// Angle: gugur karena berkas. VO = public/vo/berkas.mp3 (word timestamps from transcription).
export const BK_TOTAL = 28.0;

const fade = (t: number, dur: number) => {
  const o = prog(t, dur - 0.2, dur);
  return { opacity: 1 - o, filter: `blur(${o * 10}px)` } as React.CSSProperties;
};

const XMark: React.FC<{ size?: number }> = ({ size = 56 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth={3.4} strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

/* ---------- 1. Gugur sebelum tes (0–3.4) ---------- */
const SceneGugur: React.FC = () => {
  const t = useT();
  const dur = 3.4;
  const stamp = prog(t, 0.58, 0.85, snap);
  const fall = prog(t, 0.55, 1.3);
  return (
    <AbsoluteFill style={{ translate: shake(t, 0.6, 0.4, 26), ...fade(t, dur) }}>
      <Background flash={Math.max(0, 1 - Math.abs(t - 0.6) / 0.1) * 0.3} />
      {/* folders */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 980, height: 600 }}>
        {[0, 1, 2, 3].map((i) => {
          const isOut = i === 3;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 300 + i * 20,
                top: 120 - i * 26,
                width: 480,
                height: 330,
                borderRadius: 24,
                background: "linear-gradient(160deg,#c89a5b,#a87a3f)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                rotate: `${-4 + i * 2 + (isOut ? fall * 28 : 0)}deg`,
                translate: isOut ? `${fall * 420}px ${fall * 520}px` : "0px 0px",
                opacity: isOut ? 1 - fall * 0.6 : 1,
                display: "flex",
                alignItems: "flex-start",
                padding: 30,
                fontFamily: mono,
                fontWeight: 800,
                fontSize: 30,
                color: "rgba(40,24,6,0.7)",
              }}
            >
              LAMARAN
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 260, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 72, color: C.mute }}>
          <Rise at={0.04}>Kamu</Rise> <Rise at={0.28}>bisa</Rise>
        </div>
        <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
          <div
            style={{
              border: `14px solid ${C.red}`,
              borderRadius: 40,
              padding: "6px 50px 22px",
              fontFamily: display,
              fontWeight: 800,
              fontSize: 220,
              color: C.red,
              letterSpacing: -6,
              lineHeight: 1,
              rotate: `${-5 + (1 - stamp) * -12}deg`,
              scale: String(2.3 - 1.3 * stamp),
              opacity: prog(t, 0.58, 0.66),
              background: "rgba(11,11,12,0.85)",
              boxShadow: "0 0 90px rgba(255,59,71,0.5)",
            }}
          >
            GUGUR
          </div>
        </div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 84, color: C.fg, letterSpacing: -2, marginTop: 50, lineHeight: 1.05 }}>
          <Rise at={1.58}>bahkan</Rise> <Rise at={2.06}>sebelum</Rise>
          <br />
          <Rise at={2.36} style={{ color: C.red }}>
            ikut tes.
          </Rise>
        </div>
      </div>
      <Sfx at={0.58} src="impact" volume={0.8} />
      <Sfx at={0.62} src="whoosh" volume={0.4} />
    </AbsoluteFill>
  );
};

/* ---------- 2. HRD cuma butuh beberapa detik (3.4–6.9) ---------- */
const SceneDetik: React.FC = () => {
  const t = useT(); // local 0 = 3.4
  const dur = 3.5;
  const secs = Math.max(0, 5 - Math.max(0, t - 0.3) * 1.9);
  return (
    <AbsoluteFill style={fade(t, dur)}>
      <Background />
      {/* swiping CV cards */}
      <AbsoluteFill style={{ overflow: "hidden" }}>
        {Array.from({ length: 9 }).map((_, i) => {
          const at = 0.4 + i * 0.32;
          const p = prog(t, at, at + 0.45);
          if (t < at || p >= 1) return null;
          const dir = random(`d${i}`) > 0.3 ? -1 : 1;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 330,
                top: 1050,
                width: 420,
                height: 560,
                borderRadius: 26,
                background: "#f1ede4",
                boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                translate: `${dir * p * 1100}px ${-p * 80}px`,
                rotate: `${dir * p * 25}deg`,
                padding: 36,
              }}
            >
              <div style={{ width: 90, height: 110, background: "#cfc8b8", borderRadius: 10 }} />
              {[0, 1, 2, 3, 4, 5].map((r) => (
                <div key={r} style={{ height: 16, width: `${90 - r * 9}%`, background: "#d9d2c3", borderRadius: 8, marginTop: 24 }} />
              ))}
            </div>
          );
        })}
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 220, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 64, color: C.mute }}>
          <Rise at={0.06}>karena</Rise> <Rise at={0.38}>HRD</Rise> <Rise at={1.02}>cuma</Rise> <Rise at={1.26}>butuh</Rise>
        </div>
        <div
          style={{
            fontFamily: mono,
            fontWeight: 800,
            fontSize: 220,
            color: C.red,
            lineHeight: 1,
            marginTop: 20,
            textShadow: "0 0 60px rgba(255,59,71,0.6)",
            opacity: prog(t, 0.2, 0.35),
          }}
        >
          00:0{Math.ceil(secs)}
        </div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 76, color: C.fg, letterSpacing: -2, marginTop: 10 }}>
          <Rise at={1.48}>buat</Rise> <Rise at={2.46}>nilai berkasmu.</Rise>
        </div>
      </div>
      {Array.from({ length: 9 }).map((_, i) => (
        <Sfx key={i} at={0.4 + i * 0.32} src="whoosh" volume={0.18} />
      ))}
    </AbsoluteFill>
  );
};

/* ---------- 3. 4 kesalahan → diperbaiki (6.9–18.6) ---------- */
const MISTAKES: { at: number; label: string; bad: React.ReactNode; good: React.ReactNode }[] = [
  {
    at: 0.06,
    label: "Nama file",
    bad: <span style={{ fontFamily: mono, fontWeight: 800 }}>IMG_2045.jpg</span>,
    good: <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 32 }}>CV_NamaLengkap_{"\u200B"}Operator.pdf</span>,
  },
  {
    at: 1.52,
    label: "Foto",
    bad: <span>Selfie + filter ✨</span>,
    good: <span>Rapi, latar polos</span>,
  },
  {
    at: 3.06,
    label: "Email",
    bad: <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 32 }}>cowokkeren99{"\u200B"}@gmail.com</span>,
    good: <span style={{ fontFamily: mono, fontWeight: 800, fontSize: 32 }}>nama.belakang{"\u200B"}@gmail.com</span>,
  },
  {
    at: 4.06,
    label: "Scan",
    bad: <span style={{ filter: "blur(3px)" }}>Dokumen buram</span>,
    good: <span>Terang &amp; lurus</span>,
  },
];
const FIX = 8.7; // local, "Padahal" ≈ 15.58

const SceneMistakes: React.FC = () => {
  const t = useT(); // local 0 = 6.9
  const dur = 11.7;
  const disisih = prog(t, 7.36, 7.65, snap);
  const fixed = t >= FIX;
  return (
    <AbsoluteFill style={{ translate: shake(t, 7.36, 0.35, 18), ...fade(t, dur) }}>
      <Background flash={Math.max(0, 1 - Math.abs(t - 7.36) / 0.1) * 0.25} />
      <div style={{ position: "absolute", top: 140, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: fixed ? C.ok : C.red }}>
          {fixed ? "PERBAIKANNYA" : "KESALAHAN YANG SERING"}
        </div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 90, letterSpacing: -2.5, color: C.fg, lineHeight: 1.05, marginTop: 10, height: 200 }}>
          {fixed ? (
            <>
              <Rise at={FIX + 0.6}>Bisa dibenerin sendiri,</Rise>
              <br />
              <Rise at={FIX + 2.2} style={{ color: C.ok }}>
                gratis.
              </Rise>
            </>
          ) : (
            <>
              <Rise at={5.1}>Kelihatannya sepele…</Rise>
              <br />
              <Rise at={6.34} style={{ color: C.red }}>
                tapi fatal.
              </Rise>
            </>
          )}
        </div>
      </div>
      <div style={{ position: "absolute", left: 60, right: 60, top: 520, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {MISTAKES.map((m, i) => {
          const p = prog(t, m.at, m.at + 0.4, snap);
          const flipAt = FIX + i * 0.15;
          const fl = prog(t, flipAt, flipAt + 0.35);
          const showGood = fl > 0.5;
          return (
            <div
              key={m.label}
              style={{
                height: 480,
                borderRadius: 40,
                padding: "34px 30px",
                background: showGood ? "rgba(61,220,151,0.10)" : C.surface,
                border: `4px solid ${showGood ? C.ok : i === MISTAKES.findIndex((x, j) => t >= x.at && (j === 3 || t < MISTAKES[j + 1].at)) && !fixed ? C.red : C.line}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                opacity: prog(t, m.at, m.at + 0.15),
                scale: String(0.6 + 0.4 * p),
                rotate: `y ${Math.sin(fl * Math.PI) * 85}deg`,
                boxShadow: "0 24px 50px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ fontFamily: body, fontWeight: 800, fontSize: 32, letterSpacing: 4, color: C.mute }}>{m.label.toUpperCase()}</div>
              <div style={{ fontFamily: body, fontWeight: 700, fontSize: 44, color: C.fg, lineHeight: 1.25, wordBreak: "normal" }}>
                {showGood ? m.good : m.bad}
              </div>
              <div>{showGood ? <Check size={64} /> : <XMark size={64} />}</div>
            </div>
          );
        })}
      </div>
      {/* DISISIHKAN stamp */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingTop: 460, opacity: prog(t, 7.36, 7.44) * (1 - prog(t, FIX - 0.3, FIX)) }}>
        <div
          style={{
            border: `14px solid ${C.red}`,
            borderRadius: 36,
            padding: "8px 46px 22px",
            fontFamily: display,
            fontWeight: 800,
            fontSize: 150,
            letterSpacing: -4,
            color: C.red,
            background: "rgba(11,11,12,0.88)",
            rotate: `${-8 + (1 - disisih) * -10}deg`,
            scale: String(2 - disisih),
            boxShadow: "0 0 100px rgba(255,59,71,0.55)",
          }}
        >
          DISISIHKAN
        </div>
      </AbsoluteFill>
      {MISTAKES.map((m, i) => (
        <Sfx key={i} at={m.at} src="pop" volume={0.45} />
      ))}
      <Sfx at={7.36} src="impact" volume={0.8} />
      <Sfx at={7.38} src="glitch" volume={0.35} />
      <Sfx at={FIX} src="whoosh" volume={0.45} />
      <Sfx at={FIX + 2.2} src="ding" volume={0.45} />
    </AbsoluteFill>
  );
};

/* ---------- 4. Di LolosKerja (18.6–24.0) ---------- */
const SceneApp: React.FC = () => {
  const t = useT(); // local 0 = 18.6
  const dur = 5.4;
  const ph = (at: number) => prog(t, at, at + 0.55, snap);
  return (
    <AbsoluteFill style={fade(t, dur)}>
      <Background />
      <div style={{ position: "absolute", top: 110, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ fontFamily: body, fontWeight: 800, fontSize: 50, color: C.mute }}>
          <Rise at={0.06}>Di</Rise>
        </div>
        <div style={{ opacity: prog(t, 0.2, 0.35), scale: String(0.6 + 0.4 * prog(t, 0.2, 0.6, snap)) }}>
          <Logo size={100} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 420, height: 1100 }}>
        <div style={{ position: "absolute", left: 40, top: 120, rotate: "-9deg", translate: `${(1 - ph(2.1)) * -900}px 0px` }}>
          <Phone src="shots/43-modul1-cv.png" width={300} />
        </div>
        <div style={{ position: "absolute", right: 40, top: 120, rotate: "9deg", translate: `${(1 - ph(3.24)) * 900}px 0px` }}>
          <Phone src="shots/44-modul1-wa.png" width={300} />
        </div>
        <div style={{ position: "absolute", left: "50%", top: 0, translate: `-50% ${(1 - ph(1.1)) * 1300}px` }}>
          <Phone src="shots/42-modul1-checklist.png" width={350}>
            <div
              style={{
                position: "absolute",
                left: "3%",
                width: "94%",
                top: "21%",
                height: "18%",
                borderRadius: 20,
                border: `6px solid ${C.red}`,
                boxShadow: "0 0 40px rgba(255,59,71,0.8)",
                opacity: prog(t, 1.6, 1.8),
              }}
            />
          </Phone>
        </div>
      </div>
      <div style={{ position: "absolute", top: 1560, width: "100%", display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", padding: "0 40px" }}>
        <Chip at={1.12} red style={{ fontSize: 36, padding: "14px 26px" }}>
          Checklist berkas
        </Chip>
        <Chip at={2.12} red style={{ fontSize: 36, padding: "14px 26px" }}>
          3 template CV
        </Chip>
        <Chip at={3.24} red style={{ fontSize: 36, padding: "14px 26px" }}>
          Contoh pesan WA ke HRD
        </Chip>
      </div>
      <Sfx at={0.2} src="ding" volume={0.35} />
      <Sfx at={1.1} src="whoosh" volume={0.45} />
      <Sfx at={2.1} src="whoosh" volume={0.4} />
      <Sfx at={3.24} src="whoosh" volume={0.4} />
    </AbsoluteFill>
  );
};

/* ---------- 5. CTA (24.0–28.0) ---------- */
const SceneCta: React.FC = () => {
  const t = useT(); // local 0 = 24.0
  const cta = prog(t, 1.82, 2.15, snap);
  const pulse = t > 2.2 ? 1 + Math.sin((t - 2.2) * 7) * 0.035 : 1;
  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", top: 240, width: "100%", textAlign: "center" }}>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 112, letterSpacing: -3.5, color: C.fg, lineHeight: 1.04 }}>
          <Rise at={0.18}>Rapikan</Rise> <Rise at={0.6}>berkasmu</Rise>
          <br />
          <Rise at={1.06} style={{ color: C.red }}>
            malam ini.
          </Rise>
        </div>
      </div>
      <div style={{ position: "absolute", top: 760, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
        <div style={{ opacity: prog(t, 0.9, 1.1) }}>
          <Logo size={90} />
        </div>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 170, letterSpacing: -6, lineHeight: 1, color: C.fg, opacity: prog(t, 1.1, 1.25), textShadow: "0 0 70px rgba(255,59,71,0.45)" }}>
          <span style={{ fontSize: 86, color: C.red, verticalAlign: "top" }}>Rp</span>49.000
        </div>
        <div style={{ fontFamily: body, fontWeight: 700, fontSize: 38, color: C.mute, textAlign: "center", opacity: prog(t, 1.2, 1.4), lineHeight: 1.35 }}>
          Plus latihan tes koran, psikotes
          <br />& interview HRD
        </div>
      </div>
      <div style={{ position: "absolute", top: 1430, width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            opacity: prog(t, 1.82, 1.92),
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
      <Sfx at={1.1} src="impact" volume={0.55} />
      <Sfx at={1.82} src="ding" volume={0.4} />
    </AbsoluteFill>
  );
};

const SCENES: [string, React.FC, number, number][] = [
  ["BK-1-Gugur", SceneGugur, 0, 3.4],
  ["BK-2-Detik", SceneDetik, 3.4, 3.5],
  ["BK-3-Kesalahan", SceneMistakes, 6.9, 11.7],
  ["BK-4-App", SceneApp, 18.6, 5.4],
  ["BK-5-CTA", SceneCta, 24.0, BK_TOTAL - 24.0],
];

export const AdBerkas: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    {SCENES.map(([id, Scene, start, dur]) => (
      <Sequence key={id} name={id} from={f(start)} durationInFrames={f(dur)}>
        <Scene />
      </Sequence>
    ))}
    <Overlay />
    <Audio src={staticFile("vo/berkas.mp3")} />
  </AbsoluteFill>
);
