export type PoseName = "hero" | "skills" | "park" | "scatter";

/** GSAP 直接补间这个扁平对象，useFrame 每帧读它写回 Object3D——避免和 R3F 抢受控属性 */
export type Pose = { x: number; y: number; z: number; rx: number; ry: number; rz: number; s: number };

/**
 * 四段姿态。世界坐标，相机固定在 [0,4.2,6.2] fov42。
 * hero 靠右让位给标题，skills 占正中，park 缩到右下角给图表让路，scatter 在 contact 飘散。
 */
export const POSES: Record<PoseName, Pose> = {
  hero: { x: 2.9, y: 0.9, z: 0, rx: -0.18, ry: -0.55, rz: 0, s: 0.5 },
  skills: { x: 0, y: -0.18, z: 0, rx: -0.12, ry: 0, rz: 0, s: 0.85 },
  park: { x: 2.35, y: -0.35, z: -0.6, rx: -0.55, ry: -0.8, rz: 0.2, s: 0.42 },
  scatter: { x: 2.2, y: 0.5, z: 0, rx: -0.25, ry: -0.5, rz: 0, s: 0.5 },
};

/** 照原站 SCROLL_SECTIONS 的形状：锚点过线进下一段，回滚退上一段 */
export const SCROLL_SECTIONS = [
  { pose: "skills", previous: "hero", id: "skills", threshold: 0.5 },
  { pose: "park", previous: "skills", id: "architecture", threshold: 0.7 },
  { pose: "scatter", previous: "park", id: "contact", threshold: 0.3 },
] as const;

/** 单颗键帽散开时的位移量级（世界单位，键距 KEY_PITCH≈1.04） */
export const SCATTER_MIN = 0.7;
export const SCATTER_SPAN = 0.9;
