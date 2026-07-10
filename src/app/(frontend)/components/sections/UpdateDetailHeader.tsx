import { ArrowLeft, Facebook, Instagram, Linkedin, Twitter, type LucideIcon } from 'lucide-react'
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
    <header className="flex w-full max-w-[734px] flex-col gap-4 sm:gap-[17px]">
      <Reveal
        as="h1"
        className="text-[clamp(2rem,5vw,56px)] font-normal leading-[1.1] tracking-normal text-[#13181D] lg:text-[56px] lg:leading-[50px]"
      >
        {title}
      </Reveal>

      <Reveal
        as="div"
        delay={0.08}
        className="flex flex-wrap items-center gap-x-4 gap-y-3 text-[15px] font-normal leading-[30px] tracking-normal text-[#13181D] sm:gap-[17px] sm:text-[16px]"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[#13181D] sm:gap-[17px]">
          <time dateTime={date} className="text-[#13181D]">
            {date}
          </time>
          <span aria-hidden="true" className="text-[#13181D]">
            |
          </span>
          <span className="text-[#13181D]">{category}</span>
        </div>

        <div className="flex items-center gap-5 text-[#13181D] sm:gap-7">
          {socialLinks.map((link) => {
            const { icon: Icon, label } = getPlatformConfig(link.platform)

            return (
              <Link
                key={link.platform}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${label}`}
                className="inline-flex size-10 items-center justify-center text-[#13181D] transition-opacity hover:opacity-70 sm:size-[23.5px]"
              >
                {Icon && (
                  <Icon
                    className="size-[23.5px] shrink-0 text-[#13181D]"
                    aria-hidden="true"
                    strokeWidth={1.5}
                    color="#13181D"
                  />
                )}
              </Link>
            )
          })}
        </div>
      </Reveal>
    </header>
  )
}

export function UpdateDetailBackLink() {
  return (
    <Link
      href="/updates"
      aria-label="Back to updates"
      className="inline-flex h-[44px] w-auto min-w-[70px] shrink-0 items-center gap-[11px] text-[16px] font-normal leading-[30px] tracking-normal text-[#13181D] transition-opacity hover:opacity-70 sm:h-[30px]"
    >
      <ArrowLeft className="size-4 shrink-0" aria-hidden="true" strokeWidth={1.5} />
      <span>Back</span>
    </Link>
  )
}
