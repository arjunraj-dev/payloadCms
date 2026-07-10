import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

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
    <StaggerGroup as="div" className={className}>
      {links.map((link) => {
        const Icon = link.icon

        return (
          <StaggerItem as="div" key={link.platform}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[67px] w-[197px] items-center gap-[9px] rounded-[12px] bg-white p-[10px] transition-opacity hover:opacity-90"
            >
              <span className="flex size-[37px] shrink-0 items-center justify-center">
                <Icon className="size-[37px] text-[#111827]" aria-hidden="true" strokeWidth={1.5} />
              </span>
              <span className="text-[18px] font-medium leading-none tracking-normal text-[#111827]">
                {link.label}
              </span>
            </Link>
          </StaggerItem>
        )
      })}
    </StaggerGroup>
  )
}

export function FollowTheWorkSection({
  heading,
  description,
  backgroundImage,
  socialLinks,
}: FollowTheWorkSectionProps) {
  return (
    <section className="bg-white py-8 md:py-10 lg:pb-12 lg:pt-[35px]">
      <div className="container">
        <div
          className="relative mx-auto w-full max-w-[1347px] overflow-hidden rounded-3xl bg-[#001529] bg-cover bg-[center_center] bg-no-repeat max-sm:min-h-[400px] lg:h-[540px]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="relative flex h-full min-h-[400px] flex-col justify-between gap-8 px-6 py-8 sm:px-10 lg:min-h-[540px] lg:flex-row lg:items-start lg:justify-between lg:px-0 lg:py-0">
            <div className="max-w-[396px] lg:absolute lg:left-[47px] lg:top-[213px]">
              <Reveal
                as="h2"
                className="max-w-[379px] text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-white lg:text-[40px]"
              >
                {heading}
              </Reveal>
              <Reveal
                as="p"
                className="mt-[15px] max-w-[396px] text-[18px] font-medium leading-[26px] tracking-normal text-[#AAB5C1]"
              >
                {description}
              </Reveal>
            </div>

            <SocialLinks
              links={socialLinks}
              className="flex w-full max-w-[197px] flex-col gap-[10px] lg:absolute lg:right-[63px] lg:top-[106px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
