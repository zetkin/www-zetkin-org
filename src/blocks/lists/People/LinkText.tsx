'use client';

import { ReactNode } from 'react';
import { useAtomValue } from 'jotai';

import { accentColorAtom } from '@/state/accentColorAtom';

export default function LinkText({ children }: { children: ReactNode }) {
  const accentColor = useAtomValue(accentColorAtom);

  return (
    <p className={`underline font-light text-z-${accentColor}`}>{children}</p>
  );
}
