"use client";

import Image from "next/image";
import { motion } from "motion/react";

const offers = [
  { img: "/stay/offer-onsen.jpg", alt: "雪中的露天浴池", name: "湖景私汤", desc: "24h 山泉注水,夜里对着星空泡" },
  { img: "/stay/offer-fire.jpg", alt: "夜晚燃烧的篝火", name: "篝火夜", desc: "周五/周六晚,管家烤棉花糖" },
  { img: "/stay/offer-boat.jpg", alt: "镜面湖上的红色皮划艇", name: "皮划艇", desc: "住客免费,日落前一小时最出片" },
  { img: "/stay/offer-van.jpg", alt: "山间公路上的接驳车", name: "县城接驳", desc: "每天 10:00 / 16:00 两班,提前一天说" },
];

export function StayStory() {
  return (
    <section className="relative overflow-hidden py-28">
      <Image
        src="/stay/ext-night.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#1F3A4D]/88 to-[#FAF7F2]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="text-[11px] uppercase tracking-[0.32em] text-[#FFE8CB]">
            在这里,时间怎么花
          </div>
          <h2 className="mx-auto mt-5 max-w-xl font-serif text-3xl font-semibold leading-snug tracking-tight text-[#FAF7F2] sm:text-4xl">
            没有行程表,
            <br className="sm:hidden" />
            只有值得虚度的东西
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o, i) => (
            <motion.div
              key={o.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-sm"
            >
              <div className="relative h-28 overflow-hidden">
                <Image
                  src={o.img}
                  alt={o.alt}
                  fill
                  sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-85 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F3A4D]/55 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-[#FAF7F2]">{o.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{o.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
