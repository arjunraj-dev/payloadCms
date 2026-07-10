import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

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

          <StaggerGroup
            as="div"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[20px]"
          >
            {categories.map((category) => (
              <StaggerItem as="div" key={category.title} className="min-w-0">
                <Link
                  href={category.href}
                  className="group flex w-full flex-col transition-all duration-300 hover:-translate-y-1"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="aspect-square w-full rounded-2xl object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="mt-4 text-[22px] font-normal leading-[30px] tracking-normal text-[#13181D] sm:mt-5 sm:text-[24px] lg:mt-[23px]">
                    {category.title}
                  </h3>
                  <p className="mt-2 w-full text-[15px] font-normal leading-[24px] tracking-normal text-[#53585C] sm:text-[16px] lg:mt-[8px]">
                    {category.description}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
