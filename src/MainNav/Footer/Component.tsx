import React from 'react';

import { getCachedGlobal } from '@/utilities/getGlobals';
import type { MainNav } from '@/payload-types';
import { FooterClient } from './Component.client';

export async function Footer() {
  const navData: MainNav = await getCachedGlobal('mainNav', 1)();

  return <FooterClient navData={navData} />;
}
