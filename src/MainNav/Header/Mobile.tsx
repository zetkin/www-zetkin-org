'use client';

import React,
{
  useEffect,
  useState
} from 'react';
import {
  motion,
  useScroll,
  useTransform
} from "motion/react"

import { CMSLink as Link } from '@/components/Link';
import type { MainNav as MainNavTypes } from '@/payload-types';
import { Logo } from '@/components/Logo/Logo';
import { ImageMedia } from '@/components/Media/ImageMedia';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import MainNav from './Components/MainNav';
import SubNav from './Components/SubNav';

interface MobileHeaderProps {
  data: MainNavTypes;
  pathname: string;
  theme?: string | null;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ data, pathname, theme }) => {

  const [openId, setOpenId] = useState<string | null>(null);
  const [navigatedItem, setNavigatedItem] = useState(data.topItems?.[0] ?? null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedBottomItems, setExpandedBottomItems] = useState<Record<string, boolean>>({});


  useEffect(() => {
    if (pathname === '/') {
      setNavigatedItem(null);
    }
  }, [pathname]);


  // Toggle fullscreen menu on mobile

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      setExpandedBottomItems({});
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Show more options in hover menu and in fullscreen mobile menu

  const showMore = (midItemId: string) => {
    setExpandedBottomItems(prev => ({
      ...prev,
      [midItemId]: true
    }));
  };

  // Track scroll position

  const { scrollY } = useScroll();

  // Animate shadow and border radius

  const opacity = useTransform(scrollY, [120, 180], [0, 0.06]);
  const borderRadius = useTransform(scrollY, [140, 220], [0, 20]);

  const boxShadowTransform = useTransform(opacity, (o) => `0px 4px 32px 0px rgba(0, 0, 0, ${o})`);

  let boxShadow
  let bottomBorder

  if (menuOpen) {
    boxShadow = "none"
    bottomBorder = "solid 1px #EEE"
  }
  else {
    boxShadow = boxShadowTransform
    bottomBorder = "none"
  }

  return (
    <header
      className="z-20"
      onMouseLeave={() => setOpenId(null)}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {/* Logo and hamburger menu on mobile */}
      <motion.div
        className='fixed py-8 w-full z-20 bg-white/95 top-0'
        style={{
          boxShadow: boxShadow,
          borderBottomRightRadius: borderRadius,
          borderBottomLeftRadius: borderRadius,
          borderBottom: bottomBorder
        }}>
        <div className="flex flex-col justify-between items-center">
          <motion.div layout onClick={() => setMenuOpen(false)}>
            <Link url="/">
              <Logo forceFull={menuOpen} scrollY={scrollY} />
            </Link>
          </motion.div>
          <button
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
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
      </motion.div>
      <div className='flex flex-col mt-[129px]'>
        {/* Mobile title not visible in home */}
        {pathname !== '/' &&
          <div className='py-3.5 static w-full bg-white flex justify-center border-t border-b border-z-gray-200'>
            <h1 className='text-lg font-semibold'>
              {navigatedItem?.label}
            </h1>
          </div>
        }
        {/* Main-nav visible in mobile home */}
        <MainNav data={data} openId={openId} pathname={pathname} setNavigatedItem={setNavigatedItem} setOpenId={setOpenId} />
        {/* Sub-nav not visible in home */}
        {pathname !== '/' && Array.isArray(navigatedItem?.midItems) && navigatedItem.midItems.length > 0 &&
          <SubNav navigatedItem={navigatedItem} pathname={pathname} />
        }
      </div>
      {/* Full page mobile menu */}
      <div className={`fixed top-0 left-0 w-full h-full bg-white z-10 transform transition-opacity duration-200 ease-in-out overflow-auto pb-10 
        ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Accordion className='mt-[170px] px-5' collapsible type='single'>
          {data.topItems?.map((topItem) => {
            if ((topItem.midItems?.length ?? 0) > 0) {
              return (
                <AccordionItem key={topItem.id} value={topItem.id || ""}>
                  <AccordionTrigger>
                    <p className='text-lg font-semibold'>
                      <Link url={topItem.link?.url ?? '/'}>
                        {topItem.longLabel || topItem.label}
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
                          <li key={midItem.id} className="" onClick={() => { toggleMenu(); setNavigatedItem(topItem); }}>
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
                                        <li key={bottomItem.id} onClick={() => { toggleMenu(); setNavigatedItem(topItem); }}>
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
              )
            }
            else {
              return (
                <div key={topItem.id} onClick={() => { toggleMenu(); setNavigatedItem(topItem); }}>
                  <Link className='flex justify-between items-center' url={topItem.link?.url ?? '/'}>
                    <p className='text-lg font-semibold py-4'>
                      {topItem.longLabel || topItem.label}
                    </p>
                    <svg fill="none" height="25" viewBox="0 0 24 25" width="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12.2723H19" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                      <path d="M12 5.27234L19 12.2723L12 19.2723" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
                    </svg>
                  </Link>
                </div>
              )
            }
          })}
        </Accordion>
      </div>
    </header>
  );
};
