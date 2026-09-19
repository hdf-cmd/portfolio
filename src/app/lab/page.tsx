import type { Metadata } from "next";
import { LabNav } from "@/components/lab/lab-nav";
import { LabView } from "@/components/lab/lab-view";

export const metadata: Metadata = {
  title: "动效实验室 | 黄栋斐",
  description:
    "项目 C：动效对比实验室 —— 三引擎实现对比 + 迪士尼动画十二原理可交互小样，展示动效工程与理论功底。",
};

export default function LabPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-[#f4f4f5]">
      <LabNav />
      <LabView />
    </main>
  );
}