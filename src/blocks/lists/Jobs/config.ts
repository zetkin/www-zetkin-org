import type { Block } from 'payload';

export const JobsList: Block = {
  slug: 'jobsList',
  interfaceName: 'jobsListBlock',
  fields: [
    {
      name: 'accentColor',
      label: 'Accent Color',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Purple',
          value: 'purple',
        },
        {
          label: 'Green',
          value: 'green',
        },
        {
          label: 'Red',
          value: 'red',
        },
      ],
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'jobsTag',
      label: 'Tag',
      type: 'relationship',
      relationTo: 'tags',
      required: true,
      filterOptions: () => ({
        type: { equals: 'jobs' },
      }),
    },
  ],
};
