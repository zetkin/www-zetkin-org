import type { Block } from 'payload';

import { link } from '@/fields/link';

export const PeopleHighlight: Block = {
    slug: 'people-higlight',
    interfaceName: 'PeopleHighlightBlock',
    labels: {
        singular: 'People highlight block',
        plural: 'People highlight blocks',
      },
    fields: [
      {
        name: 'borderTop',
        label: 'Border on top of block in desktop and tablet view',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        name: 'people',
        label: 'People',
        type: 'array',
        minRows: 2,
        maxRows: 2,
        fields: [
          {
            name: 'image',
            label: 'Image',
            type: 'upload',
            relationTo: 'media',
            required: true
          },
          {
            name: 'quote',
            label: 'Quote',
            type: 'textarea',
            required: true
          },
          {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: true
          },
          link()
        ]
      }
  ]
}