import type { GlobalConfig } from 'payload'

import { ctaField } from '@/fields/cms'
import { iconOptions } from '@/utilities/iconMap'
import { revalidateProgressPage } from './hooks/revalidateProgressPage'

const labelColorOptions = [
  { label: 'Green', value: 'green' },
  { label: 'Blue', value: 'blue' },
  { label: 'Orange', value: 'orange' },
  { label: 'Dark', value: 'dark' },
  { label: 'Planned (grey)', value: 'planned' },
]

const pillarCardsField = () => ({
  name: 'cards',
  type: 'array' as const,
  minRows: 1,
  fields: [
    { name: 'icon', type: 'select' as const, required: true, options: iconOptions },
    { name: 'label', type: 'text' as const, required: true },
    {
      name: 'labelColor',
      type: 'select' as const,
      required: true,
      defaultValue: 'green',
      options: labelColorOptions,
    },
    { name: 'title', type: 'text' as const, required: true },
    { name: 'description', type: 'textarea' as const, required: true },
  ],
})

export const ProgressPage: GlobalConfig = {
  slug: 'progress-page',
  label: 'Progress Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Status',
          fields: [
            {
              name: 'status',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                {
                  name: 'cards',
                  type: 'array',
                  minRows: 1,
                  maxRows: 4,
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                    { name: 'icon', type: 'select', required: true, options: iconOptions },
                    {
                      name: 'color',
                      type: 'text',
                      required: true,
                      admin: { description: 'Hex color, e.g. #16A34A' },
                    },
                    { name: 'image', type: 'upload', relationTo: 'media', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Modernize Government',
          fields: [
            {
              name: 'modernizeGovernment',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                pillarCardsField(),
              ],
            },
          ],
        },
        {
          label: 'Build Future Readiness',
          fields: [
            {
              name: 'buildFutureReadiness',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                pillarCardsField(),
              ],
            },
          ],
        },
        {
          label: 'Develop Bahamian Talent',
          fields: [
            {
              name: 'developBahamianTalent',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                pillarCardsField(),
              ],
            },
          ],
        },
        {
          label: 'Drive National Development',
          fields: [
            {
              name: 'driveNationalDevelopment',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                pillarCardsField(),
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
                { name: 'pillarsHeading', type: 'text' },
                { name: 'pillarsDescription', type: 'textarea' },
                { name: 'footerText', type: 'textarea' },
                ctaField('primaryButton', 'Primary Button', true),
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateProgressPage],
  },
}
