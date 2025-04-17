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
      admin: {
        description: `If "Wrap in accordion" is not selected, please only add one list here.`,
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
