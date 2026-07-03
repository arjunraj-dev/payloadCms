'use client'

import React, { useId } from 'react'

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

const inputClassName =
  'w-full rounded-lg border-0 bg-white px-4 py-2.5 text-sm text-[#001529] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#008C95]/50'

const labelClassName = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/80'

export function GetInvolvedFormSection({
  formTitle = 'Send us a message',
  illustrationImage = '/images/emailCommunication.jpg',
  onSubmit,
}: GetInvolvedFormSectionProps) {
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
    <section id="send-message" className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="relative mx-auto flex w-full max-w-[1348px] flex-col overflow-hidden rounded-[24px] bg-[#001529] lg:h-[619px] lg:flex-row">
          <div className="relative h-[240px] w-full shrink-0 sm:h-[300px] lg:h-[619px] lg:w-[576px]">
            <img
              src={illustrationImage}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-[65%_center]"
            />
          </div>

          <div className="flex flex-1 flex-col justify-center px-6 py-8 sm:px-8 lg:px-10 lg:py-10 xl:px-12">
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">{formTitle}</h2>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={nameId} className={labelClassName}>
                    YOUR NAME *
                  </label>
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
                </div>
                <div>
                  <label htmlFor={emailId} className={labelClassName}>
                    YOUR EMAIL *
                  </label>
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
                </div>
              </div>

              <div>
                <label htmlFor={categoryId} className={labelClassName}>
                  I AM A *
                </label>
                <select
                  id={categoryId}
                  name="category"
                  required
                  aria-required="true"
                  defaultValue=""
                  className={inputClassName}
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
              </div>

              <div>
                <label htmlFor={messageId} className={labelClassName}>
                  YOUR MESSAGE *
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  required
                  aria-required="true"
                  rows={4}
                  placeholder="Enter your message"
                  className={`${inputClassName} min-h-[96px] resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-[#004B4D] to-[#008C95] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Send your message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
