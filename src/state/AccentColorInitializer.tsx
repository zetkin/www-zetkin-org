'use client';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { accentColorAtom } from '@/state/accentColorAtom';

export const AccentColorInitializer = ({ color }: { color: string }) => {
  const setAccentColor = useSetAtom(accentColorAtom);

  useEffect(() => {
    setAccentColor(color);
  }, [color, setAccentColor]);

  return null;
};
