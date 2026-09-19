"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const stages = [
  {
    key: "0-2",
    tab: "0–2 岁",
    title: "长出第一颗牙，就该来见一次。",
    img: "/dental/tab-02.jpg",
    imgAlt: "医生为幼儿检查口腔",
    points: [
      "第一颗乳牙萌出后六个月内做第一次检查",
      "乳牙一共二十颗，这一阶段先看门牙位",
      "家长学习正确的擦拭与牙刷介入时机",
    ],
    price: "初诊检查 ¥180",
  },
  {
    key: "3-6",
    tab: "3–6 岁",
    title: "会刷牙了，但刷不干净——交给涂氟。",
    img: "/dental/tab-36.jpg",
    imgAlt: "两个孩子在镜子前刷牙",
    points: [
      "每半年一次涂氟，一年两次，一次二百四十块",
      "乳牙龋坏也要治：它给恒牙占着位置",
      "习惯养成期，到院行为引导比治疗更重要",
    ],
    price: "涂氟 ¥240 / 次",
  },
  {
    key: "7-12",
    tab: "7–12 岁",
    title: "六龄齿来了，它不替换任何乳牙。",
    img: "/dental/tab-712.jpg",
    imgAlt: "儿童口周与器械特写",
    points: [
      "换牙期约六到十二岁，恒牙二十四颗加四颗智齿",
      "第一恒磨牙萌出后尽早窝沟封闭，四颗 ¥720",
      "地包天、偏颌等问题在这个窗口期最容易被看见",
    ],
    price: "窝沟封闭 ¥180 / 颗",
  },
  {
    key: "13-14",
    tab: "13–14 岁",
    title: "正畸评估只有一个问题：现在还是再等等。",
    img: "/dental/tab-1314.jpg",
    imgAlt: "带矫治器的牙齿模型",
    points: [
      "恒牙列建立后做全面正畸评估",
      "先拍全景片看牙根与骨量，再谈方案",
      "夜诊到二十一点，放学顺路就能来",
    ],
    price: "评估含在初诊 ¥180",
  },
];

export function DentalStages() {
  const [active, setActive] = useState(0);
  const s = stages[active];

  return (
    <section id="stages" className="relative overflow-hidden bg-[#E9F4F1] py-24">
      {/* 背景跟随 Tab 换图：图文语义对齐（技能 §3） */}
      {stages.map((st, i) => (
        <Image
          key={st.key}
          src={st.img}
          alt=""
          fill
          sizes="100vw"
          className={`object-cover transition-opacity duration-500 ${
            i === active ? "opacity-[0.45]" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E9F4F1]/70 via-[#E9F4F1]/50 to-[#E9F4F1]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0E7A63]">
          Stages · 分龄齿科路线
        </div>
        <h2 className="mt-4 max-w-2xl text-2xl font-bold tracking-tight text-[#123840] sm:text-3xl">
          二十颗乳牙，各有各的麻烦。
        </h2>

        <div role="tablist" aria-label="分龄齿科路线" className="mt-10 flex flex-wrap gap-2">
          {stages.map((st, i) => (
            <button
              key={st.key}
              role="tab"
              aria-selected={i === active}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
                i === active
                  ? "bg-[#0E7A63] text-white shadow-[0_12px_28px_-14px_rgba(14,122,99,0.8)]"
                  : "border border-[#123840]/14 bg-white/70 text-[#123840]/70 hover:border-[#23B39A]/45 hover:bg-white"
              }`}
            >
              {st.tab}
            </button>
          ))}
        </div>

        <motion.div
          key={s.key}
          role="tabpanel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-8 grid gap-6 overflow-hidden rounded-3xl border border-[#23B39A]/14 bg-white/85 shadow-[0_24px_56px_-36px_rgba(18,56,64,0.25)] lg:grid-cols-[1fr_1.2fr]"
        >
          <div className="relative min-h-56 overflow-hidden">
            <Image src={s.img} alt={s.imgAlt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="p-8">
            <h3 className="text-xl font-bold tracking-tight text-[#123840]">{s.title}</h3>
            <ul className="mt-5 space-y-3">
              {s.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-[#4F6E75]">
                  <span className="mt-0.5 shrink-0 text-[#0E7A63]">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-baseline justify-between border-t border-[#123840]/8 pt-5">
              <span className="text-xs uppercase tracking-[0.24em] text-[#4F6E75]">This stage</span>
              <span className="font-mono text-sm font-semibold text-[#123840]">{s.price}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
