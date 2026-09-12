"use client";

import Image from "next/image";

import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "上线第一周,我们把 14 份周报压缩成一块实时仪表盘。管理层再也没问过\"数据什么时候出\"。",
    name: "林知远",
    role: "数据负责人 · 云帆控股",
    avatar: "/avatars/lin-zhiyuan.jpg",
  },
  {
    quote:
      "深夜值班最怕漏告警。澄澈的智能洞察在流量异常前 20 分钟就提示了我们,像多了半个运维。",
    name: "苏晓芸",
    role: "SRE 经理 · 北辰能源",
    avatar: "/avatars/su-xiaoyun-v2.jpg",
  },
  {
    quote:
      "拖拽就能搭出高层要的看板,业务同学自己会用。BI 团队终于有时间做真正的分析了。",
    name: "陈墨",
    role: "商业分析总监 · 拾光零售",
    avatar: "/avatars/chen-mo.jpg",
  },
];

export function CompanyTestimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C6675]">
          客户怎么说
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#F2F5F9] sm:text-4xl">
          他们用澄澈,把时间花在了决策上
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col justify-between rounded-2xl border border-[#8A94A6]/12 bg-[#0C1018] p-6 transition-colors hover:border-[#8A94A6]/25"
          >
            <blockquote className="text-sm leading-relaxed text-[#8A94A6]">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <Image
                src={t.avatar}
                alt={t.name}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium text-[#E6EAF2]">{t.name}</div>
                <div className="font-mono text-[10px] text-[#5C6675]">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}