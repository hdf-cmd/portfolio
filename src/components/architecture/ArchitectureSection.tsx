import { TerminalCard } from "@/components/ui/TerminalCard";
import { architecture } from "@/data/architecture";
import { LayerDiagram } from "./LayerDiagram";

const TREE = `entry/src/main/ets/
├── common/
│   ├── base/  constants/  log/  store/
├── entryability/  entrybackupability/  pages/
└── features/
    └── chess/
        ├── model/        牌型与算法，不认识视图
        ├── viewmodel/    状态与编排，不引用 UIContext
        └── view/         只订阅与渲染`;

export function ArchitectureSection() {
  return (
    <section id="architecture" className="wrap py-20 md:py-24">
      <div data-reveal className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">架构</h2>
        <p className="mt-3 text-base text-ink-dim">
          鸿蒙这边我没有套用模板，分层规范是自己定的，然后批量复用到后面的工程
        </p>
      </div>

      <div data-reveal-children="fade" data-reveal-stagger="0.12" className="flex flex-col gap-6">
        <TerminalCard title="鸿蒙 MVVM 分层架构" index={0}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="text-base text-ink-dim">{architecture.role}</p>
            <span className="pill shrink-0">{architecture.period}</span>
          </div>

          <ul className="mt-7 space-y-6">
            {architecture.problems.map((item) => (
              <li key={item.problem} className="border-l-2 border-accent/40 pl-5">
                <p className="text-sm leading-relaxed text-ink-dim">
                  <span className="font-semibold text-white">问题 · </span>
                  {item.problem}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-accent">
                  <span className="font-semibold">效果 · </span>
                  {item.effect}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="text-xs tracking-wider text-ink-dim">实际目录（BaiJu 工程实测）</p>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-night/70 p-5 font-mono text-[13px] leading-relaxed text-ink-dim">
              {TREE}
            </pre>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {architecture.stack.map((s) => (
              <span key={s} className="pill">
                {s}
              </span>
            ))}
          </div>
        </TerminalCard>

        <TerminalCard title="三层依赖与三级导航栈" index={1}>
          <LayerDiagram />
          <p className="mt-4 text-xs leading-relaxed text-ink-dim">
            示意图按实际目录结构绘制：每个业务域在自己的 features 目录下分 model / viewmodel / view
            三层，公共能力沉到 common。跨层只允许「调用向下、状态向上」两个方向。把鼠标放到某一层（手机点一下、键盘 Tab 也行）就只留它那条边。
          </p>
        </TerminalCard>
      </div>
    </section>
  );
}
