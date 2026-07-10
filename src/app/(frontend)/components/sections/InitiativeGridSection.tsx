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

  if (index === 3) return 'xl:col-start-1'
  if (index === 4) return 'xl:col-start-2'

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
<<<<<<< HEAD
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
=======
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
>>>>>>> 45017314098b2ebca17bcc53b3152e4e2762fd43
      </div>
    </section>
  )
}
