'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { MobileHeader } from './Mobile';
import { DesktopHeader } from './Desktop';
import type { MainNav } from '@/payload-types';
import { useHeaderTheme } from '@/providers/HeaderTheme';

export function HeaderClient({ navData }: { navData: MainNav }) {
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();

  const _twPreDeclare = [
    'text-z-purple',
    'text-z-green',
    'text-z-red',
    'stroke-z-purple',
    'stroke-z-green',
    'stroke-z-red',
    'shadow-z-purple',
    'shadow-z-green',
    'shadow-z-red',
  ];

  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(null);
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme);
    }
  }, [headerTheme]);

  return (
    <>
      <div className="hidden sm:inline">
        <DesktopHeader data={navData} pathname={pathname} theme={theme} />
      </div>
      <div className="sm:hidden">
        <MobileHeader data={navData} pathname={pathname} theme={theme} />
      </div>
    </>
  );
}
