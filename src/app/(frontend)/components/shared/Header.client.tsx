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
  cta: NavLinkItem
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
        'text-sm font-medium transition-colors',
        isActive ? 'text-[#008C95]' : 'text-[#001529] hover:text-[#008C95]',
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
  cta: NavLinkItem
  className?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={cta.href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#004B4D] to-[#008C95] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90',
        className,
      )}
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
      <div className="container flex items-center justify-between gap-4 py-3 lg:py-4">
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={logoAlt}
            src={logoUrl}
            width={220}
            height={70}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-auto max-w-[180px] w-full sm:max-w-[220px]"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => (
            <NavLink key={href} href={href} label={label} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden lg:block">
          <GovernmentServicesCTA cta={cta} />
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-[#001529] lg:hidden"
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
                className="py-3"
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
