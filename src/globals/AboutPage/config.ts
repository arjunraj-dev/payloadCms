import type { GlobalConfig } from 'payload'

import { ctaField, paragraphsField } from '@/fields/cms'
import { iconOptions } from '@/utilities/iconMap'
import { revalidateAboutPage } from './hooks/revalidateAboutPage'

const cardsField = (name: string, label: string) => ({
  name,
  type: 'array' as const,
  label,
  minRows: 1,
  fields: [
    { name: 'icon', type: 'select' as const, required: true, options: iconOptions },
    { name: 'title', type: 'text' as const, required: true },
    { name: 'description', type: 'textarea' as const, required: true },
  ],
})

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
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
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
        {
          label: 'Intro Sections',
          fields: [
            {
              name: 'textImageSections',
              type: 'array',
              label: 'Text + Image sections',
              minRows: 1,
              fields: [
                { name: 'heading', type: 'text', required: true },
                paragraphsField('text'),
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
          label: 'Mission',
          fields: [
            {
              name: 'mission',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                cardsField('cards', 'Cards'),
              ],
            },
          ],
        },
        {
          label: 'Dual CTA',
          fields: [
            {
              name: 'dualCta',
              type: 'group',
              fields: [
                {
                  name: 'first',
                  type: 'group',
                  fields: [
                    { name: 'heading', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    ctaField('button', 'Button', true),
                  ],
                },
                {
                  name: 'second',
                  type: 'group',
                  fields: [
                    { name: 'heading', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    ctaField('button', 'Button', true),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Policy Areas',
          fields: [
            {
              name: 'policyAreas',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                ctaField('cta', 'Button', true),
                {
                  name: 'policies',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Departments',
          fields: [
            {
              name: 'departments',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                {
                  name: 'items',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    { name: 'icon', type: 'select', required: true, options: iconOptions },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'linkLabel', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Minister Profiles',
          fields: [
            {
              name: 'ministerProfiles',
              type: 'array',
              minRows: 1,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'name', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                paragraphsField('bio'),
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
        {
          label: 'Country Future',
          fields: [
            {
              name: 'countryFuture',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'subtitle', type: 'textarea', required: true },
                ctaField('primaryButton', 'Primary Button', true),
                ctaField('secondaryButton', 'Secondary Button'),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateAboutPage],
  },
}
