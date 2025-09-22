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
          label: 'Two small images - Text right aligned',
          value: 'rightAligned1',
        },
        {
          label: 'Two small images - Text left aligned - Variant 1',
          value: 'leftAligned1',
        },
        {
          label: 'Two small images - Text left aligned - Variant 2',
          value: 'leftAligned2',
        },
        {
          label: 'Single image - Text right aligned - Image overlapping to the left',
          value: 'singleImageLeftOverlap',
        },
        {
          label: 'Single image - Text right aligned - Image overlapping to the left & bottom',
          value: 'singleImageLeftBottomOverlap',
        },
                {
          label: 'Single image - Text left aligned - Image overlapping to the right',
          value: 'singleImageRightOverlap',
        },
        {
          label: 'Single image - Text left aligned - Image overlapping to the right & bottom',
          value: 'singleImageRightBottomOverlap',
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
      admin: {
        description: 'Maximum 4 lines of text on desktop viewports',
      }
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Sub-title',
      required: true,
      admin: {
        description: 'Maximum 5 lines of text on desktop viewports',
      }
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
