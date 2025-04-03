'use client';

import { useEffect, useState } from 'react';
import { PaginatedDocs } from 'payload';

import { EventListBlock as EventListProps } from '@/payload-types';
import { fetchEventsByDateAndTag } from './fetchEventsByDateNTag';
import { Event } from '@/payload-types';
import { ImageMedia } from '@/components/Media/ImageMedia';
import { formatEventDates } from './formatEventDates';
import { IconArrowRight } from '@/icons/UIIcons';

const EventListBlock: React.FC<EventListProps> = ({
  accentColor,
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

  return (
    <div className="w-full flex justify-center px-5">
      <div className="flex flex-col w-full sm:max-w-250 sm:gap-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:items-center">
          <h3 className="text-[22px]">{listHeader}</h3>
          <div className="flex gap-3">
            <button
              className={`text-[15px] leading-[150%] font-medium py-2 px-4 rounded-[8px] box-border border
                        ${filter === 'upcoming' ? 'text-white bg-z-' + accentColor + ' border-z-' + accentColor : 'text-black border border-black'}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`text-[15px] leading-[150%] font-medium py-2 px-4 rounded-[8px] box-border border  
                    ${filter === 'all' ? 'text-white bg-z-' + accentColor + ' border-z-' + accentColor : 'text-black border border-black'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`text-[15px] leading-[150%] font-medium py-2 px-4 rounded-[8px] box-border border 
                    ${filter === 'past' ? 'text-white bg-z-' + accentColor + ' border-z-' + accentColor : 'text-black border-black'}`}
              onClick={() => setFilter('past')}
            >
              Past
            </button>
          </div>
        </div>
        <div className="flex flex-col h-[627px] sm:h-[636px]">
          {loading ? (
            <div className="flex flex-col gap-2 w-full h-full items-center justify-center">
              <div role="status">
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
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
              <p>Loading...</p>
            </div>
          ) : !eventData.docs.length ? (
            <div className="flex flex-col gap-2 w-full h-full items-center justify-center bg-z-gray-100 rounded-[8px]">
              <p>No events found</p>
            </div>
          ) : (
            <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10">
              {eventData.docs.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center border-b last:border-0 py-5 sm:py-0 sm:border-0"
                >
                  <div className="flex gap-5 flex-1 items-center sm:flex-col sm:w-full">
                    <div className="relative flex-1 h-[116px] sm:w-full sm:h-[166px] sm:flex-auto sm:rounded-[8px] sm:overflow-clip">
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
                          height="28px"
                          iconClasses={`hidden sm:block stroke-z-${accentColor}`}
                          width="28px"
                        />
                      </div>
                      <p className="text-[#646464] leading-[170%] text-[15px]">
                        {formatEventDates(
                          event.startDate,
                          event.endDate || undefined,
                        )}
                      </p>
                      <div className="text-[#646464] leading-[170%] text-[15px]">
                        {event.city ? <p>{event.city}</p> : <p>Online</p>}
                      </div>
                    </div>
                  </div>
                  <IconArrowRight
                    height="28px"
                    iconClasses={`sm:hidden stroke-z-${accentColor}`}
                    width="28px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            className={`p-2 ${selectedPage === 1 && 'opacity-35'}`}
            onClick={() => setSelectedPage((past) => past - 1)}
          >
            <svg
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
                className={`text-[15px] leading-[150%] font-medium py-2 px-4 rounded-[8px] box-border  
                                ${selectedPage === i + 1 ? 'text-white border bg-z-' + accentColor + ' border-z-' + accentColor : 'text-black'}`}
                onClick={() => setSelectedPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            className={`p-2 ${selectedPage === eventData.totalPages && 'opacity-35'}`}
            onClick={() => setSelectedPage((past) => past + 1)}
          >
            <svg
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
        </div>
      </div>
    </div>
  );
};

export default EventListBlock;
