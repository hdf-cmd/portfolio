import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ProjectEntry } from "@/data/projects";
import { projects } from "@/data/projects";
import { FALLBACK, LAYOUT } from "./shot-layout";
import { Shots } from "./Shots";

export function ProjectDetail({ project }: { project: ProjectEntry }) {
  const index = projects.findIndex((p) => p.id === project.id);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  const layout = LAYOUT[project.id] ?? FALLBACK;
  const existing = Array.from({ length: project.shotCount }, (_, i) => i + 1).filter((i) =>
    existsSync(join(process.cwd(), "public", `shots/${project.id}/${i}.webp`)),
  );

  return (
    <>
      <div className="wrap py-14 md:py-20">
        <Link prefetch={false} href="/projects" className="text-sm text-ink-dim transition-colors hover:text-accent">
          ← 全部项目
        </Link>

        <div data-reveal className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{project.title}</h1>
          <span className="pill mt-2 shrink-0">{project.period}</span>
        </div>
        <p data-reveal className="mt-3 text-base text-ink-dim">
          {project.role}
        </p>

        <p data-reveal className="mt-8 max-w-3xl text-base leading-relaxed text-ink-dim">
          {project.summary}
        </p>

        <div data-reveal-children className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
          {project.metrics.map((m) => (
            <div key={m.unit}>
              <span data-count className="text-4xl font-bold text-accent">
                {m.value}
              </span>
              <span className="ml-2 text-xs tracking-wide text-ink-dim">{m.unit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap pb-16 md:pb-24">
        <h2 data-reveal className="text-xl font-semibold">
          关键技术决策
        </h2>
        <ul data-reveal-children data-reveal-stagger="0.06" className="mt-6 space-y-6">
          {project.decisions.map((d) => (
            <li key={d.label} className="border-l-2 border-accent/40 pl-5">
              <p className="text-sm font-semibold text-white">{d.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{d.detail}</p>
            </li>
          ))}
        </ul>

        {project.rows ? (
          <div data-reveal className="mt-12">
            <h2 className="text-xl font-semibold">几个代表（玩法介绍取自各单交付清单原文）</h2>
            <div className="mt-5 divide-y divide-white/5 rounded-xl border border-white/5 bg-surface">
              {project.rows.map((r) => (
                <div key={r.name} className="flex items-start gap-4 px-5 py-5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">
                      {r.name}
                      {r.sub ? (
                        <span className="ml-2 font-mono text-[10px] font-normal text-ink-dim/60">{r.sub}</span>
                      ) : null}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">{r.desc}</p>
                  </div>
                  <span className="shrink-0 pt-0.5 text-xs text-accent">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {existing.length ? (
          <div data-reveal className="mt-12">
            <h2 className="text-xl font-semibold">界面截图</h2>
            <Shots project={project.id} hints={project.shotHints} indices={existing} layout={layout} />
          </div>
        ) : null}

        <div data-reveal-children data-reveal-stagger="0.04" className="mt-10 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="pill">
              {s}
            </span>
          ))}
        </div>

        <nav data-reveal className="mt-14 flex items-center justify-between gap-4 border-t border-white/5 pt-8">
          {prev ? (
            <Link prefetch={false}
              href={`/projects/${prev.id}`}
              className="text-sm text-ink-dim transition-colors hover:text-accent"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link prefetch={false}
              href={`/projects/${next.id}`}
              className="text-sm text-ink-dim transition-colors hover:text-accent"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </>
  );
}
