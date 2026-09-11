import { cn } from "@/lib/utils";

// 运动品牌口号墙：大字横幅无缝滚动，hover 不变速（保持冲击感）
const slogan = "NO EXCUSES · ONLY REPS · 没有借口 只有组数 · BURN THE POINT · ";

export function BurnMarquee() {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#0A0A0A] py-8">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max items-center whitespace-nowrap" style={{ animationDuration: "26s" }}>
          {[0, 1].map((half) => (
            <span
              key={half}
              className={cn(
                "flex items-center font-black uppercase tracking-tighter",
                "text-4xl sm:text-6xl",
              )}
              aria-hidden={half === 1}
            >
              {slogan.split("").map((ch, i) => (
                <span
                  key={i}
                  className={i % 2 === 0 ? "text-[#FF4D00]" : "text-white/85"}
                >
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}