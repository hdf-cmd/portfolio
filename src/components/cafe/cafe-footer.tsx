import Link from "next/link";

export function CafeFooter() {
  return (
    <footer className="border-t border-[#C99A5B]/15">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <div className="font-serif text-lg font-semibold text-[#F5EADA]">
              屿雾咖啡
            </div>
            <p className="mt-2 text-sm text-[#8A7358]">
              上海市静安区愚园路 218 号 · 12:00 – 02:00
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#A38B6E]">
            <a href="#beans" className="transition-colors hover:text-[#F5EADA]">
              豆单
            </a>
            <a href="#story" className="transition-colors hover:text-[#F5EADA]">
              故事
            </a>
            <a href="#reserve" className="transition-colors hover:text-[#F5EADA]">
              预约
            </a>
            <Link
              href="/#work"
              className="transition-colors hover:text-[#F5EADA]"
            >
              ← 返回作品集
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-[#C99A5B]/10 pt-6 text-[10px] text-[#8A7358] sm:flex-row">
          <p>© 2026 屿雾咖啡 · 保留所有权利</p>
          <p>客户项目 · 品牌官网设计</p>
        </div>
      </div>
    </footer>
  );
}