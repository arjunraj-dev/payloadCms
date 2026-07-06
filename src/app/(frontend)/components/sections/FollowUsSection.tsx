import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'
import { StaggerGroup, StaggerItem } from '@/app/(frontend)/components/motion/StaggerGroup'

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

interface SocialButtonProps {
  link: FollowUsSocialLink
}

function SocialButton({ link }: SocialButtonProps) {
  const Icon = link.icon

  return (
    <Link
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Follow us on ${link.label}`}
      className="flex h-[155px] w-[166px] max-w-full flex-col items-center justify-center gap-2 rounded-[24px] border border-[#E5E7EB] bg-white p-[10px] text-[#001529] transition-colors hover:border-[#001529]/30 hover:bg-[#F8F9FA]"
    >
      <Icon className="size-6 shrink-0" aria-hidden="true" strokeWidth={1.5} />
      <span className="text-sm font-medium leading-none">{link.label}</span>
    </Link>
  )
}

export function FollowUsSection({
  socialLinks,
  heading = 'Follow us.',
  subtitle = 'We share updates and announcements as they happen.',
}: FollowUsSectionProps) {
  return (
    <div className="w-full min-w-0 text-center">
      <Reveal
        as="h2"
        className="text-[clamp(1.75rem,4vw,40px)] font-normal leading-[47px] text-[#001529]"
      >
        {heading}
      </Reveal>

      <Reveal as="p" delay={0.08} className="mt-3 text-[18px] font-medium leading-[25px] text-[#4B5563]">
        {subtitle}
      </Reveal>

      <StaggerGroup as="div" className="mx-auto mt-8 grid w-fit grid-cols-2 gap-[10px]">
        {socialLinks.map((link) => (
          <StaggerItem as="div" key={link.platform}>
            <SocialButton link={link} />
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  )
}
