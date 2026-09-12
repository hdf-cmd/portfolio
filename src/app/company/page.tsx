import type { Metadata } from "next";
import { CompanyNav } from "@/components/company/company-nav";
import { CompanyHero } from "@/components/company/company-hero";
import { CompanyLogoCloud } from "@/components/company/company-logo-cloud";
import { CompanyStats } from "@/components/company/company-stats";
import { CompanyFeatures } from "@/components/company/company-features";
import { CompanyTestimonials } from "@/components/company/company-testimonials";
import { CompanyPricing } from "@/components/company/company-pricing";
import { CompanyCta } from "@/components/company/company-cta";
import { CompanyFooter } from "@/components/company/company-footer";

export const metadata: Metadata = {
  title: "澄澈科技 · 企业级数据可视化平台",
  description:
    "澄澈科技 — 让复杂数据一目了然的企业级可视化平台。项目 D：商业品牌官网落地页，展示克制的动效运用。",
};

export default function CompanyPage() {
  return (
    <main className="min-h-screen bg-[#0A0D14] bg-fixed text-[#E6EAF2] [background-image:linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] [background-size:56px_56px]">
      <CompanyNav />
      <CompanyHero />
      <CompanyLogoCloud />
      <CompanyStats />
      <CompanyFeatures />
      <CompanyTestimonials />
      <CompanyPricing />
      <CompanyCta />
      <CompanyFooter />
    </main>
  );
}