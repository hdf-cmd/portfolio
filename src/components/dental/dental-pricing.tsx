"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const menu = [
  { name: "儿童初诊检查（含全景片）", price: 180, unit: "", note: "只检查数牙，当天不治牙" },
  { name: "涂氟", price: 240, unit: " / 次", note: "建议每半年一次" },
  { name: "窝沟封闭", price: 180, unit: " / 颗", note: "六龄齿四颗 = ¥720" },
  { name: "儿童洁牙", price: 260, unit: " / 次", note: "换牙期起" },
  { name: "乳牙预成冠", price: 980, unit: " / 颗", note: "" },
];

const symptoms = [
  { key: "check", label: "第一次来，先检查", items: [0] },
  { key: "cavity", label: "牙上有白点/小黑洞", items: [0, 1] },
  { key: "six", label: "后面长出大牙了", items: [0, 2] },
  { key: "dirty", label: "刷牙出血/有牙石", items: [0, 3] },
  { key: "fall", label: "磕到了牙", items: [0, 4] },
];

export function DentalPricing() {
  const [sym, setSym] = useState<string | null>("check");
  const picked = symptoms.find((x) => x.key === sym);
  const total = picked ? picked.items.reduce((a, i) => a + menu[i].price, 0) : 0;

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#E9F4F1] py-24">
      <Image
        src="/dental/bg-price.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#E9F4F1]/80 via-[#E9F4F1]/40 to-[#E9F4F1]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0E7A63]">
          Pricing · 价格与年卡
        </div>
        <h2 className="mt-4 max-w-2xl text-2xl font-bold tracking-tight text-[#123840] sm:text-3xl">
          涂氟一年两次，一次二百四十块。
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-[#23B39A]/14 bg-white/85 p-8">
            {/* 症状自选 → 预计项目与价格联动 */}
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#4F6E75]">
              今天哪里不舒服？（点一下，下方自动算价）
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {symptoms.map((x) => (
                <button
                  key={x.key}
                  type="button"
                  aria-pressed={sym === x.key}
                  onClick={() => setSym(sym === x.key ? null : x.key)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-[0.97] ${
                    sym === x.key
                      ? "border-[#23B39A] bg-[#23B39A]/8 text-[#123840]"
                      : "border-[#123840]/14 bg-white text-[#4F6E75] hover:border-[#23B39A]/45"
                  }`}
                >
                  {x.label}
                </button>
              ))}
            </div>

            <ul className="mt-8 space-y-4">
              {menu.map((m, i) => {
                const on = picked?.items.includes(i);
                return (
                  <li
                    key={m.name}
                    className={`flex items-baseline gap-3 text-sm transition-opacity duration-300 ${
                      picked && !on ? "opacity-35" : "opacity-100"
                    }`}
                  >
                    <span className={`shrink-0 font-semibold text-[#123840] ${on ? "text-[#0E7A63]" : ""}`}>
                      {on ? "▸ " : ""}
                      {m.name}
                    </span>
                    <span className="flex-1 border-b border-dotted border-[#123840]/25" aria-hidden />
                    <span className="shrink-0 font-mono font-semibold tabular-nums text-[#123840]">
                      ¥{m.price}
                      <span className="text-xs text-[#4F6E75]">{m.unit}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex items-baseline justify-between border-t border-[#123840]/10 pt-5">
              <span className="text-xs text-[#4F6E75]">
                {picked ? "按所选情况，预计项目合计" : "点一个情况试试，或按价目表自估"}
              </span>
              <motion.span
                key={total}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-lg font-bold tabular-nums text-[#123840]"
              >
                ¥{total}
              </motion.span>
            </div>
            {menu.map((m) => m.note && <p key={m.name} className="mt-2 text-[11px] text-[#4F6E75]/80">{m.name}：{m.note}</p>)}
          </div>

          {/* 年卡：高亮三件套（边框+发光+角标） */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative h-fit overflow-hidden rounded-3xl border-2 border-[#23B39A]/45 bg-white p-8 shadow-[0_0_48px_-16px_rgba(35,179,154,0.45)]"
          >
            <span className="absolute right-5 top-5 rounded-full bg-[#0E7A63] px-3 py-1 text-[10px] font-bold text-white">
              四院通用
            </span>
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#0E7A63]">
              Biloba Card · 双叶年卡
            </div>
            <div className="mt-6 font-mono text-4xl font-bold tabular-nums text-[#123840]">
              ¥880
              <span className="ml-1 text-sm font-semibold text-[#4F6E75]"> / 年</span>
            </div>
            <p className="mt-2 text-sm text-[#4F6E75]">折合一天两块四。</p>
            <ul className="mt-6 space-y-2.5 text-sm text-[#123840]">
              <li>✓ 检查 ×2 + 涂氟 ×2 + 洁牙 ×1（单买 ¥1100，省 ¥220）</li>
              <li>✓ 夜诊优先排队</li>
              <li>✓ 终身齿列档案，四院共享</li>
            </ul>
            <a
              href="#booking"
              className="mt-8 block rounded-full bg-[#0E7A63] py-3 text-center text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0B6351] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              办一张
            </a>
            <p className="mt-4 text-[11px] leading-relaxed text-[#4F6E75]/80">
              年卡为演示虚构权益，不构成医疗建议；诊疗请以到院检查为准。
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
