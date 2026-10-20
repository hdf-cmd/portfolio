import { primarySkills } from "./skills";

export type ProjectEntry = {
  id: string;
  title: string;
  role: string;
  period: string;
  summary: string;
  decisions: { label: string; detail: string }[];
  metrics: { value: string; unit: string }[];
  stack: string[];
  rows?: { name: string; sub?: string; desc: string; value: string }[];
  shotCount: number;
  shotHints: string[];
};

// 数字全部为 2026-10-16 本机实测：食光 46 条 node:test、Flutter 59 个 dart 文件；
// 小程序 app.json 19 页 4 Tab、cloudfunctions 5 个；
// wordpress 12 个单目录、delivery 工具链 node --test 143/143/0。
// 2026-10-19 食光条目改以 Flutter 版为主线，同口径重测：337 条用例、59 文件 13198 行、v2.7.1。
// 🔴 2026-10-20 起用例条数与工程数量一律不上屏（老大：「数字那么大，让别人看见还以为是假的」）。
// 鸿蒙侧口径留档：61 个工程、57 个含 viewmodel 层、*.test.ets 里 \bit( 合计 7388、中位 125。
// ⚠️ 例外：对外文案里的「30+ 个交付站点 / 累计 30+ 单」是 2026-10-18 老大定的前瞻口径
// （原话"后续肯定还要写的，但是这个网站数据不会经常更新，所以直接先写30+"），
// 当场可数的实测值是 **12 单**。以后要回填真实数就按本行注释的 12 去核，别误以为 30+ 有出处。
export const projects: ProjectEntry[] = [
  {
    id: "app",
    title: "食光 · 健康饮食 App",
    role: "独立全栈开发",
    period: "2026.08 – 2026.09",
    // 数字口径 2026-10-19 本机实测：337 = ShiguangFlutter/test 下 38 个 *_test.dart 里行首
    //   test( 与 testWidgets( 的合计（group 不计，harness/fakes/stub 不算用例文件）；
    //   59 个 dart 文件、13198 行是 lib/ 全量；v2.7.1 取 pubspec.yaml，安装包落盘 18.6MB。
    //   旧口径「46 条单测」是仓库根 tests/ 的 Node 侧用例，属 H5 线，已不作主数。
    summary:
      "记三餐、算热量、看趋势，一条闭环自己走完。客户端做过两版：v1 是零构建工具的纯静态页套 WebView 壳，滑动手感过不去，v2 把整个客户端用 Flutter 重写，现在出到 v2.7.1。功能都跑真后端：用户名密码注册登录、每日营养餐盘环、食物搜索与自定义菜品、周月报告与体重趋势、蓝牙体脂秤同步、三餐和喝水本地提醒。后端一个云函数入口配文档库，整条重写线没动过它。",
    decisions: [
      {
        label: "重写只为手感",
        detail:
          "静态页套壳能装能用，但列表滑动和滚动物理差一口气。Flutter 侧直接用原生滚动，Swiper、BetterScroll 这类补丁一个都不带。",
      },
      {
        label: "domain 层不 import Flutter",
        detail:
          "代谢公式、建议引擎、份量换算全写成纯 Dart，dart test 毫秒级直测，不用起模拟器；这条是硬规矩，还有专门一个测试盯着有没有人违规引入框架依赖。",
      },
      {
        label: "后端一行没改，两栈靠 fixture 对齐",
        detail:
          "H5 和 Flutter 打同一个云函数网关。接口路径、请求方法写在仓库根一份 diet-core.json 里，两端各自读它断言真实调用链，改字段必有一边红。",
      },
      {
        label: "体脂秤协议从 Kotlin 搬过来",
        detail:
          "20 字节定长帧、CRC5 校验、体重字段按小端解码，还有 0x54 那条连接时秤推的旧存档必须忽略。测试向量用真机抓包报文，不是照着文档编的。",
      },
      {
        label: "提醒不依赖推送",
        detail:
          "三餐和喝水提醒走本地通知，个人开发者没有推送资质也能用。Android 16 的常驻通知特效当时插件做不到，就先降级普通通知，没为它写子插件。",
      },
      {
        label: "不做离线队列",
        detail:
          "H5 跑了三年没冒出这个需求，断网就是失败提示加保留输入。本地库和同步队列听着完整，代价是双份状态要维护，先不上。",
      },
    ],
    metrics: [
      { value: "2", unit: "个客户端，同一套后端" },
      { value: "1", unit: "个云函数入口" },
    ],
    stack: ["Flutter", "Dart", "Riverpod", "dio", "Kotlin", "CloudBase"],
    shotCount: 4,
    shotHints: ["首页·今日盘子", "记录页·一餐明细", "我的食物库·自定义菜品", "记运动弹层"],
  },
  {
    id: "miniprogram",
    title: "生活小工具 · 微信小程序",
    role: "独立全栈开发",
    period: "2025.11 – 2026.02",
    summary:
      "记账、习惯打卡、随机决策、媒体处理四个模块。个人主体没有服务器和备案域名，后端整条走微信云开发；原生小程序非跨端框架，19 个页面、4 个 Tab、5 个云函数一人完成，走完备案后提审发布正式版。",
    decisions: [
      {
        label: "后端只能选云开发",
        detail: "个人主体拿不到备案域名和服务器，Serverless 是唯一能真正上线的路径。",
      },
      {
        label: "不引第三方 UI 与图表库",
        detail: "趋势图用原生 view 自绘，包体和兼容性都更可控。",
      },
      {
        label: "每个云函数自己认人",
        detail: "入口先取 openid 再校验数据归属，不信任前端传来的用户标识。",
      },
      {
        label: "并发双写要治",
        detail: "习惯打卡用「用户 + 条目 + 日期」拼出确定性主键，重复写入自然被挡住。",
      },
    ],
    metrics: [
      { value: "19", unit: "个页面" },
      { value: "4", unit: "个 Tab" },
      { value: "5", unit: "个云函数" },
    ],
    stack: ["微信小程序", "云开发", "文档数据库"],
    shotCount: 4,
    shotHints: ["首页", "记账", "习惯打卡", "工具箱"],
  },
  {
    id: "harmonyos",
    title: "鸿蒙 App · 批量上架交付",
    role: "兼职 · 独立交付",
    period: "2026.04 – 至今",
    summary:
      "从选题跑到出签名包，中间不需要我在场。三个鸿蒙技能包固化了流程、判据和交付格式，喂一句需求进去，出来的是能直接提交审核的一整套；MVVM 分层规范也是我自己定的，同一套结构复用到后面每一个工程。人只出现在两端：定方向，以及 AGC 后台建应用、下签名、传包、验证码这几步只有人手能点的，提审走客户自己的开发者账号。",
    decisions: [
      {
        label: "产线契约，不是提示词",
        detail:
          "三个技能包各管一段：一个管 devecocli 工具链（脚手架、lint、构建、签名、装机、UI 自动化），一个管 MVVM 分层与可复制的工程模板，一个管「一句话到整套上架材料」的产线契约。契约里写死触发条件、执行顺序、判据和完成定义，agent 照着跑完自己知道到哪一步算成。",
      },
      {
        label: "选题阶段就有两套判据",
        detail:
          "一套防过不了审：把 17 个开发会话里的商店审核判语原文逐条扫成台账，按显示层不刷新／状态不持久／材料合规三类归档，其中几类提到选题阶段就一票否决，每单新驳回必须回填。另一套防被判马甲：我自己定了 12 类玩法机制族，配一张分布账当门禁——某族累计满三款禁新增、同族两款至少隔两夜、视觉母题与配色不得与近三夜任何一款重复。理由是审核判相似性看的是页面结构与玩法，不是类目标签。",
      },
      {
        label: "中途不许回头问我",
        detail:
          "契约明文规定：主题、应用名、包名、玩法归类全部由执行方自己定并写进台账，主观归类也不许停下来等批准；缺签名文件不阻塞，照常做完、出未签名产物、在交付清单里登记欠什么。停下来问一轮的成本，远高于事后被驳再改。",
      },
      {
        label: "五条完成定义，缺一条不算做完",
        detail:
          "设备端到端跑完、解包核对过的包、商店截图按规格落盘、图标多尺寸且回桌面实机核过、一份可直接复制提交的交付清单。另外单测不是摆设：每款故意改坏三处判据跑变异检验，掉下来的红数各不相同才算有效。",
      },
      {
        label: "这套流程本身被独立验证过",
        detail:
          "判据不是「我写完觉得能用」：起一个全新上下文的会话，只丢一句真实需求、不提技能包存在，看它会不会自己找到流程并按约执行。实测它自行调起了技能、引用了驳回台账的行号、五条完成定义一条不落，只漂出两处，已回补进契约。",
      },
      {
        label: "换皮不抄",
        detail:
          "客户给的参考 App 有侵权风险，改成同玩法的原创实现，语料自己重写并逐条查重。",
      },
    ],
    metrics: [
      { value: "3", unit: "个技能包" },
      { value: "12", unit: "类玩法机制族" },
      { value: "30+", unit: "款已上架" },
    ],
    stack: ["ArkTS", "ArkUI", "hvigor", "hypium", "DevEco"],
    rows: [
      {
        name: "摆局判将",
        sub: "BaiJu",
        desc: "八乘八逐枚摆子或粘局面串，判每格被哪几枚子攻到、有哪些合法走法、终局是可走／将军／将死还是逼和；摆出不成立的形状会直说，不硬给读数。",
        value: "棋类 · 局面判定",
      },
      {
        name: "物不知数",
        sub: "TongYu",
        desc: "把「三个三个数剩二、五个五数剩三」这类同余题算到底：给最小数量与增长周期，刻度尺标出随后两个周期，并附三条通路的算法讲解与手算例。",
        value: "数论 · 同余",
      },
      {
        name: "密铺周角",
        sub: "AngleSum",
        desc: "回答一个具体问题：把几块正多边形凑在同一个顶点上，能不能刚好围满一圈。",
        value: "几何 · 密铺",
      },
      {
        name: "报数出列",
        sub: "BaoShu",
        desc: "围成一圈报数、每数到第几位出列：填人数步长起报人，算出末位与整条出列次序，并用一排点带显示谁还在场。",
        value: "算法 · 出列次序",
      },
      {
        name: "万国旗阵",
        sub: "WangGuoQi",
        desc: "197 条旗帜按大洲分组的离线认知应用，分认旗、旗阵、回炉、我的四页；不联网、零权限，作答记录只存本机。",
        value: "通识 · 旗帜认知",
      },
    ],
    shotCount: 4,
    shotHints: ["条件点兵", "通解刻度", "三条通路", "我的"],
  },
  {
    id: "web",
    title: "网页开发 · 本站",
    role: "个人项目",
    period: "2026.10 – 至今",
    summary:
      "你现在看的这个站。Next.js App Router 加 Tailwind 设计令牌，没有第三方 UI 库；技能区是自己写的三维键帽，中文标题走子集化的思源黑体。",
    decisions: [
      {
        label: "不 fork 模板",
        detail: "上一版站在模板包袱上改炸了，这次自建骨架，内容全部走 src/data 数据文件。",
      },
      {
        label: "技能区不装现成 3D 组件",
        detail:
          "参考实现踩在一个发布三个月的 0.x runtime 上，改为自己写键帽几何与阻尼弹簧，移动端整块降级二维。",
      },
      {
        label: "图标不抓别人的资产",
        detail: "21 个技术图标取自 simple-icons（CC0），路径自己量墨迹包围盒再等比贴合键帽。",
      },
      {
        label: "字体自托管",
        detail: "中文思源黑体加 Inter 走 npm 分包，不依赖 Google Fonts——国内构建和访问都会拉不到。",
      },
    ],
    metrics: [
      { value: "0", unit: "第三方 UI 库" },
      // 直接取键位数据，不写死数字：上一版写 28，键盘一改就得记得回来改，迟早对不上
      { value: String(primarySkills.length), unit: "个技能主键位" },
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "three.js"],
    shotCount: 2,
    shotHints: ["首屏", "技能区"],
  },
  {
    id: "storefront",
    title: "WordPress 电商站开发与交付",
    role: "兼职 · 独立交付",
    period: "2026.09 – 至今",
    summary:
      "按客户给的源站整站复刻到 WooCommerce，做的是能真的收钱的店：商品与变体、库存、购物车、运费、结算页与账户页都建好，并用只读验收脚本逐条断言过。累计 30+ 单，源站横跨 Shopify、Magento 2、Salesforce Commerce Cloud 三种架构，品类覆盖箱包、餐具、户外装备、保温容器。支付通道走客户自己的 Stripe／PayPal 账号，我负责把链路做到交过去就能跑通。",
    decisions: [
      {
        label: "结算链路逐页验收",
        detail:
          "验收脚本把 home／catalog／category／product／cart／checkout／search／policy 列成固定页面类型逐一体检；购物车走 Woo 的 Cart 区块，连行项和移除按钮的选择器都单独断言。踩过一条坑：Woo 的核心页是按 slug 回落解析的，前台 /shop/ 一直返回 200，真正坏掉的却是 cart／checkout／my-account 三个 404。只看首页会漏判，从此判「核心页在不在」要看 option 真值加页面本身存在。",
      },
      {
        label: "先摸清数据从哪出来，再决定怎么导",
        detail: "三种源站的取数方式完全不同，目录接口、store API、藏在页面属性里的 JSON，各有各的坑。",
      },
      {
        label: "定价不用固定倍率",
        detail: "不同源站价格分布差得很大，改成名次分位映射铺进客户要的区间，避免中位价高的站被一个系数钉死。",
      },
      {
        label: "交付前跑只读验收",
        detail: "验收脚本对全站逐项断言：商品数、图片本地化、政策页、菜单、移动端溢出。",
      },
      {
        label: "坑清单单源化",
        detail: "踩一条记一条，下一单开工先过预检，不靠记性。",
      },
    ],
    metrics: [
      { value: "30+", unit: "个交付站点" },
      { value: "3", unit: "种源站架构" },
    ],
    stack: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    shotCount: 4,
    shotHints: [
      "首页 · 首屏活动",
      "商品详情 · 变体与库存",
      "分类列表 · 商品卡与加购",
      "结账 · 地址与订单摘要",
    ],
  },
];
