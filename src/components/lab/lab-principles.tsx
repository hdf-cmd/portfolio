"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// 动画十二原理实验室：每条原则一个可交互小样 + 一句业务场景注释

function Replay({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute bottom-3 right-3 rounded-full border border-white/15 px-3 py-1 text-[11px] text-[#a1a1aa] transition-colors hover:border-[#8b5cf6]/60 hover:text-white"
    >
      重播 ↻
    </button>
  );
}

function DemoFrame({
  title,
  en,
  use,
  children,
  replay,
}: {
  title: string;
  en: string;
  use: string;
  children: React.ReactNode;
  replay?: () => void;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="relative h-44 border-b border-white/10 bg-black/25">
        {children}
        {replay && <Replay onClick={replay} />}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <div className="flex items-baseline justify-between">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#52525b]">{en}</span>
        </div>
        <p className="text-xs leading-relaxed text-[#a1a1aa]">{use}</p>
      </div>
    </div>
  );
}

// 1 挤压与拉伸
function SquashStretch({ n }: { n: number }) {
  return (
    <motion.div
      key={n}
      className="h-14 w-14 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#0891b2] shadow-[0_0_24px_rgba(34,211,238,0.35)]"
      style={{ originY: 1 }}
      animate={{
        y: [0, -80, 0, -40, 0, 0],
        scaleX: [1, 0.85, 1, 1.18, 0.9, 1],
        scaleY: [1, 1.15, 1, 0.82, 1.1, 1],
      }}
      transition={{ duration: 2.2, times: [0, 0.28, 0.5, 0.68, 0.82, 1], ease: "easeInOut" }}
    />
  );
}

// 2 预备动作
function Anticipation({ n: _n }: { n: number }) {
  const [phase, setPhase] = useState<"idle" | "wind" | "jump">("idle");
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <motion.div
        animate={
          phase === "wind"
            ? { y: 14, scaleX: 1.25, scaleY: 0.7 }
            : phase === "jump"
              ? { y: -70, scaleX: 0.85, scaleY: 1.2 }
              : { y: 0, scaleX: 1, scaleY: 1 }
        }
        transition={{ type: "spring", stiffness: 500, damping: phase === "jump" ? 18 : 30 }}
        className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#f472b6] to-[#db2777] shadow-[0_0_24px_rgba(244,114,182,0.35)]"
        style={{ originY: 1 }}
      />
      <button
        type="button"
        onMouseDown={() => setPhase("wind")}
        onMouseUp={() => {
          if (phase !== "wind") return;
          setPhase("jump");
          setTimeout(() => setPhase("idle"), 700);
        }}
        className="rounded-full border border-white/15 px-4 py-1.5 text-[11px] text-[#a1a1aa] transition-colors hover:border-[#f472b6]/60 hover:text-white"
      >
        按住蓄力，松开起跳
      </button>
    </div>
  );
}

// 3 舞台布局（Staging）
function Staging({ n: _n }: { n: number }) {
  const [focus, setFocus] = useState<"a" | "b">("a");
  return (
    <div className="flex h-full items-center justify-center gap-10">
      {(["a", "b"] as const).map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => setFocus(k)}
          aria-label={`聚焦${k === "a" ? "主角" : "配角"}`}
        >
          <motion.div
            animate={
              focus === k
                ? { scale: 1.15, opacity: 1, y: -6 }
                : { scale: 0.85, opacity: 0.25, y: 0 }
            }
            transition={{ duration: 0.45, ease: "easeOut" }}
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-2xl text-2xl",
              k === "a"
                ? "bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9]"
                : "bg-gradient-to-br from-[#22d3ee] to-[#0891b2]",
            )}
            style={{
              boxShadow: focus === k ? "0 0 40px rgba(139,92,246,0.45)" : "none",
            }}
          >
            {k === "a" ? "★" : "♪"}
          </motion.div>
        </button>
      ))}
    </div>
  );
}

