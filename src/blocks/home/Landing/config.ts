import type { Block } from 'payload';

import { link } from '@/fields/link';

export const Landing: Block = {
  slug: 'landing',
  interfaceName: 'LandingBlock',
  labels: {
    singular: 'Home - Landing',
    plural: 'Home - Landings',
  },
  fields: [
    {
      name: 'animationStyle',
      type: 'select',
      label: 'Background Animation',
      defaultValue: 'aurora',
      options: [
        {
          label: 'Aurora',
          value: 'aurora',
        },
        {
          label: 'Swirl',
          value: 'swirl',
        },
      ],
    },
    {
      name: 'leftTitle',
      type: 'text',
      label: 'Left title',
      required: true,
    },
    {
      name: 'rightTitle',
      type: 'text',
      label: 'Right title',
      required: true,
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
  ],
};
