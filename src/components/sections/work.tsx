"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { SpotlightCard } from "@/components/acme/spotlight-card";
import { PulseLoader } from "@/components/uiverse/pulse-loader";

const projects = [
  {
    title: "动效实验室",
    desc: "当前主站 · 整合五大动画库的叙事型单页",
    status: "进行中",
    href: "/",
    thumb: "/work/root.jpg",
    tags: ["Motion", "Anime.js", "Aceternity", "React Bits", "Uiverse"],
  },
  {
    title: "概念品牌站合集",
    desc: "概念项目 · 六个自主命题的品牌官网:咖啡 / 齿科 / 民宿 / 健身 / 美术 / 企业服务",
    status: "概念项目",
    href: "/concepts",
    thumb: "/work/concepts.jpg",
    tags: ["品牌视觉", "表单交互", "真实摄影"],
  },
  {
    title: "WordPress 独立站交付",
    desc: "客户项目 · 7 个已上线 WooCommerce 站:8,214 款目录迁移 + 界面重建 + 验收回退",
    status: "客户项目",
    href: "/stores",
    thumb: "/work/stores.jpg",
    tags: ["真实上线", "WooCommerce", "数据可核验"],
  },
  {
    title: "音乐可视化播放器",
    desc: "Web Audio 实时频谱 + 手势交互的硬核 Demo",
    status: "个人项目",
    href: "/player",
    thumb: "/work/player.jpg",
    tags: ["Anime.js", "Motion", "Web Audio"],
  },
  {
    title: "动效对比实验室",
    desc: "CSS / Anime.js / Motion 同效果实现对比",
    status: "个人项目",
    href: "/lab",
    thumb: "/work/lab.jpg",
    tags: ["性能", "工程化"],
  },
];

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          精选作品
        </h2>
        <p className="mt-3 text-muted">
          用真实项目展示从视觉到交互再到性能的完整能力。
        </p>
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link href={project.href} className="group block h-full">
              <SpotlightCard className="h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="-mx-6 -mt-6 mb-5 overflow-hidden border-b border-white/10">
                  <Image
                    src={project.thumb}
                    alt={`${project.title} 首屏截图`}
                    width={800}
                    height={450}
                    priority={i < 4}
                    className="aspect-video w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  {project.status === "进行中" ? (
                    <span className="flex items-center gap-2 text-xs text-[#8b5cf6]">
                      <PulseLoader />
                      进行中
                    </span>
                  ) : project.status === "客户项目" ? (
                    <span className="rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/10 px-2.5 py-0.5 text-xs text-[#22d3ee]">
                      {project.status}
                    </span>
                  ) : (
                    <span className="rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 px-2.5 py-0.5 text-xs text-[#4ade80]">
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted">{project.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs text-[#8b5cf6] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  查看项目 →
                </div>
              </SpotlightCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}