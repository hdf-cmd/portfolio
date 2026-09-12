"use client";

import Image from "next/image";

import { motion } from "motion/react";

// 从豆到杯的三段工序叙事——工序是真实序列，编号承载顺序信息
const steps = [
  {
    no: "壹",
    title: "山间",
    desc: "云雾在林间穿行十二个小时,才够浇透一片咖啡林。海拔 1800 米的昼夜温差,让果实慢慢聚糖,风味因此深邃。",
    img: "/cafe/story-farm.jpg",
    alt: "云雾缭绕的高山种植园",
  },
  {
    no: "贰",
    title: "火里",
    desc: "每一次烘焙,烘焙师都在和火对话。曲线上的一分钟之差,决定一杯咖啡是果香清亮,还是焦糖绵长。",
    img: "/cafe/story-roast.jpg",
    alt: "烘焙师从烘焙机中捧起咖啡豆",
  },
  {
    no: "叁",
    title: "杯中",
    desc: "研磨、注水、等待三十秒的闷蒸。当香气升起,山间的风、火候的耐心,都在这一杯里了。",
    img: "/cafe/story-brew.jpg",
    alt: "咖啡师手冲注水",
  },
];

export function CafeStory() {
  return (
    <section id="story" className="relative overflow-hidden py-28">
      {/* 背景：云雾山林低透明度垫底，呼应"从山间到杯中" */}
      <Image
        src="/cafe/bg-fog.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#120A04] via-[#120A04]/60 to-[#120A04]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#C99A5B]">
            一杯咖啡的路
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[#F5EADA] sm:text-4xl">
            从山间到杯中,只有三步
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.no}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative border-t border-[#C99A5B]/20 pt-6"
            >
              <div className="relative h-44 overflow-hidden rounded-xl border border-[#C99A5B]/15">
                <Image
                  src={step.img}
                  alt={step.alt}
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <span className="mt-5 inline-block font-serif text-4xl font-semibold text-[#C99A5B]/30">
                {step.no}
              </span>
              <h3 className="mt-2 font-serif text-xl font-semibold text-[#F5EADA]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#A38B6E]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}