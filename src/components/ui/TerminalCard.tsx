import type { ReactNode } from "react";

type TerminalCardProps = {
  title: string;
  index: number;
  children: ReactNode;
};

/**
 * 滚动堆叠卡：position:sticky + 逐张递增的 top，滚轮往下滚时后一张盖住前一张。
 * 卡片内容全程可见、不做展开收起——这是 abusaid 原站的真实机制（实测四张卡高度恒定）。
 * 依赖同层级后出现的元素绘制在上层，所以不要给卡片加 z-index 或 transform。
 */
export function TerminalCard({ title, index, children }: TerminalCardProps) {
  return (
    <div className="card stack-card overflow-hidden" style={{ top: `${88 + index * 72}px` }}>
      <div className="flex items-center gap-3 px-5 py-5 md:gap-4">
        <span className="flex shrink-0 items-center gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="flex-1 text-center text-base font-medium text-accent md:text-lg">{title}</span>
        <span className="w-[54px] shrink-0" aria-hidden="true" />
      </div>

      <div
        className="h-px"
        style={{ background: "linear-gradient(90deg,#f43f5e,#8b5cf6,rgba(139,92,246,0))" }}
      />

      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}
