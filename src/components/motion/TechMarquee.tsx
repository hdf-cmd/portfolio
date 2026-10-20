"use client";

import { useEffect, useState } from "react";
import { LogoLoop } from "./LogoLoop";
import { motionAllowed } from "./gate";
import { primarySkills, type Skill } from "@/data/skills";
import { skillIcons } from "@/data/skill-icons";

/**
 * 常用技术跑马灯。数据不另立一份：直接用键帽那一整份 primarySkills，
 * 图标走 skill-icons（simple-icons 16.35.0，CC0-1.0）的现成路径；
 * 没有官方图标的（Java、C#、仓颉、数据采集这些）就显示文字，跟键帽同一套取舍，不编图标。
 */

type Chip = { title: string; alt: string; skill: Skill; hex: string | null; path: string | null; viewBox: string };

const chips: Chip[] = primarySkills.map((s) => {
  const icon = skillIcons[s.label];
  return {
    title: s.label,
    alt: s.label,
    skill: s,
    hex: icon?.hex ?? null,
    path: icon?.path ?? null,
    viewBox: icon?.viewBox ?? "0 0 24 24"
  };
});

// 提到模块作用域：LogoLoop 把 renderItem 放进了 memo 依赖里，内联箭头函数会让它每轮重排副本
function renderChip(item: Chip, key?: string) {
  return (
    <span key={key ?? item.title} className="pill !py-2 !text-[13px]" title={item.skill.blurb}>
      {item.path ? (
        <svg viewBox={item.viewBox} width="16" height="16" aria-hidden="true" style={{ display: "block" }}>
          <path d={item.path} fill={item.hex ?? "currentColor"} />
        </svg>
      ) : null}
      {item.title}
    </span>
  );
}

export function TechMarquee() {
  const [loop, setLoop] = useState(false);

  // LogoLoop 是 rAF 常驻位移，不吃 WebGL 但同样违反「减弱动效就不动」这条；
  // 服务端一律先渲染静态换行的一排，客户端再按视口换成跑马灯。
  useEffect(() => setLoop(motionAllowed()), []);

  if (!loop) {
    return (
      <section id="stack-ticker" className="wrap pt-2 pb-16" aria-label="常用技术栈">
        <div className="flex flex-wrap gap-2.5">{chips.map((c) => renderChip(c))}</div>
      </section>
    );
  }

  return (
    <section id="stack-ticker" className="wrap pt-2 pb-16" aria-label="常用技术栈">
      <LogoLoop
        logos={chips}
        speed={90}
        direction="left"
        gap={18}
        logoHeight={30}
        pauseOnHover
        fadeOut
        fadeOutWidth={0.14}
        labels="none"
        draggable
        intro
        ariaLabel="常用技术栈，鼠标悬停可暂停，可拖动"
        renderItem={renderChip}
      />
    </section>
  );
}
