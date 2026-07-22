import sgMail from '@sendgrid/mail'

export interface InlineEmailAttachment {
  content: string
  filename: string
  type: string
  disposition: 'inline' | 'attachment'
  contentId: string
}

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  text: string
  html?: string
  replyTo?: string
  attachments?: InlineEmailAttachment[]
}

function getEmailConfig() {
  const apiKey = process.env.SENDGRID_API_KEY
  const fromEmail = process.env.EMAIL_FROM_ADDRESS
  const fromName = process.env.EMAIL_FROM_NAME || 'MIND Website'

  if (!apiKey || !fromEmail) {
    return null
  }

  return { apiKey, fromEmail, fromName }
}

export function isEmailConfigured(): boolean {
  return getEmailConfig() !== null
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
  attachments,
}: SendEmailOptions): Promise<void> {
  const config = getEmailConfig()

  if (!config) {
    throw new Error('Email is not configured. Set SENDGRID_API_KEY and EMAIL_FROM_ADDRESS.')
  }

  sgMail.setApiKey(config.apiKey)

  await sgMail.send({
    to,
    from: {
      email: config.fromEmail,
      name: config.fromName,
    },
    subject,
    text,
    html: html ?? text.replace(/\n/g, '<br>'),
    ...(replyTo ? { replyTo: { email: replyTo } } : {}),
    ...(attachments?.length
      ? {
          attachments: attachments.map((attachment) => ({
            content: attachment.content,
            filename: attachment.filename,
            type: attachment.type,
            disposition: attachment.disposition,
            content_id: attachment.contentId,
          })),
        }
      : {}),
  })
}
