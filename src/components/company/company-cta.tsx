"use client";

import { motion } from "motion/react";
import { useState } from "react";

export function CompanyCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="cta" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-[#38BDF8]/20 bg-gradient-to-br from-[#0B1B2C] via-[#0C1018] to-[#131022] px-8 py-16 text-center sm:px-16"
      >
        {/* 氛围光 */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[560px] -translate-x-1/2 rounded-full bg-[#38BDF8]/12 blur-[100px]" />
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

        <div className="relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7DD3FC]">
            现在开始
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#F2F5F9] sm:text-4xl">
            今天下午,就能看到你的
            <br className="hidden sm:block" />
            第一块实时仪表盘
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-[#8A94A6]">
            留下工作邮箱,我们会发送专属试用环境和一份 10 分钟的上手指南。
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-8 max-w-md rounded-lg border border-[#34D399]/30 bg-[#34D399]/8 px-4 py-3 text-sm text-[#34D399]"
            >
              已收到。指南与试用链接会在 24 小时内送达 {email}。
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubmitted(true);
              }}
              className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="h-11 flex-1 rounded-lg border border-[#8A94A6]/25 bg-[#0A0D14]/80 px-4 text-sm text-[#E6EAF2] placeholder-[#5C6675] outline-none transition-colors focus:border-[#38BDF8]/60"
              />
              <button
                type="submit"
                className="h-11 rounded-lg bg-[#38BDF8] px-5 text-sm font-medium text-[#071018] transition-colors hover:bg-[#7DD3FC]"
              >
                获取试用
              </button>
            </form>
          )}

          <p className="mt-5 font-mono text-[10px] text-[#5C6675]">
            无绑定 · 14 天全功能 · 随时导出数据
          </p>
        </div>
      </motion.div>
    </section>
  );
}