import type { Metadata } from "next";
import { BurnHero } from "@/components/burn/burn-hero";
import { BurnSeries } from "@/components/burn/burn-series";
import { BurnMarquee } from "@/components/burn/burn-marquee";
import { BurnJoin } from "@/components/burn/burn-join";
import { BurnFooter } from "@/components/burn/burn-footer";

export const metadata: Metadata = {
  title: "燃点运动 BURN · 练到燃点",
  description:
    "燃点运动 —— 给不再找借口的你。客户项目：运动品牌官网设计。",
};

export default function BurnPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white">
      <BurnHero />
      <BurnSeries />
      <BurnMarquee />
      <BurnJoin />
      <BurnFooter />
    </main>
  );
}