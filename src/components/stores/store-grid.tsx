"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { DeliveredStore } from "@/data/stores";

const num = (n: number) => n.toLocaleString("en-US");

export function StoreGrid({ stores }: { stores: DeliveredStore[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {stores.map((s, i) => (
        <motion.a
          key={s.slug}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
          className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-surface transition-colors hover:border-accent/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2"
        >
          <div className="relative aspect-[1000/620] overflow-hidden bg-black/40">
            <Image
              src={s.shot}
              alt={`${s.brand} 店面首页`}
              fill
              sizes="(max-width: 768px) 92vw, (max-width: 1280px) 46vw, 31vw"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#12121a] to-transparent"
            />
            <span className="absolute bottom-3 left-4 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
              {s.category}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-[17px] font-semibold tracking-tight text-foreground">{s.brand}</h3>
            <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{s.scope}</p>
            <div className="mt-4 flex items-end justify-between border-t border-white/8 pt-4">
              <div className="flex gap-6">
                <Stat label="商品" value={num(s.products)} />
                <Stat label="分类" value={num(s.cats)} />
              </div>
              <span className="text-[12px] font-medium text-accent-2 transition-transform group-hover:translate-x-0.5">
                打开站点 ↗
              </span>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[19px] tabular-nums text-foreground">{value}</p>
      <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
    </div>
  );
}
