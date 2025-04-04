import React, { cache } from 'react';
import type { Metadata } from 'next';
import { getPayload } from 'payload';
import { draftMode } from 'next/headers';

import configPromise from '@payload-config';
import { PayloadRedirects } from '@/components/PayloadRedirects';
import { RenderBlocks } from '@/blocks/RenderBlocks';
import { RenderHero } from '@/heros/RenderHero';
import { generateMeta } from '@/utilities/generateMeta';
import PageClient from './page.client';
import { LivePreviewListener } from '@/components/LivePreviewListener';
import EventPage from '@/EventPage/Component';

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      breadcrumbs: true,
      slug: true,
    },
  });

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home' && !!doc.breadcrumbs?.length;
    })
    .filter((doc) => !!doc.breadcrumbs)
    .map(({ breadcrumbs }) => {
      if (!breadcrumbs) {
        throw new Error(
          'This should never happen because nullish are filtered',
        );
      }

      return {
        slug:
          breadcrumbs[breadcrumbs.length - 1]?.url?.split('/').slice(1) ?? '',
      };
    });

  return params;
}

type Args = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode();
  const { slug = ['home'] } = await paramsPromise;
  const url = '/' + slug.join('/');

  // **Check if "event" is in the URL**

  const eventIndex = slug.findIndex((segment) => segment === 'event');
  const eventId = eventIndex !== -1 ? slug[eventIndex + 1] : null;

  // **If "event" is in the URL and has an ID, render EventPage instead**
  if (eventId) {
    return <EventPage id={eventId} />;
  }

  const page = await queryPageByUrl({
    url,
  });

  if (!page) {
    return <PayloadRedirects url={url} />;
  }

  const { hero, layout } = page;

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout || []} />
    </article>
  );
}

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { slug = ['home'] } = await paramsPromise;
  const page = await queryPageByUrl({
    url: '/' + slug.join('/'),
  });

  return generateMeta({ doc: page });
}

const queryPageByUrl = cache(async ({ url }: { url: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const slug = url.split('/').pop();

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      ['breadcrumbs.url']: {
        equals: url,
      },
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});
