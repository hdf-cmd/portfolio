"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChengcheLogo } from "./chengche-logo";

// —— 实时跳动 KPI：每 1.8s 模拟一次数据刷新（活仪表盘的信号）——
function LiveKpi() {
  const [value, setValue] = useState(8123.4);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => {
        const next = Math.max(7800, Math.min(8600, v + (Math.random() - 0.45) * 60));
        return Math.round(next * 10) / 10;
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-2 font-mono text-xl font-semibold tabular-nums tracking-tight text-[#E6EAF2] sm:text-2xl">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34D399] opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34D399]" />
      </span>
      {value.toLocaleString("en-US", { minimumFractionDigits: 1 })}
    </span>
  );
}

const kpis = [
  { label: "月度营收", delta: "+12.4%", up: true, live: true },
  { label: "活跃客户", delta: "+3.1%", up: true },
  { label: "平均解决时长", delta: "-18.2%", up: true },
];

export function CompanyHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:pt-44">
      {/* 背景：细腻网格 + 顶部品牌光 */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#2563EB]/18 blur-[140px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0A0D14] to-transparent" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#38BDF8]/25 bg-[#38BDF8]/8 px-4 py-1.5 text-xs text-[#7DD3FC]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
          企业级数据可视化平台
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 text-4xl font-semibold leading-[1.12] tracking-tight text-[#F2F5F9] sm:text-6xl"
        >
          看到数据,
          <br />
          <span className="bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#C084FC] bg-clip-text text-transparent">
            看见答案。
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-[#8A94A6] sm:text-lg"
        >
          澄澈把分散在几十个系统里的数据,汇聚成一块实时刷新的仪表盘。
          自动洞察异常,团队协作零摩擦——从查询到决策,快三个小时。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#pricing"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-[#38BDF8] px-6 py-3 text-sm font-medium text-[#071018] transition-transform hover:-translate-y-0.5"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">免费开始使用</span>
          </a>
          <a
            href="#features"
            className="rounded-lg border border-[#8A94A6]/25 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[#E6EAF2] transition-colors hover:border-[#8A94A6]/50 hover:bg-white/[0.06]"
          >
            观看 2 分钟演示
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-5 font-mono text-[11px] tracking-wide text-[#5C6675]"
        >
          14 天免费试用 · 无需信用卡 · 数据随时导出
        </motion.p>
      </div>

      {/* —— 活的仪表盘 mockup（本页签名元素）—— */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-16 max-w-5xl"
      >
        {/* 底板辉光 */}
        <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-[#2563EB]/10 blur-3xl" />

        <div className="relative overflow-hidden rounded-2xl border border-[#8A94A6]/15 bg-[#0C1018] shadow-[0_32px_80px_-24px_rgba(2,8,23,0.9)]">
          {/* 浏览器框 */}
          <div className="flex items-center gap-3 border-b border-[#8A94A6]/12 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/80" />
            </div>
            <div className="mx-auto hidden flex-1 justify-center sm:flex">
              <span className="rounded-md bg-white/[0.04] px-24 py-1 font-mono text-[10px] text-[#5C6675]">
                app.clearflow.cn/dashboard
              </span>
            </div>
            <span className="w-10" />
          </div>

          <div className="flex">
            {/* 侧边栏（桌面可见） */}
            <aside className="hidden w-40 shrink-0 border-r border-[#8A94A6]/12 p-3 lg:block">
              <div className="mb-4 flex items-center gap-2 px-1.5">
                <ChengcheLogo className="h-5 w-5" />
                <span className="text-xs font-medium text-[#E6EAF2]">澄澈</span>
              </div>
              <div className="space-y-0.5">
                {["工作台", "数据源", "告警中心", "报表", "设置"].map((item, i) => (
                  <div
                    key={item}
                    className={`rounded-md px-2 py-1.5 text-[11px] ${
                      i === 0
                        ? "bg-[#38BDF8]/12 font-medium text-[#7DD3FC]"
                        : "text-[#5C6675]"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>

            {/* 主区 */}
            <div className="min-w-0 flex-1 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-[#E6EAF2]">销售总览</div>
                  <div className="mt-0.5 font-mono text-[10px] text-[#5C6675]">
                    更新于 2 秒前
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {["今日", "本周", "本月"].map((range, i) => (
                    <span
                      key={range}
                      className={`rounded-md px-2 py-1 text-[10px] ${
                        i === 1
                          ? "bg-[#38BDF8]/15 text-[#7DD3FC]"
                          : "text-[#5C6675]"
                      }`}
                    >
                      {range}
                    </span>
                  ))}
                </div>
              </div>

              {/* KPI 行 */}
              <div className="mt-4 grid grid-cols-3 gap-2.5">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-lg border border-[#8A94A6]/12 bg-white/[0.025] p-3"
                  >
                    <div className="truncate font-mono text-[9px] uppercase tracking-wider text-[#5C6675]">
                      {kpi.label}
                    </div>
                    <div className="mt-1.5">
                      {kpi.live ? (
                        <LiveKpi />
                      ) : (
                        <span className="font-mono text-xl font-semibold tabular-nums text-[#E6EAF2] sm:text-2xl">
                          {kpi.label === "平均解决时长" ? "4m 12s" : "2,481"}
                        </span>
                      )}
                    </div>
                    <div
                      className={`mt-1 inline-flex items-center gap-1 rounded px-1 py-0.5 font-mono text-[9px] ${
                        kpi.up
                          ? "bg-[#34D399]/10 text-[#34D399]"
                          : "bg-[#F59E0B]/10 text-[#F59E0B]"
                      }`}
                    >
                      {kpi.delta}
                    </div>
                  </div>
                ))}
              </div>

              {/* 主图 + 侧列 */}
              <div className="mt-3 grid gap-2.5 xl:grid-cols-[1fr_168px]">
                {/* SVG 面积图 */}
                <div className="rounded-lg border border-[#8A94A6]/12 bg-white/[0.02] p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#5C6675]">
                      营收趋势
                    </span>
                    <div className="flex items-center gap-3 font-mono text-[9px] text-[#5C6675]">
                      <span className="flex items-center gap-1">
                        <span className="h-1 w-3 rounded bg-[#38BDF8]" /> 本期
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="h-1 w-3 rounded bg-[#F59E0B]" /> 上期
                      </span>
                    </div>
                  </div>

                  <svg viewBox="0 0 560 190" className="w-full" aria-hidden>
                    {/* 网格 */}
                    {[30, 70, 110, 150].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="560"
                        y2={y}
                        stroke="rgba(148,163,184,0.08)"
                        strokeWidth="1"
                      />
                    ))}
                    {/* 面积（上期，琥珀渐变） */}
                    <motion.path
                      d="M0,160 L40,148 L80,155 L120,132 L160,140 L200,112 L240,120 L280,96 L320,104 L360,84 L400,94 L440,58 L480,70 L520,44 L560,50 L560,190 L0,190 Z"
                      fill="url(#amberFill)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.9 }}
                    />
                    <motion.path
                      d="M0,160 L40,148 L80,155 L120,132 L160,140 L200,112 L240,120 L280,96 L320,104 L360,84 L400,94 L440,58 L480,70 L520,44 L560,50"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.7"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: 0.9, ease: "easeInOut" }}
                    />
                    {/* 主面积（本期，青蓝） */}
                    <motion.path
                      d="M0,150 L40,136 L80,142 L120,116 L160,124 L200,98 L240,106 L280,78 L320,88 L360,64 L400,76 L440,44 L480,54 L520,30 L560,36 L560,190 L0,190 Z"
                      fill="url(#blueFill)"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                    />
                    <motion.path
                      d="M0,150 L40,136 L80,142 L120,116 L160,124 L200,98 L240,106 L280,78 L320,88 L360,64 L400,76 L440,44 L480,54 L520,30 L560,36"
                      fill="none"
                      stroke="#38BDF8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
                    />
                    {/* 末端脉冲数据点 */}
                    <circle cx="560" cy="36" r="7" fill="#38BDF8" opacity="0.15" />
                    <motion.circle
                      cx="560"
                      cy="36"
                      r="3"
                      fill="#38BDF8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.2 }}
                    />
                    <defs>
                      <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="amberFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="mt-1 flex justify-between font-mono text-[9px] text-[#5C6675]">
                    <span>00:00</span>
                    <span>06:00</span>
                    <span>12:00</span>
                    <span>18:00</span>
                    <span>24:00</span>
                  </div>
                </div>

                {/* 侧列：转化环 + 实时事件（宽屏可见） */}
                <div className="hidden flex-col gap-2.5 xl:flex">
                  <div className="flex-1 rounded-lg border border-[#8A94A6]/12 bg-white/[0.02] p-3 text-center">
                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#5C6675]">
                      转化率
                    </div>
                    <div className="relative mx-auto mt-3 h-16 w-16">
                      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          fill="none"
                          stroke="rgba(148,163,184,0.12)"
                          strokeWidth="7"
                        />
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="26"
                          fill="none"
                          stroke="#818CF8"
                          strokeWidth="7"
                          strokeLinecap="round"
                          strokeDasharray="163.4"
                          initial={{ strokeDashoffset: 163.4 }}
                          whileInView={{ strokeDashoffset: 163.4 * 0.28 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.4, delay: 1, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-semibold text-[#E6EAF2]">
                        72%
                      </div>
                    </div>
                    <div className="mt-2 font-mono text-[9px] text-[#34D399]">
                      ↑ 环比 +5.2%
                    </div>
                  </div>

                  <div className="flex-1 overflow-hidden rounded-lg border border-[#8A94A6]/12 bg-white/[0.02] p-3">
                    <div className="mb-2 font-mono text-[9px] uppercase tracking-wider text-[#5C6675]">
                      实时事件
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { t: "14:32:08", c: "#34D399", text: "新订单 · 华东大区" },
                        { t: "14:31:52", c: "#38BDF8", text: "告警解除 · 延迟" },
                        { t: "14:31:03", c: "#F59E0B", text: "流量峰值 · 微服务" },
                      ].map((ev) => (
                        <div key={ev.t} className="flex items-center gap-1.5 font-mono text-[9px]">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ev.c }} />
                          <span className="shrink-0 text-[#5C6675]">{ev.t}</span>
                          <span className="truncate text-[#8A94A6]">{ev.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}