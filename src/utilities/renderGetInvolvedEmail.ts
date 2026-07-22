import { getServerSideURL } from '@/utilities/getURL'

export interface GetInvolvedEmailData {
  name: string
  email: string
  category: string
  message: string
}

export interface GetInvolvedEmailTemplate {
  emailSubject: string
  emailHeading: string
  emailBody: string
  emailFooter?: string
  logoUrl?: string
  logoAlt?: string
}

export const DEFAULT_GET_INVOLVED_EMAIL_SUBJECT = 'Get Involved: {{category}} — {{name}}'
export const DEFAULT_GET_INVOLVED_EMAIL_HEADING = 'New Get Involved submission'
export const DEFAULT_GET_INVOLVED_EMAIL_BODY = `You have received a new message from the Get Involved form.

Name: {{name}}
Email: {{email}}
Category: {{category}}

Message:
{{message}}`

/**
 * Exact brand colors from the official MIND SVG logo:
 * navy #0D1B2A · teal #00A9B7 · orange #F0AB1F · white background
 */
const BRAND = {
  navy: '#0D1B2A',
  teal: '#00A9B7',
  orange: '#F0AB1F',
  white: '#FFFFFF',
  text: '#0D1B2A',
  muted: '#5B6570',
  border: '#E6E8EB',
  surface: '#F7F8FA',
  page: '#EEF1F4',
} as const

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function formatTemplateValue(key: string, value: string, format: 'text' | 'html'): string {
  if (format === 'text') {
    return value
  }

  const escaped = escapeHtml(value)
  return key === 'message' ? escaped.replace(/\n/g, '<br>') : escaped
}

export function renderEmailTemplate(
  template: string,
  data: GetInvolvedEmailData,
  format: 'text' | 'html',
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = data[key as keyof GetInvolvedEmailData] ?? ''
    return formatTemplateValue(key, value, format)
  })
}

function fieldRow(label: string, value: string, options?: { href?: string }): string {
  const safeValue = escapeHtml(value)
  const valueHtml = options?.href
    ? `<a href="${escapeHtml(options.href)}" style="color:${BRAND.teal}; text-decoration:none; font-weight:600;">${safeValue}</a>`
    : safeValue

  return `
    <tr>
      <td style="padding:0 0 16px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          <tr>
            <td style="padding:0 0 6px 0; font-family:Arial, Helvetica, sans-serif; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${BRAND.muted};">
              ${escapeHtml(label)}
            </td>
          </tr>
          <tr>
            <td style="padding:14px 16px; border-left:3px solid ${BRAND.teal}; border-radius:0 8px 8px 0; background:${BRAND.surface}; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:22px; color:${BRAND.text};">
              ${valueHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `.trim()
}

function buildHeaderBrand(template: GetInvolvedEmailTemplate): string {
  const logoUrl = template.logoUrl?.trim()
  const logoAlt = escapeHtml(template.logoAlt?.trim() || 'MIND')

  if (logoUrl) {
    return `
      <tr>
        <td align="center" style="padding:4px 0;">
          <img
            src="${escapeHtml(logoUrl)}"
            alt="${logoAlt}"
            width="320"
            style="display:block; margin:0 auto; max-width:320px; width:100%; height:auto; border:0; outline:none; text-decoration:none;"
          />
        </td>
      </tr>
    `.trim()
  }

  return `
    <tr>
      <td align="center" style="font-family:Arial, Helvetica, sans-serif; font-size:40px; line-height:1; font-weight:700; letter-spacing:0.06em; color:${BRAND.navy};">
        MIND
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:10px; font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:16px; letter-spacing:0.1em; text-transform:uppercase; color:${BRAND.navy};">
        Ministry of Innovation &amp; National Development
      </td>
    </tr>
    <tr>
      <td align="center" style="padding-top:14px; font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:16px; letter-spacing:0.06em; text-transform:uppercase;">
        <span style="color:${BRAND.teal};">Innovate Today.</span>
        <span style="color:${BRAND.orange};"> Transform Tomorrow.</span>
      </td>
    </tr>
  `.trim()
}

