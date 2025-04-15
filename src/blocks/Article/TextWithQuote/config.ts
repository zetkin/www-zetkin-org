import type { Block } from 'payload';

export const TextWithQuote: Block = {
  slug: 'textWithQuote',
  interfaceName: 'TextWithQuoteBlock',
  fields: [
    {
      name: 'quote',
      label: 'Quote',
      type: 'textarea',
      required: true,
    },
  ],
};
