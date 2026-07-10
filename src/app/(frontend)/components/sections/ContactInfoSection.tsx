import type { LucideIcon } from 'lucide-react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
import { cn } from '@/utilities/ui'

export interface ContactInfoSectionProps {
  address?: string
  phone?: string
  email?: string
  hours?: string[]
  image?: string
}

interface ContactInfoItemProps {
  icon: LucideIcon
  label: string
  children: React.ReactNode
  /** Figma: address 27px, office hours 29px */
  gapClassName?: string
  className?: string
}

function ContactInfoItem({
  icon: Icon,
  label,
  children,
  gapClassName = 'gap-4 sm:gap-[27px]',
  className,
}: ContactInfoItemProps) {
  return (
    <div className={cn('flex w-full max-w-[422px]', gapClassName, className)}>
      <span className="flex size-10 shrink-0 items-center justify-center">
        <Icon className="size-8 text-[#53585C]" aria-hidden="true" strokeWidth={2} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-normal uppercase leading-[19px] tracking-[0.06em] text-black">
          {label}
        </p>
        <div className="mt-[9px] break-words text-[16px] font-medium leading-[25px] tracking-normal text-[#13181D] sm:text-[18px]">
          {children}
        </div>
      </div>
    </div>
  )
}

function formatPhoneHref(phone?: string) {
  if (!phone) return undefined

  const sanitizedPhone = phone.replace(/[^\d+]/g, '')
  return sanitizedPhone ? `tel:${sanitizedPhone}` : undefined
}

/** Split hours into day/time lines and an optional footnote (e.g. excluding public holidays). */
function parseOfficeHours(hours: string[]): { lines: string[]; footnote?: string } {
  if (hours.length === 0) return { lines: [] }

  const lines: string[] = []
  let footnote: string | undefined

  for (const entry of hours) {
    const trimmed = entry.trim()
    if (!trimmed) continue

    if (/exclud/i.test(trimmed) || /public\s+holiday/i.test(trimmed)) {
      footnote = trimmed
      continue
    }

    const timeMatch = trimmed.match(
      /^(.+?)\s*[,:]?\s+(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm).+)$/,
    )

    if (timeMatch) {
      const dayPart = timeMatch[1].trim()
      let timePart = timeMatch[2].trim()
      const footnoteInTime = timePart.match(/^(.+?)\s+(excluding.+)$/i)

      if (footnoteInTime) {
        timePart = footnoteInTime[1].trim()
        footnote = footnoteInTime[2].trim()
      }

      lines.push(dayPart)
      lines.push(timePart)
    } else {
      const footnoteInLine = trimmed.match(/^(.+?)\s+(excluding.+)$/i)
      if (footnoteInLine && /\d/.test(footnoteInLine[1])) {
        lines.push(footnoteInLine[1].trim())
        footnote = footnoteInLine[2].trim()
      } else {
        lines.push(trimmed)
      }
    }
  }

  return { lines, footnote }
}

export function ContactInfoSection({
  address,
  phone,
  email,
  hours = [],
  image,
}: ContactInfoSectionProps) {
  const { lines: hoursLines, footnote: hoursFootnote } = parseOfficeHours(hours)
  const phoneHref = formatPhoneHref(phone)
  const hasOfficeInfo = Boolean(
    address || phone || email || hoursLines.length || hoursFootnote,
  )

  return (
    <section className="bg-white py-8 md:py-10 lg:py-[35px]">
      <div className="container">
        <div className="mx-auto flex w-full max-w-[1348px] flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <Reveal
            as="div"
            className="flex w-full max-w-[422px] flex-col gap-8 sm:gap-[38px] lg:h-[447px]"
          >
            <h2 className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#13181D] lg:text-[40px]">
              Our office
            </h2>

            {hasOfficeInfo && (
              <div className="flex flex-col gap-6">
                {address && (
                  <ContactInfoItem icon={MapPin} label="ADDRESS" className="sm:min-h-[78px]">
                    <p>{address}</p>
                  </ContactInfoItem>
                )}

                {phone && (
                  <ContactInfoItem icon={Phone} label="PHONE" className="sm:min-h-[53px]">
                    {phoneHref ? (
                      <a href={phoneHref} className="transition-opacity hover:opacity-70">
                        {phone}
                      </a>
                    ) : (
                      <p>{phone}</p>
                    )}
                  </ContactInfoItem>
                )}

                {email && (
                  <ContactInfoItem icon={Mail} label="GENERAL ENQUIRIES" className="sm:min-h-[53px]">
                    <a
                      href={`mailto:${email}`}
                      className="break-all transition-opacity hover:opacity-70 sm:break-words"
                    >
                      {email}
                    </a>
                  </ContactInfoItem>
                )}

                {(hoursLines.length > 0 || hoursFootnote) && (
                  <ContactInfoItem
                    icon={Clock}
                    label="OFFICE HOURS"
                    gapClassName="gap-4 sm:gap-[29px]"
                    className="sm:min-h-[106px]"
                  >
                    {hoursLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                    {hoursFootnote && (
                      <p className="mt-1 max-w-[353px] text-[12px] font-normal leading-[19px] tracking-[0.06em] text-[#727272]">
                        {hoursFootnote}
                      </p>
                    )}
                  </ContactInfoItem>
                )}
              </div>
            )}
          </Reveal>

          {image ? (
            <ScrollRise className="w-full overflow-hidden rounded-2xl lg:max-w-[700px] lg:rounded-3xl">
              <img
                src={image}
                alt="MIND office location in The Bahamas"
                loading="lazy"
                decoding="async"
                className="aspect-[700/501] w-full object-cover lg:h-[501px] lg:w-[700px]"
              />
            </ScrollRise>
          ) : null}
        </div>
      </div>
    </section>
  )
}
