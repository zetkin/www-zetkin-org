import { useAtomValue } from 'jotai';

import { IconArrowRight } from '@/icons/UIIcons';
import { accentColorAtom } from '@/state/accentColorAtom';

export default function ArrowRight() {
  const accentColor = useAtomValue(accentColorAtom);

  return (
    <IconArrowRight
      height="24px"
      iconClasses={`stroke-z-${accentColor}`}
      width="24px"
    />
  );
}
