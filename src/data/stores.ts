/** 数字均为 2026-10-07 对各站 WooCommerce Store API 的实测值（x-wp-total），非估算。 */
export type DeliveredStore = {
  slug: string;
  brand: string;
  category: string;
  url: string;
  products: number;
  cats: number;
  shot: string;
  scope: string;
};

export const stores: DeliveredStore[] = [
  {
    slug: "velvet",
    brand: "Velvet Caviar",
    category: "手机壳与配件",
    url: "https://myvelvetcaviar.com",
    products: 3198,
    cats: 63,
    shot: "/stores/velvet.jpg",
    scope: "整站目录迁移 · 首页区块重建 · 分类树 63 项",
  },
  {
    slug: "aero",
    brand: "Aéropostale",
    category: "服饰",
    url: "https://aeropostaleu.com",
    products: 2640,
    cats: 26,
    shot: "/stores/aero.jpg",
    scope: "含配色变体的目录迁移 · 促销条与分类入口 · 政策页脚",
  },
  {
    slug: "ridge",
    brand: "Ridge",
    category: "钱包与包袋",
    url: "https://myridgeshop.com",
    products: 1225,
    cats: 30,
    shot: "/stores/ridge.jpg",
    scope: "目录迁移 · 分类导航重建 · 商品图本地化",
  },
  {
    slug: "osprey",
    brand: "Osprey",
    category: "户外背包与旅行装备",
    url: "https://ospreyeu.com",
    products: 479,
    cats: 43,
    shot: "/stores/osprey.jpg",
    scope: "目录迁移 · 按活动分类的入口网格 · 结账链路核验",
  },
  {
    slug: "corelle",
    brand: "Corelle",
    category: "餐具与厨具",
    url: "https://corelieu.com",
    products: 440,
    cats: 40,
    shot: "/stores/corelle.jpg",
    scope: "目录迁移 · 花纹系列归档 · 促销价批量写入",
  },
  {
    slug: "jansport",
    brand: "JanSport",
    category: "背包与日用",
    url: "https://jansporte.com",
    products: 134,
    cats: 30,
    shot: "/stores/jansport.jpg",
    scope: "目录迁移 · 主导航与页脚重建 · 移动端布局核验",
  },
  {
    slug: "eureka",
    brand: "Eureka",
    category: "吸尘器与家电",
    url: "https://eurekau.com",
    products: 98,
    cats: 16,
    shot: "/stores/eureka.jpg",
    scope: "目录迁移 · 参数型商品卡样式 · 配件兼容关系归档",
  },
];

export const totals = stores.reduce(
  (acc, s) => ({
    products: acc.products + s.products,
    cats: acc.cats + s.cats,
    sites: acc.sites + 1,
  }),
  { products: 0, cats: 0, sites: 0 },
);
