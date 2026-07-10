import type { CSSProperties } from 'react'

/**
 * Shared Figma-exact gradient CTA styling: gradient fill + gradient border, achieved via the
 * padding-box/border-box double-background trick since `border-image` gradients aren't reliable
 * on interactive elements across browsers. Used by the header's "Government services" button,
 * the homepage hero's primary CTA, and other teal/navy gradient buttons across the site.
 */
export const GRADIENT_CTA_BASE_CLASSNAME =
  'inline-flex items-center justify-center gap-2.5 rounded-md px-[18px] py-2.5 text-center text-[16px] font-semibold leading-none text-white transition-opacity hover:opacity-90'

export const TEAL_GRADIENT_CTA_STYLE: CSSProperties = {
  border: '1px solid transparent',
  backgroundImage:
    'linear-gradient(90deg, #0C3538 0%, #0F848D 35.56%, #169EA9 49.52%, #169EA9 53.78%, #0F848D 64.92%, #0C3538 100%), linear-gradient(90deg, #08747D 0%, #67B5BB 48.08%, #08747D 100%)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
}

export const NAVY_GRADIENT_CTA_STYLE: CSSProperties = {
  border: '1px solid transparent',
  backgroundImage:
    'linear-gradient(90deg, #0D1B2A 0%, #0D1B2A 0%, #22364D 49.52%, #22364D 53.78%, #293C51 64.92%, #0D1B2A 100%), linear-gradient(90deg, #1F344C 0%, #587799 48.08%, #1F344C 100%)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
}

/** Teal gradient border for dark CTA cards (e.g. Updates "Stay connected"). */
export const TEAL_CARD_BORDER_STYLE: CSSProperties = {
  border: '1px solid transparent',
  backgroundImage:
    'linear-gradient(#0D1B2A, #0D1B2A), linear-gradient(90deg, #08747D 0%, #67B5BB 48.08%, #08747D 100%)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
}

/** Teal gradient border on white cards (e.g. Contact "Follow us" social tiles). */
export const TEAL_WHITE_CARD_BORDER_STYLE: CSSProperties = {
  border: '1px solid transparent',
  backgroundImage:
    'linear-gradient(#ffffff, #ffffff), linear-gradient(90deg, #0C3538 0%, #0F848D 35.56%, #169EA9 49.52%, #169EA9 53.78%, #0F848D 64.92%, #0C3538 100%)',
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
}
