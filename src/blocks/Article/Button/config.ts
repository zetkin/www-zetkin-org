import type { Block } from 'payload';

export const Button: Block = {
  slug: 'button',
  interfaceName: 'buttonBlock',
  fields: [
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
  ],
};
