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

export function Header() {
  return (
    <HeaderClient
      logoUrl={DEFAULT_LOGO}
      logoAlt="MIND"
      navLinks={DEFAULT_NAV_LINKS}
      cta={DEFAULT_CTA}
    />
  )
}
