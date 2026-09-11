"use client";

import { motion } from "motion/react";

// 客户 logo 墙：文字化 logo，无缝滚动，hover 暂停
const clients = [
  "云帆控股",
  "远望资本",
  "恒岳智造",
  "拾光零售",
  "观澜物流",
  "北辰能源",
  "山海文旅",
  "橡果电商",
];

export function CompanyLogoCloud() {
  const row = [...clients, ...clients]; // 双倍内容实现无缝循环

  return (
    <section className="border-y border-[#8A94A6]/12 bg-white/[0.015] py-10">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[#5C6675]"
      >
        被 12,000+ 团队信赖
      </motion.p>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-14 pr-14">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap text-sm font-semibold tracking-wide text-[#5C6675] transition-colors hover:text-[#8A94A6]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}