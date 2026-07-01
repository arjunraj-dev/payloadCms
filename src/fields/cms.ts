import type { Field } from 'payload'

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
