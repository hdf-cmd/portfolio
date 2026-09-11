import { SiteBackground } from "@/components/site-background";
import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* 全站固定背景：酸方格贯穿所有区块 */}
      <SiteBackground />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Work />
        <Footer />
      </div>
    </main>
  );
}