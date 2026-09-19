import Link from "next/link";

export function StayFooter() {
  return (
    <footer className="border-t border-[#1F3A4D]/10 bg-[#FAF7F2]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="font-serif text-lg font-semibold tracking-widest text-[#1F3A4D]">
              栖野 · 湖山
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#5B6B75]">
              碧岭县 · 月牙湖东岸 7 公里
              <br />
              管家电话 088-7766-2100(08:00 – 22:00)
            </p>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-[#9AA8B0]">
              到达方式
            </div>
            <ul className="mt-3 space-y-2 text-sm text-[#3E525E]">
              <li>高铁「碧岭站」→ 自驾 52 分钟</li>
              <li>机场大巴 3 号线 → 湖东观景台站</li>
              <li>导航搜「栖野湖山」,最后 2 公里沿湖路</li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-[#9AA8B0]">
              快速链接
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/stay#rooms" className="text-[#5B6B75] transition-colors hover:text-[#1F3A4D]">
                  房型价格
                </Link>
              </li>
              <li>
                <Link href="/stay#gallery" className="text-[#5B6B75] transition-colors hover:text-[#1F3A4D]">
                  环境实拍
                </Link>
              </li>
              <li>
                <Link href="/#work" className="text-[#5B6B75] transition-colors hover:text-[#1F3A4D]">
                  ← 返回作品集
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-[#1F3A4D]/10 pt-6 text-[10px] text-[#9AA8B0] sm:flex-row">
          <p>© 2026 栖野 · 湖山民宿 · 保留所有权利</p>
          <p>客户项目 · 品牌官网设计 · 图片来自 Unsplash / Openverse（CC 授权）</p>
        </div>
      </div>
    </footer>
  );
}
