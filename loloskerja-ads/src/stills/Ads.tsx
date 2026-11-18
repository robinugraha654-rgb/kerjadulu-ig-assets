import React from "react";
import { AbsoluteFill } from "remotion";
import { C, body, display, mono } from "../theme";
import { Background, Check, Logo, Overlay, Phone } from "../common";

// Static single-image ads, 1080x1350 (4:5 feed). Same look as the video ads.

const Frame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <Background />
    {children}
    <Overlay />
  </AbsoluteFill>
);

const Footer: React.FC<{ note?: string }> = ({ note = "Sekali bayar · jalan tanpa kuota" }) => (
  <div
    style={{
      position: "absolute",
      left: 60,
      right: 60,
      bottom: 54,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Logo size={64} />
    <div style={{ textAlign: "right" }}>
      <div
        style={{
          display: "inline-block",
          background: C.red,
          color: C.redInk,
          fontFamily: display,
          fontWeight: 800,
          fontSize: 50,
          padding: "8px 30px",
          borderRadius: 999,
          boxShadow: "0 0 40px rgba(255,59,71,0.55)",
        }}
      >
        Rp49.000
      </div>
      <div style={{ fontFamily: body, fontWeight: 700, fontSize: 26, color: C.mute, marginTop: 8 }}>{note}</div>
    </div>
  </div>
);

const Pill: React.FC<{ children: React.ReactNode; red?: boolean; size?: number }> = ({ children, red, size = 34 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 24px",
      borderRadius: 999,
      fontFamily: body,
      fontWeight: 800,
      fontSize: size,
      color: red ? C.redInk : C.fg,
      background: red ? C.red : "rgba(23,23,26,0.92)",
      border: red ? "none" : `2px solid ${C.line}`,
    }}
  >
    {children}
  </div>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: body, fontWeight: 800, fontSize: 30, letterSpacing: 6, color: C.red }}>{children}</div>
);

/* 1 — Lulusan SMK, ada panggilan tes */
export const AdPanggilan: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 70, top: 80, width: 640 }}>
      <Eyebrow>LULUSAN SMA/SMK</Eyebrow>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 90, lineHeight: 0.98, letterSpacing: -3, color: C.fg, marginTop: 16 }}>
        Minggu ini ada <span style={{ color: C.red }}>panggilan tes pabrik?</span>
      </div>
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 38, lineHeight: 1.35, color: "#d4d4da", marginTop: 30 }}>
        Latihan dulu malam ini, biar besok nggak kaget sama soalnya.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 40, alignItems: "flex-start" }}>
        <Pill>
          <Check size={30} /> Simulasi tes koran
        </Pill>
        <Pill>
          <Check size={30} /> 150 soal psikotes
        </Pill>
        <Pill>
          <Check size={30} /> 40 jawaban interview HRD
        </Pill>
      </div>
    </div>
    <div style={{ position: "absolute", right: -110, top: 170, rotate: "8deg" }}>
      <Phone src="shots/11-koran-jalan.png" width={400} />
    </div>
    <Footer />
  </Frame>
);

/* 2 — Mengapa kami harus memilih Anda? */
export const AdHRD: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 60, right: 60, top: 70 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: mono, fontWeight: 800, fontSize: 28, color: C.mute }}>
        <span style={{ width: 20, height: 20, borderRadius: "50%", background: C.red, boxShadow: "0 0 14px rgba(255,59,71,0.9)" }} />
        INTERVIEW HRD
      </div>
      <div
        style={{
          marginTop: 26,
          padding: "40px 46px",
          borderRadius: "48px 48px 48px 12px",
          background: C.fg,
          color: C.bg,
          fontFamily: display,
          fontWeight: 800,
          fontSize: 88,
          lineHeight: 1.02,
          letterSpacing: -3,
          boxShadow: "0 30px 70px rgba(0,0,0,0.6), 0 0 70px rgba(255,59,71,0.3)",
        }}
      >
        “Mengapa kami harus <span style={{ color: "#D7111D" }}>memilih Anda?</span>”
      </div>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 84, letterSpacing: -2.5, color: C.red, marginTop: 34, textShadow: "0 0 50px rgba(255,59,71,0.5)" }}>
        Kamu jawab apa?
      </div>
    </div>
    <div style={{ position: "absolute", left: 60, right: 60, top: 700 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        <Pill size={30}>“Apa kelebihan Anda?”</Pill>
        <Pill size={30}>“Siap kerja shift?”</Pill>
        <Pill size={30}>“Gaji yang diharapkan?”</Pill>
      </div>
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 36, lineHeight: 1.38, color: "#d4d4da", marginTop: 40 }}>
        40 pertanyaan HRD yang sering muncul, lengkap dengan <b style={{ color: C.fg }}>maksud HRD</b>, <b style={{ color: C.fg }}>contoh jawaban</b>, dan{" "}
        <b style={{ color: C.fg }}>yang harus dihindari</b>.
      </div>
    </div>
    <Footer note="Plus 150 soal psikotes & tes koran" />
  </Frame>
);

