import type { LucideIcon } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface DepartmentCard {
  icon: LucideIcon
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
        <h2 className="text-2xl font-bold text-[#001529] sm:text-3xl lg:text-4xl">{heading}</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
          {description}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
          {departments.map((department) => {
            const Icon = department.icon

            return (
              <article
                key={department.title}
                className="flex h-full flex-col rounded-2xl border border-[#E5E7EB] bg-white p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <Icon className="size-6 text-[#001529]" aria-hidden="true" strokeWidth={1.75} />
                <h3 className="mt-4 text-lg font-bold leading-snug text-[#001529]">
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
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
