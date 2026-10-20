"use client";

import { useEffect, useRef } from "react";
import { motionAllowed } from "./gate";

/**
 * 跟随指针的柔光。刻意不隐藏系统光标——Windows 缩放下自绘光标会跟真实热点错位，
 * 而且光标一旦找不到就是体验事故。这里只在背景之上、正文之下压一圈光。
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (!motionAllowed()) return;

    const el = ref.current;
    if (!el) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.dataset.live = "1";
    };

    const loop = () => {
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-glow"
      style={{ position: "fixed", top: 0, left: 0, zIndex: 1 }}
    />
  );
}
