"use client";

import { motion } from "motion/react";
import { useState } from "react";

const plans = [
  {
    name: "逐次付费",
    price: "59",
    unit: "/ 次起",
    desc: "想练就来,一节课一缴费",
    features: ["全部团体课程", "更衣柜与洗浴", "按次结算无捆绑"],
  },
  {
    name: "月度会员",
    price: "399",
    unit: "/ 月",
    desc: "每周练 3 次以上的首选",
    features: ["无限次团体课程", "专属训练计划", "装备 9 折", "免费锁定课位"],
    hot: true,
  },
  {
    name: "年度会员",
    price: "3,988",
    unit: "/ 年",
    desc: "把训练变成习惯",
    features: ["月度会员全部权益", "每年 2 次体测", "私人教练 4 节", "场馆全城通用"],
  },
];

export function BurnJoin() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="join" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.4em] text-[#FF4D00]">
          membership
        </div>
        <h2 className="mt-4 text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl">
          今天就来,燃点见
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative flex flex-col rounded-lg border p-7 ${
              plan.hot
                ? "border-[#FF4D00]/60 bg-gradient-to-b from-[#FF4D00]/12 to-transparent shadow-[0_0_60px_-16px_rgba(255,77,0,0.45)]"
                : "border-white/10 bg-white/[0.02]"
            }`}
          >
            {plan.hot && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-sm bg-[#FF4D00] px-3 py-0.5 font-mono text-[10px] font-bold uppercase text-white">
                最受欢迎
              </span>
            )}

            <div className="text-sm font-bold uppercase tracking-wider text-white/70">
              {plan.name}
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-mono text-4xl font-black tabular-nums text-white">
                ¥{plan.price}
              </span>
              <span className="font-mono text-xs text-white/40">{plan.unit}</span>
            </div>
            <p className="mt-2 text-xs text-white/50">{plan.desc}</p>

            <ul className="mt-6 flex-1 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                  <span className="mt-0.5 font-bold text-[#FF4D00]">▸</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={submitted ? "#join" : undefined}
              onClick={(e) => {
                if (plan.hot) {
                  e.preventDefault();
                  setSubmitted(true);
                }
              }}
              className={`mt-8 rounded-sm py-3 text-center text-sm font-bold uppercase tracking-wider transition-colors ${
                plan.hot
                  ? "bg-[#FF4D00] text-white hover:bg-[#FF7A1A]"
                  : "border border-white/20 text-white hover:bg-white/5"
              }`}
            >
              {plan.hot && submitted ? "已收到 · 稍后联系你" : "选择此计划"}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}