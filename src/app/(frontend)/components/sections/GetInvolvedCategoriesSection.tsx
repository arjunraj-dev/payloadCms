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
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <Reveal
          as="h2"
          className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#001529] lg:text-[40px]"
        >
          {heading}
        </Reveal>

        <StaggerGroup as="div" className="mt-10 grid grid-cols-1 gap-8 md:mt-12 lg:grid-cols-3">
          {categories.map((category) => (
            <StaggerItem as="div" key={category.title}>
              <Link
                href={category.href}
                className="group flex flex-col transition-all duration-300 hover:-translate-y-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="flex flex-col pt-6 sm:pt-8">
                  <h3 className="text-[24px] font-normal leading-[30px] tracking-normal text-[#001529]">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                    {category.description}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
