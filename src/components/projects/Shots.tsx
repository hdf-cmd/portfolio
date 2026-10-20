"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ShotLayout } from "./shot-layout";

type Props = {
  project: string;
  hints: string[];
  /** 实际存在的截图序号，由服务端按文件是否存在算出来 */
  indices: number[];
  layout: ShotLayout;
};

/**
 * 界面截图两种排法：桌面（≥768）用可拖的 3D 卡片堆，窄屏保留二维四宫格。
 * 手机上四宫格一眼能看完四张，卡片堆要一张张划，那是倒退，所以不共用。
 *
 * 服务端一律先渲染四宫格，客户端再按视口换成卡片堆——直接按宽度分支会让 SSR
 * 首屏在手机上少一整块内容，也会在水合时比对出结构差异。
 */
export function Shots({ project, hints, indices, layout }: Props) {
  const [deck, setDeck] = useState(false);
  const [top, setTop] = useState(0);
  const dragFrom = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDeck(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const n = indices.length;
  const step = (dir: number) => setTop((t) => (t + dir + n) % n);

  if (!deck || n === 0) {
    return (
      <div className={`mt-5 grid ${layout.cols}`}>
        {indices.map((i) => (
          <figure key={i} className="overflow-hidden rounded-xl border border-white/8 bg-night/60">
            <div className={`relative w-full ${layout.aspect}`}>
              <Image
                src={`/shots/${project}/${i}.webp`}
                alt={`${project} ${hints[i - 1] ?? `截图 ${i}`}`}
                fill
                sizes={layout.sizes}
                className="object-cover object-top"
              />
            </div>
            <figcaption className="px-3 py-2.5 text-[11px] text-ink-dim">
              {hints[i - 1] ?? `截图 ${i}`}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  const front = indices[top];

  return (
    <div className={`mx-auto mt-5 w-full ${layout.deckMax}`}>
      <div
        className="shot-deck relative w-full select-none"
        style={{ aspectRatio: layout.ratio.replace("/", " / ") }}
        onPointerDown={(e) => {
          dragFrom.current = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerUp={(e) => {
          if (dragFrom.current === null) return;
          const dx = e.clientX - dragFrom.current;
          dragFrom.current = null;
          if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
          else step(1);
        }}
        onPointerCancel={() => {
          dragFrom.current = null;
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            step(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            step(-1);
          }
        }}
        tabIndex={0}
        role="group"
        aria-label={`界面截图，共 ${n} 张，当前第 ${top + 1} 张：${hints[front - 1] ?? ""}。方向键或点击换下一张`}
      >
        {indices.map((idx, i) => {
          const depth = (i - top + n) % n;
          return (
            <div
              key={idx}
              className="shot-deck-card absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-night/70"
              style={{
                transform: `translate3d(${depth * 26}px, ${depth * -18}px, ${depth * -80}px) scale(${1 - depth * 0.05})`,
                zIndex: n - depth,
                opacity: depth > 2 ? 0 : 1,
              }}
              aria-hidden={depth === 0 ? undefined : true}
            >
              <Image
                src={`/shots/${project}/${idx}.webp`}
                alt={`${project} ${hints[idx - 1] ?? `截图 ${idx}`}`}
                fill
                sizes="(max-width:1200px) 70vw, 620px"
                draggable={false}
                className="object-cover object-top"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-dim">{hints[front - 1] ?? `截图 ${front}`}</p>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-ink-dim">
            {top + 1} / {n}
          </span>
          <button
            type="button"
            onClick={() => step(1)}
            className="pill !px-3 !py-1.5 !text-[11px]"
            aria-label="下一张截图"
          >
            下一张 →
          </button>
        </div>
      </div>
    </div>
  );
}
