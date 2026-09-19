"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { IconChair, IconCup, IconHourglass, IconMoon, IconPinwheel, IconShield, IconTooth } from "./dental-icons";

const details = [
  { icon: IconChair, t: "牙椅叫飞船", d: "升降按钮让孩子自己按两下，先掌握机器，再躺上去。" },
  { icon: IconPinwheel, t: "抛光杯叫小风车", d: "转给娃看一遍再进嘴，工具先混个脸熟。" },
  { icon: IconCup, t: "氟化泡沫是草莓味", d: "涂氟前让娃闻一下，味道对了紧张就掉一半。" },
  { icon: IconHourglass, t: "张嘴二十秒沙漏", d: "初诊的全部任务：数牙。计时结束发贴纸。" },
  { icon: IconMoon, t: "夜诊灯只开一半", d: "滨江院到二十一点，怕黑的娃不用白天请假。" },
  { icon: IconShield, t: "麻药先抹再打", d: "草莓味表面麻醉膏敷两分钟，进针那一下几乎没感觉。" },
  { icon: IconTooth, t: "全景片当藏宝图", d: "给娃指着片子讲：这颗是你的六龄齿，它不替换谁。" },
  { icon: IconChair, t: "天花板有动画屏", d: "躺下时眼睛有地方去，脖子不用僵着。" },
  { icon: IconCup, t: "小吸管游戏", d: "吸唾管改叫小吸管，让娃数它喝了几口水。" },
  { icon: IconShield, t: "器械在娃看不见的地方消毒", d: "独立消毒供应区六十平方米，当面拆封一次性包。" },
  { icon: IconMoon, t: "候诊区没有电视广告", d: "只有绘本架和绿植，等待不会越等越怕。" },
  { icon: IconTooth, t: "医生蹲下说话", d: "聊牙之前先聊奥特曼，视线齐平了再张嘴。" },
];

const checklist = ["跟医生击过掌", "自己按过牙椅", "闻过草莓氟", "躺在飞船上数过牙", "领到勇敢贴纸"];

export function DentalFearless() {
  const [checked, setChecked] = useState<boolean[]>(checklist.map(() => false));
  const done = checked.filter(Boolean).length;
  const stamped = done === checklist.length;

  const toggle = (i: number) =>
    setChecked((c) => c.map((v, j) => (j === i ? !v : v)));

  return (
    <section id="fearless" className="relative overflow-hidden bg-[#F4FAF8] py-24">
      <Image
        src="/dental/bg-tray.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4FAF8] via-[#F4FAF8]/50 to-[#F4FAF8]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0E7A63]">
              Fearless · 十二个细节
            </div>
            <h2 className="mt-4 max-w-2xl text-2xl font-bold tracking-tight text-[#123840] sm:text-3xl">
              牙椅上升前，先让他自己按两下降。
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {details.map((x, i) => (
                <motion.div
                  key={x.t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: (i % 2) * 0.08 }}
                  tabIndex={0}
                  className="group rounded-3xl border border-[#23B39A]/14 bg-[#23B39A]/[0.05] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#23B39A]/40 hover:bg-white hover:shadow-[0_18px_40px_-24px_rgba(18,56,64,0.18)] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#0E7A63]"
                >
                  <x.icon className="h-6 w-6 text-[#0E7A63]" />
                  <h3 className="mt-3 text-sm font-bold text-[#123840]">{x.t}</h3>
                  <p className="mt-1.5 max-h-0 overflow-hidden text-xs leading-relaxed text-[#4F6E75] transition-all duration-300 group-hover:max-h-24 group-focus-visible:max-h-24">
                    {x.d}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 不怕清单：给孩子打卡，勾满盖章（仅此块允许弹跳 spring） */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative h-fit self-start overflow-hidden rounded-3xl border border-[#23B39A]/25 bg-white p-8 shadow-[0_24px_56px_-32px_rgba(18,56,64,0.25)]"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#0E7A63]">
              Brave List · 不怕清单
            </div>
            <h3 className="mt-3 text-lg font-bold text-[#123840]">
              今天做到几件，就数几件。
            </h3>
            <ul className="mt-6 space-y-3">
              {checklist.map((c, i) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-pressed={checked[i]}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors duration-200 active:scale-[0.98] ${
                      checked[i]
                        ? "border-[#23B39A]/55 bg-[#23B39A]/8 text-[#123840]"
                        : "border-[#123840]/12 bg-white text-[#4F6E75] hover:border-[#23B39A]/35"
                    }`}
                  >
                    <motion.span
                      layout
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                        checked[i]
                          ? "border-[#0E7A63] bg-[#0E7A63] text-white"
                          : "border-[#4F6E75]/40 text-transparent"
                      }`}
                    >
                      ✓
                    </motion.span>
                    <span className={checked[i] ? "line-through decoration-[#23B39A]/70" : ""}>
                      {c}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <motion.div
              initial={false}
              animate={stamped ? { scale: [1.6, 0.92, 1], opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="pointer-events-none absolute -right-4 top-40 rotate-[-12deg] rounded-xl border-2 border-[#D9536B] px-4 py-2 text-sm font-bold text-[#D9536B]"
              aria-hidden={!stamped}
            >
              双叶勇敢认证 ★
            </motion.div>
            <p className="mt-6 text-xs text-[#4F6E75]">
              已做到 {done} / {checklist.length} 项。这是给孩子玩的前端小互动，不记录任何数据。
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
