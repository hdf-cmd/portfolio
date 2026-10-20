import * as THREE from "three";

const SIZE = 384;

/**
 * 这个吉祥物是这个站自己画的，不描任何人的角色——MIT 放开的是代码，不是别人的形象资产。
 * 两帧交替的做法照原版：一帧抬爪、一帧落爪。
 */
function drawCat(ctx: CanvasRenderingContext2D, pawsDown: boolean) {
  ctx.clearRect(0, 0, SIZE, SIZE);
  const cx = SIZE / 2;
  const cy = SIZE * 0.52;

  ctx.lineJoin = "round";
  ctx.strokeStyle = "#11152c";
  ctx.lineWidth = 9;
  ctx.fillStyle = "#ffffff";

  for (const dir of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(cx + dir * 52, cy - 52);
    ctx.lineTo(cx + dir * 74, cy - 122);
    ctx.lineTo(cx + dir * 22, cy - 86);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.ellipse(cx, cy, 108, 92, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f6b8c1";
  for (const dir of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(cx + dir * 56, cy - 62);
    ctx.lineTo(cx + dir * 66, cy - 100);
    ctx.lineTo(cx + dir * 38, cy - 74);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = "#11152c";
  if (pawsDown) {
    for (const dir of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(cx + dir * 40, cy - 12, 13, Math.PI, 0);
      ctx.stroke();
    }
  } else {
    for (const dir of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(cx + dir * 40, cy - 14, 11, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.strokeStyle = "#11152c";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(cx - 9, cy + 24, 9, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.arc(cx + 9, cy + 24, 9, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();

  const armY = pawsDown ? cy + 96 : cy + 46;
  ctx.lineWidth = 9;
  ctx.fillStyle = "#ffffff";
  for (const dir of [-1, 1]) {
    ctx.beginPath();
    ctx.roundRect(cx + dir * 78 - 24, armY - 22, 48, 44, 20);
    ctx.fill();
    ctx.stroke();
  }

  ctx.fillStyle = "#f6b8c1";
  for (const dir of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(cx + dir * 78 + (i - 1) * 12, armY - 4, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function toTexture(canvas: HTMLCanvasElement) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

export function makeMascotTextures() {
  const frames: THREE.CanvasTexture[] = [];
  for (const pawsDown of [false, true]) {
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext("2d");
    if (ctx) drawCat(ctx, pawsDown);
    frames.push(toTexture(canvas));
  }
  return frames;
}

export const BUBBLE_W = 512;
export const BUBBLE_H = 160;

export function drawBubble(ctx: CanvasRenderingContext2D, text: string) {
  ctx.clearRect(0, 0, BUBBLE_W, BUBBLE_H);
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#11152c";
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.roundRect(12, 12, BUBBLE_W - 24, BUBBLE_H - 52, 30);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(56, BUBBLE_H - 40);
  ctx.lineTo(38, BUBBLE_H - 6);
  ctx.lineTo(96, BUBBLE_H - 44);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#11152c";
  ctx.font = '600 46px Inter, "Noto Sans SC Variable", "Microsoft YaHei", sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, BUBBLE_W / 2, (BUBBLE_H - 40) / 2 + 12, BUBBLE_W - 60);
}
