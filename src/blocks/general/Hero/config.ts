import type { Block } from 'payload';
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'hero',
  labels: {
    singular: 'Hero block',
    plural: 'Hero blocks',
  },
  fields: [
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      options: [
        {
          label: 'Two images - Left aligned',
          value: 'twoImgLeft',
        },
        {
          label: 'Two images - Center aligned',
          value: 'twoImgCenter',
        },
        {
          label: 'One image - Left aligned',
          value: 'oneImgLeft',
        },
        {
          label: 'One image - Center aligned',
          value: 'oneImgCenter',
        },
        {
          label: 'Feature highlight - Left aligned',
          value: 'featureLeft',
        },
        {
          label: 'Feature highlight - Center aligned',
          value: 'featureCenter',
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
      name: 'readTime',
      type: 'text',
      label: 'Read time',
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
