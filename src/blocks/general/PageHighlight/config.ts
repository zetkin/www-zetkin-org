import type { Block } from 'payload';

import { link } from '@/fields/link';

export const PageHighlight: Block = {
  slug: 'pageHighlight',
  interfaceName: 'PageHighlightBlock',
  labels: {
    singular: 'Page highlight',
    plural: 'Page highlights',
  },
  fields: [
    {
      name: 'pages',
      label: {
        singular: 'Page',
        plural: 'Pages',
      },
      type: 'array',
      minRows: 2,
      maxRows: 2,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'hideLink',
          label: 'Hide link',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'linkText',
          label: 'Link text',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) => !siblingData?.hideLink,
          },
        },
        link({
          overrides: {
            admin: {
              hideGutter: true,
              condition: (_, siblingData) => !siblingData?.hideLink,
            },
          },
        }),
      ],
    },
  ],
};
