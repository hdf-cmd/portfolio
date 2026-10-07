import type { Metadata } from "next";
import Link from "next/link";
import { stores, totals } from "@/data/stores";
import { StoreGrid } from "@/components/stores/store-grid";

export const metadata: Metadata = {
  title: "WordPress 独立站交付 | 黄栋斐",
  description:
    "7 个已上线的 WooCommerce 独立站：合计 8,214 款商品、248 个分类的目录迁移，以及首页、导航、页脚的重建与验收回退流程。",
};

const STEPS = [
  { k: "01", t: "预检", d: "抓源站目录结构与字段，确认变体、价格、库存、图片的可迁移性，先给出迁移不了的项。" },
  { k: "02", t: "目录导出", d: "按源平台写取数适配器（Shopify / Magento 2 / SFCC 均实测过），归一成统一商品结构。" },
  { k: "03", t: "迁移导入", d: "批量写入 WooCommerce，分页限速、失败留账，导入后可逐款回查。" },
  { k: "04", t: "界面重建", d: "首页区块、主导航树、三层政策页脚用 Gutenberg 区块加自定义 CSS 重做。" },
  { k: "05", t: "图片本地化", d: "商品图与品牌图全部下载进媒体库，不热链第三方域名。" },
  { k: "06", t: "验收与回退", d: "访客主流程逐项核验；改动走草稿页切换，留一键回退位，不直接覆盖线上首页。" },
];

export default function StoresPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-[13px] font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-accent-2"
          >
            ← 返回主站
          </Link>
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted">Client Work</span>
        </div>
      </header>

      <section className="bg-grid border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-2">
            WordPress / WooCommerce
          </p>
          <h1 className="mt-4 max-w-[22ch] text-[34px] font-bold leading-[1.08] tracking-tight sm:text-[46px]">
            七个<span className="text-gradient">已经在线上跑着</span>的独立站
          </h1>
          <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-muted">
            不是设计稿，也不是界面重制。每一单都是把品牌方的商品目录迁进 WooCommerce、重建店面界面后交付上线，
            下面的数字取自各站 Store API 的实测返回值，点卡片可以直接打开站点。
          </p>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6">
            {[
              { k: "交付站点", v: totals.sites },
              { k: "迁移商品", v: totals.products },
              { k: "重建分类", v: totals.cats },
            ].map((s) => (
              <div key={s.k}>
                <dd className="font-mono text-[30px] tabular-nums text-foreground sm:text-[36px]">
                  {s.v.toLocaleString("en-US")}
                </dd>
                <dt className="mt-1 text-[12px] uppercase tracking-[0.14em] text-muted">{s.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-muted">
          交付清单 · 按目录规模排序
        </h2>
        <div className="mt-8">
          <StoreGrid stores={stores} />
        </div>
      </section>

      <section className="border-y border-white/8 bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <h2 className="text-[22px] font-semibold tracking-tight sm:text-[26px]">每一单走同一条流水线</h2>
          <p className="mt-3 max-w-[58ch] text-[14px] leading-relaxed text-muted">
            兼职做到第七单，流程已经收敛成固定六步——它比任何一个页面都更能说明我能不能独立交付。
          </p>
          <ol className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.k} className="border-t border-white/10 pt-4">
                <p className="font-mono text-[12px] tabular-nums text-accent">{s.k}</p>
                <h3 className="mt-2 text-[15px] font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-2xl border border-dashed border-white/15 px-6 py-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-2">说明</p>
          <p className="mt-3 max-w-[76ch] text-[13px] leading-relaxed text-muted">
            各站点内的商品图、商标与文案归对应品牌方所有，经品牌方授权用于本作品集展示。
            商品数与分类数为 2026 年 10 月对各站 WooCommerce Store API 的一次实测快照，站点后续自行上架会使数字继续变动。
          </p>
        </div>
        <Link
          href="/"
          className="mt-10 inline-block rounded-full border border-white/15 px-6 py-3 text-[13px] font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          ← 回到作品集首页
        </Link>
      </section>
    </main>
  );
}
