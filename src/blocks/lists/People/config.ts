import type { Block } from 'payload';

import { peopleCategories } from '@/collections/People';

export const PeopleList: Block = {
  slug: 'peopleList',
  interfaceName: 'peopleListBlock',
  fields: [
    {
      name: 'peopleCategory',
      label: 'People category',
      type: 'select',
      options: peopleCategories
    }
  ],
};
