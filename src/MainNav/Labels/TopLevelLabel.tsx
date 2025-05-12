'use client';

import { useRowLabel } from '@payloadcms/ui';

export const TopLevelLabel = () => {
  const { data } = useRowLabel<{ label?: string }>();

  const customLabel = data.label
    ? data.label + ' - Top level item'
    : 'Top level item';

  return <div>{customLabel}</div>;
};

export default TopLevelLabel;
