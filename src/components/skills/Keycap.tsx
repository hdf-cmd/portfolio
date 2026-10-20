"use client";

import { memo, useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { Skill } from "@/data/skills";
import { KEY_HEIGHT, KEY_RADIUS, KEY_SIZE, PRESS_DEPTH, SPRING_DAMPING, SPRING_STIFFNESS } from "./config";
import { keycapColor, makeKeycapTexture } from "./keycap-face";

let cachedGeometry: THREE.ExtrudeGeometry | null = null;

function keyGeometry() {
  if (cachedGeometry) return cachedGeometry;

  const w = KEY_SIZE;
  const h = KEY_SIZE;
  const r = KEY_RADIUS;
  const x = -w / 2;
  const y = -h / 2;

  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: KEY_HEIGHT,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 3,
    curveSegments: 6,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.center();
  geometry.computeBoundingBox();
  cachedGeometry = geometry;
  return geometry;
}

const TOP_Y = (() => {
  const box = keyGeometry().boundingBox;
  return box ? box.max.y + 0.002 : KEY_HEIGHT / 2;
})();

type KeycapProps = {
  skill: Skill;
  position: [number, number, number];
  down?: boolean;
  /** contact 段由 GSAP 逐颗补间的浮起量，与按下位移叠加在同一个 y 上 */
  scatter?: { y: number };
  onHover: (skill: Skill | null) => void;
  onPress: () => void;
  onRelease: () => void;
};

export const Keycap = memo(function Keycap({
  skill,
  position,
  down = false,
  scatter,
  onHover,
  onPress,
  onRelease,
}: KeycapProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const pressedRef = useRef(false);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  const geometry = keyGeometry();
  const texture = useMemo(() => makeKeycapTexture(skill), [skill]);
  const color = useMemo(() => new THREE.Color(keycapColor(skill)), [skill]);

  useEffect(() => () => texture?.dispose(), [texture]);

  const enter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (pressedRef.current) return;
    pressedRef.current = true;
    onHover(skill);
    onPress();
  };

  const leave = () => {
    if (!pressedRef.current) return;
    pressedRef.current = false;
    onHover(null);
    onRelease();
  };

  useFrame((_, rawDelta) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;

    const dt = Math.min(rawDelta, 0.033);
    const isDown = pressedRef.current || down;
    const target = isDown ? -PRESS_DEPTH : 0;
    velocityRef.current +=
      (-SPRING_STIFFNESS * (offsetRef.current - target) - SPRING_DAMPING * velocityRef.current) * dt;
    offsetRef.current += velocityRef.current * dt;
    group.position.y = position[1] + offsetRef.current + (scatter?.y ?? 0);

    const material = mesh.material as THREE.MeshStandardMaterial;
    const wantedEmissive = isDown ? 0.55 : 0.1;
    material.emissiveIntensity += (wantedEmissive - material.emissiveIntensity) * Math.min(1, dt * 6);
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerOver={enter}
        onPointerOut={leave}
        onPointerDown={(e) => {
          e.stopPropagation();
          onPress();
        }}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.1}
          roughness={0.4}
          metalness={0.12}
        />
      </mesh>
      {texture ? (
        <mesh position={[0, TOP_Y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[KEY_SIZE * 0.86, KEY_SIZE * 0.86]} />
          <meshBasicMaterial map={texture} transparent depthWrite={false} />
        </mesh>
      ) : null}
    </group>
  );
});
