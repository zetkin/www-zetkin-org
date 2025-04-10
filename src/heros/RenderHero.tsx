import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical';

import { Page } from '@/payload-types';
import { HeroClientWrapper } from './HeroClientWrapper';

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const {
    layout,
    title,
    readTime,
    images,
    eyebrowHeading,
    subtitle,
  } = props || {};

  if (!layout || layout === 'none' || !title) {
    return null;
  }

  const html = convertLexicalToHTML({
    data: title as SerializedEditorState<SerializedLexicalNode>,
  });

  return (
    <div className="flex px-5 sm:pt-30 overflow-x-clip overflow-y-visible relative w-full justify-center">
      <HeroClientWrapper
        eyebrowHeading={eyebrowHeading}
        html={html}
        images={images}
        layout={layout}
        readTime={readTime}
        subtitle={subtitle}
      />
    </div>
  );
};
