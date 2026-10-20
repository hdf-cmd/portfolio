"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 键帽音是 Web Audio 现场合成的（短噪声 + 带通滤波），不引用任何第三方音频素材。
 *
 * Chrome/Edge 的自动播放策略：AudioContext 建出来就是 suspended，只有「用户激活」
 * 才能 resume，而激活事件只算 pointerdown / keydown / click / touchstart——
 * **mousemove 和滚轮不算**。所以纯划过出声在浏览器层面做不到，这里做的是把解锁
 * 面铺到最广：任意一次点击、按键、触摸即永久解锁，之后划过就有声。
 */
const UNLOCK_EVENTS = ["pointerdown", "keydown", "touchstart", "click"] as const;

export function useKeycapSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const unlockedRef = useRef(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const unlock = () => {
      unlockedRef.current = true;
      setUnlocked(true);
      const ctx = ctxRef.current;
      if (ctx && ctx.state === "suspended") void ctx.resume();
      for (const type of UNLOCK_EVENTS) window.removeEventListener(type, unlock, true);
    };
    for (const type of UNLOCK_EVENTS) window.addEventListener(type, unlock, { once: true, capture: true });
    return () => {
      for (const type of UNLOCK_EVENTS) window.removeEventListener(type, unlock, true);
    };
  }, []);

  const blip = useCallback((freq: number, duration: number, gain: number) => {
    if (!unlockedRef.current) return;
    const Ctor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = (ctxRef.current ??= new Ctor());
    if (ctx.state === "suspended") void ctx.resume();

    const frames = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / frames) ** 2;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = freq;
    band.Q.value = 1.6;

    const shelf = ctx.createBiquadFilter();
    shelf.type = "highpass";
    shelf.frequency.value = freq * 0.5;

    const amp = ctx.createGain();
    amp.gain.value = gain;

    src.connect(band).connect(shelf).connect(amp).connect(ctx.destination);
    src.start();
  }, []);

  const press = useCallback(() => blip(2100, 0.05, 0.24), [blip]);
  const release = useCallback(() => blip(1150, 0.075, 0.16), [blip]);

  return { press, release, unlocked };
}
