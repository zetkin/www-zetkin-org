'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { MobileHeader } from './Mobile';
import { DesktopHeader } from './Desktop';
import type { MainNav } from '@/payload-types';

export function HeaderClient({ navData }: { navData: MainNav }) {
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
