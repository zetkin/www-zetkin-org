'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import type { ImageBlock as ImageBlockProps, Media } from '@/payload-types';
import TwoImg from './Layouts/TwoImg';
import OneImg from './Layouts/OneImg';

const layouts = {
  oneImg: OneImg,
  twoImg: TwoImg,
};

export const ImageBlock: React.FC<ImageBlockProps> = ({
  images,
  layout,
  mobileOverflow,
  desktopOverflow,
}) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!layout) {
    return null;
  }

  const ImageBlockToRender = layouts[layout];

  if (!ImageBlockToRender) {
    return null;
  }

  const sanitizedImages = images
    ?.filter((img) => img.image !== undefined && img.image !== null)
    .map((img) => ({
      ...img,
      description: img.description ?? undefined,
      image: img.image as string | Media,
    }));

  return (
    <div>
      <ImageBlockToRender
        desktopOverflow={desktopOverflow || false}
        images={sanitizedImages}
        mobileOverflow={mobileOverflow || 'right'}
        setLightBoxImage={setLightboxImage}
      />
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
