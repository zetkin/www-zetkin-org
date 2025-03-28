import type { Block } from 'payload';

import { iconOptions } from '@/icons/FeatureIcons';

export const FeatureList: Block = {
  slug: 'featureList',
  interfaceName: 'featureListBlock',
  fields: [
    {
      name: 'header',
      label: 'Header',
      type: 'text',
    },
    {
      name: 'subHeader',
      label: 'Sub-header',
      type: 'text',
    },
    {
      name: 'features',
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      required: true,
      type: 'array',
      fields: [
        {
          name: 'featureName',
          label: 'Feature name',
          type: 'text',
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'select',
          options: iconOptions,
        },
        {
          name: 'header',
          label: 'Header',
          type: 'text',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
        },
        {
          name: 'illustration',
          label: 'Illustration',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'offset',
          label: 'Mobile - Illustration x-axis offset',
          admin: {
            description:
              'Negative value for image to go to left, positive to right. Default for odd items is -20px and for even items 20px.',
          },
          type: 'number',
        },
        {
          name: 'link',
          label: 'Page link',
          type: 'relationship',
          relationTo: 'pages',
        },
      ],
    },
    {
      name: 'buttons',
      labels: {
        singular: 'Button',
        plural: 'Buttons',
      },
      required: true,
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
        },
        {
          name: 'variant',
          label: 'Variant',
          type: 'select',
          options: [
            {
              value: 'primary',
              label: 'Primary',
            },
            {
              value: 'outline',
              label: 'Outline',
            },
          ],
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
  ],
};
