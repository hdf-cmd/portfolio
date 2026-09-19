import type { Metadata } from "next";
import { DentalNav } from "@/components/dental/dental-nav";
import { DentalHero } from "@/components/dental/dental-hero";
import { DentalStats } from "@/components/dental/dental-stats";
import { DentalFearless } from "@/components/dental/dental-fearless";
import { DentalStages } from "@/components/dental/dental-stages";
import { DentalDoctors } from "@/components/dental/dental-doctors";
import { DentalPricing } from "@/components/dental/dental-pricing";
import { DentalFaq } from "@/components/dental/dental-faq";
import { DentalStores } from "@/components/dental/dental-stores";
import { DentalBooking } from "@/components/dental/dental-booking";
import { DentalFooter } from "@/components/dental/dental-footer";

export const metadata: Metadata = {
  title: "双叶儿童口腔 | 0–14 岁专科齿科",
  description: "第一次看牙，先只数牙，不治牙。全城四院，三十一间儿童诊室。",
};

// 底色序列：浅 → 深 → 浅 → 浅次 → 浅 → 浅次 → 深 → 浅 → 彩 → 深
// 相邻底色不同处一律插渐变过渡带，深浅大跨度用 h-32，同族浅-浅用 h-16（技能 §3）
export default function DentalPage() {
  return (
    <main className="bg-[#F4FAF8] text-[#123840]">
      <DentalNav />
      <DentalHero />
      <div className="h-32 bg-gradient-to-b from-[#F4FAF8] to-[#0E2A31]" aria-hidden />
      <DentalStats />
      <div className="h-32 bg-gradient-to-b from-[#0E2A31] to-[#F4FAF8]" aria-hidden />
      <DentalFearless />
      <div className="h-16 bg-gradient-to-b from-[#F4FAF8] to-[#E9F4F1]" aria-hidden />
      <DentalStages />
      <div className="h-16 bg-gradient-to-b from-[#E9F4F1] to-[#F4FAF8]" aria-hidden />
      <DentalDoctors />
      <div className="h-16 bg-gradient-to-b from-[#F4FAF8] to-[#E9F4F1]" aria-hidden />
      <DentalPricing />
      <div className="h-32 bg-gradient-to-b from-[#E9F4F1] to-[#0E2A31]" aria-hidden />
      <DentalFaq />
      <div className="h-32 bg-gradient-to-b from-[#0E2A31] to-[#F4FAF8]" aria-hidden />
      <DentalStores />
      <div className="h-32 bg-gradient-to-b from-[#F4FAF8] to-[#23B39A]" aria-hidden />
      <DentalBooking />
      <div className="h-32 bg-gradient-to-b from-[#23B39A] to-[#123840]" aria-hidden />
      <DentalFooter />
    </main>
  );
}
