export function IconArrowRight({
  width,
  height,
  color,
  iconClasses,
}: {
  width?: string;
  height?: string;
  color?: string;
  iconClasses?: string;
}) {
  return (
    <svg
      className={iconClasses}
      fill="none"
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 30 30"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.25 15H23.75"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M15 6.25L23.75 15L15 23.75"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}

export function IconArrowDown({
  width,
  height,
  color,
  iconClasses,
}: {
  width: string;
  height: string;
  color?: string;
  iconClasses?: string;
}) {
  return (
    <svg
      className={iconClasses}
      fill="none"
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M19 12L12 19L5 12"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
