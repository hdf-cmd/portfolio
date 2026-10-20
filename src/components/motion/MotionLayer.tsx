"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motionAllowed } from "./gate";

/**
 * 声明式动效挂载点：内容组件只写 data-* 属性，这里统一接上动画。
 *
 * - data-reveal           进视口时淡入上浮
 * - data-reveal-children  直接子元素错峰进场；值写 "fade" 时只改透明度——sticky 堆叠卡
 *                         不能用 transform，位移会让后一张盖前一张的顺序错乱
 *                         （见 ui/TerminalCard.tsx 的注释），data-reveal-stagger 调间隔
 * - data-count            前导数字滚动到目标值，后缀原样保留（30+ 这种）
 * - data-tilt             跟随指针的 3D 倾斜 + 高光，写 CSS 变量给样式层消费
 *
 * 开关见 gate.ts：窄屏与系统要求减弱动效时这里整个 effect 直接 return，
 * 预绘脚本也就不会注入隐藏样式，内容以静态形态呈现。
 */

type Cleanups = Array<() => void>;

/**
 * 布局在首绘之后还会变：截图卡片堆把四宫格换成 3D 卡片堆会矮一截、字体异步加载完会重排、
 * 图片到位也会撑高。ScrollTrigger 只在创建时量一次位置，之后不重算，就会让排在后面的
 * 触发点永远等不到——实测表现是页尾几个元素停在透明态。所以盯着 body 高度变化刷新一次。
 */
function watchLayout(): () => void {
  let timer = 0;
  const ro = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = window.setTimeout(() => ScrollTrigger.refresh(), 160);
  });
  ro.observe(document.body);
  return () => {
    clearTimeout(timer);
    ro.disconnect();
  };
}

function setupReveals(): () => void {
  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal-children]").forEach((box) => {
      const fadeOnly = box.dataset.revealChildren === "fade";
      const kids = Array.from(box.children) as HTMLElement[];
      if (!kids.length) return;
      gsap.fromTo(
        kids,
        fadeOnly ? { autoAlpha: 0 } : { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          ...(fadeOnly ? null : { y: 0 }),
          duration: 0.6,
          ease: "power2.out",
          stagger: Number(box.dataset.revealStagger || 0.08),
          scrollTrigger: { trigger: box, start: "top 86%", once: true },
        },
      );
    });
  });
  return () => ctx.revert();
}

function setupCounters(): () => void {
  const observers: IntersectionObserver[] = [];
  const timers: number[] = [];

  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const raw = (el.textContent ?? "").trim();
    const parsed = /^(\d+)(.*)$/.exec(raw);
    if (!parsed) return;
    const target = Number(parsed[1]);
    const suffix = parsed[2];

    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        const startedAt = performance.now();
        const duration = 900;
        const step = (now: number) => {
          const p = Math.min(1, (now - startedAt) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (p < 1) timers.push(requestAnimationFrame(step));
          else el.textContent = raw;
        };
        timers.push(requestAnimationFrame(step));
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    observers.push(io);
  });

  return () => {
    observers.forEach((o) => o.disconnect());
    timers.forEach((id) => cancelAnimationFrame(id));
  };
}

function setupTilt(): () => void {
  const off: Cleanups = [];
  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
    const onMove = (e: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const px = (e.clientX - box.left) / box.width;
      const py = (e.clientY - box.top) / box.height;
      el.style.setProperty("--tilt-y", `${(px - 0.5) * 7}deg`);
      el.style.setProperty("--tilt-x", `${(0.5 - py) * 7}deg`);
      el.style.setProperty("--glare-x", `${px * 100}%`);
      el.style.setProperty("--glare-y", `${py * 100}%`);
    };
    const onLeave = () => {
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    off.push(() => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    });
  });
  return () => off.forEach((fn) => fn());
}

export function MotionLayer() {
  const pathname = usePathname();

  useEffect(() => {
    if (!motionAllowed()) return;
    gsap.registerPlugin(ScrollTrigger);

    const killReveals = setupReveals();
    const killCounters = setupCounters();
    const killTilt = setupTilt();
    const killLayoutWatch = watchLayout();

    return () => {
      killLayoutWatch();
      killTilt();
      killCounters();
      killReveals();
    };
  }, [pathname]);

  // 预绘脚本留了个兜底闹钟：bundle 没跑起来（拦截插件、断网、chunk 404）就把隐藏撤掉，
  // 宁可没有动效，也不能让面试官看到一整页透明文字。
  useEffect(() => {
    const w = window as unknown as { __motionGuard?: number };
    if (w.__motionGuard) {
      clearTimeout(w.__motionGuard);
      w.__motionGuard = undefined;
    }
  }, []);

  return null;
}
