'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useHeaderTheme } from '@/providers/HeaderTheme';
import { CMSLink as Link } from '@/components/Link';
import type { MainNav } from '@/payload-types';
import { Logo } from '@/components/Logo/Logo';
import { IconFacebook, IconGithub, IconInstagram } from '@/components/Icons';

export function FooterClient({ navData }: { navData: MainNav }) {
  const [theme, setTheme] = useState<string | null>(null);
  const { headerTheme, setHeaderTheme } = useHeaderTheme();
  const pathname = usePathname();

  useEffect(() => {
    setHeaderTheme(null);
  }, [pathname]);

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) {
      setTheme(headerTheme);
    }
  }, [headerTheme]);

  // get correct icon for social links

  function getIcon(socialLink: string) {
    switch (socialLink) {
      case 'facebook':
        return <IconFacebook color="black" height="24px" width="24px" />;
      case 'instagram':
        return <IconInstagram color="black" height="24px" width="24px" />;
      case 'github':
        return <IconGithub color="black" height="24px" width="24px" />;
    }
  }

  return (
    <footer
      aria-label="Site footer"
      className="px-5 pt-15 pb-12 flex justify-center bg-white border-t border-z-gray-200"
      role="contentinfo"
    >
      <div className="flex w-full flex-col gap-16 sm:flex-row sm:justify-between sm:max-w-[1000px]">
        <div className="grid grid-cols-2 gap-x-5 sm:flex sm:flex-col sm:justify-between">
          <Link
            aria-label="Homepage"
            className="justify-self-start align-top"
            url="/"
          >
            <Logo
              aria-hidden="true"
              className="origin-top scale-[90%] sm:scale-[131%]"
              forceFull={true}
            />
          </Link>
          <div aria-label="Social media links" className="flex gap-4 items-end">
            {navData.socialLinks?.map((socialLink) => {
              const icon = getIcon(socialLink.platform);
              return (
                <Link
                  key={socialLink.id}
                  aria-label={`Visit our ${socialLink.platform} page`}
                  newTab
                  url={socialLink.link ?? '/'}
                >
                  {icon}
                </Link>
              );
            })}
          </div>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 lg:flex lg:gap-8">
            {navData.topItems?.map((topItem) => (
              <li key={topItem.id} className="flex flex-col gap-5">
                <Link
                  className="font-semibold text-sm"
                  url={topItem.link?.url ?? '/'}
                >
                  {topItem.label}
                </Link>
                <ul
                  aria-label={`${topItem.label} menu items`}
                  className="flex flex-col gap-4"
                >
                  {topItem.midItems?.map((midItem) => (
                    <li key={midItem.id} className="text-sm text-[#444444]">
                      <Link url={midItem.link?.url ?? '/'}>
                        {midItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
