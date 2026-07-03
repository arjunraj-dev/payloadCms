import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export interface FollowTheWorkSocialLink {
  platform: string
  label: string
  icon: LucideIcon
  href: string
}

export interface FollowTheWorkSectionProps {
  heading: string
  description: string
  backgroundImage: string
  socialLinks: FollowTheWorkSocialLink[]
}

function SocialLinks({
  links,
  className,
}: {
  links: FollowTheWorkSocialLink[]
  className?: string
}) {
  return (
    <div className={className}>
      {links.map((link) => {
        const Icon = link.icon

        return (
          <Link
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-[#001529] shadow-sm transition-opacity hover:opacity-90"
          >
            <Icon className="size-5 shrink-0 text-[#001529]" aria-hidden="true" strokeWidth={1.75} />
            <span>{link.label}</span>
          </Link>
        )
      })}
    </div>
  )
}

export function FollowTheWorkSection({
  heading,
  description,
  backgroundImage,
  socialLinks,
}: FollowTheWorkSectionProps) {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20">
      <div className="container">
        <div
          className="relative mx-auto w-full max-w-[1347px] overflow-hidden rounded-3xl bg-[#001529] bg-cover bg-[right_center] bg-no-repeat max-sm:min-h-[400px] max-sm:aspect-auto aspect-[1347/540] lg:h-[540px] lg:max-h-[540px]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="flex h-full min-h-[inherit] flex-col justify-center gap-8 px-8 py-8 sm:px-10 md:flex-row md:items-center md:justify-between md:gap-6 md:py-0 lg:px-12">
            <div className="max-w-[280px] sm:max-w-xs lg:max-w-sm">
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-tight">
                {heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                {description}
              </p>
            </div>

            <SocialLinks
              links={socialLinks}
              className="flex w-full max-w-[12.5rem] shrink-0 flex-col gap-2.5 md:w-[12.5rem] lg:gap-3"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
