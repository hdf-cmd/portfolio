"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

// 来源：Aceternity UI (ui.aceternity.com) — Card Spotlight
// 依赖：motion，鼠标跟随聚光灯效果

export function SpotlightCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={onMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]",
        className,
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(320px circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.15), transparent 80%)
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}