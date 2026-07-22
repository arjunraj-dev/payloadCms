import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { mediaAlt, mediaUrl } from '@/utilities/cms'
import { getServerSideURL } from '@/utilities/getURL'
import type { Media } from '@/payload-types'
import type { InlineEmailAttachment } from '@/utilities/sendEmail'

const LOGO_CONTENT_ID = 'mind-logo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const FALLBACK_LOGO_PNG = path.resolve(dirname, '../../public/images/mind-logo.png')
const FALLBACK_LOGO_SVG = path.resolve(dirname, '../../public/images/mind-logo.svg')

function toAbsoluteMediaUrl(url: string): string {
  if (!url) {
    return ''
  }

  if (/^https?:\/\//i.test(url)) {
    return url
  }

  const siteUrl = getServerSideURL().replace(/\/$/, '')
  return `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`
}

async function toEmailFriendlyPng(input: Buffer): Promise<Buffer> {
  // Flatten onto white so SVG/transparent logos match the official white logo art.
  try {
    return await sharp(input, { density: 300 })
      .resize({ width: 900, withoutEnlargement: true })
      .flatten({ background: '#ffffff' })
      .png()
      .toBuffer()
  } catch {
    return await sharp(input).flatten({ background: '#ffffff' }).png().toBuffer()
  }
}

async function attachmentFromBuffer(
  input: Buffer,
  logoAlt: string,
): Promise<{
  logoUrl: string
  logoAlt: string
  attachment: InlineEmailAttachment
}> {
  const png = await toEmailFriendlyPng(input)

  return {
    logoUrl: `cid:${LOGO_CONTENT_ID}`,
    logoAlt,
    attachment: {
      content: png.toString('base64'),
      filename: 'mind-logo.png',
      type: 'image/png',
      disposition: 'inline',
      contentId: LOGO_CONTENT_ID,
    },
  }
}

async function loadFallbackLogo(): Promise<{
  logoUrl: string
  logoAlt: string
  attachment: InlineEmailAttachment
} | null> {
  for (const filePath of [FALLBACK_LOGO_PNG, FALLBACK_LOGO_SVG]) {
    try {
      const input = await fs.readFile(filePath)
      return await attachmentFromBuffer(input, 'MIND')
    } catch {
      // try next fallback
    }
  }

  console.error('Failed to load fallback MIND logo from public/images')
  return null
}

/**
 * Prefer the official public MIND logo (SVG/PNG) so email branding stays consistent.
 * Falls back to CMS media if the public logo files are missing.
 */
export async function prepareLogoInlineAttachment(
  media: number | Media | null | undefined,
): Promise<{
  logoUrl: string
  logoAlt: string
  attachment: InlineEmailAttachment
} | null> {
  const official = await loadFallbackLogo()
  if (official) {
    return official
  }

  if (media && typeof media === 'object' && media.url) {
    const absoluteUrl = toAbsoluteMediaUrl(mediaUrl(media))

    if (absoluteUrl) {
      try {
        const response = await fetch(absoluteUrl)
        if (response.ok) {
          const input = Buffer.from(await response.arrayBuffer())
          return await attachmentFromBuffer(input, mediaAlt(media) || 'MIND')
        }

        console.error(`Failed to fetch email logo (${response.status}): ${absoluteUrl}`)
      } catch (error) {
        console.error('Failed to prepare CMS email logo attachment:', error)
      }
    }
  }

  return null
}
