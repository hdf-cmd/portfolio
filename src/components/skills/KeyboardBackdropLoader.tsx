"use client";

import dynamic from "next/dynamic";

/** WebGL 层不能进 SSR，必须走 ssr:false；ssr:false 又只能在客户端组件里用，所以单独包一层 */
export const KeyboardBackdrop = dynamic(
  () => import("./KeyboardBackdrop").then((mod) => mod.KeyboardBackdrop),
  { ssr: false },
);
