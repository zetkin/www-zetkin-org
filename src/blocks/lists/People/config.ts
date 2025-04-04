import type { Block } from 'payload';

export const PeopleList: Block = {
  slug: 'peopleList',
  interfaceName: 'peopleListBlock',
  fields: [
    {
      name: 'accordion',
      label: 'Wrap in accordion',
      type: 'checkbox',
      defaultValue: true,
      required: true,
    },
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
      name: 'lists',
      label: 'List/Lists',
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
