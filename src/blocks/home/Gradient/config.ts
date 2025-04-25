import type { Block } from 'payload';
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
    value: '#C91E40',
    label: 'Red 300',
  },
  {
    value: '#82142D',
    label: 'Red 400',
  },
];

export const Gradient: Block = {
  slug: 'gradient',
  interfaceName: 'GradientBlock',
  labels: {
    singular: 'Home - Gradient',
    plural: 'Home - Gradients',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      required: true,
      label: 'Layout',
      options: [
        {
          label: 'Right aligned 1',
          value: 'rightAligned1',
        },
        {
          label: 'Left aligned 1',
          value: 'leftAligned1',
        },
        {
          label: 'Left aligned 2',
          value: 'leftAligned2',
        },
        {
          label: 'Single image left overlap',
          value: 'singleImageLeftOverlap',
        },
        {
          label: 'Single image left/bottom overlap',
          value: 'singleImageLeftBottomOverlap',
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
        link(),
      ],
    },
    {
      name: 'frontColor',
      label: 'Front color',
      type: 'select',
      required: true,
      options: colorOptions,
    },
    {
      name: 'backgroundColor',
      label: 'Background color',
      required: true,
      type: 'select',
      options: colorOptions,
    },
    {
      name: 'desktopGradientPattern',
      label: 'Desktop gradient pattern',
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
    },
    {
      name: 'mobileGradientPattern',
      label: 'Mobile gradient pattern',
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
