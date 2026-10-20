import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-sc";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteBackground } from "@/components/background/SiteBackground";
import { MotionLayer } from "@/components/motion/MotionLayer";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { SectionProgress } from "@/components/motion/SectionProgress";

// 预绘脚本：只在桌面且系统没要求减弱动效时，注入「进场前先藏起来」这条规则。
// 三件事它都刻意避开：不写进 globals.css（那样关掉 JS 的访客会看到一整页透明文字）、
// 不改 <html> 的 class（React 水合比对 className 会直接报错）、不等 bundle（那样会先看到内容再被藏起来）。
// 兜底闹钟是给拦截插件 / chunk 404 准备的：React 挂载后 MotionLayer 会把它清掉。
const motionBootstrap = `try{var m=window.matchMedia;if(m('(min-width: 768px)').matches&&!m('(prefers-reduced-motion: reduce)').matches){var s=document.createElement('style');s.id='motion-hide';s.textContent='[data-reveal],[data-reveal-children]>*{opacity:0}';document.head.appendChild(s);window.__motionGuard=setTimeout(function(){s.remove()},3000)}}catch(e){}`;

export const metadata: Metadata = {
  title: "黄栋斐 · 全栈开发工程师",
  description:
    "从后端、前端到客户端独立做到上线。鸿蒙 MVVM 分层规范由他制定，交付过 30+ 个站点和 1 款已发布的微信小程序。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
        <SiteBackground />
        <MotionLayer />
        <CursorGlow />
        <SectionProgress />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
