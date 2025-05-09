'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';

import { CMSLink as Link } from '@/components/Link';
import type { MainNav as MainNavTypes } from '@/payload-types';
import { Logo } from '@/components/Logo/Logo';
import { ImageMedia } from '@/components/Media/ImageMedia';
import MainNav from './Components/MainNav';
import SubNav from './Components/SubNav';
import { useNavigate } from './useNavigate';

interface DesktopHeaderProps {
  data: MainNavTypes;
  pathname: string;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  data,
  pathname,
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const { navigatedItem, setNavigatedItem } = useNavigate(data, pathname);

  const [expandedBottomItems, setExpandedBottomItems] = useState<
    Record<string, boolean>
  >({});

  const hoveredItem = data.topItems?.find((item) => item.id == openId);

  // Show more options in hover menu
  const showMore = (midItemId: string) => {
    setExpandedBottomItems((prev) => ({
      ...prev,
      [midItemId]: true,
    }));
  };

  // Fade in shadow
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [120, 180], [0, 0.06]);

  const background = useTransform(scrollY, [0, 50], [0, 1]);
  const blurAmount = useTransform(
    background,
    [0, 1],
    ['blur(0px)', 'blur(16px)'],
  );
  const bgColor = useTransform(
    background,
    [0, 1],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.80)'],
  );
  const border = useTransform(
    background,
    [0, 1],
    ['solid rgba(238,238,238,0)', 'solid rgba(238,238,238,0.7)'],
  );

  let headerShadow = '0, 0, 0,';

  switch (navigatedItem?.color) {
    case 'purple':
      headerShadow = '120, 1, 221,';
      break;
    case 'green':
      headerShadow = '15, 116, 115,';
      break;
    case 'red':
      headerShadow = '220, 39, 80,';
      break;
  }

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.header
      className={`z-20 flex flex-col fixed w-full ${headerShadow}`}
      onMouseLeave={() => setOpenId(null)}
      style={{
        boxShadow: useTransform(
          opacity,
          (o) => `0px 4px 32px 0px rgba(${headerShadow}${o})`,
        ),
      }}
    >
      <motion.div
        className={`z-30 w-full flex px-5 py-3 justify-center bg-white/85 backdrop-blur-[16px] transition-colors`}
        layout="size"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backdropFilter: isHovered ? 'blur(16px)' : blurAmount,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.80)' : bgColor,
          boxShadow: `0px 4px 32px 0px rgba(${headerShadow}0)`,
          borderBottom: isHovered ? 'solid rgba(238,238,238,0.7)' : border,
        }}
      >
        <div className="w-full flex items-center justify-between max-w-[1000px]">
          {/* Logo */}
          <div className="w-fit py-0 relative bg-transparent flex ">
            <Link aria-label="Go to homepage" url="/">
              <Logo />
            </Link>
          </div>
          {/* Main-nav */}
          <MainNav
            data={data}
            openId={openId}
            pathname={pathname}
            setNavigatedItem={setNavigatedItem}
            setOpenId={setOpenId}
          />
        </div>
      </motion.div>
      {/* Sub-nav visible on hover */}
      <AnimatePresence mode="wait">
        {hoveredItem && (
          <motion.nav
            animate={{ height: 'auto' }}
            aria-live="polite"
            className="flex absolute w-full px-5 bg-white/80 backdrop-blur-[16px] overflow-hidden justify-center left-0 right-0 top-full border-b"
            exit={{ height: 0 }}
            initial={{ height: 0 }}
            layout="size"
          >
            <motion.div
              key={hoveredItem.id}
              animate={{ opacity: 1, x: 0 }}
              className="flex py-8 w-full max-w-[1000px]"
              exit={{ opacity: 0, x: -50 }}
              initial={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="flex gap-8 justify-end w-full">
                {hoveredItem.midItems?.map((midItem) => {
                  const url = midItem.link?.url ?? '/';
                  const linkIsSelected = pathname == url;
                  const isExpanded =
                    expandedBottomItems[midItem.id || ''] || false;
                  const itemsToShow = isExpanded
                    ? midItem.bottomItems?.length
                    : Math.min(4, midItem.bottomItems?.length || 0);
                  const needsShowMore =
                    (midItem.bottomItems?.length || 0) > 4 && !isExpanded;
                  return (
                    <li key={midItem.id} className="flex flex-col gap-4 flex-1">
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-2.5 items-center">
                          {midItem.icon && (
                            <div className="w-6 h-6 relative">
                              <ImageMedia
                                alt={midItem.label || 'navigation icon'}
                                fill
                                resource={midItem.icon}
                              />
                            </div>
                          )}
                          <h3
                            key={midItem.id}
                            className={
                              'text-[16px] font-semibold' +
                              (linkIsSelected &&
                                `text-${hoveredItem.color || ''}`)
                            }
                          >
                            <Link aria-label={midItem.label} url={url}>
                              {midItem.label}
                            </Link>
                          </h3>
                        </div>
                        <p className="text-sm leading-[1.7]">
                          {midItem.description}
                        </p>
                      </div>
                      <ul className="grid grid-cols-2 gap-y-2 gap-x-6">
                        {midItem.bottomItems
                          ?.slice(0, itemsToShow)
                          .map((bottomItem) => {
                            const url = bottomItem.link?.url ?? '/';
                            const linkIsSelected = pathname == url;

                            return (
                              <li
                                key={bottomItem.id}
                                className={
                                  'text-[13px] truncate leading-[1.7] ' +
                                  (linkIsSelected &&
                                    'font-semibold text-' +
                                      (hoveredItem.color || ''))
                                }
                              >
                                <Link aria-label={bottomItem.label} url={url}>
                                  {bottomItem.label}
                                </Link>
                              </li>
                            );
                          })}
                        {needsShowMore && (
                          <li className="col-span-2">
                            <button
                              aria-label={`Show more ${midItem.label} options`}
                              className="text-[13px] underline"
                              onClick={(e) => {
                                e.preventDefault();
                                showMore(midItem.id || '');
                              }}
                            >
                              Show more...
                            </button>
                          </li>
                        )}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
      {/* Sub-nav not visible in home */}
      {pathname !== '/' && (
        <SubNav navigatedItem={navigatedItem} pathname={pathname} />
      )}
    </motion.header>
  );
};
