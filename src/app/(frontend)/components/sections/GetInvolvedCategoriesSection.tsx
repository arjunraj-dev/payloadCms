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
        <div className="mx-auto flex w-full max-w-[1348px] flex-col gap-[41px] lg:min-h-[657px]">
          <Reveal
            as="h2"
            className="w-full text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#13181D] lg:text-[40px]"
          >
            {heading}
          </Reveal>

          <StaggerGroup
            as="div"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[20px]"
          >
            {categories.map((category) => (
              <StaggerItem as="div" key={category.title}>
                <Link
                  href={category.href}
                  className="group flex w-full flex-col transition-all duration-300 hover:-translate-y-1 lg:h-[569px] lg:w-[436px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="aspect-square w-full rounded-2xl object-cover lg:h-[436px] lg:w-[436px]"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="mt-5 text-[24px] font-normal leading-[30px] tracking-normal text-[#13181D] lg:mt-[23px]">
                    {category.title}
                  </h3>
                  <p className="mt-2 max-w-[420px] text-[16px] font-normal leading-[24px] tracking-normal text-[#53585C] lg:mt-[8px]">
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
