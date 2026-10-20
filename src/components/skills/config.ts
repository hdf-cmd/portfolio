import type { SkillGroup } from "@/data/skills";

// 键帽配色按能力线分组，是我自己定的调色板，不是各技术的官方品牌色。
export const groupColors: Record<SkillGroup, string> = {
  web: "#4c8df6",
  harmony: "#e2574c",
  mini: "#16f2b3",
  app: "#f0a63c",
  store: "#9b7bf0",
  eng: "#7b8494",
};

export const KEYS_PER_ROW = 6;
/** 尺寸比例照抄原版 scene.ts 的 KIT：pitch/keyHeight = 1.04468/0.7629 */
export const KEY_HEIGHT = 0.7629;
export const KEY_PITCH = KEY_HEIGHT * (1.04468 / 0.7629);
export const KEY_SIZE = KEY_PITCH - 0.095;
export const KEY_RADIUS = 0.16;
/** 原版按下位移 = keyHeight * 0.6 */
export const PRESS_DEPTH = KEY_HEIGHT * 0.6;
/** 阻尼比 ζ = 8.5/(2·√90) ≈ 0.45，落下去回弹两下才停 */
export const SPRING_STIFFNESS = 90;
export const SPRING_DAMPING = 8.5;
