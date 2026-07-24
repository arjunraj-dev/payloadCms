import type { GlobalConfig } from 'payload'

import { paragraphsField, seoTab } from '@/fields/cms'
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
                {
                  name: 'notifications',
                  type: 'group',
                  label: 'Email notifications',
                  admin: {
                    description:
                      'Configure where form submissions are sent. SendGrid API credentials stay in server environment variables.',
                  },
                  fields: [
                    {
                      name: 'notificationEmail',
                      type: 'email',
                      label: 'Notification email',
                      required: true,
                      defaultValue: 'idipindas@gmail.com',
                      admin: {
                        description: 'Inbox that receives Get Involved form submissions.',
                      },
                    },
                    {
                      name: 'emailTemplate',
                      type: 'group',
                      label: 'Email template',
                      admin: {
                        description:
                          'Customize the notification email content. Use {{name}}, {{email}}, {{category}}, and {{message}} as placeholders. The HTML email is styled automatically to match the MIND website.',
                      },
                      fields: [
                        {
                          name: 'logo',
                          type: 'upload',
                          relationTo: 'media',
                          label: 'Email logo',
                          admin: {
                            description:
                              'Shown in the email header. Prefer PNG or JPG (email clients often block SVG). If empty, the Header logo is used.',
                          },
                        },
                        {
                          name: 'subject',
                          type: 'text',
                          label: 'Email subject',
                          defaultValue: 'Get Involved: {{category}} — {{name}}',
                        },
                        {
                          name: 'heading',
                          type: 'text',
                          label: 'Email heading',
                          defaultValue: 'New Get Involved submission',
                        },
                        {
                          name: 'body',
                          type: 'textarea',
                          label: 'Plain text body',
                          defaultValue:
                            'You have received a new message from the Get Involved form.\n\nName: {{name}}\nEmail: {{email}}\nCategory: {{category}}\n\nMessage:\n{{message}}',
                          admin: {
                            description:
                              'Used for the plain-text version of the email. The HTML version uses the branded MIND layout automatically.',
                          },
                        },
                        {
                          name: 'footer',
                          type: 'textarea',
                          label: 'Email footer',
                          admin: {
                            description: 'Optional footer text shown at the bottom of the email.',
                          },
                        },
                      ],
                    },
                    {
                      name: 'successMessage',
                      type: 'textarea',
                      label: 'Success message',
                      defaultValue: "Thank you for your message. We'll be in touch soon.",
                      admin: {
                        description: 'Shown to visitors after a successful form submission.',
                      },
                    },
                  ],
                },
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
        seoTab(),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGetInvolvedPage],
  },
}
