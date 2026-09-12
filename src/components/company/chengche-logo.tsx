import { useId } from "react";

// 澄澈科技品牌标志：渐变圆角底，白色水滴内嵌数据流折线，寓意"让数据澄澈可见"
export function ChengcheLogo({ className }: { className?: string }) {
  const id = useId();
  const gradId = `cc-grad-${id}`;
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
      <defs>
        <linearGradient
          id={gradId}
          x1="0"
          y1="0"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#38BDF8" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="7" fill={`url(#${gradId})`} />
      <path
        d="M14 6C14 6 8.25 12.4 8.25 16.75A5.75 5.75 0 0 0 19.75 16.75C19.75 12.4 14 6 14 6Z"
        fill="#fff"
      />
      <path
        d="M10.75 16.75H12.6L13.7 14.2L15.1 18.1L16.1 16.75H17.25"
        stroke={`url(#${gradId})`}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
