"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// 房型图暂用外景占位，待用户提供室内实拍后替换为 /stay/room-1.jpg ~ room-3.jpg
const rooms = [
  {
    id: "room-1",
    img: "/stay/room-1.jpg",
    alt: "湖景大床房",
    name: "湖景大床房",
    en: "Lake Deluxe",
    size: "38 ㎡ · 2F · 落地窗",
    price: "¥980",
    unit: "/ 晚起",
    tags: ["1.8m 大床", "观景浴缸", "含双早"],
    desc: "整面落地窗对着湖面,浴缸与床同窗。日出时间会短信提醒你。",
    featured: true,
  },
  {
    id: "room-2",
    img: "/stay/room-2.jpg",
    alt: "山景亲子房",
    name: "山景亲子房",
    en: "Family Loft",
    size: "52 ㎡ · 复式 · 小阁楼",
    price: "¥1,280",
    unit: "/ 晚起",
    tags: ["1 大床 + 2 小床", "儿童帐篷", "游戏区"],
    desc: "阁楼给孩子,床给大人。窗外面是草坡,运气好能看到鹿。",
    featured: false,
  },
  {
    id: "room-3",
    img: "/stay/room-3.jpg",
    alt: "独栋木屋",
    name: "独栋木屋",
    en: "Private Cabin",
    size: "76 ㎡ · 独栋 · 带院子",
    price: "¥2,180",
    unit: "/ 晚起",
    tags: ["壁炉", "私汤", "烧烤院"],
    desc: "离主楼 200 米的独栋。晚上只有壁炉声和湖声,管家送柴到门口。",
    featured: false,
  },
];

export function StayRooms() {
  return (
    <section id="rooms" className="relative bg-[#FAF7F2] py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#C89B6A]">
              Rooms · 一共 12 间
            </div>
            <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[#1F3A4D] sm:text-4xl">
              三种住法,都安静
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#5B6B75]">
            每间房朝向都做过日照模拟,选床的时候不用纠结哪间更好。
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {rooms.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={cn(
                "group flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1",
                r.featured
                  ? "border-[#C89B6A]/50 shadow-[0_20px_50px_-24px_rgba(200,155,106,0.45)]"
                  : "border-[#1F3A4D]/10 hover:border-[#C89B6A]/40",
              )}
            >
              <div className="relative h-52 overflow-hidden">
                {/* 室内实拍到位前自动回退到外景占位 */}
                <Image
                  src={r.img}
                  alt={r.alt}
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {r.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-[#C89B6A] px-3 py-1 text-[10px] font-medium text-white">
                    最受欢迎
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-xl font-semibold text-[#1F3A4D]">{r.name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#9AA8B0]">
                    {r.en}
                  </span>
                </div>
                <div className="mt-1.5 text-xs text-[#5B6B75]">{r.size}</div>
                <p className="mt-4 text-sm leading-relaxed text-[#3E525E]">{r.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[#FAF7F2] px-2.5 py-1 text-[11px] text-[#5B6B75]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between border-t border-[#1F3A4D]/8 pt-5">
                  <div>
                    <span className="font-mono text-xl font-bold text-[#1F3A4D]">{r.price}</span>
                    <span className="text-xs text-[#9AA8B0]"> {r.unit}</span>
                  </div>
                  <a
                    href="#book"
                    className="rounded-full border border-[#C89B6A]/50 px-4 py-1.5 text-xs text-[#8B6A3F] transition-colors hover:bg-[#C89B6A] hover:text-white"
                  >
                    订这间 →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
