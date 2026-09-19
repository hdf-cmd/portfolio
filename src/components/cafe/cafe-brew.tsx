"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

type BrewMethod = {
  no: string;
  name: string;
  latin?: string;
  en: string;
  params: [string, string][];
  desc: string;
};

const methods: BrewMethod[] = [
  {
    no: "01",
    name: "手冲",
    latin: "V60",
    en: "Pour Over",
    params: [
      ["粉量", "15 g"],
      ["水量", "250 ml"],
      ["水温", "92 °C"],
      ["时间", "2:30"],
    ],
    desc: "三段注水,中心画圈。浅焙豆的香气最完整的一条路。",
  },
  {
    no: "02",
    name: "法压壶",
    en: "French Press",
    params: [
      ["粉量", "30 g"],
      ["水量", "500 ml"],
      ["水温", "94 °C"],
      ["时间", "4:00"],
    ],
    desc: "最笨也最稳的做法。油脂全留在杯里,口感厚实。",
  },
  {
    no: "03",
    name: "冷萃",
    en: "Cold Brew",
    params: [
      ["粉量", "80 g"],
      ["水量", "1 L"],
      ["水温", "冷藏"],
      ["时间", "16 h"],
    ],
    desc: "低温慢泡一整夜,酸感减半,甜感翻倍。夏天第一选择。",
  },
  {
    no: "04",
    name: "意式浓缩",
    en: "Espresso",
    params: [
      ["粉量", "18 g"],
      ["出液", "36 ml"],
      ["压力", "9 bar"],
      ["时间", "27 s"],
    ],
    desc: "吧台上的参数每天校准。所有奶咖的地基。",
  },
];

export function CafeBrew() {
  return (
    <section id="brew" className="relative overflow-hidden py-28">
      {/* 背景：手冲注水实拍垫底,呼应冲煮主题 */}
      <Image
        src="/cafe/story-brew.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-32"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#120A04] via-[#120A04]/58 to-[#120A04]" />

      <div className="relative mx-auto max-w-6xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#C99A5B]">
            冲煮方式
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[#F5EADA] sm:text-4xl">
            一支豆,四种脾气
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-[#A38B6E]">
          店里每支豆都测过四套参数。买豆回家,照着这张表冲就行。
        </p>
      </motion.div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {methods.map((m, i) => (
          <motion.article
            key={m.no}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group rounded-2xl border border-[#C99A5B]/15 bg-[#1A0F06]/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#C99A5B]/45"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs text-[#8A7358]">{m.no}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7358]">
                {m.en}
              </span>
            </div>
            <h3 className="mt-4 font-serif text-xl font-semibold text-[#F5EADA]">
              {m.latin && (
                <span className="mr-1.5 font-sans font-semibold tracking-tight">
                  {m.latin}
                </span>
              )}
              {m.name}
            </h3>
            <dl className="mt-6 space-y-2 border-t border-[#C99A5B]/12 pt-5">
              {m.params.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between text-sm">
                  <dt className="text-[#8A7358]">{k}</dt>
                  <dd className="text-sm font-medium tabular-nums text-[#E8C69B]">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-[#A38B6E]">{m.desc}</p>
          </motion.article>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-[#8A7358]">
        想喝现成的?
        <Link href="/cafe/menu" className="ml-1 text-[#E8C69B] underline-offset-4 hover:underline">
          看本季菜单 →
        </Link>
      </p>
      </div>
    </section>
  );
}
