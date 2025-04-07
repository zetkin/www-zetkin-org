import { Media } from '@/payload-types';

export type LayoutProps = {
  readTime?: number;
  images:
    | {
        image: string | Media;
        id?: string | null;
      }[]
    | undefined;
  html: string;
  eyebrowHeading?: string;
  subtitle?: string;
  width?: 'full' | 'article';
};
