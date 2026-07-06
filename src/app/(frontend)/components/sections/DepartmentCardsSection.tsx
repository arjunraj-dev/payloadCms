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
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <Reveal as="h2" className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#001529] lg:text-[40px]">
          {heading}
        </Reveal>
        <Reveal
          as="p"
          className="mt-4 max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg"
          delay={0.08}
        >
          {description}
        </Reveal>

        <StaggerGroup as="div" className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
          {departments.map((department) => (
            <StaggerItem
              as="article"
              key={department.title}
              className="flex h-full flex-col items-start rounded-2xl bg-[#E9E9E980] p-6 sm:p-8"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={department.iconSrc}
                alt=""
                aria-hidden="true"
                className="h-6 w-auto shrink-0 self-start"
                loading="lazy"
                decoding="async"
              />
              <h3 className="mt-4 text-[24px] font-normal leading-[30px] tracking-normal text-[#001529]">
                {department.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4B5563]">
                {department.description}
              </p>
              <Link
                href={department.href}
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[#008C95] transition-opacity hover:opacity-80"
              >
                {department.linkLabel}
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
