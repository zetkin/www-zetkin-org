'use client';

import { useAtomValue } from 'jotai';

import RichText from '@/components/RichText';
import { accentColorAtom } from '@/state/accentColorAtom';
import { Job } from '@/payload-types';

export default function Content({ jobDoc }: { jobDoc: Job }) {
  const accentColor = useAtomValue(accentColorAtom);

  return (
    <RichText
      className={`mt-1 w-full overflow-visible text-lg leading-[170%] prose-p:text-black prose-ol:text-black marker:text-black prose-a:text-z-${accentColor}`}
      data={
        jobDoc.description || {
          root: {
            type: 'root',
            children: [],
            direction: null,
            format: '',
            indent: 0,
            version: 1,
          },
        }
      }
      enableGutter={false}
    />
  );
}
