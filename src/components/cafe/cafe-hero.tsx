"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SteamSignature } from "@/components/cafe/steam-signature";

const links = [
  { label: "豆源", href: "#beans" },
  { label: "故事", href: "#story" },
  { label: "预约", href: "#reserve" },
];

export function CafeHero() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* 真实咖啡摄影背景 + 压暗遮罩，保证文案可读 */}
      <Image
        src="/cafe/hero.jpg"
        alt="盛着咖啡豆的白瓷杯"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#120A04]/72" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#120A04]/55 via-transparent to-[#120A04]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-[#C99A5B]/14 blur-[130px]" />

      {/* 导航 */}
      <motion.header
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "relative z-20 transition-all duration-300",
          scrolled && "border-b border-[#C99A5B]/15 bg-[#120A04]/85 backdrop-blur-xl",
        )}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-5">
            <Link
              href="/#work"
              className="flex items-center gap-1 text-sm text-[#A38B6E] transition-colors hover:text-[#F5EADA]"
            >
              <span aria-hidden>←</span> 作品集
            </Link>
            <a href="#" className="flex items-center gap-2.5">
              <SteamSignature className="h-8 w-8" />
              <span className="font-serif text-lg font-semibold tracking-wide text-[#F5EADA]">
                屿雾咖啡
              </span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#A38B6E] transition-colors hover:text-[#F5EADA]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <a
              href="#reserve"
              className="rounded-full bg-[#C99A5B] px-4 py-2 text-sm font-medium text-[#1A0F06] transition-colors hover:bg-[#E8C69B]"
            >
              预约品鉴
            </a>
          </div>
        </nav>
      </motion.header>

      {/* 主文案 */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#E8C69B]/80"
        >
          云南 · 高山庄园 · 手工烘焙
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 max-w-4xl font-serif text-4xl font-semibold leading-[1.25] tracking-tight text-[#F5EADA] sm:text-6xl"
        >
          把一座山的风味,
          <br />
          <span className="bg-gradient-to-r from-[#E8C69B] via-[#C99A5B] to-[#8B5A2B] bg-clip-text text-transparent">
            装进一杯咖啡。
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-[#A38B6E] sm:text-lg"
        >
          屿雾的每一颗豆子,都来自海拔 1800 米的云雾山林。
          我们只做一件事:把风土,原原本本交到你的杯子里。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#beans"
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-[#C99A5B] px-7 py-3 text-sm font-medium text-[#1A0F06] transition-transform hover:-translate-y-0.5"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">挑选豆子</span>
          </a>
          <a
            href="#reserve"
            className="rounded-full border border-[#C99A5B]/40 px-7 py-3 text-sm font-medium text-[#F5EADA] transition-colors hover:bg-[#C99A5B]/10"
          >
            到店坐坐
          </a>
        </motion.div>

        {/* 滚动提示 */}
        <motion.div
          className="mt-16"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-9 w-5.5 items-start justify-center rounded-full border border-[#C99A5B]/40 p-1">
            <div className="h-1.5 w-1 rounded-full bg-[#C99A5B]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}