'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import type { OneImageBlock as ImageBlockProps, Media } from '@/payload-types';
import { ImageMedia } from '@/components/Media/ImageMedia';

export const OneImageBlock: React.FC<ImageBlockProps> = ({
  images,
  mobileOverflow,
  desktopOverflow,
}) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  interface SanitizedImage {
    description?: string;
    image: string | Media;
  }

  const sanitizedImages: SanitizedImage[] = images
    ?.filter(
      (img): img is { image: string | Media; description?: string } =>
        img.image !== undefined && img.image !== null,
    )
    .map((img) => ({
      ...img,
      description: img.description ?? undefined,
      image: img.image as string | Media,
    }));

  return (
    <div>
      <div className="h-[92vw] md:h-[70vw] md:max-h-[651px] md:w-full relative -ml-5 -mr-5 md:ml-0 md:mr-0 lg:mb-15">
        <div
          className={`object-cover absolute h-[75vw] w-[90vw] top-0 md:-left-[min(0vw,50px)]  md:top-0
                                  ${mobileOverflow === 'right' && 'right-0'}
                                  ${desktopOverflow ? 'lg:-left-[min(12vw,250px)] md:w-[85vw] md:max-w-[1400px] md:h-[55vw] md:max-h-[650px]' : 'lg:-left-[min(6vw,150px)] md:w-[85vw] md:max-w-[975px] md:h-[55vw] md:max-h-[569px]'}
                              `}
          onClick={() =>
            sanitizedImages[0]?.image &&
            typeof sanitizedImages[0].image !== 'string'
              ? setLightboxImage(sanitizedImages[0].image.url ?? null)
              : null
          }
        >
          <div className="flex flex-col">
            {images[0]?.image && (
              <ImageMedia
                fill
                imgClassName="object-cover cursor-pointer"
                resource={sanitizedImages[0]?.image ?? null}
              />
            )}
            {sanitizedImages[0]?.description && (
              <p
                className={`absolute top-full w-full mt-4! text-sm
                                      ${mobileOverflow === 'left' ? 'pl-5 md:pl-0' : 'pr-5 md:pr-0'}
                                      `}
              >
                {images[0]?.description}
              </p>
            )}
          </div>
        </div>
      </div>
      {lightboxImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <motion.img
            alt="Lightbox"
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-full max-h-full"
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9 }}
            src={lightboxImage}
          />
        </div>
      )}
    </div>
  );
};
