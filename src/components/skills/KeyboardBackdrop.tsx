"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Skill } from "@/data/skills";
import { KEY_COUNT, KeyboardScene } from "./Keyboard3D";
import { POSES, SCATTER_MIN, SCATTER_SPAN, SCROLL_SECTIONS, type Pose, type PoseName } from "./poses";
import { useKeyboardMode } from "./useKeyboardMode";
import { useKeycapSound } from "./useKeycapSound";

/** 当前视口里应该处于哪一段：刷新/带锚点进来时要用它做初始姿态 */
function syncPose(): PoseName {
  let next: PoseName = "hero";
  for (const { pose, id, threshold } of SCROLL_SECTIONS) {
    const top = document.getElementById(id)?.getBoundingClientRect().top ?? Infinity;
    if (top <= window.innerHeight * threshold) next = pose;
  }
  return next;
}

export function KeyboardBackdrop() {
  const mode = useKeyboardMode();
  const [poseName, setPoseName] = useState<PoseName>("hero");
  const [active, setActive] = useState<Skill | null>(null);
  const [paused, setPaused] = useState(false);

  const pose = useRef<Pose>({ ...POSES.hero });
  const spin = useRef({ ry: 0 });
  const scatter = useRef(Array.from({ length: KEY_COUNT }, () => ({ y: 0 })));
  const tweens = useRef<gsap.core.Tween[]>([]);
  const { press, release, unlocked } = useKeycapSound();
  const sound = useMemo(() => ({ press, release }), [press, release]);

  const onHover = useCallback((skill: Skill | null) => setActive(skill), []);

  useEffect(() => {
    if (mode !== "3d") return;
    gsap.registerPlugin(ScrollTrigger);

    const apply = (next: PoseName) => {
      setPoseName(next);
      tweens.current.splice(0).forEach((t) => t.kill());

      tweens.current.push(
        gsap.to(pose.current, { ...POSES[next], duration: 1, ease: "power1.out" }),
      );

      if (next === "hero") {
        tweens.current.push(
          gsap.to(spin.current, {
            ry: Math.PI * 2 + spin.current.ry,
            duration: 10,
            repeat: -1,
            yoyo: true,
            yoyoEase: true,
            ease: "back.inOut",
          }),
        );
      } else {
        tweens.current.push(gsap.to(spin.current, { ry: 0, duration: 1, ease: "power1.out" }));
      }

      if (next === "scatter") {
        // 随机序浮起，delay 用序号而非原站的 0.6s——近 30 颗键按原站节奏要十几秒才飘完
        const order = scatter.current.map((_, i) => i).sort(() => Math.random() - 0.5);
        order.forEach((keyIndex, i) => {
          tweens.current.push(
            gsap.to(scatter.current[keyIndex], {
              y: SCATTER_MIN + Math.random() * SCATTER_SPAN,
              duration: 2 + Math.random() * 2,
              delay: i * 0.06,
              repeat: -1,
              yoyo: true,
              yoyoEase: "none",
              ease: "elastic.out(1,0.3)",
            }),
          );
        });
      } else {
        scatter.current.forEach((o) => {
          tweens.current.push(gsap.to(o, { y: 0, duration: 1.2, ease: "power2.out" }));
        });
      }
    };

    apply(syncPose());
    const triggers = SCROLL_SECTIONS.filter(({ id }) => document.getElementById(id)).map(
      ({ pose: next, previous, id, threshold }) =>
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: `top ${threshold * 100}%`,
          onEnter: () => apply(next),
          onLeaveBack: () => apply(previous),
        }),
    );
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      triggers.forEach((t) => t.kill());
      tweens.current.splice(0).forEach((t) => t.kill());
      window.removeEventListener("load", refresh);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [mode]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (mode !== "3d") return null;

  // 只有 skills 段把整层抬到内容之上并开点击：那一段本来只留了标题和空位。
  // 其余段落键盘是纯装饰，压在内容下面且不吃事件，否则会挡住整页的悬停和选中。
  const interactive = poseName === "skills";

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0"
        style={{
          zIndex: interactive ? 20 : 0,
          pointerEvents: interactive ? "auto" : "none",
        }}
      >
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 4.2, 6.2], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          frameloop={paused ? "never" : "always"}
          style={{ background: "transparent" }}
        >
          <KeyboardScene
            pose={pose}
            spin={spin}
            scatter={scatter}
            poseName={poseName}
            onHover={onHover}
            onPress={sound.press}
            onRelease={sound.release}
          />
        </Canvas>
      </div>

      {interactive && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center px-6">
          <p className="max-w-2xl text-center text-sm leading-relaxed text-ink-dim">
            {!unlocked ? (
              <span className="text-accent">点一下页面任意位置，开启按键音。</span>
            ) : active ? (
              <>
                <span className="font-semibold text-accent">{active.label}</span>
                <span className="mx-2 opacity-40">/</span>
                {active.blurb}
              </>
            ) : (
              "鼠标移到键帽上会沉下去、亮起来并带一声按键音；也可以直接敲键盘字母键。"
            )}
          </p>
        </div>
      )}
    </>
  );
}
