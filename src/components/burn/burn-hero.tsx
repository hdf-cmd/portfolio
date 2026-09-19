"use client";

import { motion, useScroll, useMotionValueEvent, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString();
      }
    });
    return unsub;
  }, [spring]);

  return (
    <span ref={ref}>0</span>
  );
}

const links = [
  { label: "课程表", href: "/burn/classes" },
  { label: "教练", href: "/burn/coaches" },
  { label: "价格", href: "/burn/pricing" },
  { label: "装备", href: "#series" },
];

export function BurnHero() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      {/* 真实健身房摄影背景：黑底杠铃 + 压暗遮罩 */}
      <Image
        src="/burn/hero.jpg"
        alt="健身房地上的负重杠铃"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#0C0C0C]/62" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/70 via-transparent to-[#0C0C0C]" />
      {/* 燃橙品牌光 */}
      <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[460px] w-[820px] -translate-x-1/2 rounded-full bg-[#FF4D00]/16 blur-[130px]" />

      {/* 导航 */}
      <motion.header
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative z-20 transition-all duration-300",
          scrolled && "border-b border-white/10 bg-[#0C0C0C]/85 backdrop-blur-xl",
        )}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-5">
            <Link
              href="/#work"
              className="flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
            >
              <span aria-hidden>←</span> 作品集
            </Link>
            <a href="#" className="flex items-center gap-2">
              <span className="flex h-7 w-7 rotate-45 items-center justify-center rounded-sm bg-[#FF4D00] text-xs font-black text-white">
                <span className="-rotate-45">B</span>
              </span>
              <span className="text-lg font-black uppercase tracking-tight text-white">
                BURN<span className="text-[#FF4D00]">.</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-7 md:flex">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <a
              href="#join"
              className="rounded-sm bg-[#FF4D00] px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#FF7A1A]"
            >
              立刻开练
            </a>
          </div>
        </nav>
      </motion.header>

      {/* 巨型主标题 */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#FF7A1A]"
        >
          no excuses · only reps
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 1.04, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-7xl font-black leading-none tracking-tighter text-white sm:text-9xl"
        >
          练到
          <span className="text-[#FF4D00]">燃点</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 max-w-md text-base text-white/60"
        >
          给不再找借口的你。24 家场馆、每天 120 堂课,
          从第一组热身到最后一滴汗,我们盯你练完。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#join"
            className="group relative inline-flex items-center overflow-hidden rounded-sm bg-[#FF4D00] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">免费体验一节课</span>
          </a>
          <a
            href="#series"
            className="rounded-sm border border-white/25 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-white hover:bg-white/5"
          >
            看看装备
          </a>
        </motion.div>

        {/* 硬数据 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 flex items-center gap-10 sm:gap-16"
        >
          {[
            { v: 24, label: "家场馆", plus: false },
            { v: 56000, label: "会员", plus: true },
            { v: 120, label: "每日课程", plus: false },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-3xl font-bold tabular-nums text-white sm:text-4xl">
                {stat.plus && <span className="text-[#FF4D00]">+</span>}
                <Counter value={stat.v} />
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}