import type { Block } from 'payload';

export const TwoImage: Block = {
  slug: 'twoImage',
  interfaceName: 'twoImageBlock',
  fields: [
    {
      name: 'images',
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      required: true,
      type: 'array',
      maxRows: 2,
      minRows: 2,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mobileOverflow',
          label: 'Mobile overflow',
          type: 'radio',
          admin: {
            layout: 'horizontal',
            width: '50%',
            condition: (_, siblingData) => siblingData?.layout === 'oneImg',
          },
          defaultValue: 'left',
          options: [
            {
              value: 'left',
              label: 'Left',
            },
            {
              value: 'right',
              label: 'Right',
            },
          ],
        },
      ],
    },
    {
      name: 'desktopOverflow',
      label: 'Desktop overflow',
      type: 'checkbox',
      defaultValue: 'false',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'oneImg',
      },
    },
  ],
};
