import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical';

import colorToTailwind from '@/utilities/colorToTailwind';
import { Page } from '@/payload-types';
import TwoImgLeft from './Layouts/TwoImgLeft';
import TwoImgCenter from './Layouts/TwoImgCenter';
import OneImgLeft from './Layouts/OneImgLeft';
import OneImgCenter from './Layouts/OneImgCenter';
import FeatureLeft from './Layouts/FeatureLeft';
import FeatureCenter from './Layouts/FeatureCenter';

const heros = {
  twoImgLeft: TwoImgLeft,
  twoImgCenter: TwoImgCenter,
  oneImgLeft: OneImgLeft,
  oneImgCenter: OneImgCenter,
  featureLeft: FeatureLeft,
  featureCenter: FeatureCenter,
};

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { layout, title, accentColor, readTime, images, subtitle } =
    props || {};

  if (!layout || layout === 'none') {
    return null;
  }

  const HeroToRender = heros[layout];

  if (!HeroToRender) {
    return null;
  }

  const html = title
    ? convertLexicalToHTML({
        data: title as SerializedEditorState<SerializedLexicalNode>,
      })
    : '';

  const modifiedHtml = html
    .replace(/<p>/g, '<h2 class="">')
    .replace(/<\/p>/g, '<\/h2>')
    .replace(
      /<em>/g,
      `<span class="srf-h2 text-${colorToTailwind(accentColor || 'purple')}">`,
    )
    .replace(/<\/em>/g, '<\/span>');

  return (
    <div className="flex px-5 sm:pt-30 overflow-x-clip overflow-y-visible relative w-full justify-center">
      {
        <HeroToRender
          html={modifiedHtml}
          images={images || undefined}
          readTime={readTime || undefined}
          subtitle={subtitle || undefined}
        />
      }
    </div>
  );
};
