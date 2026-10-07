"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { ConceptSite } from "@/data/concepts";

export function ConceptGrid({ items }: { items: ConceptSite[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((c, i) => (
        <motion.div
          key={c.slug}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
          className="h-full"
        >
          <Link
            href={c.href}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-surface transition-colors hover:border-accent/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
              <Image
                src={c.shot}
                alt={`${c.name} 首屏`}
                fill
                sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 31vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#12121a] to-transparent"
              />
              <span className="absolute bottom-3 left-4 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                {c.kind}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
                {c.name}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{c.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-4">
                <span className="text-[12px] text-muted">
                  <span className="font-mono tabular-nums text-foreground">{c.pages}</span> 个页面
                </span>
                <span className="text-[12px] font-medium text-accent-2 transition-transform group-hover:translate-x-0.5">
                  查看站点 →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
