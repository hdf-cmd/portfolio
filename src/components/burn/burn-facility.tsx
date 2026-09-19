"use client";

import Image from "next/image";
import { motion } from "motion/react";

const zones = [
  {
    name: "自由力量区",
    en: "FREE WEIGHTS",
    img: "/burn/series-force.jpg",
    alt: "红光下的杠铃深蹲架",
    spec: "300 ㎡ · 8 根杠铃位 · 哑铃至 60kg",
    desc: "深蹲架排成一排,不用抢。镁粉墙、助力带、杠铃片全按比赛规格配。",
  },
  {
    name: "有氧 & 赛道区",
    en: "ENDURANCE",
    img: "/burn/series-endurance.jpg",
    alt: "夜间路跑的跑者",
    spec: "200 ㎡ · 12 台风阻车 · 30m 冲刺道",
    desc: "室内 30 米人工草皮冲刺道,雨天也能练间歇。风阻车对着大屏,数据实时上墙。",
  },
  {
    name: "功能训练区",
    en: "FUNCTIONAL",
    img: "/burn/bg-gym.jpg",
    alt: "综合训练器械区",
    spec: "180 ㎡ · 吊环 · 药球 · 战绳",
    desc: "团课主战场。16 个站位同时开课,每组器械都做过配重校准。",
  },
  {
    name: "恢复室",
    en: "REVIVE",
    img: "/burn/series-revive.jpg",
    alt: "泡沫轴与筋膜球",
    spec: "90 ㎡ · 冷热浴 · 筋膜枪 · 拉伸床",
    desc: "练完别急着走。冷热交替浴池和 8 张拉伸床,教练亲自给你松筋膜。",
  },
];

export function BurnFacility() {
  return (
    <section id="facility" className="relative overflow-hidden py-28">
      {/* 背景：器械区实拍低透明度垫底,呼应场馆主题 */}
      <Image
        src="/burn/bg-gym.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-22"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C] via-[#0C0C0C]/58 to-[#0C0C0C]" />

      <div className="relative mx-auto max-w-6xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#FF4D00]">
            Facility · 770 ㎡ 训练空间
          </div>
          <h2 className="mt-5 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
            场馆四个区,
            <span className="text-white/40">各有各的狠法。</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-white/50">
          静安店 24 小时开放,深夜党刷脸进门,灯永远给你留着。
        </p>
      </motion.div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {zones.map((z, i) => (
          <motion.article
            key={z.name}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.12 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={z.img}
                alt={z.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/45 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#FF4D00]">
                {z.en}
              </div>
              <h3 className="mt-2 text-xl font-black text-white">{z.name}</h3>
              <div className="mt-1.5 font-mono text-xs text-white/45">{z.spec}</div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
                {z.desc}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
      </div>
    </section>
  );
}
