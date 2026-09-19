"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "月卡",
    en: "MONTHLY",
    price: "¥399",
    unit: "/ 月",
    desc: "先练起来再说。适合刚下决心的你。",
    features: ["全部 14 节/周团课", "器械区无限次", "体测 1 次", "可随时转年卡(补差价)"],
    highlight: false,
  },
  {
    name: "年卡",
    en: "ANNUAL",
    price: "¥3,299",
    unit: "/ 年",
    desc: "折合每天 9 块钱,比那杯美式便宜。",
    features: [
      "月卡全部权益",
      "每季度体测 + 训练计划更新",
      "私教课 9 折",
      "带练名额:每月 2 位朋友",
      "燃点装备店 8.8 折",
    ],
    highlight: true,
    badge: "最多人选",
  },
  {
    name: "私教包",
    en: "PT PACK",
    price: "¥4,880",
    unit: "/ 10 节",
    desc: "有人盯着,进步快一倍。",
    features: ["10 节 1v1 私教(教练任选)", "定制周期计划", "动作视频复盘", "含会籍赠送 1 个月"],
    highlight: false,
  },
];

const faqs = [
  {
    q: "7 天体验要钱吗?",
    a: "不要。填个联系方式就能领,体验期内团课、器械区随便用,不绑卡不自动续费。",
  },
  {
    q: "年卡中途出差、受伤怎么办?",
    a: "年卡每年可停卡累计 60 天,医疗证明停卡不计费。出差可以凭卡在全国合作健身房互通(上海 6 家)。",
  },
  {
    q: "团课怎么约?会不会约不上?",
    a: "小程序提前 7 天 08:00 放课。满员可进候补,开课前 2 小时有人退出会自动补位 —— 按数据,92% 的候补能补上。",
  },
  {
    q: "完全没练过,能上团课吗?",
    a: "能。每周至少有 4 节 L1-L2 强度课,教练会现场给降阶动作。第一次来建议从「晨间力量循环」或「恢复流动晨练」开始。",
  },
];

export function BurnPricing() {
  return (
    <>
      {/* 页头 */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#FF4D00]/14 blur-[130px]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#FF4D00]"
          >
            Pricing · 三档会籍
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl"
          >
            价格不玩虚的,
            <br />
            <span className="text-white/40">汗水才是硬通货。</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/50"
          >
            没有入会费,没有隐藏条款,没有销售追着你不放。
            所有会籍都含每周 14 节团课。
          </motion.p>
        </div>
      </section>

      {/* 价格卡 */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-8",
                p.highlight
                  ? "border-[#FF4D00]/60 bg-gradient-to-b from-[#FF4D00]/12 to-transparent shadow-[0_0_60px_-18px_rgba(255,77,0,0.5)]"
                  : "border-white/10 bg-white/[0.03]",
              )}
            >
              {p.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FF4D00] px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                  {p.badge}
                </span>
              )}
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                {p.en}
              </div>
              <h2 className="mt-2 text-xl font-black text-white">{p.name}</h2>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-black text-white">{p.price}</span>
                <span className="text-sm text-white/45">{p.unit}</span>
              </div>
              <p className="mt-3 text-sm text-white/50">{p.desc}</p>
              <ul className="mt-7 flex-1 space-y-3 border-t border-white/10 pt-7">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                    <span className="mt-1 shrink-0 text-[#FF4D00]" aria-hidden>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/burn#join"
                className={cn(
                  "mt-8 rounded-full py-3 text-center text-sm font-bold transition-colors",
                  p.highlight
                    ? "bg-[#FF4D00] text-white hover:bg-[#FF6A2B]"
                    : "border border-white/25 text-white hover:bg-white/10",
                )}
              >
                领 7 天体验
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center text-2xl font-black uppercase tracking-tight text-white sm:text-3xl"
          >
            你大概率想问
          </motion.h2>
          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <motion.details
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group rounded-xl border border-white/10 bg-[#0C0C0C]/60 px-6 open:border-[#FF4D00]/35"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-bold text-white [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    className="text-[#FF4D00] transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  >
                    ＋
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-white/55">{f.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
