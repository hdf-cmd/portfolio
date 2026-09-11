"use client";

import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

// 数字滚动计数：useMotionValue + useSpring 缓动
function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toLocaleString();
      }
    });
    return unsub;
  }, [spring]);

  return (
    <span>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

const stats = [
  { value: 12000, suffix: "+", label: "企业客户" },
  { value: 98, suffix: "%", label: "客户续费率" },
  { value: 3, suffix: "亿", label: "日均数据点" },
  { value: 24, suffix: "/7", label: "全天候支持" },
];

export function CompanyStats() {
  return (
    <section id="stats" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-[#8A94A6]/12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="px-6 text-center md:text-left"
          >
            <div className="font-mono text-3xl font-semibold tabular-nums tracking-tight text-[#F2F5F9] sm:text-4xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-2 text-xs text-[#5C6675]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}