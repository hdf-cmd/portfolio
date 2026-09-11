"use client";

import { motion } from "motion/react";

// 从豆到杯的三段工序叙事——工序是真实序列，编号承载顺序信息
const steps = [
  {
    no: "壹",
    title: "山间",
    desc: "云雾在林间穿行十二个小时,才够浇透一片咖啡林。海拔 1800 米的昼夜温差,让果实慢慢聚糖,风味因此深邃。",
  },
  {
    no: "贰",
    title: "火里",
    desc: "每一次烘焙,烘焙师都在和火对话。曲线上的一分钟之差,决定一杯咖啡是果香清亮,还是焦糖绵长。",
  },
  {
    no: "叁",
    title: "杯中",
    desc: "研磨、注水、等待三十秒的闷蒸。当香气升起,山间的风、火候的耐心,都在这一杯里了。",
  },
];

export function CafeStory() {
  return (
    <section id="story" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#C99A5B]">
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
            className="relative border-t border-[#C99A5B]/20 pt-6"
          >
            <span className="font-serif text-5xl font-semibold text-[#C99A5B]/30">
              {step.no}
            </span>
            <h3 className="mt-3 font-serif text-xl font-semibold text-[#F5EADA]">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#A38B6E]">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}