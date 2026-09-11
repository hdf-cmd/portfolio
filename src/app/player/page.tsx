import type { Metadata } from "next";
import { PlayerNav } from "@/components/player/player-nav";
import { PlayerView } from "@/components/player/player-view";

export const metadata: Metadata = {
  title: "音乐可视化播放器 | 黄栋斐",
  description:
    "项目 B：基于 Web Audio API + Anime.js + Motion 的音乐可视化播放器，展示实时频谱与手势交互。",
};

export default function PlayerPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f4f4f5]">
      <PlayerNav />
      <PlayerView />
    </main>
  );
}