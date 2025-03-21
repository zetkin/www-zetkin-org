import React from 'react';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';

import { GradientBlock as GradientBlockProps } from '@/payload-types';
import { ImageMedia } from '@/components/Media/ImageMedia';
import RightAligned1 from './Layouts/RightAligned1';
import LeftAligned1 from './Layouts/LeftAligned1';
import LeftAligned2 from './Layouts/LeftAligned2';
import SingleImageLeftOverlap from './Layouts/SingleImageLeftOverlap';
import SingleImageLeftBottomOverlap from './Layouts/SingleImageLeftBottomOverlap';

const gradients = {
  rightAligned1: RightAligned1,
  leftAligned1: LeftAligned1,
  leftAligned2: LeftAligned2,
  singleImageLeftOverlap: SingleImageLeftOverlap,
  singleImageLeftBottomOverlap: SingleImageLeftBottomOverlap,
};

export const GradientBlock: React.FC<GradientBlockProps> = ({
  layout,
  title,
  subtitle,
  buttons,
  images,
  backgroundImageMobile,
  backgroundImageDesktop,
}) => {
  if (!layout) {
    return null;
  }

  const GradientToRender = gradients[layout];

  if (!GradientToRender) {
    return null;
  }

  const html = convertLexicalToHTML({ data: title });

  const modifiedHtml = html
    .replace(/<p>/g, '<h2 class="sm:text-[2.188rem]">')
    .replace(/<\/p>/g, '<\/h2>')
    .replace(/<em>/g, '<span class="srf-h2 sm:text-[2.313rem]">')
    .replace(/<\/em>/g, '<\/span>');

  return (
    <div className="flex py-20 px-5 overflow-x-clip overflow-y-visible relative w-full justify-center md:h-[600px]">
      <GradientToRender
        buttons={buttons}
        html={modifiedHtml}
        images={images}
        subtitle={subtitle}
      />
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
