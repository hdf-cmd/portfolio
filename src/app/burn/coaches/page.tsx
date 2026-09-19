import type { Metadata } from "next";
import { BurnSubNav } from "@/components/burn/burn-sub-nav";
import { BurnCoaches } from "@/components/burn/burn-coaches";
import { BurnFooter } from "@/components/burn/burn-footer";

export const metadata: Metadata = {
  title: "燃点运动 · 教练团队",
  description: "燃点运动全职教练团队 —— 力量、耐力、恢复三条线,平均执教近十年。",
};

export default function BurnCoachesPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white">
      <BurnSubNav active="coaches" />
      <BurnCoaches />
      <BurnFooter />
    </main>
  );
}
