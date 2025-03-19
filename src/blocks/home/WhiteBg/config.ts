import type { Block } from 'payload';
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { link } from '@/fields/link';

export const WhiteBg: Block = {
  slug: 'whiteBg',
  interfaceName: 'WhiteBg',
  labels: {
    singular: 'Home - White background block',
    plural: 'Home - White background blocks',
  },
  fields: [
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      options: [
        {
          label: 'UI - Center aligned',
          value: 'uiCenter',
        },
        {
          label: 'UI - Left aligned',
          value: 'uiLeft',
        },
        {
          label: 'Images - Center aligned',
          value: 'imagesCenter',
        },
        {
          label: 'Images - Left aligned',
          value: 'imagesLeft',
        },
        {
          label: 'Images - Right aligned',
          value: 'imagesRight',
        },
        {
          label: 'Illustration',
          value: 'illustration',
        },
      ],
    },
    {
      name: 'accentColor',
      label: 'Accent Color',
      type: 'select',
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
      type: 'richText',
      label: 'Title',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sub-title',
      required: true,
    },
    {
      name: 'buttons',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Button label',
          required: true,
        },
        link(),
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      required: true,
      maxRows: 2,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
};
