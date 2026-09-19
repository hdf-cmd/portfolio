// 双叶儿童口腔 · 1.5px 描边圆头线性图标集（禁 emoji、禁卡通笑脸牙）
type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function BilobaLogo({ className }: IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <g {...stroke}>
        {/* 两片银杏叶 */}
        <path d="M14 8c-4 3-6 7-5 11 3 0 6-2 8-5" />
        <path d="M26 8c4 3 6 7 5 11-3 0-6-2-8-5" />
        {/* 一颗真实的牙形（冠根分明，不是笑脸） */}
        <path d="M15 20c-2 0-3.5 1.6-3.5 4 0 3.4 1.2 5.6 2 8.4.4 1.4 1.8 1.6 2.3.2l1.1-3.4c.3-1 1.9-1 2.2 0l1.1 3.4c.5 1.4 1.9 1.2 2.3-.2.8-2.8 2-5 2-8.4 0-2.4-1.5-4-3.5-4-1.4 0-2.2.8-3.4.8s-2-.8-3.4-.8z" />
      </g>
    </svg>
  );
}

export function IconChair({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g {...stroke}>
        <path d="M4 14h9l3 5" />
        <path d="M13 14V8a3 3 0 0 1 3-3h1" />
        <path d="M4 14l-1 5" />
        <path d="M8 19h9" />
        <circle cx="19" cy="6" r="2.4" />
      </g>
    </svg>
  );
}

export function IconPinwheel({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g {...stroke}>
        <path d="M12 12 12 4c3 0 5 1.6 5 4s-2.6 4-5 4z" />
        <path d="m12 12 8 0c0 3-1.6 5-4 5s-4-2.6-4-5z" transform="rotate(0)" />
        <path d="M12 12 4 12c0-3 1.6-5 4-5s4 2.6 4 5z" />
        <path d="m12 12 0 8c-3 0-5-1.6-5-4s2.6-4 5-4z" />
        <circle cx="12" cy="12" r="1.1" />
      </g>
    </svg>
  );
}

export function IconCup({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g {...stroke}>
        <path d="M7 8h10l-1 11a1.5 1.5 0 0 1-1.5 1.4h-5A1.5 1.5 0 0 1 8 19z" />
        <path d="M7 8c0-1.7 2.2-3 5-3s5 1.3 5 3" />
        <path d="M9.5 12.5h5" />
      </g>
    </svg>
  );
}

export function IconHourglass({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g {...stroke}>
        <path d="M7 3h10M7 21h10" />
        <path d="M8 3c0 5 4 6 4 9s-4 4-4 9" />
        <path d="M16 3c0 5-4 6-4 9s4 4 4 9" />
      </g>
    </svg>
  );
}

export function IconTooth({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        {...stroke}
        d="M8 4C5.8 4 4 5.9 4 8.4c0 3.6 1.4 5.9 2.3 8.9.5 1.6 2.1 1.8 2.7.2l1.2-3.6c.4-1.1 2-1.1 2.4 0l1.2 3.6c.6 1.6 2.2 1.4 2.7-.2.9-3 2.3-5.3 2.3-8.9C21 5.9 19.2 4 17 4c-1.6 0-2.5 1-4 1s-2.4-1-4-1z"
      />
    </svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g {...stroke}>
        <path d="M12 3 5 6v6c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6z" />
        <path d="m9 12 2.2 2.2L15.5 10" />
      </g>
    </svg>
  );
}

export function IconMoon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path {...stroke} d="M19 14.5A8 8 0 0 1 9.5 5 7.5 7.5 0 1 0 19 14.5z" />
    </svg>
  );
}
