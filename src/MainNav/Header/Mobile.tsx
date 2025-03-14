'use client';

import cx from 'classnames';
import { usePathname } from 'next/navigation';
import React,
{
  useEffect,
  useState
} from 'react';
import {
  AnimatePresence,
  motion
} from "motion/react"

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

interface MobileHeaderProps {
  data: MainNav;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ data }) => {

  const [theme, setTheme] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [navigatedItem, setNavigatedItem] = useState(data.topItems ? data.topItems[0] : null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedBottomItems, setExpandedBottomItems] = useState<Record<string, boolean>>({});
  const [scrollTop, setScrollTop] = useState(true);

  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  const _twPreDeclare = ["text-z-purple", "text-z-green", "text-z-red", "stroke-z-purple", "stroke-z-green", "stroke-z-red"]


  useEffect(() => {
    setHeaderTheme(null);
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme);
    }
  }, [headerTheme]);

  useEffect(() => {
    if (pathname === '/') {
      setNavigatedItem(null);
    }
  }, [pathname]);

  // Change logo on scroll

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY < 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle fullscreen menu on mobile

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      setExpandedBottomItems({});
    }
  };

  // Show more options in hover menu and in fullscreen mobile menu

  const showMore = (midItemId: string) => {
    setExpandedBottomItems(prev => ({
      ...prev,
      [midItemId]: true
    }));
  };

  // Interpret color selections to color variables

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
      <div
        className={`sm:w-full sm:flex sm:px-5 sm:py-3 sm:justify-center sm:border-b sm:border-[rgba(238,238,238,0.7)] sm:bg-white/95 sm:backdrop-blur-[16px]`}
      >
        {/* Logo and hamburger menu on mobile */}
        <div className='py-8 w-full z-20 bg-white/95 sm:w-fit sm:py-0 sm:relative sm:bg-transparent sm:flex '>
          <div className="flex flex-col justify-between items-center sm:pt-0 relative">
            <motion.div layout>
              <Link url="/">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scrollTop ? "logo-small" : "logo-large"}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Logo
                      expanded={scrollTop}
                    />
                  </motion.div>
                </AnimatePresence>
              </Link>
            </motion.div>
            <button
              aria-expanded={menuOpen}
              aria-label="Menu"
              className="absolute w-8 h-8 focus:outline-none right-7 top-1/2 -translate-y-1/2 sm:hidden"
              onClick={toggleMenu}
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
        </div>
        {/* Mobile title not visible in home */}
        {pathname !== '/' &&
          <div className='py-3.5 static w-full bg-white flex justify-center border-t border-b border-z-gray-200 sm:hidden'>
            <h1 className='text-lg font-semibold'>
              {navigatedItem?.label}
            </h1>
          </div>
        }
        {/* Main-nav visible in mobile home */}
        <nav className={`${pathname === '/' ? 'flex' : 'hidden'} sm:flex px-10 border-y border-z-gray-200 pt-3.5 pb-5 sm:border-0 sm:m-0 sm:p-0 sm:w-full sm:justify-end`}>
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-5">
            {data.topItems?.map((topItem) => {
              const url = topItem.link?.url ?? '/';
              const linkIsSelected = pathname.includes(url);
              return (
                <li
                  key={topItem.id}
                  className={cx(
                    { 'font-semibold': linkIsSelected },
                    linkIsSelected ? "text-" + colorToHex(topItem.color || "") + " stroke-" + colorToHex(topItem.color || "") : 'stroke-black'
                  ) +
                    ' sm:text-sm group'
                  }
                  onClick={() => setNavigatedItem(topItem)}
                  onMouseEnter={() => setOpenId(topItem.id || null)}>
                  <Link className='flex gap-1 items-center' url={url}>
                    <span>
                      {topItem.label}
                    </span>
                    <svg
                      className={`transition-transform duration-150 ${openId === topItem.id ? 'rotate-180' : ''} group-hover:rotate-180`}
                      fill="none" height="13" viewBox="0 0 12 13" width="12" xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M3 5.35718L6 8.35718L9 5.35718" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
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
      </div>
      {/* Full page mobile menu */}
      <div className={`fixed top-0 left-0 w-full h-full bg-white z-10 transform transition-opacity duration-200 ease-in-out 
        ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Accordion className='mt-[170px] px-5' collapsible type='single'>
          {data.topItems?.map((topItem) => {
            return (
              <AccordionItem key={topItem.id} value={topItem.id || ""}>
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
                                  className="object-contain"
                                  fill
                                  resource={midItem.icon}
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
                                        className="text-[15px] underline"
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
