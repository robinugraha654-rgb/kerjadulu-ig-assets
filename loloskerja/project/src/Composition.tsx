import React from "react";
import { AbsoluteFill, Composition, Folder, Sequence, Still, staticFile } from "remotion";
import { AdDeret, AdHRD, AdKit, AdNgebut, AdPanggilan } from "./stills/Ads";
import { StoryIntro, StoryKoran, StoryHasil, StoryPsikotes, StoryBahas, StoryInterview, StoryPanduan, StoryDokumen, StoryLoker, StoryRencana, StoryClosing, CoverIsiApp } from "./stills/Stories";
import { ProfileDark, ProfileRed, ProfileMono } from "./stills/Profile";
import { AdLokerPalsu, LP_TOTAL } from "./scenes/LokerPalsu";
import { AdBerkas, BK_TOTAL } from "./scenes/Berkas";
import { AdOrangTua, OT_TOTAL } from "./scenes/OrangTua";
import { Thumb1, Thumb7, Thumb12, Thumb13, ThumbLoker, ThumbBerkas, ThumbOrangTua } from "./stills/Thumbs";
import { Car1Hook, Car2Koran, Car3Grafik, Car4Psikotes, Car5Interview, Car6Offer } from "./stills/Carousel";
import { Audio } from "@remotion/media";
import { FPS, f } from "./theme";
import { Overlay } from "./common";
import { S1Hook, S1_DUR } from "./scenes/S1Hook";
import { S7HookHRD, S7_DUR } from "./scenes/S7HookHRD";
import { S12HookNgebut, S12_DUR } from "./scenes/S12HookNgebut";
import { S13HookDeret, S13_DUR } from "./scenes/S13HookDeret";
import { S2Problem, S2_DUR } from "./scenes/S2Problem";
import { S3Koran, S3_DUR } from "./scenes/S3Koran";
import { S4Reveal, S4_DUR } from "./scenes/S4Reveal";
import { S5Features, S5_DUR } from "./scenes/S5Features";
import { S6Cta, S6_DUR } from "./scenes/S6Cta";

type Scene = { id: string; C: React.FC; start: number; dur: number };

// Shared body. Start times (relative to the end of the hook) follow the word timestamps of public/vo/vo.mp3
const BODY_START = 4.45;
const BODY: Scene[] = [
  { id: "S2-Problem", C: S2Problem, start: 4.45, dur: S2_DUR },
  { id: "S3-TesKoran", C: S3Koran, start: 9.1, dur: S3_DUR },
  { id: "S4-Reveal", C: S4Reveal, start: 14.35, dur: S4_DUR },
  { id: "S5-Features", C: S5Features, start: 17.65, dur: S5_DUR },
  { id: "S6-CTA", C: S6Cta, start: 23.9, dur: S6_DUR },
];
const BODY_END = 30.5;

/** Hook scene + the shared body, shifted to start when the hook ends */
const buildScenes = (hook: Scene): Scene[] => [
  hook,
  ...BODY.map((s) => ({ ...s, start: s.start - BODY_START + hook.dur })),
];

const VARIANTS = [
  { id: "Hook1", hook: { id: "S1-Hook", C: S1Hook, start: 0, dur: S1_DUR }, vo: "vo/vo.mp3" },
  { id: "Hook7", hook: { id: "S7-HookHRD", C: S7HookHRD, start: 0, dur: S7_DUR }, vo: "vo/vo-hook7.mp3" },
  { id: "Hook12", hook: { id: "S12-HookNgebut", C: S12HookNgebut, start: 0, dur: S12_DUR }, vo: "vo/vo-hook12.mp3" },
  { id: "Hook13", hook: { id: "S13-HookDeret", C: S13HookDeret, start: 0, dur: S13_DUR }, vo: "vo/vo-hook13.mp3" },
];

const Ad: React.FC<{ scenes: Scene[]; vo: string }> = ({ scenes, vo }) => (
  <AbsoluteFill style={{ backgroundColor: "#0B0B0C" }}>
    {scenes.map(({ id, C: SceneC, start, dur }) => (
      <Sequence key={id} name={id} from={f(start)} durationInFrames={f(dur)}>
        <SceneC />
      </Sequence>
    ))}
    <Overlay />
    <Audio src={staticFile(vo)} volume={1} />
  </AbsoluteFill>
);

