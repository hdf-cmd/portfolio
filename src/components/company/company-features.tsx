"use client";

import { motion } from "motion/react";
import {
  Activity,
  Blocks,
  Braces,
  MonitorSmartphone,
  Plug,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// Bento 特性网格：两大卡（带产品内视觉）+ 五小卡
const smallFeatures = [
  { icon: Blocks, title: "拖拽搭建", desc: "无需写代码,拖组件、连数据源,十分钟出一块看板。" },
  { icon: Plug, title: "100+ 集成", desc: "数据库、仓库、SaaS 一把连,一处汇总所有数据。" },
  { icon: ShieldCheck, title: "企业级安全", desc: "端到端加密、细粒度权限、完整审计日志。" },
  { icon: MonitorSmartphone, title: "多端协作", desc: "桌面、平板、手机随时查看与分享,团队零障碍。" },
  { icon: Braces, title: "开放 API", desc: "REST 与 Webhook 全开放,嵌入你的产品毫无压力。" },
];

function FeatureBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#38BDF8]/25 to-[#818CF8]/25 text-[#7DD3FC]">
      <Icon className="h-4 w-4" strokeWidth={2} />
    </span>
  );
}

export function CompanyFeatures() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C6675]">
          产品能力
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#F2F5F9] sm:text-4xl">
          覆盖数据工作流的每一环
        </h2>
        <p className="mt-4 text-[#8A94A6]">
          从接入、清洗、可视化到协作,一块平台全解决。
        </p>
      </motion.div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {/* 大卡 1：实时数据流 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-between rounded-2xl border border-[#8A94A6]/12 bg-[#0C1018] p-6 md:col-span-2"
        >
          <div>
            <FeatureBadge icon={Activity} />
            <h3 className="mt-4 text-lg font-medium text-[#E6EAF2]">实时数据流</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#8A94A6]">
              数据变化秒级上屏,仪表盘永远是最新状态——不是「上次更新于昨天」。
            </p>
          </div>
          <div className="mt-6 space-y-2 rounded-lg border border-[#8A94A6]/12 bg-white/[0.02] p-3 font-mono text-[11px]">
            {[
              { t: "14:32:08", c: "#34D399", text: "新订单 +¥24,800 · 华东大区" },
              { t: "14:31:52", c: "#38BDF8", text: "告警解除 · 网关延迟回落" },
              { t: "14:31:03", c: "#F59E0B", text: "峰值流量 12.4k QPS · 小程序" },
            ].map((ev, i) => (
              <motion.div
                key={ev.t}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ev.c }} />
                <span className="shrink-0 text-[#5C6675]">{ev.t}</span>
                <span className="truncate text-[#8A94A6]">{ev.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 小卡 1 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="rounded-2xl border border-[#8A94A6]/12 bg-[#0C1018] p-6 transition-colors hover:border-[#8A94A6]/25"
        >
          <FeatureBadge icon={smallFeatures[0].icon} />
          <h3 className="mt-4 text-base font-medium text-[#E6EAF2]">{smallFeatures[0].title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#8A94A6]">{smallFeatures[0].desc}</p>
        </motion.div>

        {/* 小卡 2 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-[#8A94A6]/12 bg-[#0C1018] p-6 transition-colors hover:border-[#8A94A6]/25"
        >
          <FeatureBadge icon={smallFeatures[1].icon} />
          <h3 className="mt-4 text-base font-medium text-[#E6EAF2]">{smallFeatures[1].title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#8A94A6]">{smallFeatures[1].desc}</p>
        </motion.div>

        {/* 大卡 2：AI 洞察 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col justify-between rounded-2xl border border-[#8A94A6]/12 bg-[#0C1018] p-6 md:col-span-2"
        >
          <div>
            <FeatureBadge icon={Sparkles} />
            <h3 className="mt-4 text-lg font-medium text-[#E6EAF2]">AI 智能洞察</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#8A94A6]">
              不用自己盯报表。异常发生前,澄澈已经在告警中心把原因分析好了。
            </p>
          </div>
          <div className="mt-6 space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="ml-auto max-w-[85%] rounded-lg rounded-br-sm bg-[#38BDF8]/12 px-3 py-2 text-sm text-[#8A94A6]"
            >
              本周转化率为什么涨了 12%?
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="max-w-[85%] rounded-lg rounded-bl-sm bg-white/[0.04] px-3 py-2 text-sm text-[#B9C3D4]"
            >
              华东区「夏季新品页」投放带来了 68% 新增访客,客单价提升 9%。
              建议将预算向该页面倾斜。—— 已自动生成周报草稿
            </motion.div>
          </div>
        </motion.div>

        {/* 小卡 3-5 */}
        {smallFeatures.slice(2).map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
            className="rounded-2xl border border-[#8A94A6]/12 bg-[#0C1018] p-6 transition-colors hover:border-[#8A94A6]/25"
          >
            <FeatureBadge icon={f.icon} />
            <h3 className="mt-4 text-base font-medium text-[#E6EAF2]">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#8A94A6]">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}