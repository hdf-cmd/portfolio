"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "房型", href: "#rooms" },
  { label: "环境", href: "#gallery" },
  { label: "预订", href: "#book" },
];

export function StayHero() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <Image
        src="/stay/ext-pool.jpg"
        alt="高山湖畔的度假木屋群"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#1F3A4D]/38" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/0 via-transparent to-[#FAF7F2]" />

      <motion.header
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "relative z-20 transition-all duration-300",
          scrolled && "border-b border-[#1F3A4D]/10 bg-[#FAF7F2]/90 backdrop-blur-xl",
        )}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-5">
            <Link
              href="/#work"
              className={cn(
                "flex items-center gap-1 text-sm transition-colors",
                scrolled ? "text-[#5B6B75] hover:text-[#1F3A4D]" : "text-white/80 hover:text-white",
              )}
            >
              <span aria-hidden>←</span> 作品集
            </Link>
            <a href="#" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-current text-base">
                <span className={scrolled ? "text-[#1F3A4D]" : "text-white"}>◍</span>
              </span>
              <span
                className={cn(
                  "font-serif text-lg font-semibold tracking-widest transition-colors",
                  scrolled ? "text-[#1F3A4D]" : "text-white",
                )}
              >
                栖野 · 湖山
              </span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-6 md:flex">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className={cn(
                    "text-sm transition-colors",
                    scrolled
                      ? "text-[#5B6B75] hover:text-[#1F3A4D]"
                      : "text-white/80 hover:text-white",
                  )}
                >
                  {l.label}
                </a>
              ))}
            </div>
            <a
              href="#book"
              className="rounded-full bg-[#C89B6A] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B4854F]"
            >
              查空房
            </a>
          </div>
        </nav>
      </motion.header>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[11px] uppercase tracking-[0.32em] text-white/85"
        >
          Stay · 海拔 2100 米 · 湖景木屋
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 max-w-4xl font-serif text-4xl font-semibold leading-[1.3] tracking-tight text-white sm:text-6xl"
        >
          醒来第一件事,
          <br />
          <span className="text-[#FFE8CB]">把窗子开给湖。</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          栖野只有 12 间房。没有行程推销,没有大堂广播,
          只有木屋、湖风、和一晚好觉。
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#rooms"
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-white/95 px-7 py-3 text-sm font-medium text-[#1F3A4D] transition-transform hover:-translate-y-0.5"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#C89B6A]/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">看看房型</span>
          </a>
          <a
            href="#book"
            className="rounded-full border border-white/60 px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            直接订
          </a>
        </motion.div>
        <div className="mt-16 flex items-center gap-8 text-white/80">
          {[
            ["12", "间湖景房"],
            ["2100m", "海拔"],
            ["4.9", "住客评分"],
          ].map(([n, t]) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="font-mono text-2xl font-bold">{n}</div>
              <div className="mt-1 text-[11px] tracking-wider">{t}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
