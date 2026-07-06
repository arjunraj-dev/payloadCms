import Link from 'next/link'
import React from 'react'

const POLICY_AREA_ICON = '/Mordernize-gov.svg'

export type PolicyAreaStatus = 'active' | 'comingSoon'

export interface PolicyArea {
  label: string
  href?: string | null
  status?: PolicyAreaStatus | null
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
        <h2 className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#001529] lg:text-[40px]">
          {heading}
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {policies.map((policy) => {
            const isComingSoon = policy.status === 'comingSoon'

            return (
              <article
                key={policy.label}
                className="flex min-h-[148px] flex-col overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm"
              >
                <div className="flex flex-1 items-start gap-3 p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={POLICY_AREA_ICON}
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-auto shrink-0"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-sm font-semibold leading-snug text-[#001529]">
                    {policy.label}
                  </span>
                </div>

                {isComingSoon ? (
                  <span
                    className="flex w-full cursor-not-allowed items-center justify-center bg-[#F3F4F6] px-3 py-2.5 text-sm font-medium text-[#9CA3AF]"
                    aria-disabled="true"
                  >
                    Coming soon
                  </span>
                ) : (
                  <Link
                    href={policy.href ?? '#'}
                    className="flex w-full items-center justify-center bg-gradient-to-r from-[#004B4D] to-[#008C95] px-3 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    View progress →
                  </Link>
                )}
              </article>
            )
          })}
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
