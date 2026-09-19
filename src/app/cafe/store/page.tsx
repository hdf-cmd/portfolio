import type { Metadata } from "next";
import { CafeSubNav } from "@/components/cafe/cafe-sub-nav";
import { CafeStore } from "@/components/cafe/cafe-store";
import { CafeFooter } from "@/components/cafe/cafe-footer";

export const metadata: Metadata = {
  title: "屿雾咖啡 · 愚园路旗舰店",
  description:
    "屿雾咖啡门店信息 —— 老洋房旗舰店的空间、本周活动与交通指引。",
};

export default function CafeStorePage() {
  return (
    <main className="min-h-screen bg-[#120A04] text-[#F5EADA]">
      <CafeSubNav active="store" />
      <CafeStore />
      <CafeFooter />
    </main>
  );
}
