"use client";

import Image from "next/image";
import { motion } from "motion/react";

const stories = [
  {
    name: "阿哲",
    meta: "34 岁 · 程序员 · 燃点 14 个月",
    initial: "哲",
    big: "-14 kg",
    bigLabel: "120 天",
    quote:
      "以前加班到十点就点外卖。现在十点是在恢复室被苏婉按着拉伸。体检单上的箭头,全从向上改成了向下。",
    from: "耐力系列 · 周五测试夜",
  },
  {
    name: "婷婷",
    meta: "28 岁 · 中学老师 · 燃点 8 个月",
    initial: "婷",
    big: "100 kg",
    bigLabel: "首次硬拉",
    quote:
      "站上杠铃前我腿是抖的。林薇说,你批改三十人作文的手,不会抓不住一根杆。那天我拉起来了,顺便把胆子也拉起来了。",
    from: "力量系列 · 硬拉工作坊",
  },
  {
    name: "老周",
    meta: "45 岁 · 个体经营 · 燃点 2 年",
    initial: "周",
    big: "3:59",
    bigLabel: "全马 PB",
    quote:
      "二十多岁跑不进四小时,四十五岁进了。陈骁给我排的课表精确到配速区间,他说年龄只是分组,不是借口。",
    from: "耐力系列 · 长距离慢跑团",
  },
];

export function BurnStories() {
  return (
    <section id="stories" className="relative overflow-hidden py-28">
      {/* 背景：夜跑实拍低透明度垫底,呼应'跑下去日子会变'的主题 */}
      <Image
        src="/burn/series-endurance.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C] via-[#0C0C0C]/62 to-[#0C0C0C]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[720px] -translate-x-1/2 rounded-full bg-[#FF4D00]/8 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#FF4D00]">
            Real Results · 会员变化实录
          </div>
          <h2 className="mt-5 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            我们不晒肌肉,
            <span className="text-white/40">只晒日子。</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {stories.map((s, i) => (
            <motion.figure
              key={s.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-[#FF4D00]/40"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#FF4D00]/40 bg-[#FF4D00]/10 font-serif text-lg font-bold text-[#FF8A5C]">
                  {s.initial}
                </span>
                <div>
                  <div className="text-base font-bold text-white">{s.name}</div>
                  <div className="mt-0.5 text-xs text-white/40">{s.meta}</div>
                </div>
                <div className="ml-auto text-right">
                  <div className="font-mono text-2xl font-black text-[#FF4D00]">
                    {s.big}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-white/35">
                    {s.bigLabel}
                  </div>
                </div>
              </div>
              <blockquote className="mt-6 flex-1 text-sm leading-relaxed text-white/60">
                "{s.quote}"
              </blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                {s.from}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 text-center text-xs text-white/35"
        >
          * 以上为会员授权分享的真实训练记录,数据以入会体测与阶段复测为准。
        </motion.p>
      </div>
    </section>
  );
}
