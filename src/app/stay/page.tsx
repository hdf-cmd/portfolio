import type { Metadata } from "next";
import { StayHero } from "@/components/stay/stay-hero";
import { StayStory } from "@/components/stay/stay-story";
import { StayRooms } from "@/components/stay/stay-rooms";
import { StayGallery } from "@/components/stay/stay-gallery";
import { StayBook } from "@/components/stay/stay-book";
import { StayFooter } from "@/components/stay/stay-footer";

export const metadata: Metadata = {
  title: "栖野 · 湖山民宿 | 海拔 2100 米的湖景木屋",
  description:
    "栖野湖山 —— 12 间湖景木屋、私汤与篝火夜。客户项目：高山湖泊民宿官网设计。",
};

export default function StayPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1F3A4D]">
      <StayHero />
      <StayStory />
      <StayRooms />
      {/* 奶油色 → 深蓝的丝滑过渡带 */}
      <div className="h-32 bg-gradient-to-b from-[#FAF7F2] to-[#1F3A4D]" aria-hidden />
      <StayGallery />
      <div className="h-32 bg-gradient-to-b from-[#1F3A4D] to-[#FAF7F2]" aria-hidden />
      <StayBook />
      <StayFooter />
    </main>
  );
}
