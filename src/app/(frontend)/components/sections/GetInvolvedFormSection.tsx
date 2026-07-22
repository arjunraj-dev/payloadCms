'use client'

import React, { useId, useState } from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  TEAL_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'
import { cn } from '@/utilities/ui'
import { EMAIL_VALIDATION_MESSAGE, isValidEmail } from '@/utilities/validateEmail'

const SEND_FAILED_MESSAGE = 'Mail send failed. Please try again later.'
const NETWORK_FAILED_MESSAGE =
  'Mail send failed. Please check your connection and try again.'

export interface GetInvolvedFormData {
  name: string
  email: string
  category: string
  message: string
}

export interface GetInvolvedFormSectionProps {
  formTitle?: string
  illustrationImage?: string
  successMessage?: string
  onSubmit?: (data: GetInvolvedFormData) => void | Promise<void>
}

const CATEGORY_OPTIONS = [
  'Citizens',
  'Businesses and entrepreneurs',
  'Partners and organisations',
] as const

const labelClassName =
  'block h-[30px] text-[12px] font-normal uppercase leading-[30px] tracking-[0.06em] text-white'

const inputClassName =
  'box-border h-[46px] w-full rounded-[8px] border-0 bg-white px-4 py-[10px] text-sm text-[#001529] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#008C95]/50'

function FormField({
  label,
  htmlFor,
  children,
  className,
  error,
  errorId,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
  className?: string
  error?: string | null
  errorId?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={htmlFor} className={labelClassName}>
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} className="text-xs leading-5 text-red-200" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function GetInvolvedFormSection({
  formTitle = 'Send us a message',
  illustrationImage = '/images/emailCommunication.jpg',
  successMessage = "Thank you for your message. We'll be in touch soon.",
  onSubmit,
}: GetInvolvedFormSectionProps) {
  const resolvedIllustrationImage = illustrationImage || '/images/emailCommunication.jpg'
  const baseId = useId()
  const nameId = `${baseId}-name`
  const emailId = `${baseId}-email`
  const emailErrorId = `${baseId}-email-error`
  const categoryId = `${baseId}-category`
  const messageId = `${baseId}-message`
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSendFailure, setIsSendFailure] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)

  const validateEmailField = (value: string) => {
    if (!value.trim()) {
      setEmailError('Email is required.')
      return false
    }

    if (!isValidEmail(value)) {
      setEmailError(EMAIL_VALIDATION_MESSAGE)
      return false
    }

    setEmailError(null)
    return true
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage(null)
    setIsSendFailure(false)

    const form = event.currentTarget
    const formData = new FormData(form)

    const data: GetInvolvedFormData = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      category: String(formData.get('category') ?? ''),
      message: String(formData.get('message') ?? ''),
    }

    if (!validateEmailField(data.email)) {
      return
    }

    if (onSubmit) {
      await onSubmit(data)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/get-involved', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = (await response.json()) as { error?: string }

      if (!response.ok) {
        const sendFailed = response.status >= 500
        setIsSendFailure(sendFailed)
        setErrorMessage(
          result.error ||
            (sendFailed ? SEND_FAILED_MESSAGE : 'Something went wrong. Please try again.'),
        )
        return
      }

      setHasSubmitted(true)
      form.reset()
    } catch {
      setIsSendFailure(true)
      setErrorMessage(NETWORK_FAILED_MESSAGE)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="send-message" className="bg-white py-8 md:py-10 lg:py-[35px]">
      <div className="container">
        <div className="relative mx-auto flex w-full max-w-[1348px] flex-col overflow-hidden rounded-[24px] bg-[#001529] xl:h-[619px] xl:flex-row">
          <ScrollRise className="relative h-[220px] w-full shrink-0 sm:h-[280px] md:h-[320px] xl:h-[619px] xl:w-[576px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolvedIllustrationImage}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-[65%_center]"
            />
          </ScrollRise>

          <div className="flex min-w-0 flex-1 justify-center px-5 py-8 sm:px-8 xl:px-10 xl:py-0 xl:pt-[57px] 2xl:px-[82px]">
            <div className="flex w-full max-w-[612px] flex-col gap-6 sm:gap-[30px] xl:h-[490px]">
              <Reveal
                as="h2"
                className="text-center text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-white lg:text-[40px]"
              >
                {formTitle}
              </Reveal>

              {hasSubmitted ? (
                <div
                  className="rounded-[8px] bg-white/10 px-4 py-5 text-center text-sm leading-6 text-white"
                  role="status"
                >
                  {successMessage}
                </div>
              ) : (
              <form className="flex flex-col gap-5 sm:gap-[24px]" onSubmit={handleSubmit}>
                {errorMessage && (
                  <div
                    className="rounded-[8px] border border-red-300/30 bg-red-500/15 px-4 py-3 text-center text-sm leading-6 text-red-100"
                    role="alert"
                    aria-live="polite"
                  >
                    {isSendFailure && <p className="font-semibold text-white">Mail send failed</p>}
                    <p className={isSendFailure ? 'mt-1' : undefined}>{errorMessage}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField label="YOUR NAME *" htmlFor={nameId} className="min-w-0">
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      autoComplete="name"
                      placeholder="Enter"
                      className={inputClassName}
                    />
                  </FormField>
                  <FormField
                    label="YOUR EMAIL *"
                    htmlFor={emailId}
                    className="min-w-0"
                    error={emailError}
                    errorId={emailErrorId}
                  >
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      inputMode="email"
                      required
                      aria-required="true"
                      aria-invalid={emailError ? true : undefined}
                      aria-describedby={emailError ? emailErrorId : undefined}
                      autoComplete="email"
                      placeholder="name@example.com"
                      className={cn(
                        inputClassName,
                        emailError && 'ring-2 ring-red-400 focus:ring-red-400',
                      )}
                      onBlur={(event) => {
                        validateEmailField(event.target.value)
                      }}
                      onChange={() => {
                        if (emailError) {
                          setEmailError(null)
                        }
                      }}
                    />
                  </FormField>
                </div>

                <FormField label="I AM A *" htmlFor={categoryId}>
                  <select
                    id={categoryId}
                    name="category"
                    required
                    aria-required="true"
                    defaultValue=""
                    className={cn(inputClassName, 'appearance-none bg-white')}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="YOUR MESSAGE *" htmlFor={messageId}>
                  <textarea
                    id={messageId}
                    name="message"
                    required
                    aria-required="true"
                    placeholder="Enter your message"
                    className="box-border h-[97px] w-full resize-none rounded-[8px] border-0 bg-white px-4 py-[10px] text-sm text-[#001529] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#008C95]/50"
                  />
                </FormField>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    GRADIENT_CTA_BASE_CLASSNAME,
                    'h-[50px] w-full shrink-0 rounded-[6px] disabled:cursor-not-allowed disabled:opacity-70',
                  )}
                  style={TEAL_GRADIENT_CTA_STYLE}
                >
                  {isSubmitting ? 'Sending...' : 'Send your message'}
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
