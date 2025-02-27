// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import sharp from 'sharp'; // sharp-import
import path from 'path';
import { buildConfig, PayloadRequest } from 'payload';
import { fileURLToPath } from 'url';

import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { Users } from './collections/Users';
import { plugins } from './plugins';
import { defaultLexical } from '@/fields/defaultLexical';
import { getServerSideURL } from './utilities/getURL';
import { Page } from './payload-types';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    components: {},
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [Pages, Media, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    {
      slug: 'mainNav',
      fields: [
        {
          name: 'topItems',
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
              name: 'items',
              type: 'array',
              fields: [
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
                  name: 'link',
                  type: 'group',
                  admin: {
                    hideGutter: true,
                  },
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
                  ],
                },
                {
                  name: 'items',
                  type: 'array',
                  label: 'Items',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      label: 'Label',
                    },
                    {
                      name: 'link',
                      type: 'group',
                      admin: {
                        hideGutter: true,
                      },
                      hooks: {
                        afterRead: [
                          async (config) => {
                            if (config.value.type == 'custom') {
                              return {
                                ...config.value,
                                url: config.value.url,
                              };
                            } else if (config.value.type == 'reference') {
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
                      ],
                    },
                  ],
                },
              ],
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
      ],
    },
  ],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) {
          return true;
        }

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization');
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
});
