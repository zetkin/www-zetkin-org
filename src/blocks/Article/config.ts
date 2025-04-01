import type { Block } from 'payload';
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { TextWithQuote } from './TextWithQuote/config';

export const Article: Block = {
  slug: 'article',
  interfaceName: 'ArticleBlock',
  fields: [
    {
      name: 'richText',
      type: 'richText',
      label: false,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h5'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            BlocksFeature({
              blocks: [TextWithQuote],
            }),
          ];
        },
      }),
    },
    {
      name: 'linkColor',
      label: 'Link color',
      type: 'select',
      options: [
        {
          label: 'Purple',
          value: 'purple',
        },
        {
          label: 'Green',
          value: 'green',
        },
        {
          label: 'Red',
          value: 'red',
        },
      ],
    },
  ],
};
