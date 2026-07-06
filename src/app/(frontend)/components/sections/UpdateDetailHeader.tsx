import type { LucideIcon } from 'lucide-react'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Reveal } from '@/app/(frontend)/components/motion/Reveal'

export interface UpdateDetailSocialLink {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'x' | 'twitter' | string
  href: string
}

export interface UpdateDetailHeaderProps {
  title: string
  date: string
  category: string
  socialLinks: UpdateDetailSocialLink[]
}

const PLATFORM_CONFIG: Record<string, { icon: LucideIcon; label: string }> = {
  facebook: { icon: Facebook, label: 'Facebook' },
  instagram: { icon: Instagram, label: 'Instagram' },
  linkedin: { icon: Linkedin, label: 'LinkedIn' },
  x: { icon: Twitter, label: 'X / Twitter' },
  twitter: { icon: Twitter, label: 'X / Twitter' },
}

function getPlatformConfig(platform: string) {
  const config = PLATFORM_CONFIG[platform.toLowerCase()]

  if (config) {
    return config
  }

  return {
    icon: null,
    label: platform.charAt(0).toUpperCase() + platform.slice(1),
  }
}

export function UpdateDetailHeader({ title, date, category, socialLinks }: UpdateDetailHeaderProps) {
  return (
    <header>
      <Reveal as="h1" className="text-[clamp(2rem,5vw,56px)] font-normal leading-[50px] text-[#001529]">
        {title}
      </Reveal>

      <Reveal
        as="div"
        delay={0.08}
        className="mt-6 flex flex-wrap items-center gap-[17px] text-base font-normal leading-[30px] text-[#4B5563]"
      >
        <time dateTime={date}>{date}</time>
        <span aria-hidden="true">|</span>
        <span>{category}</span>

        {socialLinks.map((link) => {
          const { icon: Icon, label } = getPlatformConfig(link.platform)

          return (
            <Link
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${label}`}
              className="inline-flex items-center justify-center text-[#4B5563] transition-colors hover:text-[#001529]"
            >
              {Icon && <Icon className="size-5 shrink-0" aria-hidden="true" strokeWidth={1.5} />}
            </Link>
          )
        })}
      </Reveal>
    </header>
  )
}

export function UpdateDetailBackLink() {
  return (
    <Link
      href="/updates"
      aria-label="Back to updates"
      className="inline-flex shrink-0 text-base font-normal uppercase leading-[30px] text-[#4B5563] transition-colors hover:text-[#001529] lg:pt-1"
    >
      ← BACK
    </Link>
  )
}
