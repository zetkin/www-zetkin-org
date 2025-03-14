import React from 'react';

import { getCachedGlobal } from '@/utilities/getGlobals';
import type { MainNav } from '@/payload-types';
import { HeaderClient } from './Component.client';

export async function Header() {
  const navData: MainNav = await getCachedGlobal('mainNav', 1)();

  return (
    <HeaderClient navData={navData} />
  );
}
