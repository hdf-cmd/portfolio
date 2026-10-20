import type { CSSProperties, ReactNode } from "react";

/**
 * LogoLoop 是从 React Bits 抄来的 .jsx，没有类型信息，TS 会把它的 props 推成 object
 * 而拒收我们传的属性。这份声明只覆盖本站用到的子集，字段名与默认值对着 LogoLoop.jsx
 * 的解构签名写；哪天升级抄录版本，要按新签名同步这里。
 */
export type LogoLoopProps<T> = {
  logos: readonly T[];
  speed?: number;
  direction?: "left" | "right";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutWidth?: number;
  scaleOnHover?: boolean;
  layout?: "line" | "curve";
  bend?: number;
  focus?: number;
  magnify?: number;
  tiltX?: number;
  tiltY?: number;
  step?: boolean;
  muted?: number;
  labels?: "none" | "inline" | "below";
  draggable?: boolean;
  scrollBoost?: number;
  intro?: boolean;
  renderItem?: (item: T, key: string) => ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
};

declare function LogoLoop<T extends object>(props: LogoLoopProps<T>): ReactNode;

export { LogoLoop };
export default LogoLoop;
