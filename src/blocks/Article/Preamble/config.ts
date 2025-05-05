import { Block } from 'payload';

export const PreambleArticle: Block = {
  slug: 'preambleArticle',
  interfaceName: 'PreambleArticleBlock',
  labels: {
    singular: 'Preamble',
    plural: 'Preamble',
  },
  fields: [
    {
      name: 'preamble',
      label: 'Preamble',
      type: 'textarea',
      required: true,
    },
  ],
};
