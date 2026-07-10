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
          <StaggerItem as="div" key={link.platform} className="min-w-0 w-full sm:w-auto">
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[67px] w-full max-w-[197px] items-center gap-[9px] rounded-[12px] bg-white p-[10px] transition-opacity hover:opacity-90 sm:w-[197px]"
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
          className="relative mx-auto w-full max-w-[1347px] overflow-hidden rounded-3xl bg-[#001529] bg-cover bg-[center_center] bg-no-repeat min-h-[400px] xl:h-[540px]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="relative flex h-full min-h-[400px] flex-col justify-between gap-8 px-5 py-8 sm:px-10 xl:min-h-[540px] xl:px-0 xl:py-0">
            <div className="relative z-10 max-w-[396px] xl:absolute xl:left-[47px] xl:top-[213px]">
              <Reveal
                as="h2"
                className="max-w-[379px] text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-white lg:text-[40px]"
              >
                {heading}
              </Reveal>
              <Reveal
                as="p"
                className="mt-3 max-w-[396px] text-[16px] font-medium leading-[26px] tracking-normal text-[#AAB5C1] sm:mt-[15px] sm:text-[18px]"
              >
                {description}
              </Reveal>
            </div>

            <SocialLinks
              links={socialLinks}
              className="relative z-10 flex w-full max-w-[197px] flex-col gap-[10px] xl:absolute xl:right-[63px] xl:top-[106px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
