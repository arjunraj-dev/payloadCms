import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tagline',
      type: 'textarea',
      required: true,
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Link columns',
      maxRows: 4,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          minRows: 1,
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/ColumnRowLabel#ColumnRowLabel',
        },
      },
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phoneLabel', type: 'text', admin: { description: 'Displayed text, e.g. (242) 327-1530' } },
        { name: 'phoneHref', type: 'text', admin: { description: 'e.g. tel:+12423271530' } },
        { name: 'email', type: 'text' },
        { name: 'address', type: 'text' },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'copyrightText',
      type: 'text',
      required: true,
      admin: {
        description:
          'The year is prepended automatically — e.g. entering "MIND. All rights reserved." renders "© 2026 MIND. All rights reserved."',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
