import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { mediaAlt, mediaUrl } from '@/utilities/cms'
import { HeaderClient } from './Header.client'

const DEFAULT_LOGO = '/images/mind-logo.svg'
const DEFAULT_NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Progress', href: '/progress' },
  { label: 'Updates', href: '/updates' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
]

const DEFAULT_CTA = {
  label: 'Government services →',
  href: '/government-services',
}

export async function Header() {
  const header = await getCachedGlobalSafe('header', 1)()

  const logoUrl = mediaUrl(header?.logo) || DEFAULT_LOGO
  const logoAlt = mediaAlt(header?.logo) || 'MIND'
  const navLinks = header?.navItems?.length ? header.navItems : DEFAULT_NAV_LINKS
  const cta = header?.cta ?? DEFAULT_CTA

  return <HeaderClient logoUrl={logoUrl} logoAlt={logoAlt} navLinks={navLinks} cta={cta} />
}
