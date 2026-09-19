"use client";

import Image from "next/image";
import { motion } from "motion/react";

const doctors = [
  { img: "/dental/doc-1.jpg", name: "沈医生", title: "主治医师 · 总院", years: "从业十四年", scared: "最怕娃突然闭嘴——她有全套草莓味开场白" },
  { img: "/dental/doc-2.jpg", name: "陆医生", title: "主治医师 · 西湖院", years: "从业十一年", scared: "最怕家长在旁边说「不疼不疼」——越说娃越紧张" },
  { img: "/dental/doc-3.jpg", name: "章医生", title: "儿童牙科组 · 滨江院", years: "从业十二年", scared: "最怕夜诊九点的精神小伙：白天玩疯了，躺下就困" },
  { img: "/dental/doc-4.jpg", name: "苏医生", title: "正畸评估组 · 总院", years: "从业九年", scared: "最怕被问「能不能等长大再矫」——六龄齿不等人" },
];

export function DentalDoctors() {
  return (
    <section id="doctors" className="relative overflow-hidden bg-[#F4FAF8] py-24">
      <Image
        src="/dental/bg-coats.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4FAF8] via-[#F4FAF8]/50 to-[#F4FAF8]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0E7A63]">
              Dentists · 团队
            </div>
            <h2 className="mt-4 max-w-2xl text-2xl font-bold tracking-tight text-[#123840] sm:text-3xl">
              二十四位儿科口腔医师，平均从业十二年。
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#4F6E75]">
            每位医生只看零到十四岁。看得多，手就稳，话也就好哄。
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-[#23B39A]/14 bg-white/85 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(18,56,64,0.3)] active:translate-y-0"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={d.img}
                  alt={`${d.name}，${d.title}`}
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-[#123840]">{d.name}</h3>
                  <span className="text-xs tabular-nums text-[#0E7A63]">{d.years}</span>
                </div>
                <div className="mt-1 text-xs text-[#4F6E75]">{d.title}</div>
              </div>
              {/* hover 浮出「最怕小孩哪一招」深色小卡 */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-3 rounded-2xl bg-[#0E2A31]/95 p-4 text-xs leading-relaxed text-white/85 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {d.scared}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
