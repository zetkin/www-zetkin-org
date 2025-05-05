'use client';

import { useRowLabel } from '@payloadcms/ui';

export const MidLevelLabel = () => {
  const { data } = useRowLabel<{ label?: string }>();

  const customLabel = data.label
    ? data.label + ' - Mid level item'
    : 'Mid level item';

  return <div>{customLabel}</div>;
};
