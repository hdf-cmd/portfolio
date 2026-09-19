"use client";

import Image from "next/image";
import { motion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { to: 31, suffix: " 间", label: "儿童诊室", note: "四院合计" },
  { to: 24, suffix: " 位", label: "儿科口腔医师", note: "平均从业十二年" },
  { to: 26600, suffix: " 人次", label: "二〇二五年接诊", note: "日均约九十人次" },
  { to: 13, suffix: " 分钟", label: "进门到上牙椅实测均值", note: "承诺不超过二十分钟" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (latest) => setV(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref} className="text-4xl font-bold tabular-nums text-white sm:text-5xl">
      {v.toLocaleString("zh-CN")}
    </span>
  );
}

export function DentalStats() {
  return (
    <section className="relative overflow-hidden bg-[#0E2A31] py-28">
      <Image
        src="/dental/bg-stats.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E2A31] via-[#0E2A31]/40 to-[#0E2A31]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#23B39A]">
          Numbers · 数字不会说谎
        </div>
        <h2 className="mt-4 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
          全城四院，三十一间儿童诊室。
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-3xl border border-white/12 bg-white/[0.04] p-7"
            >
              <div className="flex items-baseline gap-1">
                <Counter to={s.to} />
                <span className="text-2xl font-bold tabular-nums text-white/80">{s.suffix}</span>
              </div>
              <div className="mt-2 text-sm font-semibold text-white/85">{s.label}</div>
              <div className="mt-1 text-xs text-white/50">{s.note}</div>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-xs text-white/45">
          面积 620 + 260 + 320 + 240 = 1440 平方米；教龄合计二百八十八年 ÷ 二十四人 = 平均十二年。
          本页为设计演示作品，数字为虚构但自洽的品牌档案。
        </p>
      </div>
    </section>
  );
}
