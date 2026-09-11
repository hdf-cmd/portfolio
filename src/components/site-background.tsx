"use client";

import AcidSquares from "@/components/reactbits/acid-squares";

// 全站固定背景层：让 React Bits AcidSquares 酸方格贯穿整页
// 所有区块（Hero / About / Skills / Work / Footer）共享同一个持续流动的 shader 背景
export function SiteBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <AcidSquares
        className="h-full w-full"
        color1="#5227ff"
        color2="#a855f7"
        color3="#ffffff"
        detail="medium"
        speed={0.7}
        waveDepth={1}
        zoom={1.3}
        density={10}
        spread={0.3}
        stepSize={0.002}
        glow={1}
        exposure={2700}
        brightness={1}
        contrast={1}
        opacity={1}
        mouseInteraction={true}
        mouseStrength={0.6}
        mouseRadius={0.5}
        blur={0}
        grain={false}
        grainIntensity={0.05}
      />
      {/* 轻浅压暗，保证文字可读，同时让酸方格背景清晰可见 */}
      <div className="absolute inset-0 bg-background/30" />
    </div>
  );
}