import type { Metadata } from "next";
import { BurnSubNav } from "@/components/burn/burn-sub-nav";
import { BurnPricing } from "@/components/burn/burn-pricing";
import { BurnFooter } from "@/components/burn/burn-footer";

export const metadata: Metadata = {
  title: "燃点运动 · 会籍价格",
  description: "燃点运动会籍价格 —— 月卡 / 年卡 / 私教包,无入会费,团课全含。",
};

export default function BurnPricingPage() {
  return (
    <main className="min-h-screen bg-[#0C0C0C] text-white">
      <BurnSubNav active="pricing" />
      <BurnPricing />
      <BurnFooter />
    </main>
  );
}
