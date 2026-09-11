"use client";

import { useEffect, useRef } from "react";
import { animate, set } from "animejs";

// 屿雾咖啡品牌符号：一杯咖啡 + 蒸汽升起
// Anime.js 描边绘制入场，蒸汽曲线循环升腾
export function SteamSignature({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement>("path");
    const steams = svg.querySelectorAll<SVGPathElement>(".steam");

    // 入手描边：杯体绘制
    paths.forEach((p) => {
      const len = p.getTotalLength();
      set(p, { strokeDasharray: `0 ${len}` });
    });

    const anims = Array.from(paths).map((p) => {
      const len = p.getTotalLength();
      return animate(p, {
        strokeDasharray: [`0 ${len}`, `${len} 0`],
        duration: 1600,
        ease: "inOutSine",
      });
    });

    // 蒸汽循环升腾
    const steamAnims = Array.from(steams).map((s) => {
      const len = s.getTotalLength();
      set(s, { strokeDasharray: `${len * 0.55} ${len * 0.45}`, opacity: 0.85 });
      return animate(s, {
        strokeDashoffset: [0, len],
        opacity: [0.85, 0],
        duration: 2200,
        delay: 1600,
        ease: "inOutSine",
        loop: true,
        alternate: true,
      });
    });

    return () => {
      anims.forEach((a) => a.pause());
      steamAnims.forEach((a) => a.pause());
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="#C99A5B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="屿雾咖啡品牌符号"
    >
      {/* 杯体 */}
      <path d="M42 68 L78 68 C78 92 70 100 60 100 C50 100 42 92 42 68 Z" />
      {/* 手柄 */}
      <path d="M78 72 C96 72 96 88 76 90" />
      {/* 咖啡液面 */}
      <path d="M46 74 L74 74" strokeOpacity="0.6" />
      {/* 蒸汽 */}
      <path className="steam" d="M52 60 C50 50 56 43 52 33" />
      <path className="steam" d="M60 62 C58 50 64 41 60 28" />
      <path className="steam" d="M68 60 C66 49 72 41 68 33" />
    </svg>
  );
}