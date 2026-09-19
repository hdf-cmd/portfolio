import type { Metadata } from "next";
import { BurnSubNav } from "@/components/burn/burn-sub-nav";
import { BurnClasses } from "@/components/burn/burn-classes";
import { BurnFooter } from "@/components/burn/burn-footer";

export const metadata: Metadata = {
  title: "燃点运动 · 每周课程表",
  description: "燃点运动团课课程表 —— 每周 14 节,力量 / 耐力 / 恢复三大系列。",
};

export default function BurnClassesPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white">
      <BurnSubNav active="classes" />
      <BurnClasses />
      <BurnFooter />
    </main>
  );
}
