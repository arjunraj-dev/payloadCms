'use client'

import React, { useId } from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  TEAL_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'
import { cn } from '@/utilities/ui'

export interface GetInvolvedFormData {
  name: string
  email: string
  category: string
  message: string
}

export interface GetInvolvedFormSectionProps {
  formTitle?: string
  illustrationImage?: string
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
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={htmlFor} className={labelClassName}>
        {label}
      </label>
      {children}
    </div>
  )
}

export function GetInvolvedFormSection({
  formTitle = 'Send us a message',
  illustrationImage = '/images/emailCommunication.jpg',
  onSubmit,
}: GetInvolvedFormSectionProps) {
  const resolvedIllustrationImage = illustrationImage || '/images/emailCommunication.jpg'
  const baseId = useId()
  const nameId = `${baseId}-name`
  const emailId = `${baseId}-email`
  const categoryId = `${baseId}-category`
  const messageId = `${baseId}-message`

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    const data: GetInvolvedFormData = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      category: String(formData.get('category') ?? ''),
      message: String(formData.get('message') ?? ''),
    }

    if (onSubmit) {
      await onSubmit(data)
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

              <form className="flex flex-col gap-5 sm:gap-[24px]" onSubmit={handleSubmit}>
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
                  <FormField label="YOUR EMAIL *" htmlFor={emailId} className="min-w-0">
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      placeholder="Enter"
                      className={inputClassName}
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
                  className={cn(GRADIENT_CTA_BASE_CLASSNAME, 'h-[50px] w-full shrink-0 rounded-[6px]')}
                  style={TEAL_GRADIENT_CTA_STYLE}
                >
                  Send your message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
