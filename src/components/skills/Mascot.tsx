"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { BUBBLE_H, BUBBLE_W, drawBubble, makeMascotTextures } from "./mascot-textures";

type MascotProps = {
  pressing: boolean;
  label: string | null;
  position: [number, number, number];
};

export function Mascot({ pressing, label, position }: MascotProps) {
  const frames = useMemo(makeMascotTextures, []);
  const bubble = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = BUBBLE_W;
    canvas.height = BUBBLE_H;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return { canvas, texture };
  }, []);

  useEffect(() => () => frames.forEach((f) => f.dispose()), [frames]);
  useEffect(() => () => bubble.texture.dispose(), [bubble]);

  useEffect(() => {
    const ctx = bubble.canvas.getContext("2d");
    if (!ctx) return;
    drawBubble(ctx, label ?? "按键盘字母键也行");
    bubble.texture.needsUpdate = true;
  }, [bubble, label]);

  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial map={pressing ? frames[1] : frames[0]} transparent depthWrite={false} />
      </mesh>
      <mesh position={[1.85, 0.86, 0.02]}>
        <planeGeometry args={[2.15, 2.15 * (BUBBLE_H / BUBBLE_W)]} />
        <meshBasicMaterial map={bubble.texture} transparent depthWrite={false} />
      </mesh>
    </group>
  );
}
