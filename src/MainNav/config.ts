import type { GlobalConfig } from 'payload';

import { link } from '@/fields/link';
import { revalidateNav } from './hooks/revalidateNav';
import { TopLevelLabel } from './Labels/TopLevelLabel';
import { MidLevelLabel } from './Labels/MidLevelLabel';
import { BottomLevelLabel } from './Labels/BottomLevelLabel';

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
      admin: {
        components: {
          //@ts-expect-error TopLevelLabel is not typed correctly for this context
          RowLabel: TopLevelLabel,
        },
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
              admin: {
                components: {
                  //@ts-expect-error BottomLevelLabel is not typed correctly for this context
                  RowLabel: BottomLevelLabel,
                },
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
            components: {
              //@ts-expect-error MidLevelLabel is not typed correctly for this context
              RowLabel: MidLevelLabel,
            },
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
              label: 'Bluesky',
              value: 'bluesky',
            },
            {
              label: 'LinkedIn',
              value: 'linkedin',
            },
            {
              label: 'Mastodon',
              value: 'mastodon',
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
