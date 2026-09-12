import Link from "next/link";

import { ChengcheLogo } from "./chengche-logo";

export function CompanyFooter() {
  const columns = [
    {
      title: "产品",
      items: ["仪表盘", "智能洞察", "数据集成", "告警中心"],
    },
    {
      title: "方案",
      items: ["数据团队", "产品团队", "运营团队", "高管看板"],
    },
    {
      title: "资源",
      items: ["帮助中心", "API 文档", "状态页", "社区"],
    },
    {
      title: "公司",
      items: ["关于我们", "客户案例", "加入我们", "联系我们"],
    },
  ];

  return (
    <footer className="border-t border-[#8A94A6]/12">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2 text-base font-semibold text-[#E6EAF2]">
              <ChengcheLogo className="h-6 w-6" />
              澄澈科技
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#5C6675]">
              让复杂数据一目了然。企业级数据可视化平台,服务全球 12,000+ 团队。
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5C6675]">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-[#8A94A6] transition-colors hover:text-[#E6EAF2]"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#8A94A6]/12 pt-6 font-mono text-[10px] text-[#5C6675] sm:flex-row">
          <p>© 2026 澄澈科技 · 沪 ICP 备 2026xxxxx 号</p>
          <div className="flex items-center gap-4">
            <Link href="/#work" className="transition-colors hover:text-[#8A94A6]">
              ← 返回作品集
            </Link>
            <span>项目 D · 官网落地页</span>
          </div>
        </div>
      </div>
    </footer>
  );
}