import { ChevronRight, FileText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface PolicyArea {
  label: string
  href: string
}

export interface PolicyAreasSectionProps {
  policies: PolicyArea[]
  heading?: string
  ctaLabel?: string
  ctaHref?: string
}

export function PolicyAreasSection({
  policies,
  heading = 'Policy areas this Ministry leads',
  ctaLabel = 'See all policies →',
  ctaHref = '/policies',
}: PolicyAreasSectionProps) {
  return (
    <section className="bg-[#F8F9FA] py-12 md:py-16 lg:py-20">
      <div className="container">
        <h2 className="text-2xl font-bold text-[#001529] sm:text-3xl lg:text-4xl">{heading}</h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {policies.map((policy) => (
            <Link
              key={policy.label}
              href={policy.href}
              className="group flex min-h-[132px] flex-col overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-1 items-start gap-3 p-4">
                <FileText className="size-5 shrink-0 text-[#4B5563]" aria-hidden="true" />
                <span className="text-sm font-semibold leading-snug text-[#001529]">
                  {policy.label}
                </span>
              </div>
              <div className="flex items-center justify-end bg-gradient-to-r from-[#004B4D] to-[#008C95] px-3 py-1.5">
                <ChevronRight className="size-4 text-white" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:mt-12">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center text-sm font-medium text-[#008C95] transition-opacity hover:opacity-80"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
