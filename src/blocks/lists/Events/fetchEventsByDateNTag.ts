'use server';

import { getPayload } from 'payload';

import configPromise from '@payload-config';

export async function fetchEventsByDateAndTag(
  timeSelection: string,
  page: number,
  items: number,
  tag?: string,
) {
  let timeQuery;

  if (timeSelection === 'upcoming') {
    timeQuery = { greater_than_equal: new Date() };
  } else if (timeSelection === 'past') {
    timeQuery = { less_than: new Date() };
  } else {
    timeQuery = { greater_than_equal: new Date(0) };
  }

  let tagQuery;

  if (tag) {
    tagQuery = {
      tags: {
        equals: tag,
      },
    };
  }

  const payload = await getPayload({ config: configPromise });

  const eventData = await payload.find({
    collection: 'events',
    where: {
      ...(tagQuery ? tagQuery : {}),
      startDate: {
        ...(timeQuery || {}),
      },
    },
    limit: items,
    page: page,
  });

  return eventData;
}
