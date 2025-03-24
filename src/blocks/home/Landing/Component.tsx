'use client';

import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { LandingBlock as LandingBlockProps } from '@/payload-types';

export const LandingBlock: React.FC<LandingBlockProps> = (props) => {
  const { leftTitle, rightTitle, subtitle, buttons = [] } = props;

  return (
    <div className="flex justify-center items-center px-5 w-full relative pb-20 sm:pt-30 sm:pb-32 sm:min-h-[80vh]">
      <div className="flex flex-col gap-12 w-full sm:max-w-[1000px]">
        <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-12">
          <h1 className="w-full sm:text-[8vw] lg:text-[5rem]">{leftTitle}</h1>
          <h1 className="text-right srf-h1 sm:mt-26 sm:text-[8vw] lg:text-[5.125rem]">
            {rightTitle}
          </h1>
        </div>
        <div className="flex flex-col gap-7 items-end sm:gap-8 sm:w-full">
          <p className="text-lg text-right leading-[1.7] sm:w-1/2">
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
      <motion.div
        animate={{ y: [0, 10, 2, 10, 0] }}
        className="hidden sm:inline absolute bottom-[-70px] left-1/2 transform -translate-x-1/2"
        initial={{ y: 0 }}
        transition={{
          duration: 1.75,
          repeat: Infinity,
          repeatDelay: 4,
          repeatType: 'loop',
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <svg
          fill="none"
          height="69"
          viewBox="0 0 52 69"
          width="52"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M43 43.1793L40.0037 40.1453L28.125 52.152V8.60693H23.875V52.152L12.0175 40.1238L9 43.1793L26 60.3931L43 43.1793Z"
            fill="black"
          />
        </svg>
      </motion.div>
    </div>
  );
};
