'use client';

import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react'; // Add useEffect and useState


import { CMSLink as Link } from '@/components/Link';
import DateButton from './DateButton';
import { accentColorAtom } from '@/state/accentColorAtom';
import { Event } from '@/payload-types';
import RichText from '@/components/RichText';

export default function Actions({
  eventDoc,
  isMobile,
  geotag
}: {
  eventDoc: Event;
  isMobile: boolean;
  geotag: [number, number] | null | undefined
}) {
  const accentColor = useAtomValue(accentColorAtom);

  const [locationLabel, setLocationLabel] = useState<string | null>(null); // Added state for geotag location

  useEffect(() => {
    async function getAddress(lat: number, lon: number): Promise<void> {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();

      const address = data.address;
      const name = address.name || data.name || '';
      const street = address.road || '';
      const number = address.house_number || '';
      const city = address.city || address.town || address.village || address.municipality || address.city_district || '';

      const streetAddress = [street, number].filter(Boolean).join(' ');
      const label = [streetAddress || name, city].filter(Boolean).join(', ');
      setLocationLabel(label);
    }

    if (geotag) {
      getAddress(geotag[0], geotag[1]);
    }
  }, [geotag]);

  return (
    <div>
      <div className="flex flex-col gap-3 py-5 border-t border-b sm:mt-1">
        <div className="flex gap-3 items-center">
          <svg
            className={`stroke-z-${accentColor}`}
            fill="none"
            height="21"
            viewBox="0 0 20 21"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6668 8.83268C16.6668 13.8327 10.0002 18.8327 10.0002 18.8327C10.0002 18.8327 3.3335 13.8327 3.3335 8.83268C3.3335 7.06457 4.03588 5.36888 5.28612 4.11864C6.53636 2.86839 8.23205 2.16602 10.0002 2.16602C11.7683 2.16602 13.464 2.86839 14.7142 4.11864C15.9645 5.36888 16.6668 7.06457 16.6668 8.83268Z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M10 11.334C11.3807 11.334 12.5 10.2147 12.5 8.83398C12.5 7.45327 11.3807 6.33398 10 6.33398C8.61929 6.33398 7.5 7.45327 7.5 8.83398C7.5 10.2147 8.61929 11.334 10 11.334Z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          {eventDoc.online ? (
            <p className={`leading-[170%] font-semibold text-z-${accentColor}`}>
              Online
            </p>
          ) : (
            <Link
              newTab={true}
              url={
                isMobile
                  ? geotag
                    ? `geo:${geotag[0]},${geotag[1]}`
                    : `geo:0,0?q=${eventDoc.address},${eventDoc.city}`
                  : geotag
                    ? `https://maps.google.com/?q=${geotag[0]},${geotag[1]}`
                    : `https://maps.google.com/?q=${eventDoc.address},${eventDoc.city}`
              }
            >
              <p className={`leading-[170%] font-semibold text-z-${accentColor}`}>
                {geotag && locationLabel
                  ? locationLabel
                  : `${eventDoc.address}, ${eventDoc.city}`}
              </p>
            </Link>
          )}
        </div>
        <div className="flex gap-3 items-start">
          <svg
            className={`my-[3px] stroke-z-${accentColor}`}
            fill="none"
            height="21"
            viewBox="0 0 20 21"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 6.75065V5.50065C17.5 5.05862 17.3244 4.6347 17.0118 4.32214C16.6993 4.00958 16.2754 3.83398 15.8333 3.83398H4.16667C3.72464 3.83398 3.30072 4.00958 2.98816 4.32214C2.67559 4.6347 2.5 5.05862 2.5 5.50065V17.1673C2.5 17.6093 2.67559 18.0333 2.98816 18.3458C3.30072 18.6584 3.72464 18.834 4.16667 18.834H7.08333"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M13.3335 2.16602V5.49935"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M6.6665 2.16602V5.49935"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M2.5 8.83398H6.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M14.5835 15.0827L13.3335 14.041V12.166"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <path
              d="M18.3335 13.834C18.3335 15.1601 17.8067 16.4318 16.869 17.3695C15.9313 18.3072 14.6596 18.834 13.3335 18.834C12.0074 18.834 10.7356 18.3072 9.79796 17.3695C8.86028 16.4318 8.3335 15.1601 8.3335 13.834C8.3335 12.5079 8.86028 11.2361 9.79796 10.2985C10.7356 9.36077 12.0074 8.83398 13.3335 8.83398C14.6596 8.83398 15.9313 9.36077 16.869 10.2985C17.8067 11.2361 18.3335 12.5079 18.3335 13.834Z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <DateButton doc={eventDoc} />
        </div>
      </div>
      <RichText
        className={`mt-1 w-full overflow-visible text-lg leading-[170%] prose-p:text-black prose-ol:text-black marker:text-black prose-a:text-z-${accentColor}`}
        data={
          eventDoc.description || {
            root: {
              type: 'root',
              children: [],
              direction: null,
              format: '',
              indent: 0,
              version: 1,
            },
          }
        }
        enableGutter={false}
      />
    </div>
  );
}
