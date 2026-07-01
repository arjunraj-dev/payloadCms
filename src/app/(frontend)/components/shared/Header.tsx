import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { HeaderClient } from './Header.client'
import type { Media } from '@/payload-types'

export async function Header() {
  const header = await getCachedGlobal('header', 1)()

  const logoUrl = typeof header.logo === 'object' ? getMediaUrl((header.logo as Media).url) : ''
  const logoAlt = typeof header.logo === 'object' ? (header.logo as Media).alt || '' : ''

  return (
    <HeaderClient
      logoUrl={logoUrl}
      logoAlt={logoAlt}
      navLinks={header.navItems ?? []}
      cta={header.cta}
    />
  )
}
