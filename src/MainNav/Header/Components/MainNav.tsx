import cx from 'classnames';

import useColorToTailwind from '@/MainNav/hooks/useColorToTailwind';
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
    const colorToTailwind = useColorToTailwind();

    return (
        <nav className={`${pathname === '/' ? 'flex' : 'hidden'} sm:flex px-10 border-y border-z-gray-200 pt-3.5 pb-5 sm:border-0 sm:m-0 sm:p-0 sm:w-full sm:justify-end`}>
            <ul className="flex flex-wrap justify-center gap-x-7 gap-y-5">
                {data.topItems?.map((topItem) => {
                    const url = topItem.link?.url ?? '/';
                    const linkIsSelected = pathname.includes(url);
                    return (
                        <li
                            key={topItem.id}
                            className={cx(
                                { 'font-semibold': linkIsSelected },
                                linkIsSelected ? "text-" + colorToTailwind(topItem.color || "") + " stroke-" + colorToTailwind(topItem.color || "") : 'stroke-black'
                            ) +
                                ' sm:text-sm group'
                            }
                            onClick={() => setNavigatedItem(topItem)}
                            onMouseEnter={() => setOpenId(topItem.id || null)}>
                            <Link className='flex gap-1 items-center' url={url}>
                                <span>
                                    {topItem.label}
                                </span>
                                {topItem.hasChildren &&
                                    <svg
                                        className={`transition-transform duration-150 ${openId === topItem.id ? 'rotate-180' : ''} group-hover:rotate-180`}
                                        fill="none" height="13" viewBox="0 0 12 13" width="12" xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M3 5.35718L6 8.35718L9 5.35718" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                                    </svg>
                                }
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    )
}