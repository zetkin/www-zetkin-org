// GradientBlock.tsx

// 'use client'; can be kept for client-side rendering
'use client';

import React from 'react';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';

import { WhiteBg as WhiteBgProps } from '@/payload-types';
import UICenter from './Layouts/UICenter';

export const WhiteBg: React.FC<WhiteBgProps> = ({
  layout,
  title,
  subtitle,
  buttons,
  images,
}) => {
  const html = convertLexicalToHTML({ data: title });

  const modifiedHtml = html
    .replace(/<p>/g, '<h2 class="sm:text-[2.188rem]">')
    .replace(/<\/p>/g, '<\/h2>')
    .replace(/<em>/g, '<span class="srf-h2 sm:text-[2.313rem]">')
    .replace(/<\/em>/g, '<\/span>');

  function selectedLayout() {
    switch (layout) {
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
    <div className="flex py-20 px-5 overflow-x-clip overflow-y-visible relative w-full justify-center md:h-[600px]">
      {selectedLayout()}
    </div>
  );
};
