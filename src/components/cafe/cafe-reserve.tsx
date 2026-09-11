"use client";

import { motion } from "motion/react";
import { useState } from "react";

export function CafeReserve() {
  const [name, setName] = useState("");
  const [seats, setSeats] = useState("2");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="reserve" className="mx-auto max-w-6xl px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-3xl border border-[#C99A5B]/20 bg-gradient-to-br from-[#241105] via-[#1A0F06] to-[#120A04] px-8 py-16 sm:px-16"
      >
        {/* 角落桌号装饰 */}
        <div className="pointer-events-none absolute -right-8 -top-8 font-serif text-[180px] font-semibold leading-none text-[#C99A5B]/6">
          屿
        </div>

        <div className="relative mx-auto max-w-lg text-center">
          <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#C99A5B]">
            门店预约
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[#F5EADA] sm:text-4xl">
            留一个靠窗的位置
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#A38B6E]">
            上海 · 静安店 试营业中。告诉我们你的名字和人数,咖啡师会提前备好当季豆子。
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 rounded-xl border border-[#C99A5B]/30 bg-[#C99A5B]/10 px-4 py-4 text-sm text-[#E8C69B]"
            >
              已预约 {seats} 个位置。开桌前一小时,我们会短信提醒 {name || "您"}。
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim()) setSubmitted(true);
              }}
              className="mt-8 flex flex-col gap-3"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="怎么称呼您"
                  className="h-11 flex-1 rounded-full border border-[#C99A5B]/25 bg-[#0F0803]/80 px-5 text-sm text-[#F5EADA] placeholder-[#8A7358] outline-none transition-colors focus:border-[#C99A5B]/60"
                />
                <select
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className="h-11 rounded-full border border-[#C99A5B]/25 bg-[#0F0803]/80 px-5 text-sm text-[#F5EADA] outline-none transition-colors focus:border-[#C99A5B]/60"
                >
                  {["1", "2", "3", "4", "5+"].map((s) => (
                    <option key={s} value={s} className="bg-[#1A0F06]">
                      {s === "5+" ? "5 人以上" : `${s} 人`}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#C99A5B] px-7 py-3 text-sm font-medium text-[#1A0F06] transition-transform hover:-translate-y-0.5"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">预约座位</span>
              </button>
            </form>
          )}

          <p className="mt-5 font-mono text-[10px] text-[#8A7358]">
            concept store · 12:00 – 02:00 · 每周二店休
          </p>
        </div>
      </motion.div>
    </section>
  );
}