export const MyComposition = () => {
  return (
    <>
      {VARIANTS.map(({ id, hook, vo }) => {
        const scenes = buildScenes(hook);
        const total = hook.dur + BODY_END - BODY_START;
        const Comp: React.FC = () => <Ad scenes={scenes} vo={vo} />;
        return <Composition key={id} id={id} component={Comp} durationInFrames={f(total)} fps={FPS} width={1080} height={1920} />;
      })}
      <Folder name="SingleImage">
        <Still id="Img-1-Panggilan" component={AdPanggilan} width={1080} height={1350} />
        <Still id="Img-2-HRD" component={AdHRD} width={1080} height={1350} />
        <Still id="Img-3-Ngebut" component={AdNgebut} width={1080} height={1350} />
        <Still id="Img-4-Deret" component={AdDeret} width={1080} height={1350} />
        <Still id="Img-5-Kit" component={AdKit} width={1080} height={1350} />
      </Folder>
      <Composition id="Angle-LokerPalsu" component={AdLokerPalsu} durationInFrames={f(LP_TOTAL)} fps={FPS} width={1080} height={1920} />
      <Composition id="Angle-Berkas" component={AdBerkas} durationInFrames={f(BK_TOTAL)} fps={FPS} width={1080} height={1920} />
      <Composition id="Angle-OrangTua" component={AdOrangTua} durationInFrames={f(OT_TOTAL)} fps={FPS} width={1080} height={1920} />
      <Folder name="Story-IsiApp">
        <Still id="Story-00-Intro" component={StoryIntro} width={1080} height={1920} />
        <Still id="Story-01-Koran" component={StoryKoran} width={1080} height={1920} />
        <Still id="Story-02-Hasil" component={StoryHasil} width={1080} height={1920} />
        <Still id="Story-03-Psikotes" component={StoryPsikotes} width={1080} height={1920} />
        <Still id="Story-04-Bahas" component={StoryBahas} width={1080} height={1920} />
        <Still id="Story-05-Interview" component={StoryInterview} width={1080} height={1920} />
        <Still id="Story-06-Panduan" component={StoryPanduan} width={1080} height={1920} />
        <Still id="Story-07-Dokumen" component={StoryDokumen} width={1080} height={1920} />
        <Still id="Story-08-Loker" component={StoryLoker} width={1080} height={1920} />
        <Still id="Story-09-Rencana" component={StoryRencana} width={1080} height={1920} />
        <Still id="Story-10-Closing" component={StoryClosing} width={1080} height={1920} />
        <Still id="Cover-IsiApp" component={CoverIsiApp} width={1080} height={1920} />
      </Folder>
      <Folder name="Profile">
        <Still id="Profile-Dark" component={ProfileDark} width={1080} height={1080} />
        <Still id="Profile-Red" component={ProfileRed} width={1080} height={1080} />
        <Still id="Profile-Mono" component={ProfileMono} width={1080} height={1080} />
      </Folder>
      <Folder name="Thumbnails">
        <Still id="Thumb-Hook1" component={Thumb1} width={1080} height={1920} />
        <Still id="Thumb-Hook7" component={Thumb7} width={1080} height={1920} />
        <Still id="Thumb-Hook12" component={Thumb12} width={1080} height={1920} />
        <Still id="Thumb-Hook13" component={Thumb13} width={1080} height={1920} />
        <Still id="Thumb-LokerPalsu" component={ThumbLoker} width={1080} height={1920} />
        <Still id="Thumb-Berkas" component={ThumbBerkas} width={1080} height={1920} />
        <Still id="Thumb-OrangTua" component={ThumbOrangTua} width={1080} height={1920} />
      </Folder>
      <Folder name="Carousel">
        <Still id="Car-1-Hook" component={Car1Hook} width={1080} height={1080} />
        <Still id="Car-2-Koran" component={Car2Koran} width={1080} height={1080} />
        <Still id="Car-3-Grafik" component={Car3Grafik} width={1080} height={1080} />
        <Still id="Car-4-Psikotes" component={Car4Psikotes} width={1080} height={1080} />
        <Still id="Car-5-Interview" component={Car5Interview} width={1080} height={1080} />
        <Still id="Car-6-Offer" component={Car6Offer} width={1080} height={1080} />
      </Folder>
      <Folder name="Scenes">
        {[...VARIANTS.map((v) => v.hook), ...BODY].map(({ id, C: SceneC, dur }) => (
          <Composition key={id} id={id} component={SceneC} durationInFrames={f(dur)} fps={FPS} width={1080} height={1920} />
        ))}
      </Folder>
    </>
  );
};
