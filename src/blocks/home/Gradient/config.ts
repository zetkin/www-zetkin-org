import type { Block } from 'payload';
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { link } from '@/fields/link';

export const Gradient: Block = {
  slug: 'gradient',
  interfaceName: 'GradientBlock',
  fields: [
    {
      name: 'layout',
      type: 'select',
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
      ]
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
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
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
      maxRows: 2,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    }
  ],
};
