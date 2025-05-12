import type { Block } from 'payload';

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
          required: true,
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'json', 
          required: true,
          admin: {
            components: {
              Field: 'src/fields/IconPicker/IconPicker', 
            },
          },
        },
        {
          name: 'header',
          label: 'Header',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          required: true,
        },
        {
          name: 'illustration',
          label: 'Illustration',
          type: 'upload',
          relationTo: 'media',
          required: true,
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
          required: true,
        },
        {
          name: 'linkText',
          label: 'Link text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
