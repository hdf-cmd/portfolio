"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// 来源：Aceternity UI (ui.aceternity.com) — AnimatedTooltip
// 依赖：motion + clsx/tailwind-merge，已二次封装为通用组件

type TooltipItem = {
  id: number;
  name: string;
  designation: string;
  icon: React.ReactNode;
  href?: string;
};

export function AnimatedTooltip({ items }: { items: TooltipItem[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <motion.div
              layoutId="tooltip"
              className="absolute -top-12 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-zinc-900 shadow-xl"
              initial={{ opacity: 0, scale: 0.8, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <span className="block font-semibold">{item.name}</span>
              <span className="block text-[10px] text-zinc-500">
                {item.designation}
              </span>
            </motion.div>
          )}

          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg transition-colors hover:bg-white/10",
            )}
          >
            {item.icon}
          </a>
        </div>
      ))}
    </div>
  );
}