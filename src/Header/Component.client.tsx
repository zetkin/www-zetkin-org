'use client';

import cx from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
        <Link href="/">
          <Logo
            className="invert dark:invert-0"
            expanded={true}
            loading="eager"
            priority="high"
          />
        </Link>
        <nav className="">
          <ul className="flex gap-4">
            {data.topItems?.map((topItem) => {
              return (
                <li
                  key={topItem.id}
                  onMouseEnter={() => setOpenId(topItem.id || null)}
                >
                  {topItem.label}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <nav className="relative">
        {selectedItem && (
          <ul className="absolute left-0 right-0 flex gap-4 justify-end">
            {selectedItem.items?.map((item) => {
              return (
                <li key={item.id} className="w-60">
                  <h3>{item.label}</h3>
                  <p className="text-sm">{item.description}</p>
                  <ul>
                    {item.items?.map((subItem) => {
                      const url = subItem.link?.url ?? '/';
                      const linkIsSelected = pathname == url;
                      return (
                        <li
                          key={subItem.id}
                          className={cx({
                            'font-bold': linkIsSelected,
                            underline: linkIsSelected,
                          })}
                        >
                          <Link href={url}>{subItem.label}</Link>
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
