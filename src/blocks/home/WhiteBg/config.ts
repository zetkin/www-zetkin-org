import type { Block } from 'payload';
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { link } from '@/fields/link';

export const WhiteBg: Block = {
  slug: 'whiteBg',
  interfaceName: 'WhiteBg',
  labels: {
    singular: 'Home - White background',
    plural: 'Home - White backgrounds',
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
        features: [
          ItalicFeature(),
          InlineToolbarFeature(),
          FixedToolbarFeature(),
        ],
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
        {
          name: 'variant',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
          ],
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
