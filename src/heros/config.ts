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
          label: 'Simple',
          value: 'simple',
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
        condition: (_, { layout } = {}) => !['none', 'simple'].includes(layout),
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
          ['featureLeft', 'featureCenter', 'simple'].includes(layout),
      },
    },
    {
      name: 'readTime',
      type: 'number',
      label: 'Read time (in minutes)',
      admin: {
        condition: (_, { layout } = {}) => !['none', 'simple'].includes(layout),
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      admin: {
        condition: (_, { layout } = {}) => !['none', 'simple'].includes(layout),
        description:
          'Different layouts require images in different formats. The layouts containing the word "image(s)" require photos. The layouts containing the word "feature" require an edited screenshot of a feature in the platform. See the Figma file for examples: https://www.figma.com/design/W7LOdf5DOLohf1UpRJDBS7/Fall-2024-iterations?node-id=1279-36495&t=5AZ70F8QDksUKjBD-1',
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
