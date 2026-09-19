import type { Metadata } from "next";
import { CafeSubNav } from "@/components/cafe/cafe-sub-nav";
import { CafeMenu } from "@/components/cafe/cafe-menu";
import { CafeFooter } from "@/components/cafe/cafe-footer";

export const metadata: Metadata = {
  title: "屿雾咖啡 · 本季菜单",
  description:
    "屿雾咖啡完整菜单 —— 经典浓缩、手冲单品、特调与季节限定,共 20 支出品。",
};

export default function CafeMenuPage() {
  return (
    <main className="min-h-screen bg-[#120A04] text-[#F5EADA]">
      <CafeSubNav active="menu" />
      <CafeMenu />
      <CafeFooter />
    </main>
  );
}
