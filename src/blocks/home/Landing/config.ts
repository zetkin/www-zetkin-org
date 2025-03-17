import type { Block } from 'payload';

import { link } from '@/fields/link';


export const Landing: Block = {
  slug: 'landing',
  interfaceName: 'LandingBlock',
  fields: [
    {
        name: 'leftTitle',
        type: 'text',
        label: 'Left title',
        required: true,
    },
    {
        name: 'rightTitle',
        type: 'text',
        label: 'Right title',
        required: true,
    },
    {
        name: 'subtitle',
        type: 'text',
        label: 'Sub-title',
        required: true,
    },
    {
        name: 'buttons',
        type: 'array',
        fields: [
            {
                name: 'label',
                type: 'text',
                label: 'Button label',
                required: true,
            },
            {
                name: 'variant',
                type: 'select',
                options: [
                    {
                        label: 'Primary',
                        value: 'primary',
                    },
                    {
                        label: 'Outline',
                        value: 'outline',
                    },
                ]        
            },
            link(),
        ],
    }
  ],
};
