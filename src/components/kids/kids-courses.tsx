"use client";

import { motion } from "motion/react";
import { IconBook, IconEye, IconPalette } from "@/components/kids/kids-icons";

const beliefs = [
  { icon: IconPalette, name: "材料随便用", desc: "油画棒、水粉、黏土、拓印板……一学期 20+ 种媒材,不限量。" },
  { icon: IconEye, name: "老师只观察", desc: "不代笔、不示范「正确答案」,点评只问「你画的是什么故事?」" },
  { icon: IconBook, name: "每人一本成长册", desc: "每学期装订一册原作,家长看得见第 1 页和第 20 页的差别。" },
];

const courses = [
  {
    age: "3–5 岁",
    name: "涂鸦实验室",
    en: "Doodle Lab",
    color: "bg-[#FFC94A]",
    ink: "text-[#8B5E00]",
    items: ["大肌肉涂鸦 · 手指画", "形状拼贴与拓印", "黏土立体初体验"],
    time: "周日 10:00–11:30",
    price: "¥128",
    unit: "/ 课时",
  },
  {
    age: "6–9 岁",
    name: "创想工作室",
    en: "Imagine Studio",
    color: "bg-[#4A90D9]",
    ink: "text-white",
    items: ["主题创作 · 绘本共读", "水彩与水粉基础", "名画复刻游戏"],
    time: "周六 14:00–16:00",
    price: "¥158",
    unit: "/ 课时",
    hot: true,
  },
  {
    age: "10 岁+",
    name: "专业画房",
    en: "Pro Atelier",
    color: "bg-[#FF7A59]",
    ink: "text-white",
    items: ["素描 · 色彩系统课", "写生与创作双线", "少儿美展 / 考级可选"],
    time: "周三、周六 18:30–20:30",
    price: "¥188",
    unit: "/ 课时",
  },
];

export function KidsCourses() {
  return (
    <>
      <section className="bg-[#2F3B52] py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-3">
          {beliefs.map((b, i) => (
            <motion.div
              key={b.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="flex items-start gap-4"
            >
              <b.icon className="h-9 w-9 shrink-0" />
              <div>
                <h3 className="text-base font-black text-white">{b.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="courses" className="bg-[#FFF9EF] py-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="text-xs font-black uppercase tracking-[0.3em] text-[#FF7A59]">
              Courses · 按年龄分班
            </div>
            <h2 className="mt-5 text-3xl font-black tracking-tight text-[#2F3B52] sm:text-4xl">
              手劲儿和想象力,都要匹配年龄
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {courses.map((c, i) => (
              <motion.article
                key={c.name}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-3xl border-2 border-[#2F3B52]/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[-0.6deg] hover:shadow-lg"
              >
                <div className={`${c.color} px-7 py-5`}>
                  <div className={`flex items-center justify-between ${c.ink}`}>
                    <span className="text-sm font-black">{c.age}</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-75">
                      {c.en}
                    </span>
                  </div>
                  <h3 className="mt-2 text-2xl font-black text-white">{c.name}</h3>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  {c.hot && (
                    <span className="mb-3 w-fit rounded-full bg-[#FF7A59]/12 px-3 py-1 text-[11px] font-bold text-[#FF7A59]">
                      排队最长 · 建议提前约
                    </span>
                  )}
                  <ul className="space-y-2.5">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-center gap-2.5 text-sm text-[#5B6780]">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-[#FFC94A]" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 text-xs text-[#8A93A6]">{c.time}</div>
                  <div className="mt-auto flex items-end justify-between border-t border-dashed border-[#2F3B52]/12 pt-5">
                    <div>
                      <span className="font-mono text-2xl font-black text-[#2F3B52]">{c.price}</span>
                      <span className="text-xs text-[#8A93A6]"> {c.unit}</span>
                    </div>
                    <a href="#signup" className="rounded-full bg-[#2F3B52] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#4A90D9]">
                      约试听
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
