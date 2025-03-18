import type { ArrayField, Field } from 'payload';

import deepMerge from '@/utilities/deepMerge';
import { link } from './link';

type LinkGroupType = (options?: { overrides?: Partial<ArrayField> }) => Field;

export const linkGroup: LinkGroupType = ({ overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    required: true,
    fields: [link()],
    admin: {
      initCollapsed: true,
    },
  };

  return deepMerge(generatedLinkGroup, overrides);
};
