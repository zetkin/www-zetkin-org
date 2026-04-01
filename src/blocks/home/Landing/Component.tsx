'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { LandingBlock as LandingBlockProps } from '@/payload-types';
import Arrow from './Arrow';
import Aurora from '@/components/Aurora';
import Swirl from '@/components/Swirl';

export const LandingBlock: React.FC<LandingBlockProps> = (props) => {
  const {
    leftTitle,
    rightTitle,
    subtitle,
    buttons = [],
    animationStyle = 'aurora',
  } = props;

  const blockRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (animationStyle !== 'aurora') {
      return;
    }

    const el = blockRef.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animationStyle]);

  return (
    <div
      ref={blockRef}
      className="relative flex justify-center items-center px-5 w-full pb-20 sm:pt-30 sm:pb-32 sm:min-h-[90vh]"
    >
      {animationStyle === 'aurora' ? (
        <div className="absolute -top-65 sm:-top-40 left-0 right-0 -bottom-25 sm:bottom-0 z-0 overflow-hidden pointer-events-none">
          {isVisible && <Aurora />}
        </div>
      ) : (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 flex justify-center items-center w-screen overflow-clip">
          <Swirl />
        </div>
      )}
      <div className="flex flex-col gap-12 w-full sm:max-w-[1000px] relative z-10">
        <div className="w-full flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-12 pointer-events-none">
          <h1 className="w-1/2 sm:w-full sm:text-[8vw] lg:text-[5rem]">
            {leftTitle}
          </h1>
          <div
            className="flex w-full justify-start"
            style={{ direction: 'rtl' }}
          >
            <h1 className="w-1/2 sm:w-full text-right srf-h1 sm:mt-26 sm:text-[8vw] lg:text-[5.125rem]">
              {rightTitle}
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-7 items-end sm:gap-8 sm:w-full">
          <p className="text-lg text-right leading-[1.7] sm:w-1/2 pointer-events-none">
            {subtitle}
          </p>
          <div className="flex gap-4">
            {buttons &&
              buttons.map((button, index) => {
                return (
                  <Button key={index} variant={button.variant}>
                    {button.label}
                  </Button>
                );
              })}
          </div>
        </div>
      </div>
      <Arrow />
    </div>
  );
};
