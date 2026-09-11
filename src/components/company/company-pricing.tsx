"use client";

import { motion } from "motion/react";

const plans = [
  {
    name: "入门版",
    price: "0",
    suffix: "/月",
    desc: "给正在验证数据价值的小团队",
    features: ["3 个仪表盘", "2 个数据源", "7 天数据保留", "社区支持"],
    cta: "免费开始",
    highlight: false,
  },
  {
    name: "专业版",
    price: "499",
    suffix: "/月",
    desc: "给需要实时洞察的成长型团队",
    features: [
      "无限仪表盘",
      "20 个数据源",
      "90 天数据保留",
      "智能告警与洞察",
      "团队协作与权限",
      "工作日 1 对 1 支持",
    ],
    cta: "开始 14 天试用",
    highlight: true,
  },
  {
    name: "企业版",
    price: "定制",
    suffix: "",
    desc: "给把数据当基础设施的组织",
    features: [
      "专有部署 / 私有云",
      "无限数据源与保留",
      "SSO · 审计 · 合规",
      "专属客户成功经理",
    ],
    cta: "联系销售",
    highlight: false,
  },
];

export function CompanyPricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C6675]">
          价格
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#F2F5F9] sm:text-4xl">
          从第一块仪表盘开始
        </h2>
      </motion.div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-3">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative flex flex-col rounded-2xl p-6 ${
              plan.highlight
                ? "border border-[#38BDF8]/40 bg-gradient-to-b from-[#38BDF8]/10 to-transparent shadow-[0_0_48px_-12px_rgba(56,189,248,0.35)]"
                : "border border-[#8A94A6]/12 bg-[#0C1018]"
            }`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#38BDF8] px-3 py-0.5 font-mono text-[10px] font-medium text-[#071018]">
                最受欢迎
              </span>
            )}

            <div className="text-sm font-medium text-[#E6EAF2]">{plan.name}</div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-mono text-3xl font-semibold tabular-nums text-[#F2F5F9]">
                {plan.price === "定制" ? "定制" : `¥${plan.price}`}
              </span>
              <span className="font-mono text-xs text-[#5C6675]">{plan.suffix}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[#8A94A6]">{plan.desc}</p>

            <ul className="mt-5 flex-1 space-y-2.5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-[#8A94A6]">
                  <svg
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#34D399]"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.5 8.5L6.5 11.5L12.5 4.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#cta"
              className={`mt-6 rounded-lg py-2.5 text-center text-xs font-medium transition-colors ${
                plan.highlight
                  ? "bg-[#38BDF8] text-[#071018] hover:bg-[#7DD3FC]"
                  : "border border-[#8A94A6]/25 text-[#E6EAF2] hover:bg-white/[0.05]"
              }`}
            >
              {plan.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}