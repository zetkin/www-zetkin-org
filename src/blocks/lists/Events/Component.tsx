'use client';

import { useEffect, useState } from 'react';
import { PaginatedDocs } from 'payload';
import { usePathname } from 'next/navigation';
import { useAtomValue } from "jotai";

import { EventListBlock as EventListProps } from '@/payload-types';
import { fetchEventsByDateAndTag } from './fetchEventsByDateNTag';
import { Event } from '@/payload-types';
import { ImageMedia } from '@/components/Media/ImageMedia';
import { formatEventDates } from './formatEventDates';
import { IconArrowRight } from '@/icons/UIIcons';
import { CMSLink as Link } from '@/components/Link';
import { accentColorAtom } from "@/state/accentColorAtom";

const EventListBlock: React.FC<EventListProps> = ({
  tag,
  listHeader,
}) => {
  const [eventData, setEventData] = useState<PaginatedDocs<Event>>({
    docs: [],
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  });
  const [selectedPage, setSelectedPage] = useState(1);
  const [filter, setFilter] = useState('upcoming');
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState(4);

  useEffect(() => {
    const updateItems = () => {
      setItems(window.innerWidth >= 640 ? 6 : 4);
    };

    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const fetchData = async () => {
      timeout = setTimeout(() => setLoading(true), 500); // Only show loading state if request takes >500ms
      const eventReq = await fetchEventsByDateAndTag(
        filter,
        selectedPage,
        items,
        typeof tag === 'string' ? tag : undefined,
      );
      clearTimeout(timeout);
      setEventData(eventReq || {});
      setLoading(false);
    };

    fetchData();

    return () => clearTimeout(timeout);
  }, [filter, selectedPage, items]);

  const path = usePathname();

  const accentColor = useAtomValue(accentColorAtom);


  return (
    <div
      aria-labelledby="event-list-header"
      className="pt-16 sm:pt-20 w-full flex justify-center px-5"
      role="region"
    >
      <div className="flex flex-col w-full sm:max-w-250 sm:gap-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:items-center">
          <h3 className="text-[22px]" id="event-list-header">
            {listHeader}
          </h3>
          <div
            aria-label="Filter events by time"
            className="flex gap-3"
            role="tablist"
          >
            <button
              aria-selected={filter === 'upcoming'}
              className={`text-[15px] leading-[150%] font-medium py-2 px-4 rounded-[8px] box-border border
                        ${filter === 'upcoming' ? 'text-white bg-z-' + accentColor + ' border-z-' + accentColor : 'text-black border border-black'}`}
              onClick={() => setFilter('upcoming')}
              role="tab"
            >
              Upcoming
            </button>
            <button
              aria-selected={filter === 'all'}
              className={`text-[15px] leading-[150%] font-medium py-2 px-4 rounded-[8px] box-border border  
                    ${filter === 'all' ? 'text-white bg-z-' + accentColor + ' border-z-' + accentColor : 'text-black border border-black'}`}
              onClick={() => setFilter('all')}
              role="tab"
            >
              All
            </button>
            <button
              aria-selected={filter === 'past'}
              className={`text-[15px] leading-[150%] font-medium py-2 px-4 rounded-[8px] box-border border 
                    ${filter === 'past' ? 'text-white bg-z-' + accentColor + ' border-z-' + accentColor : 'text-black border-black'}`}
              onClick={() => setFilter('past')}
              role="tab"
            >
              Past
            </button>
          </div>
        </div>
        <div
          aria-label="Event list"
          className="flex flex-col h-[627px] sm:h-[636px]"
          role="list"
        >
          {loading ? (
            <div
              aria-live="polite"
              className="flex flex-col gap-2 w-full h-full items-center justify-center"
              role="status"
            >
              <div>
                <svg
                  aria-hidden="true"
                  className={`w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-z-${accentColor}`}
                  fill="none"
                  viewBox="0 0 100 101"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539..."
                    fill="currentFill"
                  />
                </svg>
              </div>
              <p>Loading...</p>
            </div>
          ) : !eventData.docs.length ? (
            <div
              aria-live="polite"
              className="flex flex-col gap-2 w-full h-full items-center justify-center bg-z-gray-100 rounded-[8px]"
            >
              <p>No events found</p>
            </div>
          ) : (
            <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10">
              {eventData.docs.map((event) => (
                <Link key={event.id} url={path + '/event/' + event.id}>
                  <div
                    className="flex items-center border-b last:border-0 py-5 sm:py-0 sm:border-0"
                    role="listitem"
                  >
                    <div className="flex gap-5 flex-1 items-center sm:flex-col sm:w-full">
                      <div
                        aria-hidden="true"
                        className="relative flex-1 h-[116px] sm:w-full sm:h-[166px] sm:flex-auto sm:rounded-[8px] sm:overflow-clip"
                      >
                        <ImageMedia
                          fill
                          imgClassName="object-cover"
                          resource={event.image}
                        />
                      </div>
                      <div className="flex-4">
                        <div className="flex items-center">
                          <p className="leading-[170%] sm:flex-1">
                            {event.title}
                          </p>
                          <IconArrowRight
                            aria-hidden="true"
                            height="28px"
                            iconClasses={`hidden sm:block stroke-z-${accentColor}`}
                            width="28px"
                          />
                        </div>
                        <p className="text-[#646464] fill-[#646464] leading-[170%] text-[15px]">
                          {formatEventDates(
                            event.startDate,
                            event.endDate || undefined,
                          )}
                        </p>
                        <div className="text-[#646464] leading-[170%] text-[15px]">
                          {event.online ? <p>Online</p> : <p>{event.city}</p>}
                        </div>
                      </div>
                    </div>
                    <IconArrowRight
                      aria-hidden="true"
                      height="28px"
                      iconClasses={`sm:hidden stroke-z-${accentColor}`}
                      width="28px"
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        <nav
          aria-label="Pagination Navigation"
          className="flex justify-between"
          role="navigation"
        >
          <button
            aria-label="Previous page"
            className={`p-2 ${selectedPage === 1 && 'opacity-35'}`}
            disabled={selectedPage === 1}
            onClick={() => setSelectedPage((past) => past - 1)}
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="22"
              viewBox="0 0 22 22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.75 16.5L8.25 11L13.75 5.5"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.83333"
              />
            </svg>
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: eventData.totalPages }, (_, i) => (
              <button
                key={i}
                aria-current={selectedPage === i + 1 ? 'page' : undefined}
                aria-label={`Go to page ${i + 1}`}
                className={`text-[15px] leading-[150%] font-medium py-2 px-4 rounded-[8px] box-border  
                                ${selectedPage === i + 1 ? 'text-white border bg-z-' + accentColor + ' border-z-' + accentColor : 'text-black'}`}
                onClick={() => setSelectedPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            aria-label="Next page"
            className={`p-2 ${selectedPage === eventData.totalPages && 'opacity-35'}`}
            disabled={selectedPage === eventData.totalPages}
            onClick={() => setSelectedPage((past) => past + 1)}
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="22"
              viewBox="0 0 22 22"
              width="22"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.25 16.5L13.75 11L8.25 5.5"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.83333"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default EventListBlock;
