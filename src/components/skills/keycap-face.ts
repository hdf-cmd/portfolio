import * as THREE from "three";
import { skillIcons } from "@/data/skill-icons";
import type { Skill } from "@/data/skills";
import { groupColors } from "./config";

const CANVAS = 256;

function luminance(hex: string) {
  const n = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * 有官方图标的键用品牌色，但 simple-icons 里有不少 hex 接近纯黑或纯白，
 * 直接上色会在深色底上看不见，所以按亮度筛一道，不合格的回落到分组色。
 */
export function keycapColor(skill: Skill) {
  const hex = skillIcons[skill.label]?.hex;
  if (hex) {
    const l = luminance(hex);
    if (l > 0.18 && l < 0.9) return hex;
  }
  return groupColors[skill.group];
}

function fontSizeFor(label: string) {
  const len = [...label].length;
  if (len <= 3) return 104;
  if (len <= 5) return 76;
  if (len <= 8) return 56;
  if (len <= 11) return 42;
  return 34;
}

/** 亮底用深字，暗底用白字——否则 JS 黄、React 浅蓝这类键帽上的白色图标会糊成一片。 */
function inkFor(bgHex: string) {
  return luminance(bgHex) > 0.55 ? "#0b1020" : "#ffffff";
}

/**
 * 图标在 24×24 视框里占多大各不相同（WooCommerce 只占一角、Git 撑满），
 * 直接按视框缩放会大小不一。含圆弧命令的路径也没法靠读坐标算包围盒，
 * 所以先按 4 倍比例画一遍、扫非透明像素量出真实墨迹范围，再等比贴合。
 */
type InkBox = { x: number; y: number; w: number; h: number };
const boxCache = new Map<string, InkBox | null>();

function measureInkBox(pathData: string, viewBox: string): InkBox | null {
  const cached = boxCache.get(pathData);
  if (cached !== undefined) return cached;

  const [vx, vy, vw, vh] = viewBox.split(" ").map(Number);
  const S = 4;
  const pad = 4;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(vw * S) + pad * 2;
  canvas.height = Math.ceil(vh * S) + pad * 2;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.scale(S, S);
  ctx.translate(-vx + pad / S, -vy + pad / S);
  ctx.fillStyle = "#000";
  ctx.fill(new Path2D(pathData));

  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] <= 8) continue;
    const p = (i - 3) / 4;
    const x = p % width;
    const y = (p / width) | 0;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }

  const box =
    maxX === -Infinity
      ? null
      : {
          x: (minX - pad) / S + vx,
          y: (minY - pad) / S + vy,
          w: (maxX - minX) / S,
          h: (maxY - minY) / S,
        };
  boxCache.set(pathData, box);
  return box;
}

export function makeKeycapTexture(skill: Skill) {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS;
  canvas.height = CANVAS;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const bg = keycapColor(skill);
  const icon = skillIcons[skill.label];
  ctx.clearRect(0, 0, CANVAS, CANVAS);
  ctx.fillStyle = inkFor(bg);

  if (icon) {
    const [vx, vy, vw, vh] = icon.viewBox.split(" ").map(Number);
    const box = measureInkBox(icon.path, icon.viewBox);
    const w = box?.w ?? vw;
    const h = box?.h ?? vh;
    const cx = (box?.x ?? vx) + w / 2;
    const cy = (box?.y ?? vy) + h / 2;
    const scale = (CANVAS * 0.62) / Math.max(w, h);
    ctx.save();
    ctx.translate(CANVAS / 2, CANVAS / 2);
    ctx.scale(scale, scale);
    ctx.translate(-cx, -cy);
    ctx.fill(new Path2D(icon.path));
    ctx.restore();
  } else {
    ctx.font = `700 ${fontSizeFor(skill.label)}px Inter, "HarmonyOS Sans SC", "Microsoft YaHei", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(skill.label, CANVAS / 2, CANVAS / 2 + 2, CANVAS - 24);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
