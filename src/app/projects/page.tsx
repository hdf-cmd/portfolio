import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "项目经历 · 黄栋斐",
  description:
    "五条能力线的完整项目详情：App、微信小程序、鸿蒙、网页、WooCommerce 电商站。每条写清负责范围与关键技术决策。",
};

export default function ProjectsPage() {
  return (
    <div className="wrap py-16 md:py-24">
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl">项目经历</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-dim">
        五条线各自独立成立。每条点进去有：我负责什么、当时怎么决策、代表案例与界面截图。
      </p>

      <div className="mt-12 flex flex-col gap-5">
        {projects.map((p) => (
          <Link prefetch={false}
            key={p.id}
            href={`/projects/${p.id}`}
            className="card group p-7 transition-colors hover:border-accent/40"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl font-semibold text-accent">{p.title}</h2>
              <span className="text-xs text-ink-dim">
                {p.role} · {p.period}
              </span>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-dim">{p.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              {p.metrics.map((m) => (
                <span key={m.unit}>
                  <span className="text-xl font-bold text-accent">{m.value}</span>
                  <span className="ml-1.5 text-xs text-ink-dim">{m.unit}</span>
                </span>
              ))}
              <span className="ml-auto text-sm font-medium text-accent">
                查看详情 <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
