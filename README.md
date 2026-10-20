# 个人作品集

黄栋斐的全栈作品集：五条能力线（App / 微信小程序 / 鸿蒙 / 网页 / WordPress 电商站）+ 技术栈键帽 + 架构与工程两块方法论。

线上：<https://huangdongfei-portfolio.netlify.app>

## 技术栈

- Next.js 16（App Router）+ React 19 + TypeScript
- Tailwind CSS v4，设计令牌写在 `src/app/globals.css` 的 `@theme` 里
- three.js + @react-three/fiber：技术栈键帽（几何、阻尼弹簧、贴图都是手写，没装现成 3D 组件）
- GSAP + ScrollTrigger：滚动驱动的姿态与入场动效
- ogl：背景 shader
- 字体自托管（`@fontsource-variable` 的 Inter 与思源黑体子集），不依赖 Google Fonts

## 目录

```
src/app/          页面与全局样式（首页、项目列表、项目详情、图标）
src/components/   按域分：skills（键帽）、architecture、engineering、projects、motion、layout、background
src/data/         全站内容与数字的唯一来源，改文案只动这里
public/shots/     各项目截图（webp）
_baseline/        设计基线与验收脚本，不入库（见 .gitignore）
```

内容都是数据驱动的：`src/data/projects.ts`、`capabilities.ts`、`engineering.ts`、`architecture.ts`、`skills.ts` 各管一块，页面里没有散落的文案。

## 本地开发

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
```

## 构建与部署

纯静态导出，产物在 `out/`：

```bash
npm run build
npx netlify-cli deploy --dir=out --prod --site <site-id>
```

两点必须注意：

1. `next.config.ts` 里是 `output: "export"`，所以 `npm run start` 不可用（静态导出没有 server）。
2. 根目录的 `netlify.toml` 不能删：它把 Netlify 的自动构建和 Next.js Runtime 关掉，否则 Netlify 会按服务端形态跑 Next，碰上静态导出必挂。

## 降级

- 窄屏（<768）与系统开启「减弱动效」时，键帽降为二维网格，入场动效不注入，所有动效元素直接可见。
- 所有入场动画都带兜底：脚本注入的隐藏样式会在 3 秒后自动撤销，JS 被拦截也不会出现整页透明文字。

## 素材与授权

- 技术图标取自 [simple-icons](https://github.com/simple-icons/simple-icons) 16.35.0（CC0-1.0），路径经 `_baseline/build-icons.mjs` 量过墨迹包围盒再贴合键帽。
- 技术跑马灯组件来自 [React Bits](https://github.com/DavidHDev/react-bits)（MIT + Commons Clause：可用于自己的产品，禁止把组件单独再打包分发）。
- 版式参考 Abu Said 的开源作品集（said7388/developer-portfolio，MIT）；键帽交互的设计取自 Naresh Khatri 的 3D portfolio（MIT）。
- 中文字体思源黑体与 Inter 均为 OFL-1.1。
