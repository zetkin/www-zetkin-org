import type { Block } from 'payload';

import { link } from '@/fields/link';

export const ArticleHighlight: Block = {
  slug: 'articleHighlight',
  interfaceName: 'ArticleHighlightBlock',
  labels: {
    singular: 'Article highlight',
    plural: 'Article highlights',
  },
  fields: [
    {
      name: 'articles',
      label: {
        singular: 'Article',
        plural: 'Articles',
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
          name: 'quote',
          label: 'Quote',
          type: 'textarea',
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
