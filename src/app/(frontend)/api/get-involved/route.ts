import { NextResponse } from 'next/server'

import {
  buildGetInvolvedNotificationEmail,
  getInvolvedFormSettings,
} from '@/utilities/getInvolvedFormSettings'
import { isEmailConfigured, sendEmail } from '@/utilities/sendEmail'
import { EMAIL_VALIDATION_MESSAGE, isValidEmail } from '@/utilities/validateEmail'

export const GET_INVOLVED_SEND_FAILED_MESSAGE =
  'Mail send failed. Please try again later.'
export const GET_INVOLVED_EMAIL_NOT_CONFIGURED_MESSAGE =
  'Mail send failed. Email service is not configured. Please try again later.'

interface GetInvolvedSubmission {
  name?: string
  email?: string
  category?: string
  message?: string
}

export async function POST(request: Request): Promise<Response> {
  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: GET_INVOLVED_EMAIL_NOT_CONFIGURED_MESSAGE },
      { status: 503 },
    )
  }

  let body: GetInvolvedSubmission

  try {
    body = (await request.json()) as GetInvolvedSubmission
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const category = body.category?.trim() ?? ''
  const message = body.message?.trim() ?? ''

  if (!name || !email || !category || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: EMAIL_VALIDATION_MESSAGE }, { status: 400 })
  }

  const settings = await getInvolvedFormSettings()
  const { subject, text, html } = buildGetInvolvedNotificationEmail(settings, {
    name,
    email,
    category,
    message,
  })

  try {
    await sendEmail({
      to: settings.notificationEmail,
      subject,
      text,
      html,
      replyTo: email,
      attachments: settings.logoAttachment ? [settings.logoAttachment] : undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send Get Involved form email:', error)
    return NextResponse.json({ error: GET_INVOLVED_SEND_FAILED_MESSAGE }, { status: 500 })
  }
}
