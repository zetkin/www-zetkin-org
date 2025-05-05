import type { Block } from 'payload';
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';

import { TextWithQuote } from './TextWithQuote/config';
import { TwoImage } from './TwoImages/config';
import { OneImage } from './OneImage/config';
import { Button } from './Button/config';
import { InfoBox } from './InfoBox/config';
import { PreambleArticle } from './Preamble/config';

export const Article: Block = {
  slug: 'article',
  interfaceName: 'ArticleBlock',
  fields: [
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'people',
    },
    {
      name: 'socialLink',
      label: 'Contact or social link',
      type: 'select',
      hasMany: true,
      options: [
        {
          value: 'email',
          label: 'E-mail',
        },
        {
          value: 'github',
          label: 'Github',
        },
        {
          value: 'linkedIn',
          label: 'LinkedIn',
        },
        {
          value: 'instagram',
          label: 'Instagram',
        },
        {
          value: 'otherLink',
          label: 'Other link',
        },
      ],
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.author),
      },
    },
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
              blocks: [
                TextWithQuote,
                TwoImage,
                OneImage,
                Button,
                InfoBox,
                PreambleArticle,
              ],
            }),
          ];
        },
      }),
    },
  ],
};
