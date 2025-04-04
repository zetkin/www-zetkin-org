'use server';

import { getPayload } from 'payload';

import configPromise from '@payload-config';

export async function fetchJobsByTag(jobsTag: string) {
  const payload = await getPayload({ config: configPromise });

  const jobsData = await payload.find({
    collection: 'jobs',
    where: {
      tags: {
        equals: jobsTag,
      },
    },
  });

  return jobsData;
}
