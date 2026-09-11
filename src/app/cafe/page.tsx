import type { Metadata } from "next";
import { CafeHero } from "@/components/cafe/cafe-hero";
import { CafeStory } from "@/components/cafe/cafe-story";
import { CafeBeans } from "@/components/cafe/cafe-beans";
import { CafeReserve } from "@/components/cafe/cafe-reserve";
import { CafeFooter } from "@/components/cafe/cafe-footer";

export const metadata: Metadata = {
  title: "屿雾咖啡 · 云南高山精品咖啡",
  description:
    "屿雾咖啡 —— 把一座山的风味,装进一杯咖啡。客户项目：精品咖啡品牌官网设计。",
};

export default function CafePage() {
  return (
    <main className="min-h-screen bg-[#120A04] text-[#F5EADA]">
      <CafeHero />
      <CafeStory />
      <CafeBeans />
      <CafeReserve />
      <CafeFooter />
    </main>
  );
}