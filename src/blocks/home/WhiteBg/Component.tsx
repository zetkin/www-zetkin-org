import React from 'react';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';

import { WhiteBg as WhiteBgProps } from '@/payload-types';
import UICenter from './Layouts/UICenter';
import ImagesCenter from './Layouts/ImagesCenter';
import UILeft from './Layouts/UILeft';
import ImagesLeft from './Layouts/ImagesLeft';
import ImagesRight from './Layouts/ImagesRight';
import Illustration from './Layouts/Illustration';

const layouts = {
  imagesLeft: ImagesLeft,
  imagesCenter: ImagesCenter,
  imagesRight: ImagesRight,
  uiLeft: UILeft,
  uiCenter: UICenter,
  illustration: Illustration,
};

export const WhiteBgBlock: React.FC<WhiteBgProps> = ({
  layout,
  title,
  subtitle,
  buttons,
  images,
  accentColor,
}) => {
  if (!layout) {
    return null;
  }

  const LayoutToRender = layouts[layout];

  if (!LayoutToRender) {
    return null;
  }

  const html = convertLexicalToHTML({ data: title });

  const modifiedHtml = html
    .replace(
      /<p>/g,
      '<h2 class="group-[.smaller-text]:text-[1.375rem] sm:group-[.larger-text]:!text-[3.25rem] sm:!text-[2.188rem] leading-[1.7]">',
    )
    .replace(/<\/p>/g, '<\/h2>')
    .replace(
      /<em>/g,
      `<span class="srf-h2 group-[.smaller-text]:text-[1.5rem] leading-[1.7] sm:group-[.larger-text]:!text-[3.375rem] sm:!text-[2.313rem] text-${accentColor || 'purple'}">`,
    )
    .replace(/<\/em>/g, '<\/span>');

  return (
    <div className="flex py-20 px-5 overflow-x-clip overflow-y-visible relative w-full justify-center">
      <LayoutToRender
        buttons={buttons}
        html={modifiedHtml}
        images={images}
        subtitle={subtitle}
      />
    </div>
  );
};
