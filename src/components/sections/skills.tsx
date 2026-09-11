"use client";

import { motion } from "motion/react";
import { SpotlightCard } from "@/components/acme/spotlight-card";

const skills = [
  {
    title: "React 生态",
    desc: "Next.js · React 19 · Hooks · App Router",
    icon: "⚛️",
  },
  {
    title: "动效引擎",
    desc: "Motion · Anime.js · CSS Animation · SVG",
    icon: "✨",
  },
  {
    title: "样式方案",
    desc: "Tailwind CSS · CSS Modules · 设计系统",
    icon: "🎨",
  },
  {
    title: "工程化",
    desc: "TypeScript · Git · Vercel · 性能优化",
    icon: "🛠️",
  },
];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          技术栈
        </h2>
        <p className="mt-3 text-muted">
          我尤为关注动画与交互，善于让界面「活」起来。
        </p>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <SpotlightCard className="h-full p-6">
              <div className="text-3xl">{skill.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{skill.title}</h3>
              <p className="mt-2 text-sm text-muted">{skill.desc}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}