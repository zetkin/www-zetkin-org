import type { CollectionConfig } from 'payload';

import { anyone } from '../access/anyone';
import { authenticated } from '../access/authenticated';

export const People: CollectionConfig = {
  slug: 'people',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'tags'],
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
        },
        {
          name: 'pronouns',
          label: 'Pronous',
          type: 'text',
        },
      ],
    },
    {
      name: 'photo',
      label: 'Photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'role',
          label: 'Role',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Contact and socials',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'email',
              label: 'E-mail',
              type: 'text',
            },
            {
              name: 'linkedIn',
              label: 'LinkedIn',
              type: 'text',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'github',
              label: 'Github',
              type: 'text',
            },
            {
              name: 'instagram',
              label: 'Instagram',
              type: 'text',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'otherLink',
              label: 'Other link',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'profilePiece',
      label: 'Profile piece',
      type: 'relationship',
      relationTo: 'pages',
    },
  ],
};
