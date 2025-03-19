import type { GlobalConfig } from 'payload';

import { link } from '@/fields/link';
import { revalidateNav } from './hooks/revalidateNav';

export const MainNav: GlobalConfig = {
  slug: 'mainNav',
  label: 'Main navigation',
  fields: [
    {
      name: 'topItems',
      label: 'Top-level items',
      labels: {
        plural: 'Top-level items',
        singular: 'Top-level item',
      },
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'longLabel',
          type: 'text',
          label: 'Longer label for mobile full screen menu',
        },
        {
          name: 'color',
          type: 'select',
          options: [
            {
              label: 'Purple',
              value: 'purple',
            },
            {
              label: 'Red',
              value: 'red',
            },
            {
              label: 'Green',
              value: 'green',
            },
          ],
        },
        {
          name: 'showInFooter',
          type: 'checkbox',
          label: 'Show in footer',
          defaultValue: true,
        },
        link(),
        {
          name: 'midItems',
          label: 'Mid-level items',
          labels: {
            plural: 'Mid-level items',
            singular: 'Mid-level item',
          },
          type: 'array',
          fields: [
            {
              name: 'icon',
              label: 'Icon',
              type: 'upload',
              relationTo: 'media',
              required: false, //should be set to true later
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Description',
            },
            {
              name: 'showInFooter',
              type: 'checkbox',
              label: 'Show in footer',
              defaultValue: true,
            },
            link(),
            {
              name: 'bottomItems',
              type: 'array',
              label: 'Bottom-level items',
              labels: {
                singular: 'Bottom-level item',
                plural: 'Bottom-level items',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Label',
                },
                link(),
              ],
            },
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Social Links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Instagram',
              value: 'instagram',
            },
            {
              label: 'Facebook',
              value: 'facebook',
            },
            {
              label: 'Github',
              value: 'github',
            },
          ],
        },
        {
          name: 'link',
          type: 'text',
          label: 'URL',
          required: true,
          validate: (value: string | string[] | null | undefined) => {
            try {
              if (typeof value === 'string') {
                const url = new URL(value);
                return !!url; 
              } else {
                throw new Error('Invalid URL');
              }
            } catch (_err) {
              return 'Invalid URL';
            }
          },
        },
      ],
    },
  ],
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateNav],
  },
};
