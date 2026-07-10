import type { LucideIcon } from 'lucide-react'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

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

function EnquiryCard({ enquiry }: { enquiry: EnquiryItem }) {
  const Icon = enquiry.icon

  return (
    <div className="flex w-full flex-col rounded-[24px] border border-[#DFDFDF] bg-[#E9E9E980] px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8 lg:px-[39px] lg:pb-[42px] lg:pt-[33px]">
      <Icon className="size-8 shrink-0 text-[#13181D]" aria-hidden="true" strokeWidth={1.5} />

      <h3 className="mt-5 w-full text-[22px] font-normal leading-[30px] tracking-normal text-[#13181D] sm:mt-6 sm:text-[24px] lg:mt-[34px]">
        {enquiry.title}
      </h3>

      <p className="mt-2 w-full text-[15px] font-normal leading-6 tracking-normal text-[#53585C] sm:mt-[7px] sm:text-[16px]">
        {enquiry.description}
      </p>

      <a
        href={`mailto:${enquiry.email}`}
        aria-label={`Email ${enquiry.title}`}
        className="mt-5 w-full break-all text-[16px] font-medium leading-[25px] tracking-normal text-[#13181D] transition-opacity hover:opacity-70 sm:mt-7 sm:break-words sm:text-[18px]"
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
    <div className="flex w-full flex-col gap-8 sm:gap-10">
      <Reveal
        as="h2"
        className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#13181D] lg:text-[40px]"
      >
        Specific enquiries.
      </Reveal>

      <StaggerGroup as="div" className="flex flex-col gap-[14px]">
        {enquiries.map((enquiry) => (
          <StaggerItem as="div" key={enquiry.email} className="w-full">
            <EnquiryCard enquiry={enquiry} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  )

  if (embedded) {
    return <div className="min-w-0 w-full">{content}</div>
  }

  return (
    <section className="bg-white py-8 md:py-10 lg:py-[35px]">
      <div className="container">{content}</div>
    </section>
  )
}
