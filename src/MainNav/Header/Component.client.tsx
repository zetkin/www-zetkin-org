'use client';

import cx from 'classnames';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CMSLink as Link } from '@/components/Link';
import type { MainNav } from '@/payload-types';
import { useHeaderTheme } from '@/providers/HeaderTheme';
import { Logo } from '@/components/Logo/Logo';

interface HeaderClientProps {
  data: MainNav;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  const selectedItem = data.topItems?.find((item) => item.id == openId);

  useEffect(() => {
    setHeaderTheme(null);
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme);
    }
  }, [headerTheme]);

  return (
    <header
      className="z-20"
      onMouseLeave={() => setOpenId(null)}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="py-8 flex justify-between">
        <Link url="/">
          <Logo
            className="invert dark:invert-0"
            loading="eager"
            priority="high"
            expanded={true}
          />
        </Link>
        <nav className="">
          <ul className="flex gap-4">
            {data.topItems?.map((topItem) => {
              const url = topItem.link?.url ?? '/';
              const linkIsSelected = pathname == url;
              return (
                <li
                  key={topItem.id}
                  onMouseEnter={() => setOpenId(topItem.id || null)}
                  className={cx({
                    'font-bold': linkIsSelected,
                    underline: linkIsSelected,
                  })}
                >
                  <Link url={url}>
                    {topItem.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <nav className="relative">
        {selectedItem && (
          <ul className="absolute left-0 right-0 flex gap-4 justify-end">
            {selectedItem.midItems?.map((midItem) => {
              const url = midItem.link?.url ?? '/';
              const linkIsSelected = pathname == url;
              return (
                <li key={midItem.id} className="w-60">
                  <h3
                    key={midItem.id}
                    className={cx({
                      'font-bold': linkIsSelected,
                      underline: linkIsSelected,
                    })}
                  >
                    <Link url={url}>
                      {midItem.label}
                    </Link>
                  </h3>
                  <p className="text-sm">{midItem.description}</p>
                  <ul>
                    {midItem.bottomItems?.map((bottomItem) => {
                      const url = bottomItem.link?.url ?? '/';
                      const linkIsSelected = pathname == url;
                      return (
                        <li
                          key={bottomItem.id}
                          className={cx({
                            'font-bold': linkIsSelected,
                            underline: linkIsSelected,
                          })}
                        >
                          <Link url={url}>{bottomItem.label}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </header>
  );
};
