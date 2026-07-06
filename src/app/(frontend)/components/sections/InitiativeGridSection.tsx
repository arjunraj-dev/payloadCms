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

  if (index === 3) return 'lg:col-start-1'
  if (index === 4) return 'lg:col-start-2'

  return ''
}

export function InitiativeGridSection({
  title,
  description,
  initiatives,
}: InitiativeGridSectionProps) {
  const useFiveCardLayout = initiatives.length === 5

  return (
    <section className="bg-white py-8 md:py-10 lg:py-12">
      <div className="container">
        <div className="overflow-hidden rounded-[2rem] bg-[#001529] px-6 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14">
          <Reveal as="h2" className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-white lg:text-[40px]">
            {title}
          </Reveal>
          <Reveal as="p" delay={0.08} className="mt-4 max-w-2xl text-[18px] font-medium leading-[25px] tracking-normal text-white/90">
            {description}
          </Reveal>

          <StaggerGroup
            as="div"
            className={cn(
              'mt-8 gap-5 md:mt-10 md:gap-6',
              useFiveCardLayout
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {initiatives.map((initiative, index) => (
              <StaggerItem
                as="article"
                key={initiative.title}
                className={cn(
                  'flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:shadow-lg',
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
                      'shrink-0 rounded px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide',
                      labelColorClasses[initiative.labelColor],
                    )}
                  >
                    {initiative.label}
                  </span>
                </div>
                <h3 className="mt-5 text-[24px] font-normal leading-[22px] tracking-normal text-white">
                  {initiative.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75">
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
