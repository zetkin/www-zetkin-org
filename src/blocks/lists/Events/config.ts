import type { Block } from 'payload';

export const EventList: Block = {
  slug: 'eventList',
  interfaceName: 'eventListBlock',
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
      name: 'listHeader',
      label: 'Header',
      type: 'text',
    },
    {
      name: 'tag',
      label: 'Event tag',
      type: 'relationship',
      relationTo: 'tags',
    },
  ],
};
