"use client";

import { useEffect, useState } from "react";
import { layers, navLevels } from "@/data/architecture";
import { motionAllowed } from "@/components/motion/gate";

const LAYER_H = 104;
const LAYER_GAP = 24;
const layerY = (i: number) => 62 + i * (LAYER_H + LAYER_GAP);

/**
 * 三层依赖与三级导航栈示意图。
 * 在原静态图上加两件事：连接线里有方向的光点跑动（调用向下 / 状态向上），
 * 以及把某一层聚焦时压暗其余两层——聚焦用 hover 与键盘 focus 双通道，
 * 触屏点一下也会触发 pointerenter。
 */
export function LayerDiagram() {
  const [live, setLive] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => setLive(motionAllowed()), []);

  const dim = (name: string) => (active && active !== name ? 0.3 : 1);

  return (
    <svg
      viewBox="0 0 1040 460"
      role="img"
      aria-label="MVVM 三层依赖关系与三级导航栈示意图"
      className="w-full"
      style={{ fontFamily: "inherit" }}
      onPointerLeave={() => setActive(null)}
    >
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#a7b0c0" />
        </marker>
        <marker id="arrA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#16f2b3" />
        </marker>
      </defs>

      <text x="40" y="34" fill="#ffffff" fontSize="19" fontWeight="700">
        三层与依赖方向
      </text>
      <text x="560" y="34" fill="#ffffff" fontSize="19" fontWeight="700">
        三级导航栈
      </text>

      {layers.map((layer, i) => {
        const y = layerY(i);
        return (
          <g key={layer.name} style={{ opacity: dim(layer.name), transition: "opacity .25s" }}>
            <rect
              x="40"
              y={y}
              width="440"
              height={LAYER_H}
              rx="14"
              fill="#11152c"
              stroke={active === layer.name ? "#16f2b3" : "#ffffff"}
              strokeOpacity={active === layer.name ? 0.6 : 0.09}
            />
            <text x="64" y={y + 34} fill="#16f2b3" fontSize="20" fontWeight="700">
              {layer.name}
            </text>
            <text x="456" y={y + 34} fill="#a7b0c0" fontSize="13" textAnchor="end">
              {layer.dir}
            </text>
            <text x="64" y={y + 60} fill="#e8ecf4" fontSize="13.5">
              {layer.may}
            </text>
            <text x="64" y={y + 84} fill="#a7b0c0" fontSize="13.5">
              {layer.mustNot}
            </text>

            {/* 透明命中区：整条都能悬停/聚焦，不必精确点到文字 */}
            <rect
              x="40"
              y={y}
              width="440"
              height={LAYER_H}
              rx="14"
              fill="transparent"
              tabIndex={0}
              role="button"
              aria-label={`${layer.name} 层：${layer.may}；${layer.mustNot}`}
              style={{ cursor: "pointer", outline: "none" }}
              onPointerEnter={() => setActive(layer.name)}
              onFocus={() => setActive(layer.name)}
              onBlur={() => setActive(null)}
            />

            {i < layers.length - 1 ? (
              <>
                <line x1="150" y1={y + LAYER_H} x2="150" y2={y + LAYER_H + LAYER_GAP} stroke="#a7b0c0" strokeWidth="1.6" markerEnd="url(#arr)" />
                <text x="162" y={y + LAYER_H + 16} fill="#a7b0c0" fontSize="12">
                  调用 ↓
                </text>
                <line x1="370" y1={y + LAYER_H + LAYER_GAP} x2="370" y2={y + LAYER_H} stroke="#16f2b3" strokeWidth="1.6" markerEnd="url(#arrA)" />
                <text x="300" y={y + LAYER_H + 16} fill="#16f2b3" fontSize="12">
                  状态 ↑
                </text>
                {live ? (
                  <>
                    <circle
                      className="flow-dot flow-down"
                      style={{ animationDelay: `${i * 0.35}s` }}
                      cx="150"
                      cy={y + LAYER_H}
                      r="3.2"
                      fill="#a7b0c0"
                    />
                    <circle
                      className="flow-dot flow-up"
                      style={{ animationDelay: `${i * 0.35 + 0.75}s` }}
                      cx="370"
                      cy={y + LAYER_H + LAYER_GAP}
                      r="3.2"
                      fill="#16f2b3"
                    />
                  </>
                ) : null}
              </>
            ) : null}
          </g>
        );
      })}

      {/* 右侧导航栈不参与分层聚焦：它跟左边的三层不是同一件事 */}
      <g>
        <rect x="560" y="62" width="440" height="360" rx="16" fill="#11152c" stroke="#ffffff" strokeOpacity="0.09" />
        <text x="584" y="92" fill="#ffffff" fontSize="15" fontWeight="600">
          L1 根栈
        </text>
        <text x="976" y="92" fill="#a7b0c0" fontSize="12.5" textAnchor="end">
          {navLevels[0].note}
        </text>

        <rect x="584" y="106" width="392" height="292" rx="13" fill="#1f223c" stroke="#ffffff" strokeOpacity="0.07" />
        <text x="606" y="134" fill="#ffffff" fontSize="15" fontWeight="600">
          L2 Tab 域
        </text>
        <text x="954" y="134" fill="#a7b0c0" fontSize="12.5" textAnchor="end">
          {navLevels[1].note}
        </text>

        <rect x="606" y="148" width="348" height="226" rx="12" fill="#25213b" stroke="#ffffff" strokeOpacity="0.07" />
        <text x="628" y="176" fill="#ffffff" fontSize="15" fontWeight="600">
          L3 域内子栈
        </text>
        <text x="932" y="176" fill="#a7b0c0" fontSize="12.5" textAnchor="end">
          {navLevels[2].note}
        </text>

        {["答题", "详情", "结算"].map((label, i) => (
          <g key={label}>
            <rect x={628 + i * 106} y="196" width="92" height="46" rx="9" fill="#0d1224" stroke="#16f2b3" strokeOpacity="0.45" />
            <text x={674 + i * 106} y="224" fill="#e8ecf4" fontSize="14" textAnchor="middle">
              {label}
            </text>
          </g>
        ))}
        <text x="628" y="286" fill="#a7b0c0" fontSize="13">
          路由常量集中在 common/constants，
        </text>
        <text x="628" y="308" fill="#a7b0c0" fontSize="13">
          页面只引用常量、不写字符串路径
        </text>
        <text x="628" y="350" fill="#16f2b3" fontSize="13">
          新增页面 = 加一条常量，不改调用点
        </text>
      </g>
    </svg>
  );
}
