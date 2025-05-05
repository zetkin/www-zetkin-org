import type { Block } from 'payload';

export const PeopleList: Block = {
  slug: 'peopleList',
  interfaceName: 'peopleListBlock',
  fields: [
    {
      name: 'lists',
      labels: {
        singular: 'List',
        plural: 'Lists',
      },
      type: 'array',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'peopleTag',
          label: 'People tag',
          type: 'relationship',
          relationTo: 'tags',
          required: true,
          filterOptions: () => ({
            type: { equals: 'people' },
          }),
        },
      ],
    },
  ],
};
