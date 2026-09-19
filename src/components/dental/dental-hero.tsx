"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { IconPinwheel } from "./dental-icons";

export function DentalHero() {
  return (
    <section className="relative overflow-hidden bg-[#F4FAF8]">
      {/* 浅底遮罩要极轻：只收上下沿，避免发灰（技能 §3 浅底规则） */}
      <Image
        src="/dental/hero.jpg"
        alt="明亮的儿童诊室，薄荷绿牙椅与天花板动画屏"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.55]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4FAF8] via-[#F4FAF8]/45 to-[#F4FAF8]" />

      <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0E7A63]">
            Biloba Kids Dental · 杭州 · 0–14 岁专科
          </div>
          <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.25] tracking-tight text-[#123840] sm:text-5xl">
            第一次看牙，
            <br className="hidden sm:block" />
            先只数牙，不治牙。
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4F6E75]">
            初诊只做一件事：让娃把嘴张开二十秒。牙椅叫飞船，抛光杯叫小风车，
            吸唾管叫小吸管——名字起对了，孩子就不那么怕了。
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="rounded-full bg-[#0E7A63] px-7 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_-16px_rgba(14,122,99,0.85)] transition-all duration-200 hover:bg-[#0B6351] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              约一个不太会哭的上午
            </a>
            <a
              href="#fearless"
              className="rounded-full border border-[#23B39A]/45 bg-[#23B39A]/6 px-7 py-3 text-sm font-semibold text-[#0E2A31] transition-colors duration-200 hover:bg-[#23B39A]/14 active:scale-[0.98]"
            >
              我们怎么做到不吓孩子 →
            </a>
          </div>
          <p className="mt-8 text-xs text-[#4F6E75]">
            全城四院 · 三十一间儿童诊室 · 二十四位儿科口腔医师
          </p>
        </motion.div>
      </div>

      {/* 右下角小风车缓速自转（给孩子看的松动，仅此一处常驻动效） */}
      <motion.div
        className="absolute bottom-24 right-8 hidden text-[#23B39A]/70 sm:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <IconPinwheel className="h-16 w-16" />
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#4F6E75]"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
}
