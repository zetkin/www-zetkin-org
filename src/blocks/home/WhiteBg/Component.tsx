// GradientBlock.tsx

// 'use client'; can be kept for client-side rendering
'use client';

import React from 'react';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';

import { WhiteBg as WhiteBgProps } from '@/payload-types';
import UICenter from './Layouts/UICenter';
import colorToTailwind from '@/utilities/colorToTailwind';
import ImagesCenter from './Layouts/ImagesCenter';
import UIRight from './Layouts/UIRight';
import ImagesLeft from './Layouts/ImagesLeft';
import ImagesRight from './Layouts/ImagesRight';
import Illustration from './Layouts/Illustration';

export const WhiteBg: React.FC<WhiteBgProps> = ({
  layout,
  title,
  subtitle,
  buttons,
  images,
  accentColor,
}) => {
  const html = convertLexicalToHTML({ data: title });

  const modifiedHtml = html
    .replace(
      /<p>/g,
      '<h2 class="group-[.smaller-text]:text-[1.375rem] sm:group-[.larger-text]:!text-[3.25rem] sm:!text-[2.188rem] leading-[1.7]">',
    )
    .replace(/<\/p>/g, '<\/h2>')
    .replace(
      /<em>/g,
      `<span class="srf-h2 group-[.smaller-text]:text-[1.5rem] leading-[1.7] sm:group-[.larger-text]:!text-[3.375rem] sm:!text-[2.313rem] text-${colorToTailwind(accentColor || 'purple')}">`,
    )
    .replace(/<\/em>/g, '<\/span>');

  function selectedLayout() {
    switch (layout) {
      case 'uiCenter':
        return (
          <Illustration
            buttons={buttons}
            html={modifiedHtml}
            images={images}
            subtitle={subtitle}
          />
        );
      case 'uiCenter':
        return (
          <ImagesRight
            buttons={buttons}
            html={modifiedHtml}
            images={images}
            subtitle={subtitle}
          />
        );
      case 'uiCenter':
        return (
          <ImagesLeft
            buttons={buttons}
            html={modifiedHtml}
            images={images}
            subtitle={subtitle}
          />
        );
      case 'uiCenter':
        return (
          <UIRight
            buttons={buttons}
            html={modifiedHtml}
            images={images}
            subtitle={subtitle}
          />
        );
      case 'uiCenter':
        return (
          <ImagesCenter
            buttons={buttons}
            html={modifiedHtml}
            images={images}
            subtitle={subtitle}
          />
        );
      case 'uiCenter':
        return (
          <UICenter
            buttons={buttons}
            html={modifiedHtml}
            images={images}
            subtitle={subtitle}
          />
        );
    }
  }

  return (
    <div className="flex py-20 px-5 overflow-x-clip overflow-y-visible relative w-full justify-center">
      {selectedLayout()}
    </div>
  );
};
