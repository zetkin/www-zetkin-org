import type { GlobalConfig } from 'payload'

import { revalidateNav } from './hooks/revalidateNav'

import { Page } from '../payload-types'


export const MainNav: GlobalConfig = {
    slug: 'mainNav',
    label: 'Main navigation',   
    fields: [
        {
            name: 'topItems',
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
                    name: 'items',
                    type: 'array',
                    fields: [
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
                            name: 'link',
                            type: 'group',
                            admin: {
                                hideGutter: true,
                            },
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'type',
                                            type: 'radio',
                                            admin: {
                                                layout: 'horizontal',
                                                width: '50%',
                                            },
                                            defaultValue: 'reference',
                                            options: [
                                                {
                                                    label: 'Internal link',
                                                    value: 'reference',
                                                },
                                                {
                                                    label: 'Custom URL',
                                                    value: 'custom',
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    name: 'reference',
                                    type: 'relationship',
                                    admin: {
                                        condition: (_, siblingData) =>
                                            siblingData?.type === 'reference',
                                    },
                                    label: 'Document to link to',
                                    relationTo: ['pages'],
                                    required: true,
                                },
                                {
                                    name: 'url',
                                    type: 'text',
                                    admin: {
                                        condition: (_, siblingData) =>
                                            siblingData?.type === 'custom',
                                    },
                                    label: 'Custom URL',
                                    required: true,
                                },
                            ],
                        },
                        {
                            name: 'items',
                            type: 'array',
                            label: 'Items',
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    label: 'Label',
                                },
                                {
                                    name: 'link',
                                    type: 'group',
                                    admin: {
                                        hideGutter: true,
                                    },
                                    hooks: {
                                        afterRead: [
                                            async (config) => {
                                                if (config.value.type == 'custom') {
                                                    return {
                                                        ...config.value,
                                                        url: config.value.url,
                                                    };
                                                } else if (config.value.type == 'reference') {
                                                    const payload = config.req.payload;

                                                    const result = (await payload.findByID({
                                                        collection: config.value.reference.relationTo,
                                                        id: config.value.reference.value,
                                                    })) as Page | null;

                                                    const lastCrumb = result?.breadcrumbs?.pop();

                                                    if (lastCrumb) {
                                                        return {
                                                            ...config.value,
                                                            url: lastCrumb.url,
                                                        };
                                                    }
                                                }
                                            },
                                        ],
                                    },
                                    typescriptSchema: [
                                        ({ jsonSchema }) => {
                                            return {
                                                type: 'object',
                                                additionalProperties: false,
                                                properties: {
                                                    ...jsonSchema.properties,
                                                    url: {
                                                        required: true,
                                                        type: ['string'],
                                                    },
                                                },
                                            };
                                        },
                                    ],
                                    fields: [
                                        {
                                            type: 'row',
                                            fields: [
                                                {
                                                    name: 'type',
                                                    type: 'radio',
                                                    admin: {
                                                        layout: 'horizontal',
                                                        width: '50%',
                                                    },
                                                    defaultValue: 'reference',
                                                    options: [
                                                        {
                                                            label: 'Internal link',
                                                            value: 'reference',
                                                        },
                                                        {
                                                            label: 'Custom URL',
                                                            value: 'custom',
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                        {
                                            name: 'reference',
                                            type: 'relationship',
                                            admin: {
                                                condition: (_, siblingData) =>
                                                    siblingData?.type === 'reference',
                                            },
                                            label: 'Document to link to',
                                            relationTo: ['pages'],
                                            required: true,
                                        },
                                        {
                                            name: 'url',
                                            type: 'text',
                                            admin: {
                                                condition: (_, siblingData) =>
                                                    siblingData?.type === 'custom',
                                            },
                                            label: 'Custom URL',
                                            required: true,
                                        },
                                    ],
                                },
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
