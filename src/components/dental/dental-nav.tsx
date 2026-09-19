"use client";

import Link from "next/link";
import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { BilobaLogo } from "./dental-icons";

const links = [
  { href: "#fearless", label: "不吓孩子" },
  { href: "#stages", label: "分龄路线" },
  { href: "#doctors", label: "医生" },
  { href: "#pricing", label: "价格" },
  { href: "#stores", label: "门店" },
];

export function DentalNav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[#123840]/8 bg-[#F4FAF8]/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/dental" className="flex items-center gap-2 text-[#123840]">
          <BilobaLogo className="h-8 w-8 text-[#0E7A63]" />
          <span className="text-base font-bold tracking-tight">双叶儿童口腔</span>
          <span className="ml-1 hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-[#4F6E75] sm:inline">
            Biloba Kids Dental
          </span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-[#123840]/75 transition-colors duration-200 hover:bg-[#23B39A]/10 hover:text-[#123840] active:scale-[0.97]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#booking"
            className="ml-2 rounded-full bg-[#0E7A63] px-4 py-1.5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(14,122,99,0.7)] transition-all duration-200 hover:bg-[#0B6351] hover:shadow-[0_14px_28px_-12px_rgba(14,122,99,0.8)] active:scale-[0.97]"
          >
            约初诊
          </a>
        </div>
        <a
          href="#booking"
          className="rounded-full bg-[#0E7A63] px-3.5 py-1.5 text-xs font-semibold text-white md:hidden"
        >
          约初诊
        </a>
      </nav>
    </header>
  );
}
