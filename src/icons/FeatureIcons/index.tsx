export const iconOptions = [
  {
    value: 'banana',
    label: 'Banana',
  },
  {
    value: 'bean',
    label: 'Bean',
  },
  {
    value: 'apple',
    label: 'Apple',
  },
];

export function IconBanana({
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
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13C7.5 11 12 11 14 15C14.8461 14.568 15.7897 14.3625 16.7389 14.4036C17.688 14.4447 18.6103 14.731 19.4159 15.2345C20.2216 15.738 20.883 16.4416 21.3359 17.2768C21.7887 18.1119 22.0175 19.0501 22 20"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M5.15 17.89C10.67 16.37 13.8 11 12.15 5.89C11.55 4 11.5 2 13 2C16.22 2 18 7.5 18 10C18 16.5 13.8 22 7.51 22C5.11 22 2 22 2 20C2 18.5 3.14 18.45 5.15 17.89Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function IconBean({
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
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.1657 6.59803C9.9547 7.47803 9.6407 8.36003 9.0007 9.00003C8.3607 9.64003 7.4797 9.95403 6.5987 10.165C5.16926 10.5074 3.91521 11.3625 3.07448 12.5682C2.23376 13.7739 1.86486 15.2462 2.03777 16.7059C2.21068 18.1655 2.91338 19.5109 4.01254 20.4868C5.1117 21.4627 6.53084 22.0012 8.0007 22C15.7327 22 22.0007 15.732 22.0007 8.00003C22.0018 6.53017 21.4634 5.11103 20.4875 4.01187C19.5116 2.91271 18.1662 2.21001 16.7065 2.0371C15.2469 1.86418 13.7745 2.23309 12.5688 3.07381C11.3632 3.91453 10.508 5.16859 10.1657 6.59803Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M5.3418 10.62C5.60544 11.2133 6.00952 11.7335 6.51916 12.1357C7.0288 12.5379 7.62867 12.81 8.26698 12.9285C8.90529 13.047 9.56285 13.0083 10.1829 12.8159C10.8029 12.6234 11.3668 12.2829 11.8258 11.8238C12.2848 11.3647 12.6252 10.8008 12.8176 10.1807C13.0099 9.56063 13.0484 8.90306 12.9298 8.26477C12.8112 7.62649 12.539 7.02667 12.1367 6.5171C11.7344 6.00754 11.2141 5.60356 10.6208 5.34003"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function IconApple({
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
      viewBox="0 0 24 24"
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 20.94C13.5 20.94 14.75 22 16 22C19 22 22 14 22 9.77995C21.9659 8.48468 21.4212 7.25538 20.4846 6.36C19.548 5.46462 18.2955 4.97575 17 4.99995C14.78 4.99995 13 6.43995 12 6.99995C11 6.43995 9.22 4.99995 7 4.99995C5.70375 4.97311 4.4497 5.4611 3.51253 6.35703C2.57536 7.25297 2.03147 8.48381 2 9.77995C2 14 5 22 8 22C9.25 22 10.5 20.94 12 20.94Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M10 2C11 2.5 12 4 12 7"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
