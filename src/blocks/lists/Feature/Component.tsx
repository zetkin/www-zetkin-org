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
import { useAtomValue } from 'jotai';

import { FeatureListBlock as FeatureListProps } from '@/payload-types';
import { IconArrowDown, IconArrowRight } from '@/icons/UIIcons';
import { ImageMedia } from '@/components/Media/ImageMedia';
import { accentColorAtom } from '@/state/accentColorAtom';
import PickedIcon from '@/icons/PickedIcon';
import { IconValue } from '@/fields/IconPicker/IconPicker';

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

const FeatureListBlock: React.FC<FeatureListProps> = ({
  features,
  header,
  subHeader,
}) => {
  const [currentSection, setCurrentSection] = useState(features[0]?.id || '');
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef(null);
  const featureSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // useEffect to detect when scrolling stops
  useEffect(() => {
    const handleScroll = () => {
      setLastScrollTime(Date.now());
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
      capture: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Check scroll state periodically as a fallback
  useEffect(() => {
    const checkScrollState = setInterval(() => {
      const timeSinceLastScroll = Date.now() - lastScrollTime;
      if (timeSinceLastScroll > 1000 && isScrolling) {
        setIsScrolling(false);
      }
    }, 500);

    return () => clearInterval(checkScrollState);
  }, [lastScrollTime, isScrolling]);

  // Check for large screen
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1536);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

    // Use IntersectionObserver instead of scroll event for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        // Only update if there's an actual intersection change
        if (entries.some((entry) => entry.isIntersecting)) {
          observeFeatureVisibility();
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '0px' },
    );

    // Small delay to ensure refs are set
    setTimeout(() => {
      featureSectionRefs.current.forEach((ref) => {
        if (ref) {
          observer.observe(ref);
        }
      });
    }, 100);

    window.addEventListener('resize', observeFeatureVisibility, {
      passive: true,
    });
    observeFeatureVisibility(); // Initial check

    return () => {
      observer.disconnect();
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
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const accentColor = useAtomValue(accentColorAtom);

  return (
    <div className="flex px-5 w-full justify-center mt-20">
      <div className="flex flex-col gap-12 w-full md:max-w-250 relative">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex gap-2.5 items-center md:gap-3">
            <h2 className="text-3xl md:text-4xl leading-[1.2] font-medium">
              {header}
            </h2>
            <IconArrowRight
              iconClasses={`stroke-z-${accentColor || 'purple'} h-[30px] w-[30px] md:h-[36px] md:w-[36px]`}
            />
          </div>
          <p className="text-lg leading-[1.7] font-light md:max-w-[440px]">
            {subHeader}
          </p>
        </div>
        {/* Client Component: handles dynamic behavior like scroll animations and sidebar */}
        <AnimatePresence>
          {isInView && (
            <motion.div
              ref={sidebarRef}
              animate={{
                width: isHovered ? '200px' : '48px',
                opacity: isLargeScreen ? 1 : isHovered || isScrolling ? 1 : 0.2,
                transition: {
                  width: { duration: 0.3, ease: 'easeInOut' },
                  opacity: { duration: 0.5, ease: 'easeInOut' },
                },
              }}
              className={`hidden md:flex flex-col gap-7 bg-white/85 backdrop-blur-sm py-4 px-3 rounded-[4px] fixed overflow-hidden shadow-z-${accentColor} 2xl:right-[calc(50%+560px)] 2xl:shadow-none 2xl:items-end 2xl:w-[200px]!`}
              initial={{
                opacity: 1,
                width: '48px',
              }}
              onHoverEnd={() => setIsHovered(false)}
              onHoverStart={() => setIsHovered(true)}
              style={{
                y,
                top: '50%',
              }}
            >
              <div className="flex flex-col gap-5 group 2xl:items-end">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-center cursor-pointer w-fit 2xl:flex-row-reverse"
                    onClick={() => handleFeatureClick(feature.id || '')}
                  >
                    <PickedIcon
                      className={`${
                        currentSection === feature.id
                          ? 'text-z-' + accentColor
                          : 'text-[#5A5A5A]'
                      }`}
                      value={feature.icon as string | IconValue | null}
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
                    <PickedIcon
                      color="#919191"
                      value={
                        typeof feature.icon === 'string' ? feature.icon : ''
                      }
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
                  feature.offset
                    ? illustrationMargin(feature.offset)
                    : undefined
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
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default FeatureListBlock;
