'use client';

import cx from 'classnames';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CMSLink as Link } from '@/components/Link';
import type { MainNav } from '@/payload-types';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import { Logo } from '@/components/Logo/Logo';
import { ImageMedia } from '@/components/Media/ImageMedia';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface HeaderClientProps {
  data: MainNav;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [navigatedItem, setNavigatedItem] = useState(data.topItems ? data.topItems[0] : null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedBottomItems, setExpandedBottomItems] = useState<Record<string, boolean>>({});
  const [scrollTop, setScrollTop] = useState(false);


  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  const twPreDeclare = ["w-1/2", "w-1/3", "w-1/4", "text-z-purple", "text-z-green", "text-z-red", "top-[67.5px]", "top-[45px]"]

  const hoveredItem = data.topItems?.find((item) => item.id == openId);

  useEffect(() => {
    setHeaderTheme(null);
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme);
    }
  }, [headerTheme]);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      setExpandedBottomItems({});
    }
  };

  const showMore = (midItemId: string) => {
    setExpandedBottomItems(prev => ({
      ...prev,
      [midItemId]: true
    }));
  };

  useEffect(() => {
    if (pathname === '/') {
      setNavigatedItem(null);
    }
  }, [pathname]);

  const colorToHex = (color: string) => {
    switch (color) {
      case 'purple':
        return 'z-purple';
      case 'red':
        return 'z-red';
      case 'green':
        return 'z-green';
    }
  }

  return (
    <header
      className="z-20 sm:flex sm:flex-col sm:fixed sm:w-full"
      onMouseLeave={() => setOpenId(null)}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className='sm:w-full sm:flex sm:px-5 sm:py-3 sm:justify-center sm:border-b sm:border-[rgba(238,238,238,0.7)] sm:bg-white/95 sm:backdrop-blur-[16px]'>
        <div className='sm:w-full sm:flex sm:justify-between sm:items-center sm:max-w-[1000px]'>
          <div className="pt-8 flex flex-col justify-between items-center sm:pt-0">
            <div className='flex justify-center w-full relative z-20'>
              <Link url="/">
                <Logo
                  className="invert dark:invert-0"
                  loading="eager"
                  priority="high"
                  expanded={scrollTop}
                />
              </Link>
              <button
                className="absolute w-8 h-8 focus:outline-none right-7 top-1/2 -translate-y-1/2 sm:hidden"
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-label="Menu"
              >
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                  <span
                    className={`absolute bg-black h-[2.9px] w-7 transition-all duration-300 ease-in-out 
              ${menuOpen
                        ? 'top-1/2 -mt-px transform rotate-45'
                        : 'top-2/7 -mt-px transform rotate-0'
                      }`}
                  />
                  <span
                    className={`absolute bg-black h-[2.9px] w-7 transition-all duration-300 ease-in-out 
              ${menuOpen
                        ? 'top-1/2 -mt-px transform -rotate-45'
                        : 'top-5/7 -mt-px transform rotate-0'
                      }`}
                  />
                </div>
              </button>
            </div>
            {/* Mobile title not visible in home */}
            {pathname !== '/' &&
              <div className='mt-8 py-3.5 w-full flex justify-center border-t border-b border-z-gray-200 sm:hidden'>
                <h1 className='text-lg font-semibold'>
                  {navigatedItem?.label}
                </h1>
              </div>
            }

          </div>
          {/* Main-nav visible in Desktop and mobile home */}
          <nav className={`${pathname === '/' ? 'flex' : 'hidden'} mt-8 sm:flex px-10 border-y border-z-gray-200 pt-3.5 pb-5 sm:border-0 sm:m-0 sm:p-0`}>
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-5">
              {data.topItems?.map((topItem) => {
                const url = topItem.link?.url ?? '/';
                const linkIsSelected = pathname.includes(url);
                return (
                  <li
                    key={topItem.id}
                    onMouseEnter={() => setOpenId(topItem.id || null)}
                    onClick={() => setNavigatedItem(topItem)}
                    className={cx(
                      { 'font-semibold': linkIsSelected },
                      linkIsSelected ? "text-" + colorToHex(topItem.color || "") : ''
                    ) +
                      ' sm:text-sm'
                    }>
                    <Link url={url}>
                      {topItem.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      {/* Sub-nav not visible in home */}
      {pathname !== '/' &&
        <div className='sm:w-full sm:flex sm:px-5 sm:justify-center sm:border-b sm:border-[rgba(238,238,238,0.7)] sm:bg-white/75 sm:backdrop-blur-[12px]'>
          <nav className="px-10 pt-3.5 pb-5 border-b border-z-gray-200 sm:w-full sm:flex sm:max-w-[1000px] sm:justify-end sm:px-0 sm:py-3 sm:border-b-0">
            {navigatedItem && (
              <ul className="flex flex-wrap justify-center gap-x-7 gap-y-5">
                {navigatedItem.midItems?.map((midItem) => {
                  const url = midItem.link?.url ?? '/';
                  const linkIsSelected = pathname.includes(url);
                  return (
                    <li key={midItem.id} className={cx(
                      { 'font-semibold': linkIsSelected },
                      linkIsSelected ? "text-" + colorToHex(navigatedItem.color || "") : ''
                    ) +
                      ' sm:text-[13px]'}>
                      <Link url={url}>
                        {midItem.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </nav>
        </div>
      }
      {/* Sub-nav visible on hover on desktop */}
      {hoveredItem && (
        <nav className={`hidden sm:flex absolute w-full px-5 bg-white/95 backdrop-blur-[16px] justify-center left-0 right-0 top-[${(scrollTop ? '67.5' : '45')}px]`} >
          <div className='flex py-8 max-w-[1000px]'>
            <ul className="flex gap-8 justify-end">
              {hoveredItem.midItems?.map((midItem) => {
                const url = midItem.link?.url ?? '/';
                const linkIsSelected = pathname == url;
                const isExpanded = expandedBottomItems[midItem.id || ''] || false;
                const itemsToShow = isExpanded
                  ? midItem.bottomItems?.length
                  : Math.min(4, midItem.bottomItems?.length || 0);
                const needsShowMore = (midItem.bottomItems?.length || 0) > 4 && !isExpanded;
                return (
                  <li key={midItem.id} className="flex flex-col gap-4">
                    <div className='flex flex-col gap-3'>
                      <div className='flex gap-2.5 items-center'>
                        {midItem.icon && (
                          <div className='w-6 h-6 relative'>
                            <ImageMedia
                              resource={midItem.icon}
                              fill
                            />
                          </div>
                        )}
                        <h3 key={midItem.id} className={cx(
                          linkIsSelected ? "text-" + colorToHex(hoveredItem.color || "") : ''
                        ) + ' text-[16px] font-semibold'}
                        >
                          <Link url={url}>
                            {midItem.label}
                          </Link>
                        </h3>
                      </div>
                      <p className="text-sm leading-[1.7]">{midItem.description}</p>
                    </div>
                    <ul className='grid grid-cols-2 gap-y-2 gap-x-6'>
                      {midItem.bottomItems?.slice(0, itemsToShow).map((bottomItem) => {
                        const url = bottomItem.link?.url ?? '/';
                        const linkIsSelected = pathname == url;

                        return (
                          <li
                            key={bottomItem.id}
                            className={cx(
                              { 'font-semibold': linkIsSelected },
                              linkIsSelected ? "text-" + colorToHex(hoveredItem.color || "") : ''
                            ) + ' text-[13px] truncate leading-[1.7]'}>
                            <Link url={url}>{bottomItem.label}</Link>
                          </li>
                        );
                      })}
                      {needsShowMore && (
                        <li className="col-span-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              showMore(midItem.id || '');
                            }}
                            className="text-[13px] underline"
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
          </div>
        </nav>
      )}
      {/* Full page mobile menu */}
      <div className={`fixed top-0 left-0 w-full h-full bg-white z-10 transform transition-opacity duration-200 ease-in-out 
        ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Accordion type='single' collapsible className='mt-[170px] px-5'>
          {data.topItems?.map((topItem) => {
            return (
              <AccordionItem value={topItem.id || ""} key={topItem.id}>
                <AccordionTrigger>
                  <p className='text-lg font-semibold'>
                    <Link url={topItem.link?.url ?? '/'}>
                      {topItem.label}
                    </Link>
                  </p>
                </AccordionTrigger>
                <AccordionContent className='pt-6'>
                  <ul className="flex flex-col gap-8">
                    {topItem.midItems?.map((midItem) => {
                      const isExpanded = expandedBottomItems[midItem.id || ''] || false;
                      const itemsToShow = isExpanded
                        ? midItem.bottomItems?.length
                        : Math.min(4, midItem.bottomItems?.length || 0);
                      const needsShowMore = (midItem.bottomItems?.length || 0) > 4 && !isExpanded;
                      return (
                        <li key={midItem.id} className="">
                          <div className='flex gap-4'>
                            {midItem.icon && (
                              <div className='w-8 h-8 relative flex-shrink-0'>
                                <ImageMedia
                                  resource={midItem.icon}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                            <div className='flex flex-col gap-4'>
                              <h3 className='text-lg font-semibold'>
                                <Link url={midItem.link?.url ?? '/'}>
                                  <button onClick={toggleMenu}>
                                    {midItem.label}
                                  </button>
                                </Link>
                              </h3>
                              <div className='flex flex-col gap-5'>
                                <p className='text-[16px]'>
                                  {midItem.description}
                                </p>
                                <ul className='grid grid-cols-2 gap-y-3 gap-x-6'>
                                  {midItem.bottomItems?.slice(0, itemsToShow).map((bottomItem) => {
                                    return (
                                      <li key={bottomItem.id}>
                                        <p className='text-[15px] leading-[1.7]'>
                                          <Link url={bottomItem.link?.url ?? '/'}>
                                            <button onClick={toggleMenu}>
                                              {bottomItem.label}
                                            </button>
                                          </Link>
                                        </p>
                                      </li>
                                    );
                                  })}
                                  {needsShowMore && (
                                    <li className="col-span-2 mt-1">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          showMore(midItem.id || '');
                                        }}
                                        className="text-[15px] underline"
                                      >
                                        Show more...
                                      </button>
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </header>
  );
};
