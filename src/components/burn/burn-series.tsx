"use client";

import Image from "next/image";

import { motion } from "motion/react";

const series = [
  {
    tag: "FORCE",
    name: "力量系列",
    desc: "为深蹲架和杠铃而生。加厚车线、极限承重,陪你冲击每一个新重量。",
    items: "训练背心 · 力量腰带 · 举重鞋",
    img: "/burn/series-force.jpg",
    alt: "红光健身房中的杠铃深蹲",
  },
  {
    tag: "ENDURANCE",
    name: "耐力系列",
    desc: "轻盈到几乎无感的速干面料,42 公里后依然干爽贴服。",
    items: "竞速上衣 · 速干短裤 · 轻量跑鞋",
    img: "/burn/series-endurance.jpg",
    alt: "夜色马拉松中的奔跑者",
    hot: true,
  },
  {
    tag: "REVIVE",
    name: "恢复系列",
    desc: "训练后的半小时,决定明天的状态。筋膜、拉伸、睡眠,一套配齐。",
    items: "筋膜球 · 拉伸带 · 冷感毛巾",
    img: "/burn/series-revive.jpg",
    alt: "泡沫轴筋膜放松",
  },
];

export function BurnSeries() {
  return (
    <section id="series" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between gap-4"
      >
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#FF4D00]">
            gear series
          </div>
          <h2 className="mt-4 text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
            装备,也是态度
          </h2>
        </div>
        <a
          href="#join"
          className="hidden shrink-0 text-sm font-semibold uppercase tracking-wider text-white/60 transition-colors hover:text-[#FF4D00] sm:block"
        >
          全部装备 →
        </a>
      </motion.div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {series.map((s, i) => (
          <motion.article
            key={s.tag}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-lg border p-7 transition-all duration-300 hover:-translate-y-1 ${
              s.hot
                ? "border-[#FF4D00]/50 bg-gradient-to-b from-[#FF4D00]/12 to-transparent"
                : "border-white/10 bg-white/[0.02] hover:border-white/25"
            }`}
          >
            {s.hot && (
              <span className="absolute right-5 top-5 z-10 rotate-2 rounded-sm bg-[#FF4D00] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-white">
                hot
              </span>
            )}

            <div className="relative -mx-7 -mt-7 mb-6 h-44 overflow-hidden">
              <Image
                src={s.img}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 360px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="font-mono text-[11px] font-bold tracking-[0.3em] text-[#FF7A1A]">
              {s.tag}
            </div>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-white">
              {s.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/55">{s.desc}</p>
            <div className="mt-6 border-t border-white/10 pt-4 font-mono text-[11px] text-white/40">
              {s.items}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}