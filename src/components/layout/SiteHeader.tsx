const nav = [
  { href: "/#capabilities", label: "能力" },
  { href: "/projects", label: "项目" },
  { href: "/#skills", label: "技术栈" },
  { href: "/#architecture", label: "架构" },
  { href: "/#engineering", label: "工程" },
  { href: "/#contact", label: "联系" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-night/80 backdrop-blur">
      <div className="wrap flex h-20 items-center justify-between">
        <a href="/" className="shrink-0 whitespace-nowrap text-base font-semibold tracking-wide">
          黄栋斐
        </a>
        {/* 390px 下六个词放不下一行：让它横向滑动，而不是把每个词折成两行 */}
        <nav className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-2">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium tracking-wide text-ink-dim transition-colors hover:bg-surface-2 hover:text-accent md:px-3"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
