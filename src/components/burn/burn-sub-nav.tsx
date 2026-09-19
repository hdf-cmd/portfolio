"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { label: "课程表", href: "/burn/classes" },
  { label: "教练", href: "/burn/coaches" },
  { label: "价格", href: "/burn/pricing" },
  { label: "装备", href: "/burn#series" },
];

/** 燃点子页共用的吸顶导航 */
export function BurnSubNav({ active }: { active: "classes" | "coaches" | "pricing" }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0C0C0C]/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-5">
          <Link
            href="/#work"
            className="flex items-center gap-1 text-sm text-white/50 transition-colors hover:text-white"
          >
            <span aria-hidden>←</span> 作品集
          </Link>
          <Link href="/burn" className="flex items-center gap-2">
            <span className="flex h-6 w-6 rotate-45 items-center justify-center rounded-sm bg-[#FF4D00] text-[10px] font-black text-white">
              <span className="-rotate-45">B</span>
            </span>
            <span className="text-base font-black uppercase tracking-tight text-white">
              BURN<span className="text-[#FF4D00]">.</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white",
                  link.href === `/burn/${active}` ? "text-[#FF4D00]" : "text-white/50",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/burn#join"
            className="rounded-full bg-[#FF4D00] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#FF6A2B]"
          >
            7 天体验
          </Link>
        </div>
      </nav>
    </header>
  );
}
