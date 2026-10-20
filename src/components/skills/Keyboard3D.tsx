"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { primarySkills, type Skill } from "@/data/skills";
import { KEY_PITCH, KEY_RADIUS, KEY_SIZE, KEYS_PER_ROW, groupColors } from "./config";
import { Keycap } from "./Keycap";
import { Mascot } from "./Mascot";
import type { Pose, PoseName } from "./poses";

/**
 * 先按每排上限算需要几排，再把每排键数摊匀。
 * 直接按 7 个一切，29 个键会剩下一颗孤零零的孤键；摊匀是 6/6/6/6/5，
 * 看起来就像一把真的键盘（底排本来就不齐）。
 */
function splitRows(items: Skill[], max: number): Skill[][] {
  const rowCount = Math.ceil(items.length / max);
  const base = Math.floor(items.length / rowCount);
  const wider = items.length % rowCount;
  const rows: Skill[][] = [];
  let at = 0;
  for (let r = 0; r < rowCount; r++) {
    const size = base + (r < wider ? 1 : 0);
    rows.push(items.slice(at, at + size));
    at += size;
  }
  return rows;
}

const ROWS = splitRows(primarySkills, KEYS_PER_ROW);
const COLS = Math.max(...ROWS.map((r) => r.length));
const FLAT = ROWS.flat();
/** 与原版同一招：把 26 个字母码按排布顺序发给前 26 颗键，物理键盘也能敲 */
const LETTERS = [..."QWERTYUIOPASDFGHJKLZXCVBNM"];
const CODE_TO_INDEX = new Map(
  LETTERS.slice(0, FLAT.length).map((letter, index) => [`Key${letter}`, index]),
);

export const KEY_COUNT = FLAT.length;

function plateGeometry() {
  const w = COLS * KEY_PITCH + KEY_SIZE * 0.5;
  const h = ROWS.length * KEY_PITCH + KEY_SIZE * 0.5;
  const r = KEY_RADIUS * 2.4;
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
    depth: 0.42,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.08,
    bevelSegments: 2,
    curveSegments: 8,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.center();
  return geometry;
}

export type SceneProps = {
  pose: React.MutableRefObject<Pose>;
  spin: React.MutableRefObject<{ ry: number }>;
  scatter: React.MutableRefObject<{ y: number }[]>;
  poseName: PoseName;
  onHover: (skill: Skill | null) => void;
  onPress: () => void;
  onRelease: () => void;
};

/**
 * 两层结构：外层只吃 GSAP 写的姿态，内层叠加指针视差与 hero 慢转。
 * 分开是因为 GSAP 每帧覆写 rotation，视差若写同一个属性会互相打架。
 */
export const KeyboardScene = memo(function KeyboardScene({
  pose,
  spin,
  scatter,
  poseName,
  onHover,
  onPress,
  onRelease,
}: SceneProps) {
  const poseRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const plate = useMemo(plateGeometry, []);
  const plateColor = useMemo(() => new THREE.Color("#1f223c"), []);
  const [active, setActive] = useState<Skill | null>(null);
  const [heldIndex, setHeldIndex] = useState<number | null>(null);
  const parallax = useRef({ x: 0, y: 0 });

  const handleHover = useCallback(
    (skill: Skill | null) => {
      setActive(skill);
      onHover(skill);
    },
    [onHover],
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.code.startsWith("Key") === false) return;
      const index = CODE_TO_INDEX.get(e.code);
      if (index === undefined) return;
      e.preventDefault();
      setHeldIndex(index);
      setActive(FLAT[index]);
      onHover(FLAT[index]);
      onPress();
    };
    const up = (e: KeyboardEvent) => {
      const index = CODE_TO_INDEX.get(e.code);
      if (index === undefined) return;
      setHeldIndex(null);
      setActive(null);
      onHover(null);
      onRelease();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [onHover, onPress, onRelease]);

  useFrame((state, delta) => {
    const outer = poseRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    const p = pose.current;
    outer.position.set(p.x, p.y, p.z);
    outer.scale.setScalar(p.s);

    const k = 1 - Math.min(1, delta * 4);
    parallax.current.x = parallax.current.x * k + (state.pointer.y * 0.04) * (1 - k);
    parallax.current.y = parallax.current.y * k + (state.pointer.x * 0.09) * (1 - k);
    outer.rotation.set(p.rx + parallax.current.x, p.ry + parallax.current.y, p.rz);
    inner.rotation.y = spin.current.ry;
  });

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 9, 6]} intensity={2.1} />
      <directionalLight position={[-6, 4, -5]} intensity={0.8} color={groupColors.web} />
      <group ref={poseRef}>
        <group ref={innerRef}>
          <mesh geometry={plate} position={[0, -0.66, 0]}>
            <meshStandardMaterial color={plateColor} roughness={0.7} metalness={0.1} />
          </mesh>
          {poseName === "skills" && (
            <Mascot
              pressing={active !== null}
              label={active?.label ?? null}
              position={[0.9, 0.62, -((ROWS.length - 1) / 2) * KEY_PITCH - 0.95]}
            />
          )}
          {ROWS.map((row, rowIndex) =>
            row.map((skill, colIndex) => {
              const offset = (row.length - 1) / 2;
              const flatIndex = rowIndex * COLS + colIndex;
              return (
                <Keycap
                  key={skill.label}
                  skill={skill}
                  position={[(colIndex - offset) * KEY_PITCH, 0, (rowIndex - (ROWS.length - 1) / 2) * KEY_PITCH]}
                  down={heldIndex === flatIndex}
                  scatter={scatter.current[flatIndex]}
                  onHover={handleHover}
                  onPress={onPress}
                  onRelease={onRelease}
                />
              );
            }),
          )}
        </group>
      </group>
    </>
  );
});
