import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import React from 'react'

export interface EnquiryItem {
  icon: LucideIcon
  title: string
  description: string
  email: string
}

export interface SpecificEnquiriesSectionProps {
  enquiries: EnquiryItem[]
  embedded?: boolean
}

interface EnquiryCardProps {
  enquiry: EnquiryItem
  embedded?: boolean
}

function EnquiryCard({ enquiry, embedded = false }: EnquiryCardProps) {
  const Icon = enquiry.icon

  return (
    <div
      className={cn(
        'flex flex-col border border-[#E5E7EB] bg-[#F5F5F5] transition-shadow duration-200 hover:shadow-md',
        embedded
          ? 'h-[255px] w-full max-w-[672px] rounded-[24px] p-6'
          : 'h-full rounded-2xl p-8',
      )}
    >
      <Icon className="size-7 text-[#001529]" aria-hidden="true" strokeWidth={1.5} />

      <h3
        className={cn(
          'font-bold text-[#001529]',
          embedded ? 'mt-3 text-base' : 'mt-4 text-lg',
        )}
      >
        {enquiry.title}
      </h3>

      <p
        className={cn(
          'flex-1 text-[#4B5563]',
          embedded
            ? 'mt-2 line-clamp-2 text-sm leading-relaxed'
            : 'mt-3 text-base leading-relaxed',
        )}
      >
        {enquiry.description}
      </p>

      <a
        href={`mailto:${enquiry.email}`}
        aria-label={`Email ${enquiry.title}`}
        className={cn(
          'font-semibold text-[#001529] transition-colors hover:text-[#008C95]',
          embedded ? 'mt-3 text-sm' : 'mt-6 text-base',
        )}
      >
        {enquiry.email}
      </a>
    </div>
  )
}

export function SpecificEnquiriesSection({
  enquiries,
  embedded = false,
}: SpecificEnquiriesSectionProps) {
  const content = (
    <>
      <h2 className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] text-[#001529]">
        Specific enquiries.
      </h2>

      <div
        className={
          embedded
            ? 'mt-8 flex flex-col gap-6'
            : 'mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'
        }
      >
        {enquiries.map((enquiry) => (
          <EnquiryCard key={enquiry.email} enquiry={enquiry} />
        ))}
      </div>
    </>
  )

  if (embedded) {
    return <div className="min-w-0">{content}</div>
  }

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">{content}</div>
    </section>
  )
}
