'use client';

import { useAtomValue } from 'jotai';

import { accentColorAtom } from '@/state/accentColorAtom';

export default function Background() {
  const accentColor = useAtomValue(accentColorAtom);

  let bgTailwind;

  if (accentColor === 'green' || accentColor === 'purple') {
    bgTailwind =
      'bg-gradient-to-r from-[rgba(120,1,221,0)] from-5.08% via-[rgba(120,1,221,0.03)] via-27.63% via-[rgba(120,1,221,0.06)] via-57.2% to-[rgba(120,1,221,0.05)] to-84.63%';
  } else if (accentColor === 'red') {
    bgTailwind =
      'bg-gradient-to-r from-[rgba(201,30,64,0)] from-5.08% via-[rgba(201,30,64,0.03)] via-27.63% via-[rgba(201,30,64,0.06)] via-57.2% to-[rgba(201,30,64,0.05)] to-84.63%';
  }

  return (
    <div
      className={`absolute w-full h-full rounded-[4px] top-0 left-0 z-10 ${bgTailwind}`}
    />
  );
}
