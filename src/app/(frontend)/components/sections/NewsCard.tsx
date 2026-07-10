'use client'

import Link from 'next/link'
import React, { useLayoutEffect, useRef } from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import {
  GRADIENT_CTA_BASE_CLASSNAME,
  NAVY_GRADIENT_CTA_STYLE,
} from '@/app/(frontend)/components/shared/gradientCta'
import { cn } from '@/utilities/ui'

function CardTitle({ title }: { title: string }) {
  const ref = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const container = el?.parentElement
    if (!el || !container) return

    const fitTitle = () => {
      el.style.fontSize = '24px'
      const maxWidth = container.clientWidth
      let size = 24

      while (el.scrollWidth > maxWidth && size > 16) {
        size -= 0.5
        el.style.fontSize = `${size}px`
      }
    }

    fitTitle()

    const observer = new ResizeObserver(fitTitle)
    observer.observe(container)

    return () => observer.disconnect()
  }, [title])

  return (
    <h3
      ref={ref}
      className="h-[32px] w-full whitespace-nowrap text-[24px] font-normal leading-[32px] tracking-normal text-[#13181D]"
    >
      {title}
    </h3>
  )
}

function CardDescription({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const container = el?.parentElement
    if (!el || !container) return

    const fitDescription = () => {
      el.style.fontSize = '16px'
      el.style.lineHeight = '24px'
      let size = 16

      while (el.scrollHeight > 48 && size > 13) {
        size -= 0.5
        el.style.fontSize = `${size}px`
        el.style.lineHeight = `${Math.round(size * 1.5 * 10) / 10}px`
      }
    }

    fitDescription()

    const observer = new ResizeObserver(fitDescription)
    observer.observe(container)

    return () => observer.disconnect()
  }, [text])

  return (
    <p
      ref={ref}
      className="max-h-[48px] overflow-hidden text-[16px] font-normal leading-[24px] tracking-normal text-[#53585C]"
    >
      {text}
    </p>
  )
}

export interface NewsCardProps {
  image: string
  date: string
  category: string
  title: string
  excerpt: string
  slug: string
}

export function NewsCard({ image, date, category, title, excerpt, slug }: NewsCardProps) {
  return (
    <Reveal as="div" className="h-full w-full min-w-0">
      <Link
        href={`/updates/${slug}`}
        aria-label={`${title} — ${date}`}
        className="group flex h-full w-full min-w-0 flex-col gap-5 sm:gap-[23px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="aspect-square w-full shrink-0 rounded-2xl object-cover"
        />

        <div className="flex min-h-0 w-full flex-1 flex-col gap-2">
          <p className="shrink-0 text-[14px] font-normal leading-[24px] tracking-normal text-[#13181D] sm:text-[16px] sm:leading-[30px]">
            <time dateTime={date}>{date}</time>
            <span className="mx-2 sm:mx-[0.75em]" aria-hidden="true">
              |
            </span>
            <span>{category}</span>
          </p>

          <div className="flex min-h-0 flex-1 flex-col gap-5 sm:gap-[26px]">
            <div className="flex min-w-0 flex-col gap-2">
              <CardTitle title={title} />
              <CardDescription text={excerpt} />
            </div>

            <span
              className={cn(
                GRADIENT_CTA_BASE_CLASSNAME,
                'mt-auto h-[50px] w-full max-w-[173px] shrink-0 rounded-[6px] font-bold',
              )}
              style={NAVY_GRADIENT_CTA_STYLE}
            >
              Read more →
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}
