import React from 'react';
import { getPayload } from 'payload';

import configPromise from '@payload-config';
import { PopupClient } from './Component.client';

interface PopupProps {
  currentPageId?: string;
}

export async function Popup({ currentPageId = '' }: PopupProps) {
  const payload = await getPayload({ config: configPromise });

  const popupData = await payload.findGlobal({
    slug: 'popup',
  });

  if (!popupData || !popupData.enabled) {
    return null;
  }

  return <PopupClient currentPageId={currentPageId} popupData={popupData} />;
}
