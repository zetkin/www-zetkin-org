import type { GlobalConfig } from 'payload';
import {
  ItalicFeature,
  lexicalEditor,
  InlineToolbarFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical';

import { link } from '@/fields/link';

const colorOptions = [
  {
    value: '#7801DD',
    label: 'Purple 100',
  },
  {
    value: '#550096',
    label: 'Purple 200',
  },
  {
    value: '#3F0071',
    label: 'Purple 300',
  },
  {
    value: '#E6FFFA',
    label: 'Light green 100',
  },
  {
    value: '#2AFED2',
    label: 'Light green 200',
  },
  {
    value: '#25E3B1',
    label: 'Light green 300',
  },
  {
    value: '#0F7473',
    label: 'Dark green 100',
  },
  {
    value: '#0C5044',
    label: 'Dark green 300',
  },
  {
    value: '#123C3D',
    label: 'Dark green 400',
  },
  {
    value: '#FE2B5A',
    label: 'Red 100',
  },
  {
    value: '#DC2750',
    label: 'Red 200',
  },
  {
    value: '#C91E40',
    label: 'Red 300',
  },
  {
    value: '#82142D',
    label: 'Red 400',
  },
  {
    value: '#000000',
    label: 'Black',
  },
];

export const Popup: GlobalConfig = {
  slug: 'popup',
  label: 'Popup',
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable popup',
      defaultValue: false,
      admin: {
        description: 'Toggle to show/hide the popup on the website',
      },
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
      admin: {
        description:
          'Use italic styling to mark text that should use a different font',
        condition: (data) => data.enabled === true,
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image (optional)',
      admin: {
        description: 'Optional image to display on the left side of the popup',
        condition: (data) => data.enabled === true,
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      admin: {
        condition: (data) => data.enabled === true,
      },
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      admin: {
        condition: (data) => data.enabled === true,
      },
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
      name: 'backgroundType',
      type: 'select',
      label: 'Background Type',
      required: true,
      defaultValue: 'gradient',
      options: [
        {
          label: 'Gradient',
          value: 'gradient',
        },
        {
          label: 'White',
          value: 'white',
        },
      ],
      admin: {
        condition: (data) => data.enabled === true,
      },
    },
    {
      name: 'frontColor',
      label: 'Front color',
      type: 'select',
      required: true,
      options: colorOptions,
      admin: {
        condition: (data) =>
          data.enabled === true && data.backgroundType === 'gradient',
      },
    },
    {
      name: 'backgroundColor',
      label: 'Background color',
      required: true,
      type: 'select',
      options: colorOptions,
      admin: {
        condition: (data) =>
          data.enabled === true && data.backgroundType === 'gradient',
      },
    },
    {
      name: 'gradientPattern',
      label: 'Gradient pattern',
      type: 'select',
      required: true,
      options: [
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
        {
          value: '3',
          label: '3',
        },
        {
          value: '4',
          label: '4',
        },
        {
          value: '5',
          label: '5',
        },
        {
          value: '6',
          label: '6',
        },
      ],
      admin: {
        condition: (data) =>
          data.enabled === true && data.backgroundType === 'gradient',
      },
    },
    {
      name: 'accentColor',
      type: 'select',
      label: 'Title accent color (for white background)',
      options: [
        {
          label: 'Purple',
          value: 'purple',
        },
        {
          label: 'Red',
          value: 'red',
        },
        {
          label: 'Green',
          value: 'green',
        },
      ],
      admin: {
        condition: (data) =>
          data.enabled === true && data.backgroundType === 'white',
      },
    },
    {
      name: 'showOnPages',
      type: 'relationship',
      label: 'Show on pages',
      relationTo: 'pages',
      hasMany: true,
      admin: {
        description:
          'Select which pages the popup should appear on. Leave empty to show on all pages.',
        condition: (data) => data.enabled === true,
      },
    },
  ],
  access: {
    read: () => true,
  },
};
