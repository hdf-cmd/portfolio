import type { NextConfig } from "next";

// Next 15+ 会拦掉 Host 头不是 localhost 的开发请求，手机走局域网 IP 访问会白屏
const nextConfig: NextConfig = {
  // 纯静态导出：所有页面都在构建时预渲染，产物 out/ 可直接丢给任意静态托管
  output: "export",
  allowedDevOrigins: ["10.220.148.101:3000", "192.168.137.1:3000"],
  // 静态托管（Netlify / GitHub Pages）没有 Next 的图片优化端点，预渲染时直接输出原图
  images: { unoptimized: true },
};

export default nextConfig;
