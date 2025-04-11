"use client";

import { useMemo, useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';

import type { MainNav as MainNavTypes } from '@/payload-types';
import { accentColorAtom } from '@/state/accentColorAtom';

export function useNavigate(data: MainNavTypes, pathname: string) {
    const [navigatedItem, setNavigatedItem] = useState(
      data.topItems?.[0] ?? null,
    );

  const setAccentColor = useSetAtom(accentColorAtom);

  // mapping URLs to topItems
  const urlToItemMap = useMemo(() => {
    const map: Record<string, NonNullable<MainNavTypes['topItems']>[number]> = {};
    data.topItems?.forEach((topItem) => {
      topItem.midItems?.forEach((midItem) => {
        if (midItem.link?.url) {map[midItem.link.url] = topItem;}
        midItem.bottomItems?.forEach((bottomItem) => {
          if (bottomItem.link?.url) {map[bottomItem.link.url] = topItem;}
        });
      });
    });
    return map;
  }, [data.topItems]);

  // match current pathname to a topItem
  useEffect(() => {
    let matchedItem = urlToItemMap[pathname];
    if (!matchedItem && pathname !== '/') {
      const fallbackKey = Object.keys(urlToItemMap).find(key => key.startsWith(pathname + '/'));
      if (fallbackKey) {matchedItem = urlToItemMap[fallbackKey];}
    }

    // fallback for dynamic routes: match first segment of dynamic route to topItem slug or URL
    if (!matchedItem && pathname !== '/') {
        const firstSegment = pathname.split('/').filter(Boolean)[0];
  
        const fallbackBySegment = data.topItems?.find((topItem) => {
          const topSlug = topItem.link?.url?.replace(/^\//, '');
          return topSlug === firstSegment;
        });
  
        if (fallbackBySegment){
            matchedItem = fallbackBySegment;
        }
      }

    setNavigatedItem(pathname === '/' ? null : matchedItem ?? null);

  }, [pathname, urlToItemMap]);

  // update accent color
  useEffect(() => {
    setAccentColor(navigatedItem?.color || 'purple');
  }, [navigatedItem, pathname]);

  return { navigatedItem, setNavigatedItem };
}
