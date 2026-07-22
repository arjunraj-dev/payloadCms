import config from '@payload-config'
import { getPayload } from 'payload'

import { prepareLogoInlineAttachment } from '@/utilities/prepareEmailLogo'
import {
  buildGetInvolvedEmail,
  DEFAULT_GET_INVOLVED_EMAIL_BODY,
  DEFAULT_GET_INVOLVED_EMAIL_HEADING,
  DEFAULT_GET_INVOLVED_EMAIL_SUBJECT,
  type GetInvolvedEmailData,
  type GetInvolvedEmailTemplate,
} from '@/utilities/renderGetInvolvedEmail'
import type { InlineEmailAttachment } from '@/utilities/sendEmail'
import type { Media } from '@/payload-types'

const DEFAULT_NOTIFICATION_EMAIL = 'idipindas@gmail.com'
const DEFAULT_SUCCESS_MESSAGE = "Thank you for your message. We'll be in touch soon."

export interface GetInvolvedFormSettings {
  notificationEmail: string
  successMessage: string
  emailTemplate: GetInvolvedEmailTemplate
  logoAttachment?: InlineEmailAttachment
}

export async function getInvolvedFormSettings(): Promise<GetInvolvedFormSettings> {
  const payload = await getPayload({ config })

  const [page, header] = await Promise.all([
    payload.findGlobal({
      slug: 'get-involved-page',
      depth: 1,
    }),
    payload.findGlobal({
      slug: 'header',
      depth: 1,
    }),
  ])

  const notifications = page.form?.notifications
  const template = notifications?.emailTemplate

  const templateLogo = template?.logo
  const headerLogo = header?.logo
  const logoMedia =
    (typeof templateLogo === 'object' && templateLogo ? templateLogo : null) ||
    (typeof headerLogo === 'object' && headerLogo ? headerLogo : null)

  const embeddedLogo = await prepareLogoInlineAttachment(logoMedia as Media | null)

  return {
    notificationEmail:
      notifications?.notificationEmail?.trim() ||
      process.env.CONTACT_NOTIFICATION_EMAIL?.trim() ||
      DEFAULT_NOTIFICATION_EMAIL,
    successMessage: notifications?.successMessage?.trim() || DEFAULT_SUCCESS_MESSAGE,
    emailTemplate: {
      emailSubject: template?.subject?.trim() || DEFAULT_GET_INVOLVED_EMAIL_SUBJECT,
      emailHeading: template?.heading?.trim() || DEFAULT_GET_INVOLVED_EMAIL_HEADING,
      emailBody: template?.body?.trim() || DEFAULT_GET_INVOLVED_EMAIL_BODY,
      emailFooter: template?.footer?.trim() || undefined,
      logoUrl: embeddedLogo?.logoUrl,
      logoAlt: embeddedLogo?.logoAlt,
    },
    logoAttachment: embeddedLogo?.attachment,
  }
}

export function buildGetInvolvedNotificationEmail(
  settings: GetInvolvedFormSettings,
  data: GetInvolvedEmailData,
) {
  return buildGetInvolvedEmail(settings.emailTemplate, data)
}
