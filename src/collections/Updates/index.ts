import type { CollectionConfig } from 'payload'

import { slugField } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { paragraphsField } from '@/fields/cms'
import { revalidateDelete, revalidateUpdate } from './hooks/revalidateUpdate'

export const Updates: CollectionConfig<'updates'> = {
  slug: 'updates',
  labels: {
    singular: 'Update',
    plural: 'Updates',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date'],
  },
  defaultSort: '-date',
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'announcements',
      options: [
        { label: 'Announcement', value: 'announcements' },
        { label: 'Event', value: 'events' },
        { label: 'Statement', value: 'statements' },
        { label: 'Media', value: 'media' },
      ],
    },
    { name: 'excerpt', type: 'textarea', required: true },
    paragraphsField('content'),
  ],
  hooks: {
    afterChange: [revalidateUpdate],
    afterDelete: [revalidateDelete],
  },
}
