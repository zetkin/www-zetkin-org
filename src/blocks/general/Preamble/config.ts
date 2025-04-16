import { Block } from 'payload';

export const Preamble: Block = {
  slug: 'preamble',
  interfaceName: 'PreambleBlock',
  labels: {
    singular: 'Preamble block',
    plural: 'Preamble block',
  },
  fields: [
    {
      name: 'layout',
      label: 'Layout',
      required: true,
      type: 'select',
      defaultValue: 'preambleOnly',
      options: [
        {
          value: 'longHeaderNText',
          label: 'Long header and long text',
        },
        {
          value: 'longPreambleNText',
          label: 'Long preamble and long text',
        },
        {
          value: 'preambleOnly',
          label: 'Preamble only',
        },
        {
          value: 'preambleHeaderTextNImage',
          label: 'Preamble, header, text and image',
        },
        {
          value: 'preambleNImage',
          label: 'Preamble and image',
        },
      ],
      admin: {
        description:
          'If the page is an article only use the "Preamble only" layout.',
      },
    },
    {
      name: 'width',
      label: 'Width',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Full width',
          value: 'full',
        },
        {
          label: 'Article width',
          value: 'article',
        },
      ],
      defaultValue: 'full',
      admin: {
        condition: (_, { layout } = {}) => ['preambleOnly'].includes(layout),
      },
    },
    {
      name: 'preamble',
      label: 'Preamble',
      type: 'textarea',
      required: true,
      admin: {
        condition: (_, { layout } = {}) =>
          [
            'preambleOnly',
            'longPreambleNText',
            'preambleHeaderTextNImage',
            'preambleNImage',
          ].includes(layout),
      },
    },
    {
      name: 'header',
      label: 'Header',
      type: 'text',
      required: true,
      admin: {
        condition: (_, { layout } = {}) =>
          ['longHeaderNText', 'preambleHeaderTextNImage'].includes(layout),
      },
    },
    {
      name: 'mainText',
      label: 'Main text',
      type: 'richText',
      required: true,
      admin: {
        condition: (_, { layout } = {}) =>
          [
            'longHeaderNText',
            'longPreambleNText',
            'preambleHeaderTextNImage',
          ].includes(layout),
      },
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { layout } = {}) =>
          ['preambleNImage', 'preambleHeaderTextNImage'].includes(layout),
      },
    },
  ],
};
