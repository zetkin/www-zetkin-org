import type { Field } from 'payload';
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'layout',
      label: 'Layout',
      type: 'select',
      defaultValue: 'none',
      options: [
        {
          label: 'None',
          value: 'none',
        },
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
      name: 'width',
      label: 'Width',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Full width',
          value: 'full',
        },
        {
          label: 'Article width',
          value: 'article',
        },
      ],
      defaultValue: 'full',
      admin: {
        condition: (_, { layout } = {}) =>
          ['twoImgLeft', 'oneImgLeft', 'featureLeft'].includes(layout),
      },
    },
    {
      name: 'eyebrowHeading',
      label: 'Eyebrow heading',
      type: 'text',
      admin: {
        condition: (_, { layout } = {}) => !['none'].includes(layout),
      },
    },
    {
      name: 'title',
      type: 'richText',
      label: 'Title',
      admin: {
        condition: (_, { layout } = {}) => !['none'].includes(layout),
      },
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
      admin: {
        condition: (_, { layout } = {}) =>
          ['featureLeft', 'featureCenter'].includes(layout),
      },
    },
    {
      name: 'readTime',
      type: 'number',
      label: 'Read time (in minutes)',
      admin: {
        condition: (_, { layout } = {}) => !['none'].includes(layout),
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      admin: {
        condition: (_, { layout } = {}) => !['none'].includes(layout),
      },
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
