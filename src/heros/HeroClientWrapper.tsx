'use client';

import { useAtomValue } from "jotai";

import { Media } from '@/payload-types';
import TwoImgLeft from './Layouts/TwoImgLeft';
import TwoImgCenter from './Layouts/TwoImgCenter';
import OneImgLeft from './Layouts/OneImgLeft';
import OneImgCenter from './Layouts/OneImgCenter';
import FeatureLeft from './Layouts/FeatureLeft';
import FeatureCenter from './Layouts/FeatureCenter';
import { accentColorAtom } from "@/state/accentColorAtom";

const heros = {
  twoImgLeft: TwoImgLeft,
  twoImgCenter: TwoImgCenter,
  oneImgLeft: OneImgLeft,
  oneImgCenter: OneImgCenter,
  featureLeft: FeatureLeft,
  featureCenter: FeatureCenter,
};

interface HeroClientWrapperProps {
  layout: keyof typeof heros;
  html: string;
  subtitle?: string | null;
  eyebrowHeading?: string | null;
  readTime?: number | null;
  images?: {
    image: string | Media;
    id?: string | null;
  }[] | null;
}

export const HeroClientWrapper: React.FC<HeroClientWrapperProps> = ({
  layout,
  html,
  subtitle,
  eyebrowHeading,
  readTime,
  images,
}) => {
  const accentColor = useAtomValue(accentColorAtom);

  const modifiedHtml = html
    .replace(/<p>/g, '<h2 class="">')
    .replace(/<\/p>/g, '</h2>')
    .replace(/<em>/g, `<span class="srf-h2 text-z-${accentColor}">`)
    .replace(/<\/em>/g, '</span>');

  const Layout = heros[layout];

  if (!Layout) { return null; }

  return (
    <Layout
      eyebrowHeading={eyebrowHeading ?? undefined}
      html={modifiedHtml}
      images={images ?? undefined}
      readTime={readTime ?? undefined}
      subtitle={subtitle ?? undefined}
    />
  );
};
