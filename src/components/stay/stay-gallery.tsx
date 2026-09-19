"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const shots = [
  { img: "/stay/ext-pool.jpg", alt: "湖畔木屋群鸟瞰", label: "鸟瞰 · 主楼与湖", span: "md:col-span-2 md:row-span-2" },
  { img: "/stay/ext-snow.jpg", alt: "雪季木屋", label: "冬日 · 落雪三日止", span: "" },
  { img: "/stay/ext-meadow.jpg", alt: "夏季草甸", label: "夏日 · 屋后草坡", span: "" },
  { img: "/stay/ext-glass.jpg", alt: "林间玻璃餐室", label: "早餐 · 玻璃餐室", span: "" },
  { img: "/stay/ext-village.jpg", alt: "山谷聚落", label: "夜里 · 山谷的灯", span: "" },
  { img: "/stay/ext-night.jpg", alt: "黄昏亮灯木屋", label: "黄昏 · 送柴时间", span: "" },
];

export function StayGallery() {
  return (
    <section id="gallery" className="relative bg-[#1F3A4D] pt-12 pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#C89B6A]">
            Gallery · 住客镜头里的四季
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[#FAF7F2] sm:text-4xl">
            照片都是真的,因为懒得修
          </h2>
        </motion.div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {shots.map((s, i) => (
            <motion.figure
              key={s.img}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: (i % 4) * 0.08 }}
              className={cn("group relative overflow-hidden rounded-xl", s.span)}
            >
              <Image
                src={s.img}
                alt={s.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-[#0F1E28]/85 to-transparent px-4 pb-3 pt-10 text-xs text-[#FAF7F2] transition-transform duration-300 group-hover:translate-y-0">
                {s.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
