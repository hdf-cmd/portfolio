import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { capabilities } from "@/data/capabilities";
import { ArchitectureSection } from "@/components/architecture/ArchitectureSection";
import { EngineeringSection } from "@/components/engineering/EngineeringSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { TechMarquee } from "@/components/motion/TechMarquee";
import { KeyboardBackdrop } from "@/components/skills/KeyboardBackdropLoader";

const metrics = [
  { value: "30+", unit: "个交付站点" },
  { value: "30+", unit: "款上架 App" },
  { value: "10", unit: "个自建技能包" },
  { value: "1", unit: "款已发布小程序" },
];

export default function Home() {
  const hasResume = existsSync(join(process.cwd(), "public", "resume.pdf"));
  return (
    <>
      <KeyboardBackdrop />
      <div className="relative z-10">
      <section id="top" className="hero-glow">
        <div className="wrap py-28 md:py-40">
          <p data-reveal className="text-xl font-medium text-accent md:text-2xl">
            全栈开发工程师
          </p>
          <h1 data-reveal className="mt-5 max-w-4xl text-4xl font-bold leading-[1.15] md:text-6xl lg:text-7xl">
            从后端、前端到客户端，
            <br className="hidden md:block" />
            一条链路自己走完
          </h1>
          <p data-reveal className="mt-8 max-w-3xl text-base leading-relaxed text-ink-dim md:text-lg">
            做过的东西分四类：能下单的电商独立站、能装进手机的 App、能扛追问的分层架构，还有一套我自己写的
            agent 技能包——重复的工程动作不靠第二次手讲。下面按能力线摊开，每条点进去有完整的项目详情。
          </p>

          <div data-reveal-children className="mt-14 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.unit} className="card sheen flex items-baseline gap-3 p-5">
                <span data-count className="text-3xl font-bold text-accent">
                  {m.value}
                </span>
                <span className="text-xs leading-snug tracking-wide text-ink-dim">{m.unit}</span>
              </div>
            ))}
          </div>

          <div data-reveal className="mt-12 flex flex-wrap gap-3">
            <Link prefetch={false} href="/projects" className="pill !bg-accent !text-on-accent !font-semibold">
              看项目
            </Link>
            <a href="#contact" className="pill">
              联系方式
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="wrap pt-4 pb-20 md:pb-24">
        <div data-reveal className="card max-w-4xl border-l-2 border-l-accent/60 p-7 md:p-9">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">关于我</h2>
          <p className="mt-5 text-base leading-relaxed text-ink-dim md:text-[17px]">
            日常用 Claude Code、Codex、Qoder 这类智能体工具干活，重复的工程动作交给它们跑；任务怎么拆、做到什么算完成由我定，agent
            出的码一样要过检查。前后端都能落：前端 Vue、React、Next.js，后端 PHP、Node 与云函数，数据侧 MySQL
            和文档库都用过。客户端覆盖鸿蒙 ArkTS、Flutter 配 Dart、微信小程序和 Android 壳，同一个需求按目标平台挑实现方式。
          </p>
        </div>
      </section>

      <TechMarquee />

      <section id="capabilities" className="wrap py-20 md:py-24">
        <div data-reveal className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">能力线</h2>
          <p className="mt-3 text-base text-ink-dim">五条线各自独立成立，合起来是全栈。点任意一张进详情</p>
        </div>
        <div data-reveal-children data-reveal-stagger="0.07" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => (
            <Link prefetch={false}
              key={cap.id}
              href={`/projects/${cap.id}`}
              data-tilt
              className="card sheen group flex flex-col p-7 transition-colors hover:border-accent/40"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold">{cap.title}</h3>
                <span className="shrink-0 text-xs text-ink-dim">{cap.role}</span>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-dim">{cap.summary}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                {cap.metrics.map((m) => (
                  <div key={m.unit}>
                    <span data-count className="text-2xl font-bold text-accent">
                      {m.value}
                    </span>
                    <span className="ml-1 whitespace-nowrap text-xs text-ink-dim">{m.unit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {cap.stack.map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
              <span className="mt-6 text-sm font-medium text-accent">
                查看详情 <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <SkillsSection />
      <ArchitectureSection />
      <EngineeringSection />

      <section id="contact" className="wrap py-20 md:py-24">
        <div data-reveal className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">联系</h2>
        </div>
        <div data-reveal className="card sheen flex flex-wrap gap-4 p-8">
          <a
            href="mailto:2475534900hdf@gmail.com"
            className="pill !px-4 !py-2.5 !text-[13px] transition-colors hover:border-accent/40 hover:text-accent"
          >
            2475534900hdf@gmail.com
          </a>
          <span className="pill !px-4 !py-2.5 !text-[13px]">微信同手机：18916041484</span>
          <a
            href="https://github.com/hdf-cmd"
            target="_blank"
            rel="noopener noreferrer"
            className="pill !px-4 !py-2.5 !text-[13px] transition-colors hover:border-accent/40 hover:text-accent"
          >
            GitHub：hdf-cmd
          </a>
          {/* 简历位先留着：把 PDF 放到 public/resume.pdf 这个按钮就自动出现，没放就整块不渲染，
              免得线上下载链指向一个不存在的文件。上传前记得换掉 PDF 里指向旧站的链接。 */}
          {hasResume ? (
            <a
              href="/resume.pdf"
              download="黄栋斐-全栈开发工程师-简历.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13px] font-semibold text-on-accent transition-opacity hover:opacity-85"
            >
              下载简历 PDF
              <span aria-hidden="true">↓</span>
            </a>
          ) : null}
        </div>
      </section>
      </div>
    </>
  );
}
