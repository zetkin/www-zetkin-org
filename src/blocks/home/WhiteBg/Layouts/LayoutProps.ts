import { Media, Page } from '@/payload-types';

export type LayoutProps = {
  subtitle?: string;
  buttons:
    | {
        label: string;
        link?: {
          type?: ('reference' | 'custom') | null;
          reference?: {
            relationTo: 'pages';
            value: string | Page;
          } | null;
          url?: string;
          newTab?: boolean | null;
        };
        id?: string | null;
      }[]
    | null
    | undefined;
  images?:
    | {
        image: string | Media;
        id?: string | null;
      }[]
    | undefined;
  html: string;
};
