import type { Block } from 'payload';
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { link } from '@/fields/link';

export const Gradient: Block = {
  slug: 'gradient',
  interfaceName: 'GradientBlock',
  labels: {
    singular: 'Home - Gradient block',
    plural: 'Home - Gradient blocks',
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
      name: 'backgroundImageDesktop',
      label: 'Background Image Desktop',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'backgroundImageMobile',
      label: 'Background Image Mobile',
      type: 'upload',
      relationTo: 'media',
      required: true,
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
