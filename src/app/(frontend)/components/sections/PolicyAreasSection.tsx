import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

const POLICY_AREA_ICON = '/Mordernize-gov.svg'

const POLICY_ACTIVE_GRADIENT =
  'linear-gradient(90deg, #0C3538 0%, #0F848D 35.56%, #169EA9 49.52%, #169EA9 53.78%, #0F848D 64.92%, #0C3538 100%)'

export type PolicyAreaStatus = 'active' | 'comingSoon'

export interface PolicyArea {
  label: string
  href?: string | null
  status?: PolicyAreaStatus | null
}

export interface PolicyAreasSectionProps {
  policies: PolicyArea[]
  heading?: string
}

export function PolicyAreasSection({
  policies,
  heading = 'Policy areas this Ministry leads',
}: PolicyAreasSectionProps) {
  return (
    <section className="bg-white py-8 md:py-10 lg:py-[35px]">
      <div className="container">
        <div className="mx-auto flex w-full max-w-[1350px] flex-col gap-10">
          <Reveal
            as="h2"
            className="text-left text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#001529] lg:text-[40px]"
          >
            {heading}
          </Reveal>

          <StaggerGroup
            as="div"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          >
            {policies.map((policy) => {
              const isComingSoon = policy.status === 'comingSoon'

              return (
                <StaggerItem
                  as="article"
                  key={policy.label}
                  className="flex w-full flex-col lg:h-[131px] lg:w-[254px]"
                >
                  <div className="flex h-[95px] items-center gap-[10px] rounded-t-[24px] border border-b-0 border-[#DFDFDF] p-[10px]">
                    <div className="flex w-full max-w-[234px] items-center gap-5">
                      <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full px-[6px] py-[7px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={POLICY_AREA_ICON}
                          alt=""
                          aria-hidden="true"
                          className="h-full w-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <span className="min-w-0 flex-1 text-[18px] font-normal leading-[22px] tracking-normal text-[#001529] line-clamp-2">
                        {policy.label}
                      </span>
                    </div>
                  </div>

                  {isComingSoon ? (
                    <span
                      className="flex h-[36px] w-full items-center justify-center gap-[7px] rounded-b-[24px] border border-[#DFDFDF] bg-[#F3F4F6] px-[18px] py-[10px] text-sm font-medium leading-[22px] text-[#9CA3AF]"
                      aria-disabled="true"
                    >
                      Coming soon
                    </span>
                  ) : (
                    <Link
                      href={policy.href ?? '#'}
                      className="flex h-[36px] w-full items-center justify-center gap-[7px] rounded-b-[24px] border border-[#DFDFDF] px-[18px] py-[10px] text-sm font-medium leading-[22px] text-white transition-opacity hover:opacity-90"
                      style={{ background: POLICY_ACTIVE_GRADIENT }}
                    >
                      View progress
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
