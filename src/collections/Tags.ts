import type { CollectionConfig } from 'payload';

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Tag',
    plural: 'Tags',
  },
  admin: {
    useAsTitle: 'name',
        defaultColumns: ['name', 'type', 'linkToList'], 

  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'People',
          value: 'people',
        },
        {
          label: 'Events',
          value: 'events',
        },
        {
          label: 'Jobs',
          value: 'jobs',
        },
      ],
      required: true,
      defaultValue: ({ req }) => {
        const path = req?.headers?.get('referer') || '';

        if (path.includes('/admin/collections/people')) {
          return 'people';
        }
      
        if (path.includes('/admin/collections/events')) {
          return 'events';
        }

        if (path.includes('/admin/collections/jobs')) {
          return 'jobs';
        }
      
        return undefined;
      },
    },
    {
      name: 'linkToList',
      type: 'ui', 
      admin: {
        components: {
          Cell: 'src/components/LinkToList', 
        },
      },
    },
  ],
};
