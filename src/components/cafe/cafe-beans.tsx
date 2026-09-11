"use client";

import { motion } from "motion/react";

const beans = [
  {
    name: "雾里高山",
    origin: "云南 · 保山",
    altitude: "1800m",
    notes: "茉莉 · 柑橘 · 红糖尾韵",
    roast: "中度烘焙",
    price: "¥128 / 250g",
    featured: true,
  },
  {
    name: "落日晚霞",
    origin: "云南 · 普洱",
    altitude: "1650m",
    notes: "熟莓 · 黑巧 · 坚果",
    roast: "中深烘焙",
    price: "¥118 / 250g",
    featured: false,
  },
  {
    name: "林间晨雾",
    origin: "云南 · 德宏",
    altitude: "1750m",
    notes: "柠檬草 · 绿茶 · 蜂蜜",
    roast: "浅度烘焙",
    price: "¥138 / 250g",
    featured: false,
  },
];

export function CafeBeans() {
  return (
    <section id="beans" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#C99A5B]">
            本季豆单
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[#F5EADA] sm:text-4xl">
            三支豆子,三种山势
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-[#A38B6E]">
          每季度我们只上架三支豆子,喝得明白,也选得轻松。
        </p>
      </motion.div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {beans.map((bean, i) => (
          <motion.article
            key={bean.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
              bean.featured
                ? "border-[#C99A5B]/40 bg-gradient-to-b from-[#C99A5B]/10 to-transparent shadow-[0_0_48px_-16px_rgba(201,154,91,0.4)]"
                : "border-[#C99A5B]/15 bg-[#1A0F06]/60 hover:border-[#C99A5B]/35"
            }`}
          >
            {bean.featured && (
              <span className="absolute right-5 top-5 rounded-full bg-[#C99A5B] px-2.5 py-0.5 font-mono text-[10px] text-[#1A0F06]">
                镇店之选
              </span>
            )}

            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A38B6E]">
              {bean.origin} · {bean.altitude}
            </div>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-[#F5EADA]">
              {bean.name}
            </h3>

            <div className="mt-6 space-y-2.5 text-sm text-[#A38B6E]">
              <div className="flex justify-between gap-2">
                <span className="text-[#8A7358]">风味</span>
                <span className="text-right">{bean.notes}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-[#8A7358]">烘焙</span>
                <span>{bean.roast}</span>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-[#C99A5B]/15 pt-5">
              <span className="font-mono text-sm text-[#E8C69B]">{bean.price}</span>
              <a
                href="#reserve"
                className="rounded-full border border-[#C99A5B]/40 px-4 py-1.5 text-xs text-[#E8C69B] transition-colors group-hover:bg-[#C99A5B] group-hover:text-[#1A0F06]"
              >
                预订 →
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}