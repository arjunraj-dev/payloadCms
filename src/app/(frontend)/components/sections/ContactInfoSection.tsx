import type { LucideIcon } from 'lucide-react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'

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
}

function ContactInfoItem({ icon: Icon, label, children }: ContactInfoItemProps) {
  return (
    <div className="flex gap-4">
      <Icon
        className="mt-0.5 size-6 shrink-0 text-[#4B5563]"
        aria-hidden="true"
        strokeWidth={1.5}
      />
      <div>
        <p className="text-xs uppercase tracking-wider text-[#4B5563]">{label}</p>
        <div className="mt-1 text-[18px] font-medium leading-[25px] text-[#001529]">{children}</div>
      </div>
    </div>
  )
}

function formatPhoneHref(phone?: string) {
  if (!phone) return undefined

  const sanitizedPhone = phone.replace(/[^\d+]/g, '')
  return sanitizedPhone ? `tel:${sanitizedPhone}` : undefined
}

export function ContactInfoSection({
  address,
  phone,
  email,
  hours = [],
  image,
}: ContactInfoSectionProps) {
  const [primaryHours, ...remainingHours] = hours
  const footnote = remainingHours.at(-1)
  const extraHours =
    remainingHours.length > 1 ? remainingHours.slice(0, -1) : []
  const phoneHref = formatPhoneHref(phone)
  const hasOfficeInfo = Boolean(address || phone || email || primaryHours || footnote || extraHours.length)

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal as="div">
            <h2 className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] text-[#001529]">
              Our office
            </h2>

            {hasOfficeInfo && (
              <div className="mt-8 flex flex-col gap-8">
                {address && (
                  <ContactInfoItem icon={MapPin} label="ADDRESS">
                    <p>{address}</p>
                  </ContactInfoItem>
                )}

                {phone && (
                  <ContactInfoItem icon={Phone} label="PHONE">
                    {phoneHref ? (
                      <a href={phoneHref} className="transition-colors hover:text-[#008C95]">
                        {phone}
                      </a>
                    ) : (
                      <p>{phone}</p>
                    )}
                  </ContactInfoItem>
                )}

                {email && (
                  <ContactInfoItem icon={Mail} label="GENERAL ENQUIRIES">
                    <a href={`mailto:${email}`} className="transition-colors hover:text-[#008C95]">
                      {email}
                    </a>
                  </ContactInfoItem>
                )}

                {(primaryHours || footnote || extraHours.length > 0) && (
                  <ContactInfoItem icon={Clock} label="OFFICE HOURS">
                    {primaryHours && <p>{primaryHours}</p>}
                    {extraHours.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                    {footnote && (
                      <p className="mt-1 text-[18px] font-medium leading-[25px] text-[#4B5563]">
                        {footnote}
                      </p>
                    )}
                  </ContactInfoItem>
                )}
              </div>
            )}
          </Reveal>

          {image ? (
            <Reveal as="div" className="overflow-hidden rounded-2xl lg:rounded-3xl">
              <img
                src={image}
                alt="MIND office location in The Bahamas"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}
