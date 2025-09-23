'use client';

import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import { useAtomValue } from 'jotai';

import RichText from '@/components/RichText';
import { accentColorAtom } from '@/state/accentColorAtom';

export default function ArticleRichText({
  richText,
}: {
  richText: SerializedEditorState;
}) {
  const accentColor = useAtomValue(accentColorAtom);

  return (
    <RichText
      className={`w-full overflow-visible prose-h5:mt-16 md:prose-h5:mt-20 prose-p:text-black prose-h5:text-black prose-ol:text-black marker:text-black prose-a:text-z-${accentColor}`}
      data={richText}
      enableGutter={false}
    />
  );
}
