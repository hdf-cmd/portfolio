export type Layer = {
  name: string;
  dir: string;
  may: string;
  mustNot: string;
};

export const layers: Layer[] = [
  {
    name: "View",
    dir: "features/<域>/view",
    may: "订阅 ViewModel、声明布局、把用户意图转成方法调用",
    mustNot: "不写业务判断，不直接读写存储",
  },
  {
    name: "ViewModel",
    dir: "features/<域>/viewmodel",
    may: "持有状态、编排业务、决定何时落盘",
    mustNot: "不引用 UIContext，否则测不了",
  },
  {
    name: "Model",
    dir: "features/<域>/model",
    may: "数据结构与纯函数算法（牌型、历法、题集校验）",
    mustNot: "不认识视图，不依赖框架运行时",
  },
];

export type NavLevel = { level: string; stack: string; note: string };

export const navLevels: NavLevel[] = [
  { level: "L1", stack: "根栈", note: "应用级页面：启动、隐私、全局设置" },
  { level: "L2", stack: "Tab 域", note: "四个主功能区，各自独立子栈" },
  { level: "L3", stack: "域内子栈", note: "答题、详情、结算等域内页面" },
];

export type ArchitectureProblem = { problem: string; effect: string };

// 工程数量与用例条数不再上屏（2026-10-20 老大定），口径留档：
//  2026-10-20 本机实测 61 个工程目录、57 个含 viewmodel 层；
//  *.test.ets 里词边界 \bit( 合计 7388 条（单工程 20–265，中位 125）。
export const architectureProblems: ArchitectureProblem[] = [
  {
    problem:
      "ArkTS 状态管理 V2 下，@Builder 按值传参不触发刷新、@Trace 在 await 之后读到旧帧——数据变了界面没变，而且不报错。",
    effect:
      "视图只订阅不加工，状态的读写全部收进 ViewModel 层；新工程按同一套目录模板生成，不再各写各的。",
  },
  {
    problem:
      "AppStorageV2 只有 connect / remove / keys 三个静态成员、没有写 API，快照拷贝会断掉响应式链。",
    effect:
      "定下两条硬规则：只有 PersistenceV2 负责落盘，全局状态一律经 ViewModel 代理，页面不直接碰存储。",
  },
  {
    problem: "路由跳转散写在各个页面里，根栈 / Tab 域 / 域内子栈三级混用，容易跳出错栈。",
    effect: "路由常量收敛到单处，新增页面只加常量、不改调用点。",
  },
  {
    problem: "ViewModel 一旦依赖 UI 上下文，鸿蒙上就跑不了单测，分层沦为形式。",
    effect:
      "ViewModel 与 UI 解耦后可以直接用 hypium 跑单测，不用起模拟器，也不受界面改版影响。",
  },
];

export const architecture = {
  title: "鸿蒙 MVVM 分层架构",
  period: "2026.09 – 至今",
  role: "独立设计，并批量复用到自己的多个工程",
  problems: architectureProblems,
  stack: ["ArkTS", "ArkUI", "Navigation", "PersistenceV2", "hypium", "DevEco"],
};
