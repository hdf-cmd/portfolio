export type ConceptSite = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  href: string;
  shot: string;
  pages: number;
  tags: string[];
};

/** 自主命题的品牌站设计练习：品牌为虚构，文案与数据均为自洽设定。 */
export const concepts: ConceptSite[] = [
  {
    slug: "cafe",
    name: "屿雾咖啡",
    kind: "精品咖啡",
    tagline: "云南高山单一产区品牌站。菜单按冲煮方式分组，门店页带营业时段与地图位。",
    href: "/cafe",
    shot: "/work/cafe.jpg",
    pages: 3,
    tags: ["真实摄影", "Motion", "Anime.js"],
  },
  {
    slug: "dental",
    name: "双叶儿童口腔",
    kind: "专科医疗",
    tagline: "0–14 岁连锁齿科。分龄就诊路线、按症状联动的算价器、带手机号打码回显的预约表单。",
    href: "/dental",
    shot: "/work/dental.jpg",
    pages: 1,
    tags: ["冷调明亮", "医疗合规文案", "联动算价"],
  },
  {
    slug: "stay",
    name: "栖野湖山",
    kind: "民宿度假",
    tagline: "海拔 2100 米的湖景木屋。房型三卡、四季画廊、预订表单含校验与成功态。",
    href: "/stay",
    shot: "/work/stay.jpg",
    pages: 1,
    tags: ["明亮色系", "表单交互", "真实摄影"],
  },
  {
    slug: "burn",
    name: "燃点运动 BURN",
    kind: "运动健身",
    tagline: "健身品牌站。课表按星期与系列双维筛选，教练卡带专项标签，价格区带年卡拉取。",
    href: "/burn",
    shot: "/work/burn.jpg",
    pages: 4,
    tags: ["真实摄影", "交互筛选", "Anime.js"],
  },
  {
    slug: "kids",
    name: "小满美术教室",
    kind: "少儿教育",
    tagline: "3–12 岁美术培训。分龄课程三卡、明信片式作品墙、试课报名表单。",
    href: "/kids",
    shot: "/work/kids.jpg",
    pages: 1,
    tags: ["活泼排版", "表单交互", "手绘图形"],
  },
  {
    slug: "company",
    name: "澄澈科技",
    kind: "企业服务",
    tagline: "数据可视化平台的官网落地页。深色仪表盘预览、客户 logo 墙无缝滚动、定价三档。",
    href: "/company",
    shot: "/work/company.jpg",
    pages: 1,
    tags: ["Aceternity", "Motion", "克制配色"],
  },
];
