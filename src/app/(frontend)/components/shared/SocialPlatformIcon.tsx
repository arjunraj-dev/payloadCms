import { cn } from '@/utilities/ui'
import React from 'react'
import {
  isTikTokPlatform,
  normalizeSocialPlatform,
  socialIconMap,
  TIKTOK_ICON_SRC,
} from '@/utilities/socialIcons'

export interface SocialPlatformIconProps {
  platform: string
  className?: string
  strokeWidth?: number
}

export function SocialPlatformIcon({
  platform,
  className,
  strokeWidth = 1.5,
}: SocialPlatformIconProps) {
  if (isTikTokPlatform(platform)) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={TIKTOK_ICON_SRC}
        alt=""
        aria-hidden="true"
        className={cn('object-contain', className)}
      />
    )
  }

  const Icon = socialIconMap[normalizeSocialPlatform(platform)]
  if (!Icon) return null

  return <Icon className={className} aria-hidden="true" strokeWidth={strokeWidth} />
}
