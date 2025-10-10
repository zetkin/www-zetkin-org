'use client';

import React, { useEffect, useState } from 'react';
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html';
import parse from 'html-react-parser';
import Image from 'next/image';

import { CMSLink as Link } from '@/components/Link';
import { Button } from '@/components/ui/button';
import { Popup as PopupType, Media } from '@/payload-types';
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
} from '@/blocks/home/Gradient/SvgBackgrounds';

interface PopupClientProps {
  popupData: PopupType;
  currentPageId: string;
}

export function PopupClient({ popupData, currentPageId }: PopupClientProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if popup is enabled
    if (!popupData.enabled) {
      return;
    }

    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem('hasSeenPopup');
    if (hasSeenPopup === 'true') {
      return;
    }

    // Check if popup should show on this page
    if (popupData.showOnPages && popupData.showOnPages.length > 0) {
      const shouldShow = popupData.showOnPages.some((page) => {
        if (typeof page === 'string') {
          return page === currentPageId;
        }
        return page.id === currentPageId;
      });

      if (!shouldShow) {
        return;
      }
    }

    // Show popup
    setIsVisible(true);
  }, [popupData, currentPageId]);

  // Disable scrolling when popup is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenPopup', 'true');
  };

  if (!isVisible) {
    return null;
  }

  const titleHtml = popupData.title
    ? convertLexicalToHTML({ data: popupData.title })
    : '';
  const contentHtml = popupData.content
    ? convertLexicalToHTML({ data: popupData.content })
    : '';

  const isGradient = popupData.backgroundType === 'gradient';
  const textColor = isGradient ? 'text-white' : 'text-black';

  // Check if image exists
  const hasImage = popupData.image && typeof popupData.image !== 'string';
  const imageUrl = hasImage ? (popupData.image as Media).url : null;

  // For white background, accent color only on italic text
  const accentColorClass =
    !isGradient && popupData.accentColor
      ? `text-z-${popupData.accentColor}`
      : '';

  // Modify title HTML to handle italic styling for different fonts
  // Mobile: ~30px sans, ~32px serif. Desktop: 35px sans, 37px serif
  const modifiedTitleHtml = titleHtml
    .replace(
      /<p>/g,
      `<h2 class="text-[1.875rem] sm:text-[2.188rem] font-bold mb-6 ${isGradient ? 'text-white' : 'text-black'}">`,
    )
    .replace(/<\/p>/g, '</h2>')
    .replace(
      /<em>/g,
      `<span class="srf-h2 text-[2rem] sm:text-[2.313rem] ${accentColorClass}">`,
    )
    .replace(/<\/em>/g, '</span>');

  function selectedDesktopPattern() {
    if (!popupData.gradientPattern) {
      return null;
    }
    switch (popupData.gradientPattern) {
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
    if (!popupData.gradientPattern) {
      return null;
    }
    switch (popupData.gradientPattern) {
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
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        {/* Popup Container */}
        <div
          className={`relative ${hasImage ? 'max-w-4xl' : 'max-w-2xl'} w-full rounded-2xl overflow-hidden shadow-2xl ${isGradient ? 'min-h-[400px]' : 'bg-white'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Gradient Background */}
          {isGradient && (
            <div
              className="absolute inset-0 w-full h-full overflow-clip"
              style={{
                backgroundColor: popupData.backgroundColor || '#7801DD',
                stroke: popupData.frontColor || '#C91E40',
                fill: popupData.frontColor || '#C91E40',
              }}
            >
              <div className="absolute hidden sm:inline">
                {selectedDesktopPattern()}
              </div>
              <div className="absolute sm:hidden">
                {selectedMobilePattern()}
              </div>
            </div>
          )}

          {/* Close Button */}
          <button
            aria-label="Close popup"
            className={`absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
              isGradient || hasImage
                ? 'bg-white/90 hover:bg-white text-black shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200 text-black'
            }`}
            onClick={handleClose}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>

          {/* Main Content Area */}
          <div
            className={`relative z-10 flex ${hasImage ? 'flex-col sm:flex-row' : 'flex-col'}`}
          >
            {/* Image Section */}
            {hasImage && imageUrl && (
              <div className="sm:w-2/5 flex-shrink-0 relative min-h-[400px]">
                <Image
                  alt="Popup"
                  className="object-cover"
                  fill
                  src={imageUrl}
                />
              </div>
            )}

            {/* Text Content */}
            <div
              className={`p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[400px] ${hasImage ? 'sm:w-3/5' : 'w-full'}`}
            >
              {/* Title */}
              <div>{parse(modifiedTitleHtml)}</div>

              {/* Rich Text Content */}
              <div className={`${textColor} mb-8 prose prose-lg max-w-none`}>
                {parse(contentHtml)}
              </div>

              {/* Buttons */}
              {popupData.buttons && popupData.buttons.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center">
                  {popupData.buttons.map((button, index) => (
                    <Link key={button.id || index} url={button.link.url ?? '/'}>
                      <Button
                        size="lg"
                        variant={
                          button.variant === 'outline'
                            ? isGradient
                              ? 'outline-white'
                              : 'outline'
                            : isGradient
                              ? 'secondary'
                              : 'primary'
                        }
                      >
                        {button.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
