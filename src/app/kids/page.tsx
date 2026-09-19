import type { Metadata } from "next";
import { KidsHero } from "@/components/kids/kids-hero";
import { KidsCourses } from "@/components/kids/kids-courses";
import { KidsWorks } from "@/components/kids/kids-works";
import { KidsSignup, KidsFooter } from "@/components/kids/kids-signup";

export const metadata: Metadata = {
  title: "小满美术教室 | 3–12 岁少儿美术",
  description:
    "小满美术教室 —— 别教孩子画「标准」的太阳。客户项目：少儿美术培训官网设计。",
};

export default function KidsPage() {
  return (
    <main className="min-h-screen bg-[#FFF9EF] text-[#2F3B52]">
      <KidsHero />
      <KidsCourses />
      <KidsWorks />
      <KidsSignup />
      <KidsFooter />
    </main>
  );
}
