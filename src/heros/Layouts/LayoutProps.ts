import { Media } from '@/payload-types';

export type LayoutProps = {
  readTime?: string;
  images:
    | {
        image: string | Media;
        id?: string | null;
      }[]
    | undefined;
  html: string;
};
