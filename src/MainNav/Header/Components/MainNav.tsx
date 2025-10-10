import { CMSLink as Link } from '@/components/Link';
import type { MainNav } from '@/payload-types';

export default function MainNav({
  pathname,
  data,
  setNavigatedItem,
  setOpenId,
  openId,
}: {
  pathname: string;
  data: MainNav;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setNavigatedItem: (item: any) => void;
  setOpenId: (id: string | null) => void;
  openId: string | null;
}) {
  return (
    <nav
      className={`
            ${pathname === '/' ? 'flex' : 'hidden'} sm:flex justify-center px-10 border-y border-gray-200/70 pt-3.5 pb-5 sm:border-0 sm:m-0 sm:p-0 sm:w-full sm:justify-end relative z-10`}
    >
      <ul className="flex flex-wrap justify-center gap-x-7 gap-y-5">
        {data.topItems
          ?.filter((topItem) => topItem.showInFooter !== 'footer')
          .map((topItem) => {
            const url = topItem.link.url;
            const linkIsSelected =
              pathname === url || pathname.startsWith('/' + url);
            return (
              <li
                key={topItem.id}
                className={
                  'sm:text-sm group ' +
                  (linkIsSelected
                    ? 'font-semibold text-z-' +
                      topItem.color +
                      ' stroke-z-' +
                      topItem.color
                    : 'stroke-black')
                }
                onClick={() => setNavigatedItem(topItem)}
                onMouseEnter={() => setOpenId(topItem.id || null)}
              >
                <Link className="flex gap-1 items-center" url={url}>
                  <span>{topItem.label}</span>
                  {(topItem.midItems?.length ?? 0) > 0 && (
                    <svg
                      className={`transition-transform duration-150 ${openId === topItem.id ? 'rotate-180' : ''} group-hover:rotate-180`}
                      fill="none"
                      height="13"
                      viewBox="0 0 12 13"
                      width="12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 5.35718L6 8.35718L9 5.35718"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.66667"
                      />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
