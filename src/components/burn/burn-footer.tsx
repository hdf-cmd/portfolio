import Link from "next/link";

export function BurnFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 rotate-45 items-center justify-center rounded-sm bg-[#FF4D00] text-[10px] font-black text-white">
              <span className="-rotate-45">B</span>
            </span>
            <span className="text-base font-black uppercase tracking-tight text-white">
              BURN<span className="text-[#FF4D00]">.</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-7 text-sm font-medium text-white/50">
            <a href="#series" className="transition-colors hover:text-white">
              系列
            </a>
            <a href="#plans" className="transition-colors hover:text-white">
              计划
            </a>
            <a href="#join" className="transition-colors hover:text-white">
              加入
            </a>
            <Link href="/#work" className="transition-colors hover:text-white">
              ← 返回作品集
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 font-mono text-[10px] text-white/35 sm:flex-row">
          <p>© 2026 燃点运动 BURN · 保留所有权利</p>
          <p>客户项目 · 品牌官网设计</p>
        </div>
      </div>
    </footer>
  );
}