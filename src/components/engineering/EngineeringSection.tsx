import { TerminalCard } from "@/components/ui/TerminalCard";
import { engineeringCards } from "@/data/engineering";

export function EngineeringSection() {
  return (
    <section id="engineering" className="wrap py-20 md:py-24">
      <div data-reveal className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">工程与质量</h2>
        <p className="mt-3 text-base text-ink-dim">
          前面那些数字是怎么来的：测试、门禁、坑清单。这块是我判断「能不能独立交付」的标准
        </p>
      </div>

      <div data-reveal-children="fade" data-reveal-stagger="0.12" className="flex flex-col gap-6">
        {engineeringCards.map((card, index) => (
          <TerminalCard key={card.title} title={card.title} index={index}>
            <p className="max-w-3xl text-sm leading-relaxed text-ink-dim">{card.lead}</p>

            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
              {card.metrics.map((m) => (
                <div key={m.unit}>
                  <span className="text-3xl font-bold text-accent">{m.value}</span>
                  <span className="ml-2 text-xs tracking-wide text-ink-dim">{m.unit}</span>
                </div>
              ))}
            </div>

            <ul className="mt-8 space-y-5">
              {card.points.map((p) => (
                <li key={p.label} className="border-l-2 border-accent/40 pl-5">
                  <p className="text-sm font-semibold text-white">{p.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{p.detail}</p>
                </li>
              ))}
            </ul>
          </TerminalCard>
        ))}
      </div>
    </section>
  );
}
