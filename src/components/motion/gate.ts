/**
 * 动效总开关。条件必须与 layout.tsx 里那段预绘脚本逐字一致——
 * 脚本用它决定要不要注入隐藏样式，组件用它决定要不要接上动画，两边不一致就会出现
 * 「藏了没人放」或者「没藏却动画」两种坏情况。
 */
export function motionAllowed(): boolean {
  const m = window.matchMedia;
  return m("(min-width: 768px)").matches && !m("(prefers-reduced-motion: reduce)").matches;
}
