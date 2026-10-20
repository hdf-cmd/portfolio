export type SkillGroup = "web" | "harmony" | "mini" | "app" | "store" | "eng";

export type Skill = {
  label: string;
  blurb: string;
  group: SkillGroup;
};

// 主键位：有案例的写清案例；无案例的只写「本站未列案例」，不代为声称项目经验。
// 两次清理：第一批撤掉 hvigor/DevEco（构建工具与 IDE）、CloudBase/Netlify/Astra（产品与主题名）、
// HTML5/CSS3（对全栈定位是噪音）；第二批他的原话是「把 Rust 文档数据库 数据采集 eslint kotlin 这五个删掉」。
// 现在是 24 个，正好 4 排 × 6 列（KEYS_PER_ROW = 6）。
export const primarySkills: Skill[] = [
  { label: "JavaScript", blurb: "食光 App 前端：无构建工具的纯静态实现", group: "web" },
  { label: "TypeScript", blurb: "本站与全部 Next.js 代码的默认语言", group: "web" },
  { label: "React", blurb: "本站技术栈", group: "web" },
  { label: "Next.js", blurb: "本站框架，App Router", group: "web" },
  { label: "Tailwind CSS", blurb: "本站样式方案，设计令牌驱动", group: "web" },
  { label: "Vue", blurb: "本站未列案例", group: "web" },
  { label: "ArkTS", blurb: "鸿蒙端的开发语言，MVVM 分层规范是我自己定的", group: "harmony" },
  { label: "ArkUI", blurb: "声明式 UI 与状态管理 V2", group: "harmony" },
  { label: "仓颉", blurb: "本站未列案例", group: "harmony" },
  { label: "微信小程序", blurb: "19 页面 / 4 Tab，已备案并发布正式版", group: "mini" },
  { label: "云开发", blurb: "小程序后端整条链路，5 个云函数，无自建服务器", group: "mini" },
  { label: "Flutter", blurb: "食光的 Flutter 版：59 个 dart 文件，已出 v2.7.1 安装包", group: "app" },
  { label: "Dart", blurb: "食光 Flutter 版的实现语言", group: "app" },
  { label: "WordPress", blurb: "30+ 站可下单交付", group: "store" },
  { label: "WooCommerce", blurb: "商品目录、变体与定价规则对齐", group: "store" },
  { label: "PHP", blurb: "Code Snippets 钩子改写主题输出", group: "store" },
  { label: "MySQL", blurb: "30+ 个 WooCommerce 站的底层库", group: "store" },
  { label: "Node.js", blurb: "站点交付工具链与自动化脚本", group: "eng" },
  { label: "Git", blurb: "多工程版本管理与双分支流程", group: "eng" },
  { label: "Python", blurb: "有项目经验，本站未列案例", group: "eng" },
  { label: "Java", blurb: "本站未列案例", group: "eng" },
  { label: "C++", blurb: "本站未列案例", group: "eng" },
  { label: "C#", blurb: "本站未列案例", group: "eng" },
  { label: "Go", blurb: "本站未列案例", group: "eng" },
];

/** 空数组时整行不渲染；要往回加就走这里，语义是「有项目经验但本站未列案例」的弱声明位 */
export const secondarySkills: Skill[] = [];
