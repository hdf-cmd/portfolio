"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// 灵感来源：React Bits (reactbits.dev) — SplitText / DecryptedText
// 用 Motion 的 stagger 复现字符级拆分渐入动画（等价能力，不额外引入 gsap）

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: SplitTextProps) {
  const chars = text.split("");

  return (
    <Tag className={cn("inline-block", className)} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block whitespace-pre"
            initial={{ opacity: 0, y: 20, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              delay: delay + i * 0.03,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
}