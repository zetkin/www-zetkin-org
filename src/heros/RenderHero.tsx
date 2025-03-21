import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';

import colorToTailwind from '@/utilities/colorToTailwind';
import TwoImgLeft from './Layouts/TwoImgLeft';
import { Page } from '@/payload-types';

const heros = {
  twoImgLeft: TwoImgLeft,
  twoImgCenter: TwoImgLeft,
  oneImgLeft: TwoImgLeft,
  oneImgCenter: TwoImgLeft,
  featureLeft: TwoImgLeft,
  featureCenter: TwoImgLeft,
};

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { layout, title, accentColor, readTime, images } = props || {};

  if (!layout || layout === 'none') {
    return null;
  }

  const HeroToRender = heros[layout];

  if (!HeroToRender) {
    return null;
  }

  const html = convertLexicalToHTML({ data: title });

  const modifiedHtml = html
    .replace(/<p>/g, '<h2 class="sm:text-[2.188rem]">')
    .replace(/<\/p>/g, '<\/h2>')
    .replace(
      /<em>/g,
      `<span class="srf-h2 sm:text-[2.313rem] text-${colorToTailwind(accentColor || 'purple')}">`,
    )
    .replace(/<\/em>/g, '<\/span>');

  return (
    <div className="flex py-20 px-5 overflow-x-clip overflow-y-visible relative w-full justify-center">
      {
        <HeroToRender
          html={modifiedHtml}
          images={images}
          readTime={readTime || undefined}
        />
      }
    </div>
  );
};
