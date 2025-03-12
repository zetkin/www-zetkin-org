import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateNav } from './hooks/revalidateNav'


export const MainNav: GlobalConfig = {
    slug: 'mainNav',
    label: 'Main navigation',
    fields: [
        {
            name: 'topItems',
            label: 'Top-level items',
            labels: {
                plural: 'Top-level items',
                singular: 'Top-level item',
            },
            type: 'array',
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    label: 'Label',
                },
                {
                    name: 'color',
                    type: 'select',
                    options: [
                        {
                            label: 'Purple',
                            value: 'purple',
                        },
                        {
                            label: 'Red',
                            value: 'red',
                        },
                        {
                            label: 'Green',
                            value: 'green',
                        },
                    ],
                },
                {
                    name: 'showInFooter',
                    type: 'checkbox',
                    label: 'Show in footer',
                    defaultValue: true,
                },
                link({
                    appearances: false,
                }),
                {
                    name: 'midItems',
                    label: 'Mid-level items',
                    labels: {
                        plural: 'Mid-level items',
                        singular: 'Mid-level item',
                    },
                    type: 'array',
                    fields: [
                        {
                            name: 'icon',
                            label: 'Icon',
                            type: 'upload',
                            relationTo: 'media',
                            required: false, //should be set to true later
                        },
                        {
                            name: 'label',
                            type: 'text',
                            label: 'Label',
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            label: 'Description',
                        },
                        {
                            name: 'showInFooter',
                            type: 'checkbox',
                            label: 'Show in footer',
                            defaultValue: true,
                        },
                        link({
                            appearances: false,
                        }),
                        {
                            name: 'bottomItems',
                            type: 'array',
                            label: 'Bottom-level items',
                            labels: {
                                singular: 'Bottom-level item',
                                plural: 'Bottom-level items',
                            },
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    label: 'Label',
                                },
                                link({
                                    appearances: false,
                                }),
                            ],
                        },
                    ],
                    admin: {
                        initCollapsed: true,
                    },
                },
            ],
        },
    ],
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [revalidateNav],
    },
}
