import type { Block } from 'payload';
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { TextWithQuote } from './TextWithQuote/config';
import { Image } from './Image/config';
import { Button } from './Button/config';
import { Author } from './Author/config';
import { InfoBox } from './InfoBox/config';
import { Preamble } from '../general/Preamble/config';

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
              blocks: [TextWithQuote, Image, Button, Author, InfoBox, Preamble],
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
