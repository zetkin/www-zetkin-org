import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  labels: {
    singular: 'Job',
    plural: 'Jobs',
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
      hasMany: true,
      filterOptions: () => ({
        type: { equals: 'jobs' },
      }),
    },
    {
      name: 'remote',
      label: 'Remote',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      admin: {
        condition: (_, { remote } = {}) => remote === false,
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
  ],
};
