import type { Block } from 'payload';

export const Author: Block = {
  slug: 'author',
  interfaceName: 'authorBlock',
  fields: [
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'people',
      required: true,
    },
    {
      name: 'socialLink',
      label: 'Contact or social link',
      type: 'select',
      options: [
        {
          value: 'email',
          label: 'E-mail',
        },
        {
          value: 'github',
          label: 'Github',
        },
        {
          value: 'linkedIn',
          label: 'LinkedIn',
        },
        {
          value: 'instagram',
          label: 'Instagram',
        },
        {
          value: 'otherLink',
          label: 'Other link',
        },
      ],
    },
    {
      name: 'backgroundColor',
      label: 'Background color',
      type: 'select',
      options: [
        {
          value: 'greenPurple',
          label: 'Green/Purple',
        },
        {
          value: 'greenRed',
          label: 'Green/Red',
        },
      ],
    },
  ],
};
