"use client";

import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";

// 依赖：Anime.js — SVG 描边绘制动画
// 用于 Logo / 品牌图形的 stroke 描边绘制效果

export function AnimatedSignature() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const paths = ref.current.querySelectorAll("path");

    const timeline = createTimeline({
      defaults: {
        duration: 1600,
        ease: "inOutSine",
      },
    });

    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength();
      path.setAttribute("stroke-dasharray", `${length}`);
      path.setAttribute("stroke-dashoffset", `${length}`);
      timeline.add(path, {
        strokeDashoffset: [length, 0],
      }, 0);
    });

    return () => {
      timeline.pause();
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 40"
      className="h-10 w-auto"
      fill="none"
      stroke="url(#sigGradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <linearGradient id="sigGradient" x1="0" y1="0" x2="120" y2="40">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d="M8 10 C 30 4, 50 36, 70 28 S 110 20, 112 12" />
      <path d="M112 12 C 110 26, 100 34, 90 36" />
      <path d="M20 32 L 30 32 L 34 22 L 40 32 L 52 32" />
    </svg>
  );
}