"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Chapter = { id: string; label: string };

/** 标题取区块自己的 h2；hero 没有 h2 用固定词，其余没有 h2 的区块（如技术跑马灯）不进导航 */
function readChapters(): Chapter[] {
  return Array.from(document.querySelectorAll<HTMLElement>("section[id]"))
    .map((el) => ({
      id: el.id,
      label: el.querySelector("h2")?.textContent?.trim() || (el.id === "top" ? "首页" : ""),
    }))
    .filter((c) => c.label);
}

export function SectionProgress() {
  const pathname = usePathname();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const next = readChapters();
    setChapters(next);
    if (next.length < 2) return;

    // 视口中间那条横线落在哪个区块，就点亮哪个
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActiveId(hit.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    next.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  if (chapters.length < 2) return null;

  return (
    <nav aria-label="章节导航" className="section-progress">
      {chapters.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          aria-current={activeId === c.id ? "true" : undefined}
          title={c.label}
        >
          <span className="section-progress-dot" />
          <span className="section-progress-label">{c.label}</span>
        </a>
      ))}
    </nav>
  );
}
