"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const coaches = [
  {
    name: "雷刚",
    en: "LEI GANG",
    role: "力量总教练",
    img: "/burn/coach-1.png",
    alt: "力量总教练雷刚",
    years: "12 年",
    line: "前省队举重运动员。他的课上没有'差不多',只有'再来一组'。",
    certs: ["NSCA-CSCS 认证", "全国举重教练 A 级", "带出 40+ 位深蹲 200kg 会员"],
  },
  {
    name: "林薇",
    en: "LIN WEI",
    role: "力量教练 · 技术门诊主理",
    img: "/burn/coach-2.png",
    alt: "力量教练林薇",
    years: "8 年",
    line: "最讨厌'练错还练狠'。专治各种杠铃动作疑难杂症。",
    certs: ["CROSSFIT L2", "运动解剖学硕士", "动作筛查 FMS-2"],
  },
  {
    name: "陈骁",
    en: "CHEN XIAO",
    role: "耐力教练 · 路跑团长",
    img: "/burn/coach-3.png",
    alt: "耐力教练陈骁",
    years: "10 年",
    line: "全马 231。他说配速不是跑出来的,是算出来的。",
    certs: ["世界田联一级教练", "完成 6 大马拉松", "会员 PB 破三 17 人"],
  },
  {
    name: "苏婉",
    en: "SU WAN",
    role: "恢复教练",
    img: "/burn/coach-4.png",
    alt: "恢复教练苏婉",
    years: "9 年",
    line: "训练只占变强的三成,剩下七成在她这间拉伸室里。",
    certs: ["运动康复学背景", "筋膜松解 CFMT", "运动瑜伽 RYT-500"],
  },
];

export function BurnCoaches() {
  return (
    <>
      {/* 页头 */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#FF4D00]/14 blur-[130px]" />
        <div className="relative mx-auto max-w-6xl px-6 pb-18 pt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#FF4D00]"
          >
            Coaches · 全职 4 人
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl font-black uppercase tracking-tight text-white sm:text-6xl"
          >
            站在你旁边的人,
            <br />
            <span className="text-white/40">都得先练到自己服气。</span>
          </motion.h1>
        </div>
      </section>

      {/* 教练卡片 */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-5 sm:grid-cols-2">
          {coaches.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
              className="group grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#FF4D00]/40 sm:grid-cols-[220px_1fr]"
            >
              <div className="relative h-64 overflow-hidden sm:h-full">
                <Image
                  src={c.img}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 640px) 220px, 100vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/60 to-transparent sm:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col p-7">
                <div className="flex items-baseline gap-3">
                  <h2 className="text-2xl font-black text-white">{c.name}</h2>
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
                    {c.en}
                  </span>
                </div>
                <div className="mt-1.5 text-sm font-bold text-[#FF4D00]">
                  {c.role} · 执教 {c.years}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{c.line}</p>
                <ul className="mt-5 space-y-2">
                  {c.certs.map((cert) => (
                    <li key={cert} className="flex items-center gap-2.5 text-xs text-white/45">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-[#FF4D00]" aria-hidden />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 数据条 */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 py-14 sm:grid-cols-4">
          {[
            { n: "39", t: "平均执教年限(人年)" },
            { n: "1,200+", t: "累计带训会员" },
            { n: "17", t: "会员全马破三" },
            { n: "40+", t: "会员深蹲破 200kg" },
          ].map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="px-4 py-3 text-center"
            >
              <div className="font-mono text-3xl font-black text-white">{s.n}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-white/40">{s.t}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 引导 */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
            挑一个教练,从他的课开始。
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/burn/classes"
              className="rounded-full bg-[#FF4D00] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#FF6A2B]"
            >
              看课程表
            </Link>
            <Link
              href="/burn/pricing"
              className="rounded-full border border-white/25 px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              看会籍价格 →
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