// 4 逐帧与关键帧
function StraightAheadVsPose({ n: _n }: { n: number }) {
  const [mode, setMode] = useState<"pose" | "straight">("pose");
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-8">
      <div className="relative h-16 w-full">
        {mode === "pose" ? (
          <motion.div
            key="pose"
            className="absolute top-4 h-8 w-8 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9]"
            animate={{ left: ["4%", "48%", "88%"], rotate: [0, 90, 180] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <motion.div
            key="straight"
            className="absolute top-4 h-8 w-8 rounded-lg bg-gradient-to-br from-[#22d3ee] to-[#0891b2]"
            animate={{ left: ["4%", "88%"], rotate: [0, 180] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
        )}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("pose")}
          className={cn(
            "rounded-full px-3 py-1 text-[11px] transition-colors",
            mode === "pose" ? "bg-white text-black" : "border border-white/15 text-[#a1a1aa]",
          )}
        >
          关键帧：姿态明确
        </button>
        <button
          type="button"
          onClick={() => setMode("straight")}
          className={cn(
            "rounded-full px-3 py-1 text-[11px] transition-colors",
            mode === "straight" ? "bg-white text-black" : "border border-white/15 text-[#a1a1aa]",
          )}
        >
          逐帧：匀速平推
        </button>
      </div>
    </div>
  );
}

// 5 跟随与重叠
function FollowThrough({ n: _n }: { n: number }) {
  const x = useMotionValue(0);
  const t1 = useSpring(x, { stiffness: 260, damping: 14 });
  const t2 = useSpring(x, { stiffness: 160, damping: 14 });
  const t3 = useSpring(x, { stiffness: 90, damping: 13 });
  return (
    <div
      className="relative h-full w-full cursor-grab active:cursor-grabbing"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
      }}
    >
      {[
        { v: x, size: 20, cls: "bg-[#f472b6]" },
        { v: t1, size: 15, cls: "bg-[#db2777]" },
        { v: t2, size: 11, cls: "bg-[#8b5cf6]" },
        { v: t3, size: 7, cls: "bg-[#6d28d9]" },
      ].map((d, i) => (
        <motion.div
          key={i}
          style={{ x: d.v }}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-full",
            d.cls,
          )}
        >
          <div style={{ width: d.size, height: d.size }} className="rounded-full" />
        </motion.div>
      ))}
      <div className="pointer-events-none absolute bottom-3 left-4 text-[11px] text-[#52525b]">
        在区域内移动鼠标
      </div>
    </div>
  );
}

