'use client'

import { LandingPart } from '@/app/(frontend)/components/motion/LandingPart'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import Link from 'next/link'
import React from 'react'

export interface GetInvolvedCategory {
  image: string
  title: string
  description: string
  href: string
}

export interface GetInvolvedCategoriesSectionProps {
  categories: GetInvolvedCategory[]
  heading?: string
}

function GetInvolvedCategoryCard({
  category,
  index,
}: {
  category: GetInvolvedCategory
  index: number
}) {
  const rowDelay = (index % 3) * 0.08

  return (
    <Link
      href={category.href}
      className="group flex w-full min-w-0 flex-col transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      <LandingPart delay={rowDelay} image>
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-[#E8ECEF]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={category.image}
            alt={category.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </LandingPart>

      <LandingPart delay={rowDelay + 0.1}>
        <h3 className="mt-4 text-[22px] font-normal leading-[30px] tracking-normal text-[#13181D] sm:mt-5 sm:text-[24px] lg:mt-[23px]">
          {category.title}
        </h3>
      </LandingPart>

      <LandingPart delay={rowDelay + 0.18}>
        <p className="mt-2 w-full text-[15px] font-normal leading-[24px] tracking-normal text-[#53585C] sm:text-[16px] lg:mt-[8px]">
          {category.description}
        </p>
      </LandingPart>
    </Link>
  )
}

export function GetInvolvedCategoriesSection({
  categories,
  heading = 'What we want to hear.',
}: GetInvolvedCategoriesSectionProps) {
  return (
    <section className="bg-white py-8 md:py-10 lg:pb-[35px] lg:pt-0">
      <div className="container">
        <div className="mx-auto flex w-full max-w-[1348px] flex-col gap-8 sm:gap-10 lg:gap-[41px]">
          <Reveal
            as="h2"
            className="w-full text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#13181D] lg:text-[40px]"
          >
            {heading}
          </Reveal>

          <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[20px]">
            {categories.map((category, index) => (
              <GetInvolvedCategoryCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
