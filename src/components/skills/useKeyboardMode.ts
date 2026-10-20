"use client";

import { useEffect, useState } from "react";

export type KeyboardMode = "3d" | "2d" | null;

/**
 * 全站固定层和 #skills 区块必须拿到同一个结论，否则会出现"背景没挂载但区块留了空位"。
 * ?kb=3d / ?kb=2d 用于人工比对；窄屏与系统减弱动效一律降二维。
 */
export function useKeyboardMode(): KeyboardMode {
  const [mode, setMode] = useState<KeyboardMode>(null);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("kb");
    if (param === "3d" || param === "2d") {
      setMode(param);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(window.innerWidth < 768 || reduced ? "2d" : "3d");
  }, []);

  return mode;
}
