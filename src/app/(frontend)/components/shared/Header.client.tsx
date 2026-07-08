'use client'

import { cn } from '@/utilities/ui'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

interface NavLinkItem {
  label: string
  href: string
}

interface HeaderClientProps {
  logoUrl: string
  logoAlt: string
  navLinks: NavLinkItem[]
  cta?: NavLinkItem
}

function NavLink({
  href,
  label,
  pathname,
  onClick,
  className,
}: {
  href: string
  label: string
  pathname: string
  onClick?: () => void
  className?: string
}) {
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-center text-[16px] leading-none font-semibold tracking-normal transition-colors',
        isActive ? 'text-[#008C95]' : 'text-black hover:text-[#008C95]',
        className,
      )}
    >
      {label}
    </Link>
  )
}

function GovernmentServicesCTA({
  cta,
  className,
  onClick,
}: {
  cta?: NavLinkItem
  className?: string
  onClick?: () => void
}) {
  if (!cta?.href) return null

  return (
    <Link
      href={cta.href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-md px-2.5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 lg:h-[50px] lg:w-[214px]',
        className,
      )}
      style={{
        border: '1px solid transparent',
        backgroundImage:
          'linear-gradient(90deg, #0C3538 0%, #0F848D 35.56%, #169EA9 49.52%, #169EA9 53.78%, #0F848D 64.92%, #0C3538 100%), linear-gradient(90deg, #08747D 0%, #67B5BB 48.08%, #08747D 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      {cta.label}
    </Link>
  )
}

export function HeaderClient({ logoUrl, logoAlt, navLinks, cta }: HeaderClientProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false)
  }, [])

  useEffect(() => {
    closeMobileMenu()
  }, [pathname, closeMobileMenu])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeMobileMenu])

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white">
      <div className="container flex items-center py-3 lg:py-4">
        <Link href="/" className="shrink-0">
          {logoUrl ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              alt={logoAlt}
              src={logoUrl}
              width={197}
              height={76.21}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-auto w-full max-w-[160px] sm:max-w-[197px]"
            />
          ) : null}
        </Link>

        <nav
          className="ml-10 hidden items-center gap-6 lg:flex xl:ml-14"
          aria-label="Main navigation"
        >
          {navLinks.map(({ label, href }) => (
            <NavLink
              key={href}
              href={href}
              label={label}
              pathname={pathname}
              className="shrink-0 whitespace-nowrap"
            />
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 lg:block">
          <GovernmentServicesCTA cta={cta} />
        </div>

        <button
          type="button"
          className="ml-auto inline-flex size-10 shrink-0 items-center justify-center rounded-md text-[#001529] lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-[#E5E7EB] bg-white shadow-sm lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="container flex flex-col py-2">
            {navLinks.map(({ label, href }) => (
              <NavLink
                key={href}
                href={href}
                label={label}
                pathname={pathname}
                onClick={closeMobileMenu}
                className="py-3 text-base"
              />
            ))}
            <div className="py-3">
              <GovernmentServicesCTA cta={cta} className="w-full" onClick={closeMobileMenu} />
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
