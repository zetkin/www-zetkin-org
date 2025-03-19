// GradientBlock.tsx

// 'use client'; can be kept for client-side rendering
'use client';

import React from 'react';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';

import { GradientBlock as GradientBlockProps } from '@/payload-types';
import { ImageMedia } from '@/components/Media/ImageMedia';
import RightAligned1 from './Layouts/RightAligned1';
import LeftAligned1 from './Layouts/LeftAligned1';
import LeftAligned2 from './Layouts/LeftAligned2';
import SingleImageLeftOverlap from './Layouts/SingleImageLeftOverlap';
import SingleImageLeftBottomOverlap from './Layouts/SingleImageLeftBottomOverlap';

export const GradientBlock: React.FC<GradientBlockProps> = ({
  layout,
  title,
  subtitle,
  buttons,
  images,
  backgroundImageMobile,
  backgroundImageDesktop,
}) => {
  const html = convertLexicalToHTML({ data: title });

  const modifiedHtml = html
    .replace(/<p>/g, '<h2 class="sm:text-[2.188rem]">')
    .replace(/<\/p>/g, '<\/h2>')
    .replace(/<em>/g, '<span class="srf-h2 sm:text-[2.313rem]">')
    .replace(/<\/em>/g, '<\/span>');

  function selectedLayout() {
    switch (layout) {
      case 'rightAligned1':
        return (
          <RightAligned1
            buttons={buttons}
            html={modifiedHtml}
            images={images}
            subtitle={subtitle}
          />
        );
      case 'leftAligned1':
        return (
          <LeftAligned1
            buttons={buttons}
            html={modifiedHtml}
            images={images}
            subtitle={subtitle}
          />
        );
      case 'leftAligned2':
        return (
          <LeftAligned2
            buttons={buttons}
            html={modifiedHtml}
            images={images}
            subtitle={subtitle}
          />
        );
      case 'singleImageLeftOverlap':
        return (
          <SingleImageLeftOverlap
            buttons={buttons}
            html={modifiedHtml}
            images={images}
            subtitle={subtitle}
          />
        );
      case 'singleImageLeftBottomOverlap':
        return (
          <SingleImageLeftBottomOverlap
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
      <ImageMedia
        className="-z-10 md:hidden"
        fill
        imgClassName="object-cover"
        resource={backgroundImageMobile}
      />
      <ImageMedia
        className="-z-10 hidden md:inline"
        fill
        imgClassName="object-cover"
        resource={backgroundImageDesktop}
      />
    </div>
  );
};
