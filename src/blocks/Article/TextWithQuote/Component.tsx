'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, motion, useTransform } from 'motion/react';
import useMeasure from 'react-use-measure';

import RichText from '@/components/RichText';
import type { TextWithQuoteBlock as TextWithQuoteBlockProps } from '@/payload-types';

export const TextWithQuoteBlock: React.FC<TextWithQuoteBlockProps> = (
  props,
) => {
  const { richText, quote, quoteColor } = props;

  function removeSurroundingQuotes(text: string) {
    return text.replace(/^(["'“”‘’])|(["'“”‘’])$/g, '');
  }

  const [measureRef, { height }] = useMeasure();
  const motionRef = useRef<HTMLElement | null>(null);

  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: motionRef });

  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    isLargeScreen ? [height * -0.4, 0] : [0, 0],
  );

  return (
    <div className="flex flex-col mb-5 sm:flex-row sm:items-center w-full sm:gap-10 overflow-visible">
      <div className="flex w-full md:min-w-[400px]">
        {richText && (
          <RichText className="w-full" data={richText} enableGutter={false} />
        )}
      </div>
      <motion.div
        ref={(el) => {
          measureRef(el);
          motionRef.current = el;
        }}
        className={`flex srf-h3 sm:text-[1.5rem] leading-[1.7] w-full sm:w-[70vw] md:min-w-[300px]`}
        style={{ y: yTransform }}
      >
        <p className={`text-z-${quoteColor}!`}>&ldquo;</p>
        <p className={`text-z-${quoteColor}!`}>
          {removeSurroundingQuotes(quote)}
          <span>&rdquo;</span>
        </p>
      </motion.div>
    </div>
  );
};
