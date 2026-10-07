import type { Metadata } from "next";
import Link from "next/link";
import { concepts } from "@/data/concepts";
import { ConceptGrid } from "@/components/concepts/concept-grid";

export const metadata: Metadata = {
  title: "概念品牌站合集 | 黄栋斐",
  description:
    "六个自主命题的品牌官网设计：咖啡、齿科、民宿、健身、少儿美术、企业服务。品牌为虚构，页面与数据为自洽设定，用于练习从视觉到交互的完整实现。",
};

const totalPages = concepts.reduce((sum, c) => sum + c.pages, 0);

export default function ConceptsPage() {
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
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted">Concept Work</span>
        </div>
      </header>

      <section className="bg-grid border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent-2">
            Concept / Brand Sites
          </p>
          <h1 className="mt-4 max-w-[22ch] text-[34px] font-bold leading-[1.08] tracking-tight sm:text-[46px]">
            六个<span className="text-gradient">自己命题</span>的品牌站
          </h1>
          <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-muted">
            品牌是虚构的，文案、价格、课程表、房型都按一个真实生意的逻辑自己编齐，再把它做成能用的官网。
            做这些是为了练手三件事：一套自己的设计语言、板块背景与过渡的处理、以及表单和筛选这类真交互。
          </p>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6">
            {[
              { k: "品牌站", v: concepts.length },
              { k: "页面总数", v: totalPages },
              { k: "覆盖品类", v: new Set(concepts.map((c) => c.kind)).size },
            ].map((s) => (
              <div key={s.k}>
                <dd className="font-mono text-[30px] tabular-nums text-foreground sm:text-[36px]">
                  {s.v}
                </dd>
                <dt className="mt-1 text-[12px] uppercase tracking-[0.14em] text-muted">{s.k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-muted">
          全部概念站
        </h2>
        <div className="mt-8">
          <ConceptGrid items={concepts} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-2xl border border-dashed border-white/15 px-6 py-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-accent-2">说明</p>
          <p className="mt-3 max-w-[76ch] text-[13px] leading-relaxed text-muted">
            这些不是客户项目，没有真实品牌方。站点内的实拍图片全部取自免费商用图源（Unsplash / Openverse /
            Wikimedia Commons，CC 授权），价格、地址、电话等均为虚构设定，不构成任何真实商业信息。
            想看真实交付的站，在作品集里的「WordPress 独立站交付」那一格。
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
