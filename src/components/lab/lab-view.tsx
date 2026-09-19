"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { LabPrinciples } from "@/components/lab/lab-principles";
import { cn } from "@/lib/utils";

// 项目 C：动效对比实验室
// 同一个「弹跳 + 变色」动画，分别用三种方式实现，直观对比

const code = {
  css: `/* 纯 CSS —— keyframes */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-60px); }
}
.box {
  animation: bounce 1.2s ease-in-out
    infinite;
}`,
  anime: `// Anime.js —— JS 引擎
import { animate } from "animejs";
animate(".box", {
  translateY: [-60, 0],
  duration: 1200,
  ease: "inOutQuad",
  loop: true,
  direction: "alternate",
});`,
  motion: `// Motion —— React 声明式
<motion.div
  animate={{ y: [0, -60, 0] }}
  transition={{
    duration: 1.2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>`,
};

const meta = [
  {
    name: "纯 CSS",
    color: "from-[#22d3ee] to-[#0891b2]",
    desc: "GPU 合成，主线程零占用，最适合性能敏感、无需动态控制的场景。",
    pros: ["性能最优", "零 JS 依赖", "自动 GPU 加速"],
    cons: ["交互控制弱", "无法链式编排"],
  },
  {
    name: "Anime.js",
    color: "from-[#8b5cf6] to-[#6d28d9]",
    desc: "JS 引擎驱动，擅长复杂时间轴编排、SVG 路径/描边动画与精确控制。",
    pros: ["时间轴编排强", "SVG/路径动画", "精确控制"],
    cons: ["主线程占用", "需手动管理生命周期"],
  },
  {
    name: "Motion",
    color: "from-[#f472b6] to-[#db2777]",
    desc: "React 声明式，与组件状态/布局/手势深度集成，开发体验最佳。",
    pros: ["声明式直观", "手势/布局动画", "生态整合好"],
    cons: ["依赖 React", "包体积较大"],
  },
];

function CssDemo() {
  return (
    <div className="flex h-40 items-center justify-center">
      <div
        className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#22d3ee] to-[#0891b2] shadow-[0_0_24px_rgba(34,211,238,0.4)]"
        style={{
          animation: "lab-bounce 1.2s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function AnimeDemo() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const anim = animate(ref.current, {
      translateY: [-60, 0],
      duration: 1200,
      ease: "inOutQuad",
      loop: true,
      alternate: true,
    });
    return () => {
      anim.pause();
    };
  }, []);
  return (
    <div className="flex h-40 items-center justify-center">
      <div
        ref={ref}
        className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] shadow-[0_0_24px_rgba(139,92,246,0.4)]"
      />
    </div>
  );
}

function MotionDemo() {
  return (
    <div className="flex h-40 items-center justify-center">
      <motion.div
        className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#f472b6] to-[#db2777] shadow-[0_0_24px_rgba(244,114,182,0.4)]"
        animate={{ y: [0, -60, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function LabView() {
  const demos = [CssDemo, AnimeDemo, MotionDemo];
  const [mode, setMode] = useState<"compare" | "principles">("compare");

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          动效<span className="bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] bg-clip-text text-transparent">实验室</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-[#a1a1aa]">
          {mode === "compare"
            ? "同一个「弹跳 + 变色」动画，分别用纯 CSS、Anime.js、Motion 实现，直观对比三种方式的实现路径与适用场景。"
            : "迪士尼动画十二原理逐条做成可交互小样 —— 动效不只是「会动」，而是知道为什么这么动。"}
        </p>
        <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
          {(
            [
              { id: "compare", label: "三引擎对比" },
              { id: "principles", label: "动画十二原理" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setMode(t.id)}
              className={cn(
                "rounded-full px-5 py-2 text-sm transition-all",
                mode === t.id
                  ? "bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] font-semibold text-white"
                  : "text-[#a1a1aa] hover:text-white",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {mode === "principles" ? (
        <div className="mt-12">
          <LabPrinciples />
        </div>
      ) : (
        <>
      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {meta.map((m, i) => {
          const Demo = demos[i];
          return (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              {/* 演示区 */}
              <div className="border-b border-white/10 p-6">
                <Demo />
              </div>

              {/* 说明区 */}
              <div className="flex flex-1 flex-col p-6">
                <div
                  className={`inline-flex w-fit rounded-full bg-gradient-to-r ${m.color} px-3 py-1 text-xs font-semibold text-white`}
                >
                  {m.name}
                </div>
                <p className="mt-3 text-sm text-[#a1a1aa]">{m.desc}</p>

                <div className="mt-4 space-y-1.5 text-xs">
                  <div className="text-[#4ade80]">
                    ✓ {m.pros.join(" · ")}
                  </div>
                  <div className="text-[#f87171]">
                    ✗ {m.cons.join(" · ")}
                  </div>
                </div>

                <pre className="mt-4 flex-1 overflow-x-auto rounded-lg bg-black/40 p-3 text-[11px] leading-relaxed text-[#a1a1aa]">
                  {code[i === 0 ? "css" : i === 1 ? "anime" : "motion"]}
                </pre>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 结论区 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-br from-[#8b5cf6]/10 to-[#22d3ee]/10 p-8"
      >
        <h2 className="text-xl font-semibold">如何选择？</h2>
        <div className="mt-4 grid gap-4 text-sm text-[#a1a1aa] sm:grid-cols-3">
          <div>
            <span className="font-semibold text-white">追求极致性能</span>
            <p className="mt-1">纯 CSS，动画交给 GPU 合成线程，JS 主线程零负担。</p>
          </div>
          <div>
            <span className="font-semibold text-white">复杂编排 / SVG</span>
            <p className="mt-1">Anime.js，时间轴、路径、描边动画的利器。</p>
          </div>
          <div>
            <span className="font-semibold text-white">React 项目开发</span>
            <p className="mt-1">Motion，声明式 + 手势 + 布局动画，开发效率最高。</p>
          </div>
        </div>
      </motion.div>
        </>
      )}
    </section>
  );
}