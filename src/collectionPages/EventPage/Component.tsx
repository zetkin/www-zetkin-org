import { getPayload } from 'payload';

import configPromise from '@payload-config';
import { ImageMedia } from '@/components/Media/ImageMedia';
import ShareButton from './ShareButton';
import Actions from './Actions';

export default async function EventPage({ id }: { id: string }) {
  const payload = await getPayload({ config: configPromise });

  const eventData = await payload.find({
    collection: 'events',
    where: {
      id: {
        equals: id,
      },
    },
  });

  const eventDoc = eventData.docs[0];

  const isMobile =
    typeof navigator !== 'undefined' &&
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <div className="pt-10 sm:pt-46 pb-24 px-5 flex justify-center">
      <div className="w-full sm:max-w-250">
        {eventDoc ? (
          <div className="flex flex-col gap-8 sm:gap-13 w-full sm:items-center">
            <div className="relative w-full h-[calc(100vw-40px)] sm:h-100 rounded-[10px] overflow-clip">
              <ImageMedia
                fill
                imgClassName="object-cover"
                resource={eventDoc.image}
              />
            </div>
            <div className="flex flex-col gap-4 sm:gap-5 sm:max-w-[630px] sm:pr-20">
              <div className="flex justify-between items-center pb-5 border-b">
                <p className="text-lg">
                  {typeof eventDoc?.tags?.[0] === 'object' &&
                  'name' in eventDoc.tags[0]
                    ? eventDoc.tags[0].name
                    : 'Event'}
                </p>
                <ShareButton />
              </div>
              <h3 className="text-[30px] sm:text-[36px] leading-[140%]">
                {eventDoc?.title || 'No title available'}
              </h3>
              <Actions eventDoc={eventDoc} isMobile={isMobile} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full gap-5 h-150 justify-center">
            <h3>No event found.</h3>
            <p className="text-center">
              No event was found with the provided ID. Please check the url and
              try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
