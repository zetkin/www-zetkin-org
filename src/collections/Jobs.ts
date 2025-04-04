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
      name: 'remote',
      label: 'Remote',
      type: 'checkbox',
      required: true,
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
      name: 'applyLink',
      label: 'Apply link',
      required: true,
      type: 'text',
      admin: {
        description: 'URL to apply for the job',
      },
      validate: (value: string | null | undefined) => {
        if (!value) {
          return true;
        }

        try {
          new URL(value);
          return true;
        } catch (_err) {
          return 'Invalid URL format';
        }
      },
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
