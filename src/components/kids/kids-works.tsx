"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const works = [
  { img: "/kids/art-handprint.jpg", alt: "手掌印集体画", title: "《春天长在我手上》", kid: "朵朵 · 4 岁", tilt: "-rotate-2", note: "集体创作 · 手掌拓印" },
  { img: "/kids/art-hands.jpg", alt: "彩色手印画", title: "《彩虹排队日》", kid: "小宇 · 5 岁", tilt: "rotate-1", note: "水粉 · 手印" },
  { img: "/kids/art-boy.jpg", alt: "小画家站在自己的画后面", title: "《窗后面的怪兽》", kid: "皓皓 · 7 岁", tilt: "rotate-2", note: "综合材料 · 本学期最佳胆量奖" },
  { img: "/kids/art-kid-drawing.jpg", alt: "孩子的蜡笔人物画", title: "《爷爷和我》", kid: "米粒 · 6 岁", tilt: "-rotate-1", note: "油画棒 · 写生" },
  { img: "/kids/art-wall.jpg", alt: "一排装框的儿童画", title: "《走廊美术馆》", kid: "全体学员", tilt: "rotate-1", note: "每期结课展现场" },
  { img: "/kids/supplies.jpg", alt: "洗笔水、铅笔和颜料", title: "《工具也在画画》", kid: "教室一角", tilt: "-rotate-2", note: "材料自由使用守则" },
];

export function KidsWorks() {
  return (
    <>
      <section id="works" className="relative overflow-hidden bg-white py-28">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-[repeating-linear-gradient(45deg,#FFC94A_0_16px,#FF7A59_16px_32px,#4A90D9_32px_48px)]" />
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
          >
            <div>
              <div className="text-xs font-black uppercase tracking-[0.3em] text-[#4A90D9]">
                Gallery · 作品墙(全是原作翻拍)
              </div>
              <h2 className="mt-5 text-3xl font-black tracking-tight text-[#2F3B52] sm:text-4xl">
                没有一张「像老师」
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#5B6780]">
              每幅画旁边都留着孩子自己说的一句话,这是我们唯一的展签格式。
            </p>
          </motion.div>

          <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {works.map((w, i) => (
              <motion.figure
                key={w.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
                className={cn(
                  "group break-inside-avoid rounded-2xl border-2 border-[#2F3B52]/8 bg-[#FFF9EF] p-3 shadow-sm transition-all duration-300 hover:rotate-0 hover:shadow-md",
                  w.tilt,
                )}
              >
                <div className="overflow-hidden rounded-xl">
                  <Image
                    src={w.img}
                    alt={w.alt}
                    width={1000}
                    height={750}
                    sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="px-2 pb-1 pt-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-black text-[#2F3B52]">{w.title}</h3>
                    <span className="shrink-0 text-[11px] font-bold text-[#FF7A59]">{w.kid}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#8A93A6]">{w.note}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FFF9EF] py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-2 rounded-[1.8rem] border-2 border-dashed border-[#4A90D9]/40" aria-hidden />
            <Image
              src="/kids/story-class.jpg"
              alt="两个小女孩在窗边的画架前画画"
              width={900}
              height={1350}
              className="w-full rounded-[1.4rem] object-cover"
            />
            <div className="absolute -right-3 -top-3 rotate-6 rounded-2xl bg-[#FFC94A] px-4 py-2 text-xs font-black text-[#8B5E00] shadow">
              EST. 2015
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="text-xs font-black uppercase tracking-[0.3em] text-[#FF7A59]">
              Story · 教室的来历
            </div>
            <h2 className="mt-5 text-3xl font-black leading-snug tracking-tight text-[#2F3B52] sm:text-4xl">
              一切始于一张
              <br />
              「不许画直」的课表
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#5B6780] sm:text-base">
              2015 年,美院毕业的沈老师在自己家客厅摆了三个画架,
              第一课的规则只有一条:线不许画直。六个孩子,六年,
              如今这间客厅长成了两间教室,规则一条没变。
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#5B6780] sm:text-base">
              两位主课老师都还在那张课表前画画 —— 每周三晚,
              成人班,孩子们管这叫「老师也要交作业」。
            </p>
            <div className="mt-8 flex gap-10">
              {[
                { n: "沈青", t: "主课教师 · 创始人", img: "/kids/teacher-shen.jpg", alt: "沈青老师在画架前" },
                { n: "鹿鹿", t: "主课教师 · 黏土方向", img: "/kids/teacher-lu.jpg", alt: "鹿鹿老师在户外写生" },
              ].map((tea) => (
                <div key={tea.n} className="flex items-center gap-3">
                  <Image
                    src={tea.img}
                    alt={tea.alt}
                    width={200}
                    height={200}
                    className="h-12 w-12 rounded-full border-2 border-[#FFC94A] object-cover"
                  />
                  <div>
                    <div className="text-sm font-black text-[#2F3B52]">{tea.n}</div>
                    <div className="text-[11px] text-[#8A93A6]">{tea.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
