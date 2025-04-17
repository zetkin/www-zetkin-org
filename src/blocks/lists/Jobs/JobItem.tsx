'use client';

import { useAtomValue } from 'jotai';
import { usePathname } from 'next/navigation';

import { CMSLink as Link } from '@/components/Link';
import { IconArrowRight } from '@/icons/UIIcons';
import { accentColorAtom } from '@/state/accentColorAtom';

export default function JobItem({
  id,
  title,
  location,
}: {
  id: string;
  title: string;
  location: string;
}) {
  const accentColor = useAtomValue(accentColorAtom);

  const path = usePathname();

  return (
    <Link
      className="flex justify-between w-full items-center border-b last:border-b-0 py-4 cursor-pointer"
      url={path + '/job/' + id}
    >
      <div className="flex flex-col gap-1">
        <p className="leading-[170%]">{title}</p>
        <div className="text-[15px] text-[#646464]">{location}</div>
      </div>
      <IconArrowRight
        height="24px"
        iconClasses={`stroke-z-${accentColor}`}
        width="24px"
      />
    </Link>
  );
}
