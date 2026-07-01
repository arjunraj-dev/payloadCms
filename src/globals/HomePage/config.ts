import type { GlobalConfig } from 'payload'

import { ctaField, paragraphsField } from '@/fields/cms'
import { revalidateHomePage } from './hooks/revalidateHomePage'

export const HomePage: GlobalConfig = {
  slug: 'homepage',
  label: 'Home Page',
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
                ctaField('primaryCTA', 'Primary Button', true),
                ctaField('secondaryCTA', 'Secondary Button'),
                {
                  name: 'backgroundImages',
                  type: 'array',
                  label: 'Background Images (slideshow)',
                  minRows: 1,
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'backgroundImageInterval',
                  type: 'number',
                  label: 'Slideshow interval (ms)',
                  defaultValue: 5000,
                },
              ],
            },
          ],
        },
        {
          label: 'Show You',
          fields: [
            {
              name: 'showYou',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                ctaField('cta', 'Button', true),
                {
                  name: 'cards',
                  type: 'array',
                  maxRows: 4,
                  minRows: 1,
                  fields: [
                    { name: 'title', type: 'text', required: true },
                    {
                      name: 'label',
                      type: 'text',
                      required: true,
                      admin: { description: "e.g. LIVE, COMING, IN PROGRESS" },
                    },
                    {
                      name: 'labelColor',
                      type: 'select',
                      required: true,
                      defaultValue: 'green',
                      options: [
                        { label: 'Green', value: 'green' },
                        { label: 'Blue', value: 'blue' },
                        { label: 'Orange', value: 'orange' },
                      ],
                    },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Ministry Built',
          fields: [
            {
              name: 'ministryBuilt',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                paragraphsField('description'),
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                ctaField('button', 'Button', true),
              ],
            },
          ],
        },
        {
          label: 'Minister Profile',
          fields: [
            {
              name: 'ministerProfile',
              type: 'group',
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
          label: 'Initiatives',
          fields: [
            {
              name: 'initiatives',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                ctaField('cta', 'Button', true),
                {
                  name: 'cards',
                  type: 'array',
                  maxRows: 4,
                  minRows: 1,
                  fields: [
                    {
                      name: 'icon',
                      type: 'select',
                      required: true,
                      defaultValue: 'briefcase',
                      options: [
                        { label: 'Briefcase', value: 'briefcase' },
                        { label: 'Target', value: 'target' },
                        { label: 'Users', value: 'users' },
                        { label: 'Trending Up', value: 'trending-up' },
                      ],
                    },
                    { name: 'title', type: 'text', required: true },
                    { name: 'description', type: 'textarea', required: true },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Government Service',
          fields: [
            {
              name: 'governmentService',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                ctaField('cta', 'Button', true),
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
        {
          label: 'Draw Threads',
          fields: [
            {
              name: 'drawThreads',
              type: 'group',
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                {
                  name: 'tags',
                  type: 'array',
                  minRows: 1,
                  fields: [
                    { name: 'label', type: 'text', required: true },
                    { name: 'href', type: 'text', required: true },
                  ],
                },
                ctaField('cta', 'Button', true),
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
                {
                  name: 'heading',
                  type: 'textarea',
                  required: true,
                  admin: { description: 'Use a new line to force a line break.' },
                },
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
    afterChange: [revalidateHomePage],
  },
}
