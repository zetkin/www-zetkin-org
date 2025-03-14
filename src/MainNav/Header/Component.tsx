import React from 'react';

import { MobileHeader } from './Mobile';
import { DesktopHeader } from './Desktop';
import { getCachedGlobal } from '@/utilities/getGlobals';
import type { MainNav } from '@/payload-types';

export async function Header() {
  const navData: MainNav = await getCachedGlobal('mainNav', 1)();

  return (
    <>
      <div className='hidden sm:inline'>
        <DesktopHeader data={navData} />
      </div>
      <div className='sm:hidden'>
        <MobileHeader data={navData} />
      </div>
    </>
  );
}
