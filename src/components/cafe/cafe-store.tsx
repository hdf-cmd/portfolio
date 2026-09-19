"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const facts = [
  { label: "地址", value: "上海市静安区愚园路 218 号" },
  { label: "营业", value: "每日 12:00 – 02:00（周三店休）" },
  { label: "电话", value: "021-6255 2180" },
  { label: "座位", value: "吧台 12 席 · 散座 26 席 · 庭院 8 席" },
];

const spaces = [
  {
    img: "/cafe/story-brew.jpg",
    alt: "吧台手冲区",
    name: "手冲吧台",
    desc: "12 席围炉位,看豆子从称量到出杯,老板偶尔客串杯测讲解。",
  },
  {
    img: "/cafe/story-roast.jpg",
    alt: "烘焙机与咖啡豆",
    name: "烘焙工坊",
    desc: "每周二、六上午开炉,现烘的豆子会在店里香两个钟头。",
  },
  {
    img: "/cafe/story-farm.jpg",
    alt: "云南咖啡庄园",
    name: "庄园影像墙",
    desc: "保山庄园寄回来的照片和生豆样品,整面墙都是那座山。",
  },
];

const events = [
  { day: "周六 10/24", time: "14:00", name: "云南产区杯测会", desc: "当季三支生豆对照杯测,8 席,¥88/人(含豆挂耳礼包)", hot: true },
  { day: "周日 10/25", time: "19:30", name: "黑胶爵士夜", desc: "店长私藏黑胶轮播,点单任意手冲即可入座" },
  { day: "周五 10/31", time: "20:00", name: "万圣节特调快闪", desc: "热红酒式香料咖啡限定夜,送桂花酒酿冷萃试饮杯" },
];

export function CafeStore() {
  return (
    <>
      {/* 页头：雾林摄影垫底 */}
      <section className="relative overflow-hidden">
        <Image
          src="/cafe/bg-fog.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#120A04]/84" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#120A04]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[11px] uppercase tracking-[0.32em] text-[#E8C69B]/80"
          >
            Store · 愚园路旗舰店
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="mt-6 font-serif text-4xl font-semibold tracking-tight text-[#F5EADA] sm:text-5xl"
          >
            巷子最深处,
            <span className="bg-gradient-to-r from-[#E8C69B] to-[#8B5A2B] bg-clip-text text-transparent">
              灯亮着的那家。
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#A38B6E] sm:text-base"
          >
            一栋 1934 年的老洋房,保留了水磨石地和老虎窗。
            我们把云南的山,搬进了上海的巷子里。
          </motion.p>
        </div>
      </section>

      {/* 门店信息卡 */}
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="grid gap-px overflow-hidden rounded-2xl border border-[#C99A5B]/20 bg-[#C99A5B]/20 sm:grid-cols-2 lg:grid-cols-4"
        >
          {facts.map((f) => (
            <div key={f.label} className="bg-[#1A0F06] px-6 py-7">
              <div className="text-[10px] uppercase tracking-[0.24em] text-[#8A7358]">
                {f.label}
              </div>
              <div className="mt-3 text-sm leading-relaxed text-[#F5EADA]">{f.value}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 空间一览 */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#C99A5B]">
            空间一览
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[#F5EADA] sm:text-4xl">
            三个角落,三种待法
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {spaces.map((s, i) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group overflow-hidden rounded-2xl border border-[#C99A5B]/15 bg-[#1A0F06]/60"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120A04]/70 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-[#F5EADA]">{s.name}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#A38B6E]">{s.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 本周活动 */}
      <section className="relative overflow-hidden py-24">
        <Image
          src="/cafe/bg-beans.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120A04] via-[#120A04]/55 to-[#120A04]" />

        <div className="relative mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#C99A5B]">
              本周活动
            </div>
            <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[#F5EADA] sm:text-4xl">
              这周山里又发生了什么
            </h2>
          </motion.div>

          <div className="mt-12 space-y-3">
            {events.map((e, i) => (
              <motion.div
                key={e.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="flex flex-col gap-3 rounded-xl border border-[#C99A5B]/15 bg-[#1A0F06]/70 px-6 py-5 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="flex shrink-0 items-center gap-3 sm:w-40">
                  <span className="font-mono text-sm text-[#E8C69B]">{e.day}</span>
                  <span className="text-xs text-[#8A7358]">{e.time}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-serif text-lg font-semibold text-[#F5EADA]">{e.name}</h3>
                    {e.hot && (
                      <span className="rounded-full bg-[#C99A5B]/15 px-2 py-0.5 text-[10px] text-[#E8C69B]">
                        需预约
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[#A38B6E]">{e.desc}</p>
                </div>
                <Link
                  href="/cafe#reserve"
                  className="shrink-0 self-start rounded-full border border-[#C99A5B]/40 px-4 py-1.5 text-xs text-[#E8C69B] transition-colors hover:bg-[#C99A5B] hover:text-[#1A0F06] sm:self-center"
                >
                  报名 →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 交通指引 */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="grid gap-5 rounded-2xl border border-[#C99A5B]/20 bg-[#1A0F06]/60 p-8 sm:grid-cols-3 sm:p-10"
        >
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#8A7358]">地铁</div>
            <p className="mt-3 text-sm leading-relaxed text-[#F5EADA]">
              2/11 号线江苏路站 3 口,沿愚园路向西 600 米,巷口有盏铜灯。
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#8A7358]">驾车</div>
            <p className="mt-3 text-sm leading-relaxed text-[#F5EADA]">
              愚园路 210 号公共停车场,凭当日小票减免 2 小时。
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#8A7358]">带什么</div>
            <p className="mt-3 text-sm leading-relaxed text-[#F5EADA]">
              带杯子来,外带立减 3 元。庭院位可以带狗,周三店休别跑空。
            </p>
          </div>
        </motion.div>
      </section>
    </>
  );
}
