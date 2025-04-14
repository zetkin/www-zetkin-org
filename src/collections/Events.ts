import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Event',
    plural: 'Events',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'image', 'tags', 'startDate'],
  },
  fields: [
    {
      name: 'title',
      label: 'Event title',
      type: 'text',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      filterOptions: () => ({
        type: { equals: 'events' },
      }),
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'startDate',
      label: 'Start date and time',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'endDate',
      label: 'End date and time',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'online',
      label: 'Online event',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      admin: {
        condition: (_, { online } = {}) => online === false,
      },
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      admin: {
        condition: (_, { online } = {}) => online === false,
      },
    },
    {
      name: 'geotag',
      label: 'Coordinates',
      type: 'point'
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
