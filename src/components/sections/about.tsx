"use client";

import { motion } from "motion/react";

const stats = [
  { value: "5+", label: "动画与组件库" },
  { value: "4", label: "作品项目规划" },
  { value: "∞", label: "对细节的追求" },
];

export function About() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            关于我
          </h2>
          <p className="mt-6 leading-relaxed text-muted">
            我是黄栋斐，一名前端开发者。我相信好的界面不只是「能用」，更要「好用且好看」——动画和微交互是连接功能与体验的桥梁。
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            这套作品集本身就是我的能力证明：它整合了 Motion、Anime.js、Aceternity
            UI、React Bits 与 Uiverse 五个动画组件库，从字符级文字动画到 SVG
            描边、从聚光灯卡片到纯 CSS 按钮，每一个区块都在演示一种「让界面活起来」的手法。
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <span className="text-gradient text-3xl font-bold sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-2 text-xs text-muted sm:text-sm">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}