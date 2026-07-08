'use client'

import { cn } from '@/utilities/ui'
import React, { useCallback, useState } from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { ScrollRise } from '@/app/(frontend)/components/motion/ScrollRise'
import { TypewriterText } from '@/app/(frontend)/components/motion/TypewriterText'

export interface MinisterProfileSectionProps {
  label: string
  name: string
  title: string
  bio: string | string[]
  image: string
  variant?: 'quote' | 'profile'
  /** Figma banner layout — 1132×440 with 90px gap */
  layout?: 'default' | 'banner'
  backgroundColor?: string
}

export function MinisterProfileSection({
  label,
  name,
  title,
  bio,
  image,
  variant = 'quote',
  layout = 'default',
  backgroundColor = 'bg-white',
}: MinisterProfileSectionProps) {
  const bioParagraphs = Array.isArray(bio) ? bio : [bio]
  const isBanner = layout === 'banner'

  const [doneCount, setDoneCount] = useState(0)
  const advance = useCallback(() => setDoneCount((count) => count + 1), [])

  if (isBanner) {
    return (
      <section className="bg-white py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="mx-auto flex w-full max-w-[1132px] flex-col lg:h-[440px] lg:flex-row lg:items-stretch lg:gap-[90px]">
            <ScrollRise
              distance={70}
              fromScale={0.88}
              offset={['start 95%', 'start 55%']}
              className="h-[280px] w-full shrink-0 overflow-hidden rounded-3xl bg-[#B8C5CE] sm:h-[340px] lg:h-[440px] lg:w-[443px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={name}
                src={image}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </ScrollRise>

            <div className="flex flex-1 flex-col justify-center gap-6 px-6 py-8 sm:px-0 lg:max-w-[599px] lg:gap-[31px] lg:py-0">
              <TypewriterText
                as="p"
                lines={[bioParagraphs[0] ?? '']}
                startOnView
                speed={14}
                onDone={advance}
                className="text-lg leading-relaxed text-[#13181D] sm:text-xl lg:text-[32px] lg:leading-[38px] lg:font-normal"
              />
              <div className="flex flex-col gap-1 lg:max-w-[420px] lg:gap-[7px]">
                <TypewriterText
                  as="p"
                  lines={[name]}
                  start={doneCount >= 1}
                  speed={28}
                  onDone={advance}
                  className="text-base font-bold text-[#13181D] sm:text-lg lg:text-[20px] lg:leading-[22px]"
                />
                <TypewriterText
                  as="p"
                  lines={[title]}
                  start={doneCount >= 2}
                  speed={28}
                  className="text-sm text-[#53585C] sm:text-base lg:text-[16px] lg:leading-[22px] lg:font-normal"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('py-12 md:py-16 lg:py-20', backgroundColor)}>
      <div className="container">
        <div
          className={cn(
            'grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr] lg:gap-16',
            variant === 'profile' ? 'lg:items-center' : 'items-start',
          )}
        >
          <div className="order-1 overflow-hidden rounded-3xl bg-[#E8ECEF]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={name}
              src={image}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>

          <Reveal as="div" className="order-2">
            {variant === 'quote' ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]">
                  {label}
                </p>
                <p className="mt-4 text-xl leading-relaxed text-[#001529] sm:text-2xl">
                  {bioParagraphs[0]}
                </p>
                <p className="mt-6 text-lg font-bold text-[#001529]">{name}</p>
                <p className="mt-1 text-base text-[#4B5563]">{title}</p>
              </>
            ) : (
              <>
                <p className="text-[clamp(1.25rem,3vw,28px)] font-normal leading-[47px] tracking-normal text-[#001529] lg:text-[28px]">
                  {label}
                </p>
                <h3 className="mt-4 text-[clamp(1.75rem,4vw,40px)] font-normal leading-[22px] tracking-normal text-[#001529] lg:text-[40px]">
                  {name}
                </h3>
                <p className="mt-2 text-[16px] font-medium leading-[24px] tracking-normal text-[#4B5563]">
                  {title}
                </p>
                {bioParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={cn(
                      'text-base leading-relaxed text-[#4B5563] sm:text-lg',
                      index === 0 ? 'mt-6' : 'mt-3',
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
