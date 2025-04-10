import type { Block } from 'payload';

export const EventList: Block = {
  slug: 'eventList',
  interfaceName: 'eventListBlock',
  fields: [
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
      required: true,
      filterOptions: () => ({
        type: { equals: 'events' },
      }),
    },
  ],
};
