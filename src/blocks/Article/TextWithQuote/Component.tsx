'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useScroll, motion, useTransform } from 'motion/react';
import useMeasure from 'react-use-measure';
import { useAtomValue } from 'jotai';

import type { TextWithQuoteBlock as TextWithQuoteBlockProps } from '@/payload-types';
import { accentColorAtom } from '@/state/accentColorAtom';

export const TextWithQuoteBlock: React.FC<TextWithQuoteBlockProps> = (
  props,
) => {
  const { quote } = props;

  function removeSurroundingQuotes(text: string) {
    return text.replace(/^(["'“”‘’])|(["'“”‘’])$/g, '');
  }

  const quoteRef = useRef<HTMLDivElement | null>(null);
  const [measureRef, { height }] = useMeasure();

  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 680);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ['start end', 'end start'],
  });

  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    isLargeScreen ? [20, -height * 0.25] : [0, 0],
  );

  const accentColor = useAtomValue(accentColorAtom);

  return (
    <motion.div
      ref={(node) => {
        quoteRef.current = node;
        measureRef(node);
      }}
      className={`flex float-right srf-h3 leading-[1.7] w-full sm:text-[1.5rem] sm:max-w-[340px] sm:mr-[-110px] sm:pl-10`}
      style={{ y: yTransform }}
    >
      <p className={`text-z-${accentColor}!`}>&ldquo;</p>
      <p className={`text-z-${accentColor}!`}>
        {removeSurroundingQuotes(quote)}
        <span>&rdquo;</span>
      </p>
    </motion.div>
  );
};
