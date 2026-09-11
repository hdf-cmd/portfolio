import { cn } from "@/lib/utils";

// 来源：Uiverse (uiverse.io) — 纯 CSS 脉冲加载点
export function PulseLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-bounce rounded-full bg-[#8b5cf6]"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}