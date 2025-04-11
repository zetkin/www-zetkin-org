import { CMSLink as Link } from '@/components/Link';
import { Media, Page } from '@/payload-types';

interface navigatedItemType {
  label?: string | null;
  color?: ('purple' | 'red' | 'green') | null;
  showInFooter?: boolean | null;
  link?: {
    type?: ('reference' | 'custom') | null;
    reference?: {
      relationTo: 'pages';
      value: string | Page;
    } | null;
    url?: string;
    newTab?: boolean | null;
  };
  midItems?:
  | {
    icon?: (string | null) | Media;
    label?: string | null;
    description?: string | null;
    showInFooter?: boolean | null;
    link?: {
      type?: ('reference' | 'custom') | null;
      reference?: {
        relationTo: 'pages';
        value: string | Page;
      } | null;
      url?: string;
      newTab?: boolean | null;
    };
    bottomItems?:
    | {
      label?: string | null;
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
    | null;
    id?: string | null;
  }[]
  | null;
  id?: string | null;
}

export default function SubNav({
  pathname,
  navigatedItem,
}: {
  pathname: string;
  navigatedItem: navigatedItemType | null;
}) {
  return (
    <div className="sm:w-full sm:flex sm:px-5 sm:justify-center sm:border-b sm:border-[rgba(238,238,238,0.7)] sm:bg-white/75 sm:backdrop-blur-[12px]">
      <nav className="px-10 pt-3.5 pb-5 border-b border-z-gray-200 sm:w-full sm:flex sm:max-w-[1000px] sm:justify-end sm:px-0 sm:py-3 sm:border-b-0">
        {navigatedItem && (
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-5">
            {navigatedItem.midItems?.map((midItem) => {
              const url = midItem.link?.url ?? '/';
              const linkIsSelected = pathname.includes(url);
              return (
                <li
                  key={midItem.id}
                  className={
                    'sm:text-[13px] ' +
                    (linkIsSelected &&
                      'font-semibold text-z-' + navigatedItem.color)
                  }
                >
                  <Link url={url}>{midItem.label}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </div>
  );
}
