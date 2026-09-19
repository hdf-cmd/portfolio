"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { SteamSignature } from "@/components/cafe/steam-signature";

const links = [
  { label: "豆单", href: "/cafe#beans" },
  { label: "故事", href: "/cafe#story" },
  { label: "菜单", href: "/cafe/menu" },
  { label: "门店", href: "/cafe/store" },
];

/** 屿雾咖啡子页共用的吸顶导航：主站首屏导航在 hero 里，子页用这套 */
export function CafeSubNav({ active }: { active: "menu" | "store" }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#C99A5B]/15 bg-[#120A04]/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-5">
          <Link
            href="/#work"
            className="flex items-center gap-1 text-sm text-[#A38B6E] transition-colors hover:text-[#F5EADA]"
          >
            <span aria-hidden>←</span> 作品集
          </Link>
          <Link href="/cafe" className="flex items-center gap-2.5">
            <SteamSignature className="h-8 w-8" />
            <span className="font-serif text-lg font-semibold tracking-wide text-[#F5EADA]">
              屿雾咖啡
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
                  "text-sm transition-colors hover:text-[#F5EADA]",
                  (link.href === `/cafe/${active}` ||
                    (active === "menu" && link.href === "/cafe#beans"))
                    ? "text-[#E8C69B]"
                    : "text-[#A38B6E]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/cafe#reserve"
            className="rounded-full bg-[#C99A5B] px-4 py-2 text-sm font-medium text-[#1A0F06] transition-colors hover:bg-[#E8C69B]"
          >
            预约品鉴
          </Link>
        </div>
      </nav>
    </header>
  );
}
