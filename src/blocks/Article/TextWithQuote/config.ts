import type { Block } from 'payload';
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

export const TextWithQuote: Block = {
  slug: 'textWithQuote',
  interfaceName: 'TextWithQuoteBlock',
  fields: [
    {
      type: 'row',
      admin: {
        style: {
          width: '100%'
        },
      },
      fields: [
        {
          name: 'richText',
          type: 'richText',
          label: false,
          required: true,
          admin: {
            width: '70%',
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h5'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ];
            },
          }),
        },
        {
          name: 'quote',
          label: 'Quote',
          type: 'textarea',
          required: true,
          admin: {
            width: '26%',
            style: {
              alignSelf: 'center',
              marginTop: '40px',
              marginLeft: '4%',
            },
          },
        },
      ],
    },
  ],
};
