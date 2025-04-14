import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
  UnorderedListFeature,
  OrderedListFeature,
} from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: 'Job',
    plural: 'Jobs',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tags'],
  },
  fields: [
    {
      name: 'title',
      label: 'Job title',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      required: true,
      hasMany: true,
      filterOptions: () => ({
        type: { equals: 'jobs' },
      }),
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
      required: true,
    },
    {
      name: 'mailAddress',
      label: 'Mail address for applications',
      required: true,
      type: 'email',
    },
    {
      name: 'employmentType',
      label: 'Employment type',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Job description',
      required: true,
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            UnorderedListFeature(),
            OrderedListFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
  ],
};
