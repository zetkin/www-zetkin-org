import React from 'react';

import { HeaderClient } from './Component.client';
import { getCachedGlobal } from '@/utilities/getGlobals';
import type { MainNav } from '@/payload-types';

export async function Header() {
  const navData: MainNav = await getCachedGlobal('mainNav', 1)();

  return <HeaderClient data={navData} />;
}
