"use client";

import { motion } from "motion/react";

export function PlayerNav() {
  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/85 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-lg font-semibold">
          <span className="bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] bg-clip-text text-transparent">
            黄栋斐.dev
          </span>
        </a>
        <a
          href="/#work"
          className="text-sm text-[#a1a1aa] transition-colors hover:text-white"
        >
          ← 返回作品集
        </a>
      </nav>
    </motion.header>
  );
}