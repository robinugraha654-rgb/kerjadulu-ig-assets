import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { Easing, interpolate } from "remotion";

// Same palette as the LolosKerja app
export const C = {
  bg: "#0B0B0C",
  surface: "#17171A",
  line: "#2E2E33",
  fg: "#F5F5F6",
  mute: "#A3A3AB",
  red: "#FF3B47",
  redInk: "#1A0204",
  ok: "#3DDC97",
};

// Fonts are bundled locally (public/fonts) so rendering works offline
const fonts: [string, string, string][] = [
  ["Bricolage Grotesque", "BricolageGrotesque-700.woff2", "700 800"],
  ["Plus Jakarta Sans", "PlusJakartaSans-500.woff2", "500 800"],
  ["JetBrains Mono", "JetBrainsMono-700.woff2", "700 800"],
  ["Caveat", "Caveat-700.woff2", "700"],
];
fonts.forEach(([family, file, weight]) => {
  loadFont({ family, url: staticFile(`fonts/${file}`), weight });
});

export const display = "'Bricolage Grotesque', sans-serif";
export const body = "'Plus Jakarta Sans', sans-serif";
export const hand = "'Caveat', cursive";
export const mono = "'JetBrains Mono', monospace";

export const FPS = 30;
export const out = Easing.bezier(0.16, 1, 0.3, 1);
export const snap = Easing.bezier(0.34, 1.56, 0.64, 1); // overshoot

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0→1 progress between two times (seconds) */
export const prog = (t: number, a: number, b: number, easing = out) =>
  interpolate(t, [a, b], [0, 1], { ...clamp, easing });

/** Map seconds to frames */
export const f = (s: number) => Math.round(s * FPS);
