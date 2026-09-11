import type { Metadata } from "next";
import { LabNav } from "@/components/lab/lab-nav";
import { LabView } from "@/components/lab/lab-view";

export const metadata: Metadata = {
  title: "动效对比实验室 | 黄栋斐",
  description:
    "项目 C：同一动效分别用纯 CSS、Anime.js、Motion 三种方式实现，量化对比帧率与代码量，展示工程判断力。",
};

export default function LabPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f4f4f5]">
      <LabNav />
      <LabView />
    </main>
  );
}