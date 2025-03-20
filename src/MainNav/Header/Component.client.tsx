'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { MobileHeader } from './Mobile';
import { DesktopHeader } from './Desktop';
import type { MainNav } from '@/payload-types';

export function HeaderClient({ navData }: { navData: MainNav }) {
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

  return (
    <>
      <div className="hidden sm:inline">
        <DesktopHeader data={navData} pathname={pathname} />
      </div>
      <div className="sm:hidden">
        <MobileHeader data={navData} pathname={pathname} />
      </div>
    </>
  );
}
