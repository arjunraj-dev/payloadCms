import type { GlobalConfig } from 'payload'

import { paragraphsField } from '@/fields/cms'
import { iconOptions } from '@/utilities/iconMap'
import { socialPlatformOptions } from '@/utilities/socialIcons'
import { revalidateGetInvolvedPage } from './hooks/revalidateGetInvolvedPage'

const socialLinksField = () => ({
  name: 'socialLinks',
  type: 'array' as const,
  minRows: 1,
  fields: [
    { name: 'platform', type: 'select' as const, required: true, options: socialPlatformOptions },
    { name: 'label', type: 'text' as const, required: true },
    { name: 'href', type: 'text' as const, required: true },
  ],
})

export const GetInvolvedPage: GlobalConfig = {
  slug: 'get-involved-page',
  label: 'Get Involved Page',
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
                paragraphsField('subtitle'),
              ],
            },
          ],
        },
        {
          label: 'Categories',
          fields: [
            {
              name: 'categoriesSection',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                {
                  name: 'categories',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    { name: 'icon', type: 'select', required: true, options: iconOptions },
                    { name: 'image', type: 'upload', relationTo: 'media', required: true },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'href', type: 'text', required: true, defaultValue: '#send-message' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Form',
          fields: [
            {
              name: 'form',
              type: 'group',
              fields: [
                { name: 'formTitle', type: 'text', required: true, defaultValue: 'Send us a message' },
                { name: 'illustrationImage', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
        {
          label: 'Reach Out',
          fields: [
            {
              name: 'reachOut',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                paragraphsField('text'),
                {
                  name: 'button',
                  type: 'group',
                  label: 'Button',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      defaultValue: 'See our latest updates',
                    },
                    {
                      name: 'href',
                      type: 'text',
                      defaultValue: '/progress',
                    },
                  ],
                },
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                {
                  name: 'imagePosition',
                  type: 'select',
                  defaultValue: 'right',
                  options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Right', value: 'right' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Follow The Work',
          fields: [
            {
              name: 'followTheWork',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
                socialLinksField(),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGetInvolvedPage],
  },
}
