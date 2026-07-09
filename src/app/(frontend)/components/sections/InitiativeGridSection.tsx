import { cn } from '@/utilities/ui'
import React from 'react'
import { DrawLine } from '@/app/(frontend)/components/motion/DrawLine'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
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

function toHref(url: string) {
  if (/^https?:\/\//i.test(url)) return url
  return `https://${url}`
}

/** Renders description text, styling trailing `Link: …` segments as italic underlined links. */
function InitiativeDescription({ text }: { text: string }) {
  const linkMatch = text.match(/\s*Link:\s*(\S+)\s*$/i)

  if (!linkMatch || linkMatch.index === undefined) {
    return <>{text}</>
  }

  const body = text.slice(0, linkMatch.index).trimEnd()
  const url = linkMatch[1]
  const href = toHref(url)

  return (
    <>
      {body}{' '}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="italic underline decoration-solid underline-offset-2 transition-opacity hover:opacity-80"
      >
        Link: {url}
      </a>
    </>
  )
}

export function InitiativeGridSection({
  title,
  description,
  initiatives,
}: InitiativeGridSectionProps) {
  return (
    <section className="bg-white pb-4 md:pb-6 lg:pb-8">
      <div className="container">
        <ScrollRise className="relative mx-auto w-full max-w-[1348px] overflow-hidden rounded-[24px] bg-[#0D1B2A] px-6 py-10 md:px-10 md:py-12 lg:px-[73px] lg:pt-[60px] lg:pb-10">
          <div className="relative z-10">
            <Reveal as="div" className="flex w-full max-w-[895px] flex-col gap-[15px]">
              <h2 className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-white lg:text-[40px]">
                {title}
              </h2>
              <p className="text-base font-medium leading-[25px] tracking-normal text-[#AAB5C1] sm:text-[18px]">
                {description}
              </p>
            </Reveal>

            {/* <DrawLine className="mt-8 border-t border-[#1E2F40] md:mt-10" delay={0.15} /> */}

            <StaggerGroup
              as="div"
              className="mx-auto mt-8 grid w-full max-w-[1204px] grid-cols-1 justify-items-center gap-5 md:mt-[29px] md:grid-cols-2 lg:grid-cols-3 lg:gap-[20px]"
            >
              {initiatives.map((initiative, index) => (
                <StaggerItem
                  as="article"
                  key={initiative.title}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className={cn(
                    'flex min-h-[480px] w-full max-w-[388px] flex-col rounded-[24px] border border-[#DFDFDF1A] bg-[#E9E9E90D] px-[19px] pt-[32px] pb-6 transition-colors duration-300 hover:bg-white/[0.04]',
                    getGridItemClass(index, initiatives.length),
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={MODERNIZE_ICON}
                      alt=""
                      aria-hidden="true"
                      className="h-[30px] w-[30px] shrink-0 brightness-0 invert"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="mt-[37px] flex items-start justify-between gap-3">
                    <h3 className="min-w-0 flex-1 pr-2 text-[24px] font-normal leading-[30px] tracking-normal text-white">
                      {initiative.title}
                    </h3>
                    <span
                      className={cn(
                        'inline-flex h-[19px] shrink-0 items-center rounded-[4px] px-[6px] text-[12px] font-semibold uppercase leading-[22px] tracking-normal whitespace-nowrap',
                        labelColorClasses[initiative.labelColor],
                      )}
                    >
                      {initiative.label}
                    </span>
                  </div>

                  <p className="mt-[25px] w-full flex-1 text-[16px] font-normal leading-[24px] tracking-normal text-white">
                    <InitiativeDescription text={initiative.description} />
                  </p>

                  <DrawLine className="mt-6 border-t border-[#1E2F40]" delay={0.1 + index * 0.05} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </ScrollRise>
      </div>
    </section>
  )
}
