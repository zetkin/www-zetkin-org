'use client';

import React, { useEffect, useState } from 'react';
import { useScroll, motion, useTransform } from 'motion/react';
import useMeasure from 'react-use-measure';
import { useAtomValue } from 'jotai';

import RichText from '@/components/RichText';
import type { TextWithQuoteBlock as TextWithQuoteBlockProps } from '@/payload-types';
import { accentColorAtom } from '@/state/accentColorAtom';

export const TextWithQuoteBlock: React.FC<TextWithQuoteBlockProps> = (
  props,
) => {
  const { richText, quote } = props;

  function removeSurroundingQuotes(text: string) {
    return text.replace(/^(["'“”‘’])|(["'“”‘’])$/g, '');
  }

  const { scrollY } = useScroll();
  const [ref, { height }] = useMeasure();

  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 680);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const yTransform = useTransform(scrollY, (value) =>
    isLargeScreen ? value * -0.1 + height * 0.5 : 0,
  );

  const accentColor = useAtomValue(accentColorAtom);

  return (
    <div className="flex flex-col mb-5 sm:flex-row sm:items-center w-full sm:gap-10 overflow-visible">
      <div className="flex w-full md:min-w-[400px]">
        {richText && (
          <RichText className="w-full" data={richText} enableGutter={false} />
        )}
      </div>
      <motion.div
        ref={ref}
        className={`flex srf-h3 sm:text-[1.5rem] leading-[1.7] w-full sm:w-[70vw] md:min-w-[300px]`}
        style={{ y: yTransform }}
      >
        <p className={`text-z-${accentColor}!`}>&ldquo;</p>
        <p className={`text-z-${accentColor}!`}>
          {removeSurroundingQuotes(quote)}
          <span>&rdquo;</span>
        </p>
      </motion.div>
    </div>
  );
};
