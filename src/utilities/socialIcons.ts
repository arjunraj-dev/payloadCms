import { Facebook, Instagram, Linkedin, type LucideIcon } from 'lucide-react'

export const TIKTOK_ICON_SRC = '/ticktalk.svg'

export const socialIconMap: Record<string, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
}

export const socialLabelMap: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
  x: 'TikTok',
  twitter: 'TikTok',
}

export const socialPlatformOptions = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'TikTok', value: 'tiktok' },
]

export function normalizeSocialPlatform(platform: string): string {
  if (platform === 'x' || platform === 'twitter') return 'tiktok'
  return platform
}

export function isTikTokPlatform(platform: string): boolean {
  return normalizeSocialPlatform(platform) === 'tiktok'
}
