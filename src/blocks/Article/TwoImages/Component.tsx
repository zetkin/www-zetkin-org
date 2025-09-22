'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import type { TwoImageBlock as ImageBlockProps, Media } from '@/payload-types';
import { ImageMedia } from '@/components/Media/ImageMedia';

export const TwoImageBlock: React.FC<ImageBlockProps> = ({ images }) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const sanitizedImages = images
    ?.filter((img) => img.image !== undefined && img.image !== null)
    .map((img) => ({
      ...img,
      description: img.description ?? undefined,
      image: img.image as string | Media,
    }));

  return (
    <div>
      <div className="mb-20">
        <div className="h-[92vw] md:h-[70vw] md:max-h-[560px] md:w-full relative mt-16 md:mt-20">
          <div
            className="object-cover absolute h-[46vw] w-[76vw] -left-1/14 top-0 md:left-auto md:right-[min(30vw,251px)] md:top-0 md:w-[55vw] md:max-w-[375px] md:h-[55vw] md:max-h-[375px]"
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
                  resource={images[0].image}
                />
              )}
              {images[0]?.description && (
                <p className="hidden md:inline absolute top-full w-[36vw]! max-w-[340px]! mt-4! text-sm">
                  {images[0]?.description}
                </p>
              )}
            </div>
          </div>
          <div
            className="object-cover absolute h-[52vw] w-[83vw] top-7/16 -right-1/12 md:top-[min(40%,158px)] md:right-auto md:left-[min(100vw,277px)] md:w-[55vw] md:max-w-[516px] md:h-[40vw] md:max-h-[344px]"
            onClick={() =>
              images[1]?.image && typeof images[1].image !== 'string'
                ? setLightboxImage(images[1].image.url ?? null)
                : null
            }
          >
            <div className="flex flex-col">
              {images[1]?.image && (
                <ImageMedia
                  fill
                  imgClassName="object-cover cursor-pointer"
                  resource={images[1].image}
                />
              )}
              {images[1]?.description && (
                <p className="hidden md:inline absolute top-full mt-4! text-sm">
                  {images[1]?.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <ol className="text-sm flex flex-col gap-2.5">
          {images[0]?.description && (
            <li className="md:hidden m-0!">
              {sanitizedImages[0]?.description}
            </li>
          )}
          {images[1]?.description && (
            <li className="md:hidden m-0!">
              {sanitizedImages[1]?.description}
            </li>
          )}
        </ol>
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