// 6 缓入缓出
function SlowInSlowOut({ n }: { n: number }) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-8 px-10">
      <motion.div
        key={n + "-linear"}
        className="h-7 w-7 rounded-md bg-[#52525b]"
        animate={{ x: [0, 240] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        key={n + "-ease"}
        className="h-7 w-7 rounded-md bg-gradient-to-br from-[#22d3ee] to-[#8b5cf6]"
        animate={{ x: [0, 240] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// 7 弧线运动
function ArcMotion({ n }: { n: number }) {
  return (
    <div className="relative h-full w-full">
      <motion.div
        key={n + "-line"}
        className="absolute left-6 top-6 h-6 w-6 rounded-full bg-[#52525b]"
        animate={{ x: [0, 220], y: [0, 100] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        key={n + "-arc"}
        className="absolute left-6 top-6 h-6 w-6 rounded-full bg-gradient-to-br from-[#f472b6] to-[#8b5cf6] shadow-[0_0_20px_rgba(244,114,182,0.4)]"
        animate={{ x: [0, 110, 220], y: [0, -40, 100] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute right-5 top-2 text-[10px] text-[#52525b]">
        灰=直线 彩=弧线
      </div>
    </div>
  );
}

// 8 次要动作
function SecondaryAction({ n: _n }: { n: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scarf1x = useSpring(x, { stiffness: 80, damping: 10 });
  const scarf1y = useSpring(y, { stiffness: 80, damping: 10 });
  const scarf2x = useSpring(x, { stiffness: 40, damping: 8 });
  const scarf2y = useSpring(y, { stiffness: 40, damping: 8 });
  return (
    <div
      className="relative h-full w-full"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
      }}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: [0, 8, -8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#22d3ee] to-[#0891b2] text-2xl">
          ⛄
        </div>
        <motion.div
          style={{ x: scarf1x, y: scarf1y }}
          className="absolute -right-2 top-1/2 h-3 w-10 rounded-full bg-[#f472b6]/80"
        />
        <motion.div
          style={{ x: scarf2x, y: scarf2y }}
          className="absolute -right-6 top-1/2 h-2 w-6 rounded-full bg-[#8b5cf6]/70"
        />
      </motion.div>
      <div className="pointer-events-none absolute bottom-3 left-4 text-[11px] text-[#52525b]">
        移动鼠标：围巾跟着飘
      </div>
    </div>
  );
}

// 9 节奏（Timing）
function Timing({ n: _n }: { n: number }) {
  const [n, setN] = useState(0);
  const rows = [
    { label: "快 0.4s", d: 0.4, cls: "bg-[#f472b6]" },
    { label: "中 0.9s", d: 0.9, cls: "bg-[#8b5cf6]" },
    { label: "慢 1.6s", d: 1.6, cls: "bg-[#22d3ee]" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-4 px-8">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-3">
          <motion.div
            key={`${n}-${r.d}`}
            className={cn("h-6 w-6 rounded-full", r.cls)}
            animate={{ x: [0, 200] }}
            transition={{ duration: r.d, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
          />
          <span className="text-[10px] text-[#52525b]">{r.label}</span>
        </div>
      ))}
    </div>
  );
}

// 10 夸张化
function Exaggeration({ n: _n }: { n: number }) {
  const [on, setOn] = useState(false);
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <motion.div
        animate={on ? { scale: 1.6, rotate: 12, borderRadius: "50%" } : { scale: 1, rotate: 0, borderRadius: "16px" }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className="flex h-16 w-16 items-center justify-center bg-gradient-to-br from-[#f472b6] to-[#8b5cf6] text-2xl"
      >
        🚀
      </motion.div>
      <button
        type="button"
        onMouseEnter={() => setOn(true)}
        onMouseLeave={() => setOn(false)}
        className="rounded-full border border-white/15 px-4 py-1.5 text-[11px] text-[#a1a1aa] hover:border-[#f472b6]/60 hover:text-white"
      >
        悬停触发 · {on ? "夸张 ON" : "默认 OFF"}
      </button>
    </div>
  );
}

// 11 立体感（Solid Drawing）
function SolidDrawing({ n: _n }: { n: number }) {
  return (
    <div className="flex h-full items-center justify-center" style={{ perspective: 400 }}>
      <motion.div
        className="relative h-16 w-16"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        {[
          { t: "translateZ(32px)", c: "bg-[#8b5cf6]/90" },
          { t: "rotateY(180deg) translateZ(32px)", c: "bg-[#6d28d9]/90" },
          { t: "rotateY(90deg) translateZ(32px)", c: "bg-[#22d3ee]/90" },
          { t: "rotateY(-90deg) translateZ(32px)", c: "bg-[#0891b2]/90" },
          { t: "rotateX(90deg) translateZ(32px)", c: "bg-[#f472b6]/90" },
          { t: "rotateX(-90deg) translateZ(32px)", c: "bg-[#db2777]/90" },
        ].map((f, i) => (
          <div
            key={i}
            className={cn("absolute inset-0 rounded-sm border border-white/20", f.c)}
            style={{ transform: f.t }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// 12 吸引力（Appeal）
function Appeal({ n: _n }: { n: number }) {
  return (
    <div className="flex h-full items-center justify-center gap-6 px-6">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        className="rounded-md bg-[#27272a] px-4 py-2 text-xs text-[#a1a1aa]"
      >
        提交
      </motion.button>
      <motion.button
        type="button"
        whileHover={{ scale: 1.08, rotate: -2 }}
        whileTap={{ scale: 0.92 }}
        className="rounded-full bg-gradient-to-r from-[#f472b6] to-[#8b5cf6] px-5 py-2.5 text-xs font-bold text-white shadow-[0_8px_24px_rgba(139,92,246,0.4)]"
      >
        立即领取 ✦
      </motion.button>
    </div>
  );
}

const principles = [
  {
    title: "挤压与拉伸",
    en: "Squash & Stretch",
    use: "给物体以重量和弹性。加载动画、图标落位、Toast 弹出加一点形变，画面立刻「活」起来。",
    demo: SquashStretch,
    replay: true,
  },
  {
    title: "预备动作",
    en: "Anticipation",
    use: "大动作前先反向蓄力，用户提前知道「要发生什么」。删除前的收缩确认、拖拽前的吸附感都靠它。",
    demo: Anticipation,
  },
  {
    title: "舞台布局",
    en: "Staging",
    use: "一次只让一个主角被看见。弹窗聚焦、引导流程高亮当前步骤，本质都是 Staging。",
    demo: Staging,
  },
  {
    title: "逐帧与关键帧",
    en: "Straight Ahead & Pose to Pose",
    use: "关键帧思维=先定两端状态再补过渡（React 声明式）；逐帧=过程驱动（时间轴/手绘）。两种编排思路的手感差异。",
    demo: StraightAheadVsPose,
  },
  {
    title: "跟随与重叠",
    en: "Follow Through & Overlapping",
    use: "主体停了，附属物还在晃。下拉刷新的小尾巴、磁吸按钮的延迟跟随，靠不同 spring 阻尼差实现。",
    demo: FollowThrough,
  },
  {
    title: "缓入缓出",
    en: "Slow In & Slow Out",
    use: "现实世界没有匀速。上面灰球匀速显得机械，下面 ease-in-out 才有呼吸感——这是最低成本的高级感。",
    demo: SlowInSlowOut,
    replay: true,
  },
  {
    title: "弧线运动",
    en: "Arcs",
    use: "抛体走曲线不走直线。头像飞入购物车、收藏星星的抛物线，比直线位移更「物理」。",
    demo: ArcMotion,
    replay: true,
  },
  {
    title: "次要动作",
    en: "Secondary Action",
    use: "主动作之外的小细节强化氛围：主按钮点击是主动作，图标微晃、粒子飞散是次要动作。",
    demo: SecondaryAction,
  },
  {
    title: "节奏",
    en: "Timing",
    use: "时长即性格：0.4s 轻快、0.9s 标准、1.6s 沉稳。业务里成功反馈要快，危险操作确认要慢。",
    demo: Timing,
  },
  {
    title: "夸张化",
    en: "Exaggeration",
    use: "克制的产品里，关键转化点值得夸张一次：大促按钮、成就解锁的形变和光效，宁过勿不及。",
    demo: Exaggeration,
  },
  {
    title: "立体感",
    en: "Solid Drawing",
    use: "2D 元素要有体积感。卡片 hover 的 perspective + rotateX/Y 微倾，比纯位移贵气得多。",
    demo: SolidDrawing,
  },
  {
    title: "吸引力",
    en: "Appeal",
    use: "主角要耐看。对比两个按钮：左边是默认样式，右边是圆角、渐变、悬停回弹——转化组件值得这份打扮。",
    demo: Appeal,
  },
];

export function LabPrinciples() {
  const [n, setN] = useState(0);
  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          <span className="bg-gradient-to-r from-[#f472b6] to-[#22d3ee] bg-clip-text text-transparent">
            迪士尼动画十二原理
          </span>
          ，逐条可玩
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-[#a1a1aa]">
          每条原则一个小样，鼠标就是控制台。右下角「重播」可循环观看关键帧演示。
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((p) => {
          const Demo = p.demo;
          return (
            <DemoFrame key={p.title} title={p.title} en={p.en} use={p.use} replay={p.replay ? () => setN((v) => v + 1) : undefined}>
              <div className="flex h-full items-center justify-center">
                <Demo n={n} />
              </div>
            </DemoFrame>
          );
        })}
      </div>
    </div>
  );
}
