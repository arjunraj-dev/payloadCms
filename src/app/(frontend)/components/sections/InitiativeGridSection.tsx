import { cn } from '@/utilities/ui'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

const MODERNIZE_ICON = '/Mordernize-gov.svg'

export type InitiativeLabelColor = 'green' | 'blue' | 'orange' | 'dark' | 'planned'

export interface InitiativeItem {
  label: string
  labelColor: InitiativeLabelColor
  title: string
  description: string
}

export interface InitiativeGridSectionProps {
  title: string
  description: string
  initiatives: InitiativeItem[]
}

const labelColorClasses: Record<InitiativeLabelColor, string> = {
  green: 'bg-[#16A34A] text-white',
  blue: 'bg-[#3B82F6] text-white',
  orange: 'bg-[#F97316] text-white',
  dark: 'bg-[#1F2937] text-white',
  planned: 'bg-[#DFDFDF] text-black',
}

function getGridItemClass(index: number, total: number) {
  if (total !== 5) return ''

  if (index === 3) return 'xl:col-start-1'
  if (index === 4) return 'xl:col-start-2'

  return ''
}

export function InitiativeGridSection({
  title,
  description,
  initiatives,
}: InitiativeGridSectionProps) {
  return (
    <section className="bg-white py-8 md:py-10 lg:py-[35px]">
      <div className="container">
        <div className="overflow-hidden rounded-[24px] bg-[#001529] px-5 py-8 sm:rounded-[2rem] sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
          <Reveal
            as="h2"
            className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[1.2] tracking-normal text-white lg:text-[40px] lg:leading-[47px]"
          >
            {title}
          </Reveal>
          <Reveal
            as="p"
            delay={0.08}
            className="mt-3 max-w-2xl text-[16px] font-medium leading-[25px] tracking-normal text-white/90 sm:mt-4 sm:text-[18px]"
          >
            {description}
          </Reveal>

          <StaggerGroup
            as="div"
            className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
          >
            {initiatives.map((initiative, index) => (
              <StaggerItem
                as="article"
                key={initiative.title}
                className={cn(
                  'flex h-full min-w-0 flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:shadow-lg sm:p-6',
                  getGridItemClass(index, initiatives.length),
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={MODERNIZE_ICON}
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-auto shrink-0 brightness-0 invert"
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    className={cn(
                      'max-w-[50%] rounded px-2.5 py-1 text-center text-[10px] font-semibold uppercase leading-tight tracking-wide',
                      labelColorClasses[initiative.labelColor],
                    )}
                  >
                    {initiative.label}
                  </span>
                </div>
                <h3 className="mt-5 text-[22px] font-normal leading-[30px] tracking-normal text-white sm:text-[24px]">
                  {initiative.title}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-white/75 sm:text-sm">
                  {initiative.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
