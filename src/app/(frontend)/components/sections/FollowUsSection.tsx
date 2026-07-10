import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'
import { TEAL_WHITE_CARD_BORDER_STYLE } from '@/app/(frontend)/components/shared/gradientCta'

export interface FollowUsSocialLink {
  platform: string
  icon: LucideIcon
  label: string
  href: string
}

export interface FollowUsSectionProps {
  socialLinks: FollowUsSocialLink[]
  heading?: string
  subtitle?: string
}

function SocialButton({ link }: { link: FollowUsSocialLink }) {
  const Icon = link.icon
  const label = link.platform === 'x' ? 'X' : link.label

  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow us on ${label}`}
      className="flex aspect-square w-full flex-col items-center justify-center gap-[7px] rounded-[24px] p-[10px] transition-opacity hover:opacity-90 xl:aspect-auto xl:h-[155px]"
      style={TEAL_WHITE_CARD_BORDER_STYLE}
    >
      <Icon
        className="size-10 shrink-0 text-[#53585C] sm:size-[60px]"
        aria-hidden="true"
        strokeWidth={1.25}
      />
      <span className="text-center text-[16px] font-medium leading-none tracking-normal text-[#111827] sm:text-[18px]">
        {label}
      </span>
    </Link>
  )
}

export function FollowUsSection({
  socialLinks,
  heading = 'Follow us.',
  subtitle = 'We share updates and announcements as they happen.',
}: FollowUsSectionProps) {
  return (
    <div className="flex w-full max-w-[450px] flex-col items-center px-2 sm:px-0">
      <Reveal
        as="h2"
        className="text-center text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] tracking-normal text-[#13181D] lg:text-[40px]"
      >
        {heading}
      </Reveal>

      <Reveal
        as="p"
        delay={0.08}
        className="mt-3 max-w-[450px] text-center text-[16px] font-medium leading-[25px] tracking-normal text-[#53585C] sm:mt-4 sm:text-[18px]"
      >
        {subtitle}
      </Reveal>

      <StaggerGroup
        as="div"
        className="mt-8 grid w-full max-w-[351px] grid-cols-2 gap-x-4 gap-y-4 sm:mt-[37px] sm:gap-x-[19px] sm:gap-y-[15px]"
      >
        {socialLinks.map((link) => (
          <StaggerItem as="div" key={link.platform} className="min-w-0">
            <SocialButton link={link} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  )
}
