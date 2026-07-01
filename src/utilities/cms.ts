import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media } from '@/payload-types'

export const mediaUrl = (media: number | Media | null | undefined): string =>
  typeof media === 'object' && media ? getMediaUrl(media.url) : ''

export const mediaAlt = (media: number | Media | null | undefined): string =>
  typeof media === 'object' && media ? media.alt || '' : ''

export const paragraphs = (items: { text: string }[] | null | undefined): string[] =>
  items?.map((item) => item.text) ?? []
