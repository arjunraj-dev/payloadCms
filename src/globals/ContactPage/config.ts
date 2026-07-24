import type { GlobalConfig } from 'payload'

import { ctaField, paragraphsField, seoTab } from '@/fields/cms'
import { iconOptions } from '@/utilities/iconMap'
import { socialPlatformOptions } from '@/utilities/socialIcons'
import { revalidateContactPage } from './hooks/revalidateContactPage'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'subtitle', type: 'textarea', required: true },
                ctaField('secondaryCTA', 'Secondary Button'),
              ],
            },
          ],
        },
        {
          label: 'Office Info',
          fields: [
            {
              name: 'officeInfo',
              type: 'group',
              fields: [
                { name: 'address', type: 'text', required: true },
                { name: 'phone', type: 'text', required: true },
                { name: 'email', type: 'text', required: true },
                paragraphsField('hours'),
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
        {
          label: 'Enquiries',
          fields: [
            {
              name: 'enquiries',
              type: 'array',
              minRows: 1,
              fields: [
                { name: 'icon', type: 'select', required: true, options: iconOptions },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                { name: 'email', type: 'text', required: true },
              ],
            },
          ],
        },
        {
          label: 'Follow Us',
          fields: [
            {
              name: 'followUs',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'subtitle', type: 'text', required: true },
                {
                  name: 'socialLinks',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    {
                      name: 'platform',
                      type: 'select',
                      required: true,
                      options: socialPlatformOptions,
                    },
                    { name: 'label', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Closing',
          fields: [
            {
              name: 'closing',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'subtitle', type: 'text' },
                ctaField('primaryButton', 'Primary Button', true),
              ],
            },
          ],
        },
        seoTab(),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateContactPage],
  },
}
