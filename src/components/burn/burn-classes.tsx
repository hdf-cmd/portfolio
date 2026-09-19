"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Series = "力量" | "耐力" | "恢复";

type ClassItem = {
  day: number; // 0=周一
  time: string;
  name: string;
  series: Series;
  coach: string;
  level: 1 | 2 | 3 | 4 | 5;
  spots: number;
  total: number;
};

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

const seriesColor: Record<Series, string> = {
  力量: "border-[#FF4D00]/50 bg-[#FF4D00]/12 text-[#FF8A5C]",
  耐力: "border-sky-400/40 bg-sky-400/10 text-sky-300",
  恢复: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
};

const classes: ClassItem[] = [
  { day: 0, time: "07:00", name: "晨间力量循环", series: "力量", coach: "雷刚", level: 3, spots: 4, total: 16 },
  { day: 0, time: "19:30", name: "杠铃基础课", series: "力量", coach: "雷刚", level: 2, spots: 2, total: 12 },
  { day: 1, time: "12:15", name: "午间燃脂间歇", series: "耐力", coach: "陈骁", level: 4, spots: 7, total: 20 },
  { day: 1, time: "20:00", name: "硬拉进阶工作坊", series: "力量", coach: "林薇", level: 5, spots: 1, total: 8 },
  { day: 2, time: "07:00", name: "恢复流动晨练", series: "恢复", coach: "苏婉", level: 1, spots: 9, total: 14 },
  { day: 2, time: "19:30", name: "5 公里节奏跑", series: "耐力", coach: "陈骁", level: 3, spots: 6, total: 24 },
  { day: 3, time: "12:15", name: "核心 30 分钟", series: "力量", coach: "林薇", level: 2, spots: 11, total: 16 },
  { day: 3, time: "20:00", name: "筋膜放松夜话", series: "恢复", coach: "苏婉", level: 1, spots: 5, total: 12 },
  { day: 4, time: "18:00", name: "周五测试夜", series: "耐力", coach: "陈骁", level: 5, spots: 3, total: 16 },
  { day: 4, time: "20:30", name: "推举专项课", series: "力量", coach: "雷刚", level: 4, spots: 0, total: 10 },
  { day: 5, time: "09:00", name: "长距离慢跑团", series: "耐力", coach: "陈骁", level: 2, spots: 15, total: 30 },
  { day: 5, time: "14:00", name: "深蹲技术门诊", series: "力量", coach: "雷刚", level: 3, spots: 2, total: 6 },
  { day: 6, time: "10:00", name: "周末全家恢复课", series: "恢复", coach: "苏婉", level: 1, spots: 8, total: 20 },
  { day: 6, time: "16:00", name: "战绳对抗赛", series: "耐力", coach: "林薇", level: 4, spots: 4, total: 12 },
];

function Level({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-1" title={`强度 ${value}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={cn(
            "h-3 w-1 rounded-full",
            n <= value ? "bg-[#FF4D00]" : "bg-white/15",
          )}
        />
      ))}
    </span>
  );
}

export function BurnClasses() {
  const [day, setDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [series, setSeries] = useState<Series | "全部">("全部");

  const shown = classes
    .filter((c) => c.day === day && (series === "全部" || c.series === series))
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <>
      {/* 页头 */}
      <section className="relative overflow-hidden">
        <Image
          src="/burn/bg-gym.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0C0C0C]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0C0C0C]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#FF4D00]"
          >
            Schedule · 每周 14 节团课
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-black uppercase tracking-tight text-white sm:text-6xl text-4xl"
          >
            课程表。
            <br />
            <span className="text-white/40">别挑日子,挑时间。</span>
          </motion.h1>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28 pt-14">
        {/* 星期切换 */}
        <div className="flex flex-wrap justify-center gap-2">
          {days.map((d, i) => (
            <button
              key={d}
              type="button"
              onClick={() => setDay(i)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-semibold transition-all",
                day === i
                  ? "bg-white text-[#0C0C0C]"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white",
              )}
            >
              {d}
            </button>
          ))}
        </div>

        {/* 系列过滤 */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {(["全部", "力量", "耐力", "恢复"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeries(s)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all",
                series === s
                  ? "border-[#FF4D00] bg-[#FF4D00]/15 text-[#FF8A5C]"
                  : "border-white/15 text-white/40 hover:border-white/35 hover:text-white/70",
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {/* 课表 */}
        <motion.div
          key={`${day}-${series}`}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mx-auto mt-10 max-w-4xl space-y-3"
        >
          {shown.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-14 text-center">
              <p className="text-sm text-white/50">
                这一天的这个系列没有排课 —— 换一个筛选,或者去跑个 5 公里。
              </p>
            </div>
          )}
          {shown.map((c) => {
            const full = c.spots === 0;
            return (
              <div
                key={c.name}
                className={cn(
                  "flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 transition-colors sm:flex-row sm:items-center",
                  !full && "hover:border-[#FF4D00]/40",
                  full && "opacity-55",
                )}
              >
                <span className="w-16 shrink-0 font-mono text-lg font-bold text-white">
                  {c.time}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-base font-bold text-white">{c.name}</h3>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        seriesColor[c.series],
                      )}
                    >
                      {c.series}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/45">
                    教练 {c.coach} · {c.total - c.spots}/{c.total} 已约
                  </p>
                </div>
                <Level value={c.level} />
                {full ? (
                  <span className="shrink-0 rounded-full border border-white/20 px-4 py-1.5 text-xs font-bold text-white/40">
                    已满 · 候补
                  </span>
                ) : (
                  <Link
                    href="/burn#join"
                    className="shrink-0 rounded-full bg-[#FF4D00] px-4 py-1.5 text-center text-xs font-bold text-white transition-colors hover:bg-[#FF6A2B]"
                  >
                    剩 {c.spots} 席
                  </Link>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* 底部引导 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 flex max-w-4xl flex-col items-center gap-4 rounded-2xl border border-[#FF4D00]/25 bg-gradient-to-r from-[#FF4D00]/10 to-transparent px-8 py-8 text-center sm:flex-row sm:text-left"
        >
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">团课包含在会籍里,不加钱。</h3>
            <p className="mt-1.5 text-sm text-white/55">
              月卡及以上会籍,每周 14 节团课随便上。先看看哪档合适。
            </p>
          </div>
          <Link
            href="/burn/pricing"
            className="shrink-0 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[#0C0C0C] transition-transform hover:-translate-y-0.5"
          >
            查看价格 →
          </Link>
        </motion.div>
      </section>
    </>
  );
}
