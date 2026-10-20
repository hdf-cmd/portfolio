export type EngineeringCard = {
  title: string;
  lead: string;
  metrics: { value: string; unit: string }[];
  points: { label: string; detail: string }[];
};

// 上站不显示用例条数与工程数量——2026-10-20 老大的判断是「数字那么大，让别人看见还以为是假的」。
// 口径仍留在这里，将来要引用就按它现场重数：
//   鸿蒙 *.test.ets 里词边界 \bit( 合计 7388（61 个工程、57 个带 viewmodel 层、单工程中位 125）；
//   食光 tests/ 里 \btest( 46；ShiguangFlutter/test 下 38 个 *_test.dart 行首 test(/testWidgets( 337；
//   小程序 tests/ 57；wordpress/delivery node --test 143。
export const engineeringCards: EngineeringCard[] = [
  {
    title: "测试，以及怎么证明测试有效",
    lead: "四条线各自带单测。用例多不代表有用，所以我每次都先把用例故意弄坏再看它会不会红。",
    metrics: [{ value: "4", unit: "条线都有单测" }],
    points: [
      {
        label: "变异检验",
        detail:
          "鸿蒙那批每款改坏三处：解锁判据、类别归属、计分口径。跑出来的红数各不相同，才说明用例真的在盯这些逻辑。",
      },
      {
        label: "语料结构自检",
        detail:
          "题库类 App 用脚本跑重复与占位符检测；对联还要校验上下联字数相等，当场抓出把散文句误当对联的条目。",
      },
      {
        label: "只读验收脚本",
        detail:
          "交付站的验收不靠手点：verify-site.mjs 对全站逐项断言商品数、图片本地化、政策页、菜单与移动端溢出，跑完直接出 FAIL 清单。",
      },
      {
        label: "计数要认尾行",
        detail:
          "鸿蒙单测的条数只在 test_result.txt 尾行，devecocli 没有 test 子命令，只能走 hvigorw。一开始我按屏幕输出数，数错过一次。",
      },
    ],
  },
  {
    title: "门禁与发版",
    lead: "能自动拦的绝不靠记性。提交前有静态检查，出包前有版本与签名核对。",
    metrics: [
      { value: "2", unit: "道 CI 门禁（lint + test）" },
      { value: "34", unit: "个工程出到签名包" },
      { value: "0", unit: "本站 typecheck 报错" },
    ],
    points: [
      {
        label: "CI 每次 push 跑两件事",
        detail: "食光的 workflow 就两步：npm run lint 和 npm test。不通过就不出包，本地也一样先跑再提。",
      },
      {
        label: "版本号只有一处",
        detail:
          "版本号做成单一来源，README、CHANGELOG、包名跟着走。之前三处版本互相矛盾过（README 写 v1.0.0、交接文档写 v1.1.0、实际 APK 已经 v1.3.1），从那次之后改成一处生成。",
      },
      {
        label: "签名库是唯一的坑",
        detail:
          "keystore 凭据不进仓库，单独存本地。丢了就没法再更新已装机的 App，所以这条写进交付清单的第一节。",
      },
      {
        label: "这个站自己也要过检",
        detail: "每改一轮跑 typecheck、无头浏览器截图比对、数横向溢出，写完不等于做完。",
      },
    ],
  },
  {
    title: "坑清单与交付模板",
    lead: "踩一条记一条，一条一个文件。下一单开工先过预检，不靠我记不记得住。",
    metrics: [
      { value: "154", unit: "条坑，一条一个文件" },
      { value: "7", unit: "步交付 SOP" },
      { value: "30+", unit: "单按这套流程交付" },
    ],
    points: [
      {
        label: "坑清单单源化",
        detail:
          "每条坑单独一个文件、带编号，交付模板和预检脚本直接引用它，不用把同一条坑抄到三个地方。",
      },
      {
        label: "交付说明有模板",
        detail:
          "每单一份交付说明，首行写状态，后面是验收数字与遗留项。客户验收看的就是这一页。",
      },
      {
        label: "预检先于施工",
        detail:
          "开工前 probe 脚本先量客户站：源站是什么架构、有多少商品、图片在哪个域名、支付资质归谁，摸清了再动手导数据。",
      },
      {
        label: "回退点先打好",
        detail:
          "动生产环境之前先备份，改一处验一处；预检脚本、验收脚本、回退清单三样配套，出问题能立刻退回上一个状态。",
      },
    ],
  },
  {
    // 数字为 2026-10-18 本机实测，口径都写死在这里，避免以后被问倒：
    // 「10 个自建」= ~/.agents/skills 下 43 个目录中，剔除两批同日批量落盘的官方包（2026-06-10 的
    //   Anthropic 18 个、2026-09-20 的 Cloudflare 14 个）后，零散日期新增且带 SKILL.md 的那批；
    //   brand-site-design-workspace 无 SKILL.md，是评测工作区，不计入技能包。
    // 「32 个官方」= 上面那两批，明确标注是接入、不是自建。
    // 「36 条硬规则」= ~/.qoder-cn/memory 下 feedback-* 前缀文件数（总 87，另有 env 25 / ref 23 / user 3）。
    title: "Agent 流水线：规范和验收不外包",
    lead: "重复的工程动作我沉淀成 agent 能直接执行的技能包，官方那批技能包也接进同一条工作流。判据是我定的，技能包改动要跑评测，agent 出的码最后仍由人验收。",
    metrics: [
      { value: "10", unit: "个自建技能包" },
      { value: "32", unit: "个官方技能包，接入而非自建" },
      { value: "36", unit: "条写给 agent 的硬规则" },
    ],
    points: [
      {
        label: "技能包不是提示词",
        detail:
          "一个技能包里写清触发条件、执行顺序、判据和完成定义，agent 照着跑完自己知道到哪一步算成。鸿蒙那套把脚手架、lint、构建、签名、商店图规格整条链固化下来，新工程不用我把流程重讲一遍。",
      },
      {
        label: "技能包改动要跑评测",
        detail:
          "品牌建站那个技能配了独立的评测工作区：两轮、每轮三个真实任务用例，跑完出 run_summary 对比。改一版技能先看分数有没有掉，不然「我优化了技能包」这句话没法证明。",
      },
      {
        label: "规则是给 agent 读的，不是给我读的",
        detail:
          "每条规则单独一个文件、带一行索引，agent 每轮自动加载。所以「上次这里怎么错的」不需要我提醒它，它自己带着。",
      },
      {
        label: "派单先堵住它给自己放宽标准",
        detail:
          "给子代理的任务书第一段写死三条：不许编权威出处、判据不许放宽、做不了就写「未验」。这么写是因为我见过它把推断包装成「领导说的」来给自己放行，也见过它跑完只回半句进度话就当交付。",
      },
    ],
  },
];
