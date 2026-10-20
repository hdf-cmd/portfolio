// 格子比例与列数必须跟着图片真实朝向走：横屏站截图塞进 9/16 竖格会被 object-cover 裁成一条，
// 真机竖屏图反过来塞进 16/10 又会连弹层按钮一起切掉。
export type ShotLayout = {
  /** CSS aspect-ratio 值，卡片堆与二维格子共用 */
  ratio: string;
  aspect: string;
  cols: string;
  sizes: string;
  /** 卡片堆的限宽：四宫格里每张只有列宽，卡片堆是整块宽，不限宽的话竖屏图会铺成两千多像素高 */
  deckMax: string;
};

const PHONE_COLS = "grid-cols-2 gap-4 md:grid-cols-4";
const PHONE_SIZES = "(max-width:768px) 50vw, 25vw";
const PHONE_DECK = "max-w-[400px]";
const WIDE_DECK = "max-w-[760px]";

export const LAYOUT: Record<string, ShotLayout> = {
  // 本站首屏与技能区，900×563
  web: { ratio: "900/563", aspect: "aspect-[16/10]", cols: "grid-cols-1 gap-5 md:grid-cols-2", sizes: "(max-width:768px) 100vw, 50vw", deckMax: WIDE_DECK },
  // 电商站桌面截图 1440×900
  // 电商站桌面截图：源图裁掉站头后是 1.82，按真实比例排，硬塞 16/10 会把左边标题切掉
  storefront: { ratio: "1600/879", aspect: "aspect-[1600/879]", cols: "grid-cols-1 gap-5 md:grid-cols-2", sizes: "(max-width:768px) 100vw, 50vw", deckMax: WIDE_DECK },
  // 食光真机 1264×2780
  app: { ratio: "1264/2780", aspect: "aspect-[1264/2780]", cols: PHONE_COLS, sizes: PHONE_SIZES, deckMax: PHONE_DECK },
  // 小程序截图 611×1163，比食光那批窄高比要胖一圈
  miniprogram: { ratio: "611/1163", aspect: "aspect-[611/1163]", cols: PHONE_COLS, sizes: PHONE_SIZES, deckMax: PHONE_DECK },
  // 鸿蒙商店图 1080×1920，套进 1264/2780 会被 object-cover 左右各切掉约 12%
  harmonyos: { ratio: "9/16", aspect: "aspect-[9/16]", cols: PHONE_COLS, sizes: PHONE_SIZES, deckMax: PHONE_DECK },
};

export const FALLBACK: ShotLayout = LAYOUT.app;
