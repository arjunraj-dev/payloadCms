import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

export interface DepartmentCard {
  iconSrc: string
  title: string
  description: string
  linkLabel: string
  href: string
}

export interface DepartmentCardsSectionProps {
  departments: DepartmentCard[]
  heading?: string
  description?: string
}

export function DepartmentCardsSection({
  departments,
  heading = 'What falls under this Ministry.',
  description = "Our work is supported by several key departments and initiatives, each playing a crucial role in advancing the nation's digital agenda.",
}: DepartmentCardsSectionProps) {
  return (
    <section className="bg-white py-8 md:py-10 lg:py-[35px]">
      <div className="container">
        <Reveal
          as="h2"
          className="max-w-[1120px] text-left text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#001529] lg:text-[40px]"
        >
          {heading}
        </Reveal>
        <Reveal
          as="p"
          className="mt-3 max-w-[935px] text-left text-[16px] font-medium leading-[25px] tracking-normal text-[#4B5563] sm:mt-[15px] sm:text-[18px]"
          delay={0.08}
        >
          {description}
        </Reveal>

        <StaggerGroup
          as="div"
          className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 md:mt-12 xl:grid-cols-4"
        >
          {departments.map((department, index) => (
            <StaggerItem
              as="article"
              key={department.title}
              className="flex h-full min-w-0 flex-col rounded-[24px] border border-[#DFDFDF] bg-[#E9E9E980] px-4 pb-6 pt-7 sm:px-[19px] sm:pt-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={department.iconSrc}
                alt=""
                aria-hidden="true"
                className="h-[30px] w-[30px] shrink-0 object-contain"
                loading="lazy"
                decoding="async"
              />
              <h3 className="mt-8 w-full text-[22px] font-normal leading-[30px] tracking-normal text-[#001529] sm:mt-[41px] sm:text-[24px]">
                {department.title}
              </h3>
              <p className="mt-3 w-full flex-1 text-[15px] font-normal leading-[24px] tracking-normal text-[#4B5563] sm:mt-[17px] sm:text-[16px]">
                {department.description}
              </p>
              {index < departments.length - 1 && (
                <Link
                  href={department.href}
                  className="mt-6 inline-flex items-center gap-1 text-[16px] font-medium leading-[24px] text-[#001529] transition-opacity hover:opacity-80"
                >
                  {department.linkLabel}
                  <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                </Link>
              )}
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
