"use client";

import { primarySkills, secondarySkills } from "@/data/skills";
import { useKeyboardMode } from "./useKeyboardMode";

/**
 * 三维键盘已提到全站固定层（KeyboardBackdrop），这里只留标题、锚点和一段空高，
 * 让背后居中的键盘刚好露出来。二维降级（窄屏／减弱动效）仍在本区块内渲染。
 */
export function SkillsSection() {
  const mode = useKeyboardMode();

  return (
    <section id="skills" className="wrap py-20 md:py-24">
      <div data-reveal className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">技术栈</h2>
        <p className="mt-3 text-base text-ink-dim">
          有案例的写明是哪个项目；没案例的只标「本站未列案例」，不混进去
        </p>
      </div>

      {mode === "2d" ? (
        <>
          <div className="flex max-w-5xl flex-wrap gap-2.5">
            {primarySkills.map((s) => (
              <span key={s.label} className="pill !px-4 !py-2.5 !text-[13px]" title={s.blurb}>
                {s.label}
              </span>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-dim/70">窄屏或系统开启减弱动效时，这里自动降到二维。</p>
        </>
      ) : (
        <div aria-hidden="true" className="h-[54vh] min-h-[360px] md:h-[62vh]" />
      )}

      {/* 次级行以前只写在二维分支里，桌面三维下根本不出现，标题那句「下方次级项」就指向了个空 */}
      {secondarySkills.length ? (
        <div className="mt-5 flex max-w-5xl flex-wrap gap-2.5">
          {secondarySkills.map((s) => (
            <span
              key={s.label}
              className="pill !bg-transparent !px-4 !py-2.5 !text-[13px] !text-ink-dim"
              title={s.blurb}
            >
              {s.label}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
