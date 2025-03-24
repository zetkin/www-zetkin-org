// GradientBlock.tsx

// 'use client'; can be kept for client-side rendering
'use client';

import React from 'react';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';

import { GradientBlock as GradientBlockProps } from '@/payload-types';
import RightAligned1 from './Layouts/RightAligned1';
import LeftAligned1 from './Layouts/LeftAligned1';
import LeftAligned2 from './Layouts/LeftAligned2';
import SingleImageLeftOverlap from './Layouts/SingleImageLeftOverlap';
import SingleImageLeftBottomOverlap from './Layouts/SingleImageLeftBottomOverlap';
import {
  DesktopPattern1,
  DesktopPattern2,
  DesktopPattern3,
  DesktopPattern4,
  DesktopPattern5,
  DesktopPattern6,
  MobilePattern1,
  MobilePattern2,
  MobilePattern3,
  MobilePattern4,
  MobilePattern5,
  MobilePattern6,
} from './SvgBackgrounds';

export const GradientBlock: React.FC<GradientBlockProps> = ({
  layout,
  title,
  subtitle,
  buttons,
  images,
  desktopGradientPattern,
  mobileGradientPattern,
  frontColor,
  backgroundColor,
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

  function selectedDesktopPattern() {
    switch (desktopGradientPattern) {
      case '1':
        return <DesktopPattern1 />;
      case '2':
        return <DesktopPattern2 />;
      case '3':
        return <DesktopPattern3 />;
      case '4':
        return <DesktopPattern4 />;
      case '5':
        return <DesktopPattern5 />;
      case '6':
        return <DesktopPattern6 />;
    }
  }

  function selectedMobilePattern() {
    switch (mobileGradientPattern) {
      case '1':
        return <MobilePattern1 />;
      case '2':
        return <MobilePattern2 />;
      case '3':
        return <MobilePattern3 />;
      case '4':
        return <MobilePattern4 />;
      case '5':
        return <MobilePattern5 />;
      case '6':
        return <MobilePattern6 />;
    }
  }

  return (
    <div className="flex py-20 px-5 overflow-x-clip overflow-y-visible relative w-full justify-center md:h-[600px]">
      {selectedLayout()}
      <div
        className="w-full h-full absolute top-0 overflow-clip"
        style={{
          backgroundColor: backgroundColor || '#7801DD',
          stroke: frontColor || '#C91E40',
          fill: frontColor || '#C91E40',
        }}
      >
        <div className="absolute hidden sm:inline">
          {selectedDesktopPattern()}
        </div>
        <div className="absolute sm:hidden ">{selectedMobilePattern()}</div>
      </div>
    </div>
  );
};
