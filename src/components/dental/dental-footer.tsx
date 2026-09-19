import Link from "next/link";
import { BilobaLogo } from "./dental-icons";

export function DentalFooter() {
  return (
    <footer className="bg-[#123840] text-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <BilobaLogo className="h-9 w-9 text-[#23B39A]" />
              <div>
                <div className="text-base font-bold tracking-wide">双叶儿童口腔</div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-white/45">Biloba Kids Dental</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              只看 0–14 岁孩子的连锁口腔诊所。
              <br />
              杭州市拱墅区莫干山路 818 号 3 幢
              <br />
              0571-8855 2130
            </p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">营业时间</div>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li>拱墅总院 / 西湖院 · 9:00 起</li>
              <li>滨江院 · 夜诊到 21:00</li>
              <li>余杭院 · 周一院休</li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">快速链接</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/dental#pricing" className="text-white/75 transition-colors hover:text-white">价格与年卡</Link></li>
              <li><Link href="/dental#faq" className="text-white/75 transition-colors hover:text-white">家长须知</Link></li>
              <li><Link href="/#work" className="text-white/75 transition-colors hover:text-white">← 返回作品集</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-[10px] text-white/40 sm:flex-row">
          <p>© 2026 双叶儿童口腔（虚构演示品牌） · 每家门店独立《医疗机构执业许可证》口径为文案设定</p>
          <p>客户项目 · 品牌官网设计 · 图片来自 Unsplash（免费商用授权）</p>
        </div>
      </div>
    </footer>
  );
}
