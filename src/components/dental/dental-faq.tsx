"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const faqs = [
  {
    q: "乳牙反正要换，为什么还要治？",
    a: "乳牙给恒牙占着位置，也负责咀嚼和发音。乳牙提前坏掉、提前拔掉，恒牙长歪的概率明显上升。治乳牙，其实是在给恒牙省事。",
  },
  {
    q: "六龄齿是哪颗？",
    a: "大约六岁在牙列最里面萌出的第一恒磨牙。它不替换任何乳牙，所以家长常把它当乳牙漏掉——它其实要跟你一辈子，萌出后尽早做窝沟封闭。",
  },
  {
    q: "孩子哭怎么办？会按住治吗？",
    a: "初诊不治疗，只检查和数牙，哭不影响。真到需要治疗的步骤，我们按「见面—靠近—上手」三步来，一次不行分两次。没有「按住快速做完」这一说。",
  },
  {
    q: "第一次来要带什么？",
    a: "带上医保卡（儿童门诊可部分结算）和娃喜欢的小玩具。如果之前在外院拍过片，把片子带来，能少拍一次。",
  },
  {
    q: "夜诊和白天有什么区别？",
    a: "医生、器械、流程完全一样，只是滨江院开到二十一点。适合放学顺路和白天请不了假的家长，到院平均等待反而更短。",
  },
  {
    q: "涂氟和窝沟封闭选哪个？",
    a: "不是二选一。涂氟全口牙每半年一次；窝沟封闭只做大牙咬合面的深沟，六龄齿萌出后就可以。两个都做，防蛀覆盖率最高。",
  },
  {
    q: "牙齿磕断了先干嘛？",
    a: "找到断掉的牙片，泡在牛奶或生理盐水里带来；整颗脱落的恒牙含回牙槽窝或同样泡牛奶，三十分钟内到院。先打电话，路上我们指导。",
  },
];

export function DentalFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#0E2A31] py-28">
      <Image
        src="/dental/bg-night.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E2A31] via-[#0E2A31]/45 to-[#0E2A31]" />
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#23B39A]">
          Parents · 家长须知
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          问得最多的七件事。
        </h2>
        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-[#23B39A] active:scale-[0.995]"
                >
                  <span className="text-sm font-semibold text-white sm:text-base">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-[#23B39A]"
                    aria-hidden
                  >
                    ▸
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pr-8 text-sm leading-relaxed text-white/70">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
