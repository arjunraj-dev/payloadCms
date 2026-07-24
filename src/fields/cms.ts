import type { Field, Tab } from 'payload'

export const seoTab = (): Tab => ({
  label: 'SEO',
  fields: [
    {
      name: 'meta',
      type: 'group',
      label: false,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description:
              'Shown in the browser tab and as the clickable headline in search results. Falls back to the default page title if left blank.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description:
              'Shown under the title in search results. Aim for roughly 150-160 characters. Falls back to the default description if left blank.',
          },
        },
      ],
    },
  ],
})

export const paragraphsField = (name: string): Field => ({
  name,
  type: 'array',
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
    },
  ],
})

export const ctaField = (name: string, label: string, required = false): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    { name: 'label', type: 'text', required },
    { name: 'href', type: 'text', required },
  ],
})
