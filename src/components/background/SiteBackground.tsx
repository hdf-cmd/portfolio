import AcidSquares from "./acid-squares";

// 全站固定背景层：React Bits AcidSquares 流动方格 shader（ogl WebGL），
// 配色与 shader 参数照旧站 site-background.tsx 原值；压暗从旧站的 30% 提到 48%，
// 因为本站正文密度远高于旧站首屏，30% 时"架构"与键盘区之间的大空档会显得闹。
// z-index:-1 让它压在正文之下、body 底色之上；pointer-events:none 不吃点击，
// shader 的鼠标塌陷走 window 级监听（acid-squares.tsx:387），不受遮挡影响。
export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1]" aria-hidden="true">
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
      {/* 压暗：shader 在卡片和正文后面不能抢字，只留流动感 */}
      <div className="absolute inset-0 bg-night/48" />
    </div>
  );
}
