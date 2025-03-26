import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical';
import type { Block } from 'payload';

export const InfoBox: Block = {
  slug: 'infoBox',
  interfaceName: 'infoBoxBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      label: false,
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h5'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
          ];
        },
      }),
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