/* 3 — Ngebut di awal tes koran */
const BARS = [19, 18, 18, 16, 14, 12, 10, 8, 7, 6];
export const AdNgebut: React.FC = () => {
  const W = 880;
  const H = 360;
  const bw = 58;
  const gap = (W - bw * BARS.length) / (BARS.length - 1);
  return (
    <Frame>
      <div style={{ position: "absolute", left: 70, right: 70, top: 80 }}>
        <Eyebrow>TES KORAN · KRAEPELIN</Eyebrow>
        <div style={{ fontFamily: display, fontWeight: 800, fontSize: 104, lineHeight: 0.98, letterSpacing: -3.5, color: C.fg, marginTop: 14 }}>
          <span style={{ fontStyle: "italic" }}>Ngebut</span> di awal justru bisa bikin <span style={{ color: C.red }}>gugur.</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          top: 470,
          height: 560,
          borderRadius: 44,
          background: C.surface,
          border: `2px solid ${C.line}`,
          padding: "34px 40px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: body, fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.mute }}>
          <span>GRAFIK KERJA PER LAJUR</span>
          <span style={{ color: C.red }}>anjlok di akhir ↓</span>
        </div>
        <div style={{ position: "relative", width: W, height: H, marginTop: 40 }}>
          {BARS.map((v, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: i * (bw + gap),
                bottom: 0,
                width: bw,
                height: (v / 20) * H,
                borderRadius: "14px 14px 4px 4px",
                background: i < 3 ? C.fg : i >= 7 ? C.red : "#5a5a62",
                boxShadow: i >= 7 ? "0 0 26px rgba(255,59,71,0.7)" : "none",
              }}
            />
          ))}
          <svg width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
            <path
              d={`M ${bw / 2} ${H - (19 / 20) * H - 24} L ${W - bw / 2} ${H - (6 / 20) * H - 24}`}
              stroke={C.red}
              strokeWidth={8}
              strokeLinecap="round"
            />
            <path d={`M ${bw / 2} ${H - (14 / 20) * H} L ${W - bw / 2} ${H - (14 / 20) * H}`} stroke={C.ok} strokeWidth={5} strokeDasharray="20 14" />
          </svg>
          <div style={{ position: "absolute", right: 0, top: H - (14 / 20) * H - 52, fontFamily: body, fontWeight: 800, fontSize: 28, color: C.ok }}>
            yang dicari: rata
          </div>
        </div>
        <div style={{ fontFamily: body, fontWeight: 600, fontSize: 32, color: "#d4d4da", marginTop: 28 }}>
          Latih ritme per lajur sampai grafikmu stabil.
        </div>
      </div>
      <Footer note="Simulasi tes koran + 150 soal psikotes" />
    </Frame>
  );
};

/* 4 — Challenge deret */
export const AdDeret: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 70, right: 70, top: 80 }}>
      <Eyebrow>PSIKOTES · DERET ANGKA</Eyebrow>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 88, lineHeight: 1, letterSpacing: -3, color: C.fg, marginTop: 14 }}>
        Bisa jawab dalam <span style={{ color: C.red, whiteSpace: "nowrap" }}>5 detik?</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 330, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
      {["2", "4", "8", "16", "32", "?"].map((v) => (
        <div
          key={v}
          style={{
            height: 150,
            borderRadius: 32,
            background: v === "?" ? "rgba(255,59,71,0.12)" : C.surface,
            border: `4px solid ${v === "?" ? C.red : C.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: display,
            fontWeight: 800,
            fontSize: 108,
            color: v === "?" ? C.red : C.fg,
            boxShadow: v === "?" ? "0 0 50px rgba(255,59,71,0.45)" : "none",
          }}
        >
          {v}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 700, display: "flex", gap: 18 }}>
      {[
        ["A", "61"],
        ["B", "128"],
        ["C", "64"],
        ["D", "60"],
      ].map(([k, v]) => (
        <div
          key={k}
          style={{
            flex: 1,
            height: 110,
            borderRadius: 28,
            background: C.surface,
            border: `3px solid ${C.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            fontFamily: body,
            fontWeight: 800,
            fontSize: 44,
            color: C.fg,
          }}
        >
          <span style={{ fontSize: 30, color: C.mute }}>{k}</span>
          {v}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 70, right: 70, top: 870, textAlign: "center" }}>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 56, color: C.fg, letterSpacing: -1.5 }}>
        Tulis jawabanmu di komentar
      </div>
      <div style={{ fontFamily: body, fontWeight: 600, fontSize: 32, color: C.mute, marginTop: 14 }}>
        150 soal kayak gini + pembahasan ada di LolosKerja.
      </div>
    </div>
    <Footer />
  </Frame>
);

/* 5 — Product / offer */
export const AdKit: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 0, right: 0, top: 70, textAlign: "center" }}>
      <Eyebrow>APP LATIHAN TES PABRIK</Eyebrow>
      <div style={{ fontFamily: display, fontWeight: 800, fontSize: 84, lineHeight: 1, letterSpacing: -3, color: C.fg, marginTop: 14, padding: "0 60px" }}>
        Tes koran, psikotes &amp; interview HRD. <span style={{ color: C.red, whiteSpace: "nowrap" }}>Satu app.</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 420, height: 560 }}>
      <div style={{ position: "absolute", left: 130, top: 60, rotate: "-10deg", opacity: 0.95 }}>
        <Phone src="shots/09-soal-jawab.png" width={220} />
      </div>
      <div style={{ position: "absolute", right: 130, top: 60, rotate: "10deg", opacity: 0.95 }}>
        <Phone src="shots/03-interview.png" width={220} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 0, translate: "-50% 0px" }}>
        <Phone src="shots/11-koran-jalan.png" width={260} />
      </div>
    </div>
    <div style={{ position: "absolute", left: 40, right: 40, top: 1050, display: "flex", justifyContent: "center", gap: 12 }}>
      <Pill size={27}>
        <Check size={24} /> 150 soal + pembahasan
      </Pill>
      <Pill size={27}>
        <Check size={24} /> 40 kartu HRD
      </Pill>
      <Pill size={27}>
        <Check size={24} /> Tanpa kuota
      </Pill>
    </div>
    <Footer note="Sekali bayar · garansi 7 hari" />
  </Frame>
);
