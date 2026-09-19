"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "独饮",
    freq: "每 2 周 1 袋",
    price: "¥98",
    unit: "/ 期",
    perks: ["250g 当季豆", "风味卡 + 冲煮参数"],
    highlight: false,
  },
  {
    name: "小家庭",
    freq: "每月 2 袋",
    price: "¥168",
    unit: "/ 月",
    perks: ["深浅焙各一支", "免费升级手磨服务", "赠甜点兑换券 1 张"],
    highlight: true,
  },
  {
    name: "咖啡师",
    freq: "每月 3 袋",
    price: "¥268",
    unit: "/ 月",
    perks: ["含 1 支微批次竞标豆", "新豆优先试饮", "杯测会预留席位"],
    highlight: false,
  },
];

export function CafeSubscribe() {
  return (
    <section id="subscribe" className="relative overflow-hidden py-28">
      <Image
        src="/cafe/bg-fog.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#120A04] via-[#120A04]/48 to-[#120A04]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28"
          >
            <div className="text-[11px] uppercase tracking-[0.32em] text-[#C99A5B]">
              豆订阅
            </div>
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-snug tracking-tight text-[#F5EADA] sm:text-4xl">
              让山,
              <br />
              每两周来敲一次门。
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#A38B6E]">
              烘焙日次日发货,顺丰冷链江浙沪次日达。随时可暂停、可换档,
              不玩自动续费那一套。
            </p>
            <div className="mt-8 flex items-center gap-6 text-xs text-[#8A7358]">
              <span>✓ 已订阅 326 人</span>
              <span>✓ 续订率 78%</span>
            </div>
          </motion.div>

          <div className="space-y-4">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={cn(
                  "flex flex-col gap-5 rounded-2xl border p-7 backdrop-blur-sm sm:flex-row sm:items-center",
                  p.highlight
                    ? "border-[#C99A5B]/55 bg-[#C99A5B]/10 shadow-[0_0_48px_-16px_rgba(201,154,91,0.45)]"
                    : "border-[#C99A5B]/15 bg-[#1A0F06]/65",
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-serif text-xl font-semibold text-[#F5EADA]">
                      {p.name}
                    </h3>
                    {p.highlight && (
                      <span className="rounded-full bg-[#C99A5B] px-2 py-0.5 text-[10px] text-[#1A0F06]">
                        最受欢迎
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 text-xs text-[#8A7358]">{p.freq}</div>
                  <ul className="mt-4 space-y-1.5">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-sm text-[#A38B6E]">
                        <span className="h-1 w-1 shrink-0 rounded-full bg-[#C99A5B]" aria-hidden />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <div className="font-mono text-3xl font-semibold text-[#E8C69B]">
                    {p.price}
                    <span className="ml-1 text-xs text-[#8A7358]">{p.unit}</span>
                  </div>
                  <a
                    href="#reserve"
                    className={cn(
                      "mt-4 inline-block rounded-full px-5 py-2 text-sm font-medium transition-colors",
                      p.highlight
                        ? "bg-[#C99A5B] text-[#1A0F06] hover:bg-[#E8C69B]"
                        : "border border-[#C99A5B]/40 text-[#E8C69B] hover:bg-[#C99A5B]/10",
                    )}
                  >
                    开始订阅
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