function buildBrandedHtmlEmail(
  template: GetInvolvedEmailTemplate,
  data: GetInvolvedEmailData,
): string {
  const heading = renderEmailTemplate(template.emailHeading, data, 'html')
  const footerText = template.emailFooter
    ? renderEmailTemplate(template.emailFooter, data, 'html').replace(/\n/g, '<br>')
    : 'This message was sent from the MIND Get Involved form.'
  const siteUrl = getServerSideURL()
  const messageHtml = escapeHtml(data.message).replace(/\n/g, '<br>')

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${heading}</title>
  </head>
  <body style="margin:0; padding:0; background-color:${BRAND.page};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; background-color:${BRAND.page};">
      <tr>
        <td align="center" style="padding:28px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; max-width:640px; width:100%; background-color:${BRAND.white}; border-radius:16px; overflow:hidden; box-shadow:0 12px 36px rgba(13, 27, 42, 0.1);">
            <!-- White header matches official SVG logo background -->
            <tr>
              <td style="background-color:${BRAND.white}; padding:28px 24px 20px 24px; border-bottom:1px solid ${BRAND.border};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${buildHeaderBrand(template)}
                </table>
              </td>
            </tr>
            <!-- Brand accent bar from SVG: teal + orange -->
            <tr>
              <td style="font-size:0; line-height:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td width="50%" style="height:5px; background-color:${BRAND.teal}; font-size:0; line-height:0;">&nbsp;</td>
                    <td width="50%" style="height:5px; background-color:${BRAND.orange}; font-size:0; line-height:0;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px 32px;">
                <p style="margin:0 0 8px 0; font-family:Arial, Helvetica, sans-serif; font-size:11px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:${BRAND.teal};">
                  Get Involved
                </p>
                <h1 style="margin:0 0 10px 0; font-family:Arial, Helvetica, sans-serif; font-size:28px; line-height:34px; font-weight:700; color:${BRAND.navy};">
                  ${heading}
                </h1>
                <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:24px; color:${BRAND.muted};">
                  A visitor submitted the Get Involved form on the MIND website.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 8px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${fieldRow('Your name', data.name)}
                  ${fieldRow('Your email', data.email, { href: `mailto:${data.email}` })}
                  <tr>
                    <td style="padding:0 0 16px 0;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:0 0 6px 0; font-family:Arial, Helvetica, sans-serif; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${BRAND.muted};">
                            I am a
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <span style="display:inline-block; padding:10px 14px; border-radius:6px; background-color:${BRAND.teal}; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height:1; font-weight:700; color:${BRAND.white};">
                              ${escapeHtml(data.category)}
                            </span>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 8px 0;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="padding:0 0 6px 0; font-family:Arial, Helvetica, sans-serif; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:${BRAND.muted};">
                            Message
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:16px 18px; border-left:3px solid ${BRAND.orange}; border-radius:0 8px 8px 0; background-color:${BRAND.surface}; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:24px; color:${BRAND.text};">
                            ${messageHtml}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 32px 28px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="border-radius:6px; background-color:${BRAND.navy};">
                      <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block; padding:14px 22px; font-family:Arial, Helvetica, sans-serif; font-size:15px; font-weight:700; line-height:1; color:${BRAND.white}; text-decoration:none;">
                        Reply to ${escapeHtml(data.name)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 24px 32px; border-top:1px solid ${BRAND.border}; background-color:${BRAND.surface};">
                <p style="margin:0 0 10px 0; font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:18px; color:${BRAND.muted};">
                  ${footerText}
                </p>
                <p style="margin:0 0 10px 0; font-family:Arial, Helvetica, sans-serif; font-size:11px; line-height:16px; letter-spacing:0.06em; text-transform:uppercase;">
                  <span style="color:${BRAND.teal};">Innovate Today.</span>
                  <span style="color:${BRAND.orange};"> Transform Tomorrow.</span>
                </p>
                <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:12px; line-height:18px; color:${BRAND.muted};">
                  <a href="${escapeHtml(siteUrl)}/get-involved" style="color:${BRAND.teal}; text-decoration:none;">${escapeHtml(siteUrl)}/get-involved</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function buildGetInvolvedEmail(
  template: GetInvolvedEmailTemplate,
  data: GetInvolvedEmailData,
): { subject: string; text: string; html: string } {
  const subject = renderEmailTemplate(template.emailSubject, data, 'text')
  const bodyText = renderEmailTemplate(template.emailBody, data, 'text')
  const footerText = template.emailFooter
    ? renderEmailTemplate(template.emailFooter, data, 'text')
    : ''
  const text = footerText ? `${bodyText}\n\n${footerText}` : bodyText
  const html = buildBrandedHtmlEmail(template, data)

  return { subject, text, html }
}
