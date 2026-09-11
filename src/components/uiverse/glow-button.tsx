import { cn } from "@/lib/utils";

// 来源：Uiverse (uiverse.io) — 纯 CSS 发光按钮
// 无 JS 依赖，纯 CSS 渐变光晕 + hover 动画

export function GlowButton({
  children,
  href,
  className,
  variant = "primary",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "ghost";
}) {
  const base =
    "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-[linear-gradient(135deg,#8b5cf6,#22d3ee)] text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_32px_rgba(139,92,246,0.55)] hover:-translate-y-0.5",
    ghost:
      "border border-white/15 bg-white/5 text-foreground hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5",
  };

  const content = (
    <>
      {/* 光泽扫过效果 */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)}>{content}</button>
  );
}