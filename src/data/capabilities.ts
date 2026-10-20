export type Capability = {
  id: string;
  title: string;
  role: string;
  summary: string;
  stack: string[];
  // ⚠️ 数字上站前一律重跑实测，单测条数与工程数会随迭代变化。
  metrics: { value: string; unit: string }[];
};

export const capabilities: Capability[] = [
  {
    id: "app",
    title: "App 开发",
    role: "独立全栈开发",
    summary:
      "记三餐、算热量、看趋势，客户端做过两版：第一版是零构建的静态页套 WebView 壳，第二版整客户端用 Flutter 重写。餐盘环、自定义菜品、周月报告、蓝牙体脂秤、三餐和喝水提醒都跑在真后端上。第二版最直接的收益是手感：滚动换成原生的，热量环数字会跟着走，切 Tab 直接横划，份量输入按真机试用的反馈从滑杆换成 ±5g 步进钮。",
    stack: ["Flutter", "Dart", "Riverpod", "Kotlin", "CloudBase"],
    metrics: [{ value: "2", unit: "个客户端，同一套后端" }],
  },
  {
    id: "miniprogram",
    title: "微信小程序",
    role: "独立全栈开发",
    summary:
      "记账、习惯打卡、随机决策、媒体处理四个模块，19 个页面、4 个 Tab、5 个云函数一人完成。原生小程序，不套跨端框架：记账带月度统计和预算，习惯打卡有日历和连续天数，随机决策拆成吃什么、喝什么、数字、分组几种玩法。数据全在云开发的文档库里。已经备案发布，平时记账、打卡都能直接用。",
    stack: ["微信小程序", "云函数", "文档数据库"],
    metrics: [
      { value: "19", unit: "页面" },
      { value: "5", unit: "云函数" },
    ],
  },
  {
    id: "harmonyos",
    title: "鸿蒙开发",
    role: "兼职 · 独立交付",
    summary:
      "从选题跑到出签名包，中间不用我在场。三个技能包定流程和判据，喂一句需求就能出整套可提交材料；我只管定方向，以及后台提交审核。到现在 30+ 款已上架，题材从棋类局面判定、同余问题、密铺角度，到报数出列、旗帜认知都有，按我自己的分类横跨 12 个玩法机制族。",
    stack: ["ArkTS", "ArkUI", "hvigor", "DevEco"],
    metrics: [
      { value: "3", unit: "个技能包" },
      { value: "5", unit: "条 DoD" },
      { value: "30+", unit: "款已上架" },
    ],
  },
  {
    id: "web",
    title: "网页开发",
    role: "个人项目",
    summary:
      "本站即是作品之一：Next.js App Router 加 Tailwind 设计令牌，技能区用 WebGL 键帽做物理悬停反馈，移动端整块降级为二维网格。",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    metrics: [
      { value: "0", unit: "第三方 UI 库" },
    ],
  },
  {
    id: "storefront",
    title: "WordPress 电商站开发",
    role: "兼职 · 独立交付",
    summary:
      "原站开发与整站复刻，做到能下单收款：商品与变体、库存、购物车、运费、结算页、账户页都建好并逐项验收过。源站横跨三种电商架构。",
    stack: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    metrics: [{ value: "30+", unit: "个交付站点" }],
  },
];
