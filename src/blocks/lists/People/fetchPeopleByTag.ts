import { getPayload } from 'payload';

import configPromise from '@payload-config';

export async function fetchPeopleByTag(peopleTag: string) {
  const payload = await getPayload({ config: configPromise });

  const peopleData = await payload.find({
    collection: 'people',
    where: {
      tags: {
        equals: peopleTag,
      },
    },
  });

  return peopleData;
}
