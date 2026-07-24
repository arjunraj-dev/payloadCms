import type { GlobalConfig } from 'payload'

import { ctaField, seoTab } from '@/fields/cms'
import { revalidateUpdatesPage } from './hooks/revalidateUpdatesPage'

export const UpdatesPage: GlobalConfig = {
  slug: 'updates-page',
  label: 'Updates Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'subtitle', type: 'textarea', required: true },
              ],
            },
            {
              name: 'closing',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'subtitle', type: 'textarea', required: true },
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
    afterChange: [revalidateUpdatesPage],
  },
}
