'use client';

import { useRowLabel } from '@payloadcms/ui';

export const BottomLevelLabel = () => {
  const { data } = useRowLabel<{ label?: string }>();

  const customLabel = data.label
    ? data.label + ' - Bottom level item'
    : 'Bottom level item';

  return <div>{customLabel}</div>;
};

export default BottomLevelLabel