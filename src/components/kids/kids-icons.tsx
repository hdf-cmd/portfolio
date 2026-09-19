// 小满美术教室 · 手绘风 SVG 图标集
// 设计语言:蜡笔粗线条 + 圆头笔触 + 轻微抖动,呼应「孩子自己画的」品牌气质

export function KidsLogo({ className }: { className?: string }) {
  // 小孩画的太阳:歪圆 + 8 根不等长射线
  return (
    <svg viewBox="0 0 44 44" fill="none" className={className} aria-hidden>
      <path
        d="M22 12.5c5.2-.4 9.6 3.8 9.7 9 .1 5.4-4.3 9.9-9.6 9.9-5.5 0-9.8-4.4-9.7-9.7.1-5 4.2-9 9.6-9.2z"
        fill="#FFC94A"
        stroke="#FF7A59"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M22 3.5v4.6M22 35.9v4.6M3.8 22h4.6M35.6 22h4.6M9.2 9.4l3.3 3.2M31.5 31.5l3.3 3.3M34.9 9.2l-3.3 3.3M12.4 31.6l-3.2 3.2"
        stroke="#FF7A59"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M18.6 20.8c.3-.9 1.4-1.3 2.1-.7M24 20.9c.6-.7 1.7-.4 2.1.5" stroke="#8B5E00" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18.8 25.4c2 1.8 6.2 1.7 8.2-.1" stroke="#8B5E00" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconPalette({ className }: { className?: string }) {
  // 颜料板
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M20 6c8 0 14.5 5.6 14.5 12.6 0 4.6-3.4 6.8-6.6 6.8h-3c-2 0-3.4 1.4-3.4 3.2 0 .8.3 1.4.7 2 .5.7.2 1.9-.7 2.3-.7.3-1.4.4-2.2.4C11 33.3 5.5 27 5.5 19.2 5.5 11.7 11.7 6 20 6z"
        stroke="#FAF7F2"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="13.5" cy="15" r="2.1" fill="#FFC94A" />
      <circle cx="21" cy="11.5" r="2.1" fill="#FF7A59" />
      <circle cx="27.5" cy="16" r="2.1" fill="#4A90D9" />
      <circle cx="12.8" cy="22.5" r="2.1" fill="#7BC47F" />
    </svg>
  );
}

export function IconEye({ className }: { className?: string }) {
  // 观察的眼睛
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M5.5 20.5C9 14.5 14.2 11.5 20 11.5s11 3 14.5 9c-3.5 6-8.7 9-14.5 9s-11-3-14.5-8.5z"
        stroke="#FAF7F2"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20.3" r="4.6" stroke="#FFC94A" strokeWidth="2.4" />
      <circle cx="21.8" cy="18.4" r="1.4" fill="#FAF7F2" />
    </svg>
  );
}

export function IconBook({ className }: { className?: string }) {
  // 成长册
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M20 10.5C17.5 8 13.6 7.2 8 8v23c5.6-.8 9.5.2 12 2.8 2.5-2.6 6.4-3.6 12-2.8V8c-5.6-.8-9.5 0-12 2.5z"
        stroke="#FAF7F2"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 10.5v23.3" stroke="#FAF7F2" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M11.5 15.5c2.4-.4 4.6-.2 6.4.8M11.5 21c2.4-.4 4.6-.2 6.4.8" stroke="#4A90D9" strokeWidth="2" strokeLinecap="round" />
      <path d="M22.2 16.3c1.8-1 4-1.2 6.3-.8M25.5 24.5l1.6 1.7 3.4-3.8" stroke="#FF7A59" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
