'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  useScroll,
  useTransform,
  useSpring,
  motion,
  useInView,
  AnimatePresence,
} from 'motion/react';

import { FeatureListBlock as FeatureListProps } from '@/payload-types';
import { IconArrowDown } from '@/icons/UIIcons';
import { FeatureIcon } from '@/icons/FeatureIcons/RenderIcon';
import { ImageMedia } from '@/components/Media/ImageMedia';
import { Button } from '@/components/ui/button';

// Helper function for setting illustration margins
function illustrationMargin(value: number) {
  if (value > 0) {
    return {
      marginRight: `-${value}px`,
      marginLeft: 'auto',
      alignSelf: 'end',
    };
  } else if (value < 0) {
    return {
      marginLeft: `${value}px`,
      marginRight: 'auto',
      alignSelf: 'start',
    };
  }
}

const FeatureListBlockClient: React.FC<FeatureListProps> = ({
  accentColor,
  features,
  buttons,
}) => {
  const [currentSection, setCurrentSection] = useState(features[0]?.id || '');
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef(null);
  const featureSectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // useEffect to observe feature visibility for updating the current section
  useEffect(() => {
    const observeFeatureVisibility = () => {
      if (!featureSectionRefs.current) {
        return;
      }

      const mostVisibleFeature = featureSectionRefs.current.reduce<{
        element: HTMLDivElement | null;
        visibilityPercentage: number;
        id: string | null;
      } | null>((mostVisible, currentFeature) => {
        if (!currentFeature) {
          return mostVisible;
        }

        const { top, bottom, height } = currentFeature.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visibleHeight = Math.min(bottom, windowHeight) - Math.max(top, 0);
        const visibilityPercentage = visibleHeight / height;

        return !mostVisible ||
          visibilityPercentage > (mostVisible?.visibilityPercentage || 0)
          ? {
              element: currentFeature,
              visibilityPercentage,
              id: currentFeature.id || null,
            }
          : mostVisible;
      }, null);

      if (mostVisibleFeature?.id) {
        setCurrentSection(mostVisibleFeature.id);
      }
    };

    window.addEventListener('scroll', observeFeatureVisibility);
    window.addEventListener('resize', observeFeatureVisibility);
    observeFeatureVisibility(); // Initial check

    return () => {
      window.removeEventListener('scroll', observeFeatureVisibility);
      window.removeEventListener('resize', observeFeatureVisibility);
    };
  }, [features]);

  // useInView hook for triggering sidebar animations
  const isInView = useInView(containerRef, {
    amount: 0.2,
    once: false,
  });

  // Set up scroll-based animations using motion hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useSpring(useTransform(scrollYProgress, [0.1, 0.9], [-100, -50]), {
    stiffness: 400,
    damping: 40,
  });

  // Handler to scroll to a specific feature section when clicked
  const handleFeatureClick = (featureId: string) => {
    const featureSection = document.getElementById(featureId);
    if (featureSection) {
      featureSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const scrollToBottom = () => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      {/* Sidebar with dynamic feature list and scroll button */}
      <AnimatePresence>
        {isInView && (
          <motion.div
            ref={sidebarRef}
            animate={{
              width: isHovered ? '200px' : '48px',
              transition: { duration: 0.3, ease: 'easeInOut' },
            }}
            className={`hidden md:flex flex-col gap-7 bg-white/85 backdrop-blur-sm py-4 px-3 rounded-[4px] fixed overflow-hidden shadow-z-${accentColor} 2xl:right-[calc(50%+560px)] 2xl:shadow-none 2xl:items-end 2xl:w-[200px]!`}
            exit={{
              opacity: 0,
            }}
            initial={{
              opacity: 0,
              width: '48px',
            }}
            onHoverEnd={() => setIsHovered(false)}
            onHoverStart={() => setIsHovered(true)}
            style={{
              y,
              top: '50%',
            }}
            viewport={{
              once: false,
              amount: 0.2,
            }}
            whileInView={{
              opacity: 1,
              transition: {
                duration: 0.6,
                ease: 'easeOut',
              },
            }}
          >
            <div className="flex flex-col gap-5 group 2xl:items-end">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-center cursor-pointer w-fit 2xl:flex-row-reverse"
                  onClick={() => handleFeatureClick(feature.id || '')}
                >
                  <FeatureIcon
                    height="24px"
                    icon={feature.icon || 'banana'}
                    iconClasses={`${
                      currentSection === feature.id
                        ? 'stroke-z-' + accentColor
                        : 'stroke-[#5A5A5A]'
                    }`}
                    width="24px"
                  />
                  <p className="flex-1 whitespace-nowrap 2xl:transition-opacity 2xl:opacity-0 2xl:group-hover:opacity-100">
                    {feature.featureName}
                  </p>
                </div>
              ))}
            </div>
            <button className="cursor-pointer" onClick={scrollToBottom}>
              <IconArrowDown color="black" height="24px" width="24px" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Container for feature sections */}
      <div ref={containerRef} className="flex flex-col w-full">
        {features.map((feature, i) => (
          <div
            key={i}
            ref={(el) => {
              featureSectionRefs.current[i] = el;
            }}
            className="flex flex-col -mx-5 md:mx-0 px-5 md:px-0 py-12 gap-12 border-t last:border-b bg-[#FCFCFC] md:bg-transparent group md:flex-row md:items-center md:justify-center overflow-hidden"
            id={feature.id || ''}
          >
            <div className="flex flex-col gap-2.5 md:gap-5 md:flex-1 md:py-24">
              <div className="flex flex-col gap-2.5 md:gap-3">
                <div className="flex gap-2 items-center">
                  <FeatureIcon
                    color="#919191"
                    height="20px"
                    icon={feature.icon || 'banana'}
                    width="20px"
                  />
                  <p className="text-[#646464] text-base font-light leading-[1.7]">
                    {feature.featureName}
                  </p>
                </div>
                <h4 className="text-2xl leading-[1.7] md:text-3xl font-medium">
                  {feature.header}
                </h4>
              </div>
              <p className="text-[#646464] text-lg font-light leading-[1.7]">
                {feature.description}
              </p>
            </div>
            <div
              className="w-full group-odd:-ml-5 group-even:-mr-5 group-even:self-end md:ml-0! md:mr-0! md:flex-1 md:self-center!"
              style={
                feature.offset ? illustrationMargin(feature.offset) : undefined
              }
            >
              <ImageMedia
                imgClassName="w-full h-auto"
                resource={feature.illustration}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Render buttons if any */}
      <div
        ref={buttonRef}
        className="flex flex-col items-center md:items-start md:flex-row gap-3 md:gap-4"
      >
        {buttons &&
          buttons.map((button, i) => (
            <Button key={i} variant={button.variant}>
              {button.label}
            </Button>
          ))}
      </div>
    </>
  );
};

export default FeatureListBlockClient;
