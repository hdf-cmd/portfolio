"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChengcheLogo } from "./chengche-logo";

const links = [
  { label: "产品", href: "#features" },
  { label: "数据", href: "#stats" },
  { label: "客户", href: "#testimonials" },
  { label: "价格", href: "#pricing" },
];

export function CompanyNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-[#8A94A6]/12 bg-[#0A0D14]/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-5">
          <Link
            href="/#work"
            className="hidden items-center gap-1 text-sm text-[#5C6675] transition-colors hover:text-[#E6EAF2] sm:flex"
          >
            <span aria-hidden>←</span> 作品集
          </Link>
          <a href="#" className="flex items-center gap-2.5 text-base font-semibold text-[#E6EAF2]">
            <ChengcheLogo className="h-7 w-7" />
            澄澈科技
          </a>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#8A94A6] transition-colors hover:text-[#E6EAF2]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#cta"
            className="hidden rounded-lg bg-[#38BDF8] px-4 py-2 text-sm font-medium text-[#071018] transition-colors hover:bg-[#7DD3FC] md:block"
          >
            免费试用
          </a>
          {/* 移动端汉堡按钮 */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#8A94A6]/20 md:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5 text-[#E6EAF2]" fill="none">
              {menuOpen ? (
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3.5 6H16.5M3.5 10H16.5M3.5 14H16.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-t border-[#8A94A6]/12 px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-[#8A94A6] transition-colors hover:bg-white/[0.04] hover:text-[#E6EAF2]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-lg bg-[#38BDF8] px-3 py-3 text-center text-sm font-medium text-[#071018]"
            >
              免费试用
            </a>
            <Link
              href="/#work"
              onClick={() => setMenuOpen(false)}
              className="mt-1 rounded-lg px-3 py-3 text-center text-sm text-[#5C6675]"
            >
              ← 返回作品集
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}