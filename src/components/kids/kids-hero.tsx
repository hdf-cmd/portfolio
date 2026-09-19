"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { KidsLogo } from "@/components/kids/kids-icons";

const links = [
  { label: "课程", href: "#courses" },
  { label: "作品墙", href: "#works" },
  { label: "报名", href: "#signup" },
];

export function KidsHero() {
  return (
    <section className="relative overflow-hidden bg-[#FFF9EF]">
      <div className="pointer-events-none absolute -left-10 top-24 h-40 w-40 rounded-full bg-[#FFC94A]/30 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-52 w-52 rounded-full bg-[#4A90D9]/15 blur-3xl" />

      <header className="relative z-20">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-5">
            <Link href="/#work" className="flex items-center gap-1 text-sm text-[#8A93A6] transition-colors hover:text-[#2F3B52]">
              <span aria-hidden>←</span> 作品集
            </Link>
            <a href="#" className="flex items-center gap-2.5">
              <KidsLogo className="h-10 w-10" />
              <span className="text-lg font-black tracking-wide text-[#2F3B52]">
                小满美术教室
              </span>
            </a>
          </div>
          <div className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-[#5B6780] transition-colors hover:text-[#2F3B52]">
                {l.label}
              </a>
            ))}
          </div>
          <a href="#signup" className="rounded-full bg-[#4A90D9] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#3A7BC0]">
            约试课
          </a>
        </nav>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 pb-24 pt-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#FFC94A]/40 px-4 py-1.5 text-xs font-bold text-[#8B5E00]"
          >
            🖍 3–12 岁 · 小班 6 人 · 周末/平日班
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl font-black leading-[1.25] tracking-tight text-[#2F3B52] sm:text-6xl"
          >
            别教孩子画
            <span className="relative mx-1 inline-block">
              「标准」
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 10" fill="none" aria-hidden>
                <path d="M3 7C30 2 60 2 117 6" stroke="#FF7A59" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
            的太阳。
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 max-w-lg text-base leading-relaxed text-[#5B6780] sm:text-lg"
          >
            在小满,太阳可以是绿的,猫可以会飞。我们只做三件事:
            给足材料、守住表达欲、把「画得像」扔出教室。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a href="#courses" className="rounded-full bg-[#FF7A59] px-7 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5">
              看看课程
            </a>
            <a href="#works" className="rounded-full border-2 border-[#2F3B52]/15 px-7 py-3 text-sm font-bold text-[#2F3B52] transition-colors hover:border-[#2F3B52]/40">
              先逛作品墙 →
            </a>
          </motion.div>
          <div className="mt-12 flex gap-10">
            {[
              ["11 年", "创办于 2015"],
              ["300+", "在读小画家"],
              ["6 人", "每班上限"],
            ].map(([n, t], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
              >
                <div className="text-2xl font-black text-[#4A90D9]">{n}</div>
                <div className="mt-1 text-xs text-[#8A93A6]">{t}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-[#FFC94A]/50" style={{ transform: "rotate(3deg)" }} aria-hidden />
          <Image
            src="/kids/hero.jpg"
            alt="孩子趴在大纸上画画"
            width={1200}
            height={900}
            priority
            className="relative w-full rounded-[1.6rem] object-cover shadow-xl"
          />
          <div className="absolute -bottom-5 -left-5 rotate-[-4deg] rounded-2xl bg-white px-5 py-3 shadow-lg">
            <span className="text-sm font-black text-[#2F3B52]">今日作品:会飞的猫 🐱✈️</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
