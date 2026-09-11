"use client";

import { motion } from "motion/react";
import { SplitText } from "@/components/reactbits/split-text";
import { AnimatedSignature } from "@/components/anime/animated-signature";
import { GlowButton } from "@/components/uiverse/glow-button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Anime.js SVG 签名 */}
        <AnimatedSignature />

        {/* React Bits SplitText 主标题 */}
        <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
          <SplitText text="黄栋斐" delay={0.3} />
        </h1>

        <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
          <SplitText text="前端开发 · 专注于交互动效与沉浸式体验" delay={0.9} as="span" />
        </p>

        {/* 渐变副标题 */}
        <div className="mt-4">
          <SplitText
            text="用动画赋予界面生命力"
            delay={1.4}
            className="text-gradient text-2xl font-semibold sm:text-3xl"
            as="span"
          />
        </div>

        {/* Uiverse 按钮 */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <GlowButton href="https://github.com/hdf-cmd" variant="primary">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.28 1.23a11.4 11.4 0 0 1 6 0c2.28-1.55 3.28-1.23 3.28-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.82 5.62-5.5 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </GlowButton>
          <GlowButton href="#work" variant="ghost">
            查看作品 ↓
          </GlowButton>
        </div>

        {/* 滚动提示 */}
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
            <div className="h-2 w-1 rounded-full bg-white/60" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}