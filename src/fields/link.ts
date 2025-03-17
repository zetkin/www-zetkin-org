import type { Field, GroupField } from 'payload';

import deepMerge from '@/utilities/deepMerge';
import { Page } from '@/payload-types';


type LinkType = (options?: {
  overrides?: Partial<GroupField>;
}) => Field;

export const link: LinkType = ({
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    hooks: {
      afterRead: [
        async (config) => {
          if (!config.value) { return config.value; }

          if (config.value.type == 'custom') {
            return {
              ...config.value,
              url: config.value.url,
            };
          } else if (config.value.type == 'reference') {

            if (!config.value.reference || !config.value.reference.relationTo) {
              return config.value;
            }

            const payload = config.req.payload;

            const result = (await payload.findByID({
              collection: config.value.reference.relationTo,
              id: config.value.reference.value,
            })) as Page | null;

            const lastCrumb = result?.breadcrumbs?.pop();

            if (lastCrumb) {
              return {
                ...config.value,
                url: lastCrumb.url,
              };
            }
          }

          return config.value;
        },
      ],
    },
    typescriptSchema: [
      ({ jsonSchema }) => {
        return {
          type: 'object',
          additionalProperties: false,
          properties: {
            ...jsonSchema.properties,
            url: {
              required: true,
              type: ['string'],
            },
          },
        };
      },
    ],
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
        ],
      },
      {
        name: 'reference',
        type: 'relationship',
        admin: {
          condition: (_, siblingData) =>
            siblingData?.type === 'reference',
        },
        label: 'Document to link to',
        relationTo: ['pages'],
        required: true,
      },
      {
        name: 'url',
        type: 'text',
        admin: {
          condition: (_, siblingData) =>
            siblingData?.type === 'custom',
        },
        label: 'Custom URL',
        required: true,
      },
      {
        name: 'newTab',
        type: 'checkbox',
        admin: {
          style: {
            alignSelf: 'flex-end',
          },
          width: '50%',
        },
        label: 'Open in new tab',
      },
    ],
  };

  return deepMerge(linkResult, overrides);
};
