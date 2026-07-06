import { getCachedGlobal } from '@/utilities/getGlobals'
import { mediaAlt, mediaUrl } from '@/utilities/cms'
import Link from 'next/link'
import React from 'react'

const DEFAULT_LOGO = '/images/mind-logo.svg'

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[#001529]">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">{children}</ul>
    </div>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-[#001529]/80 transition-colors hover:text-[#008C95]"
      >
        {label}
      </Link>
    </li>
  )
}

export async function Footer() {
  const footer = await getCachedGlobal('footer', 1)()
  const year = new Date().getFullYear()
  const logoUrl = mediaUrl(footer.logo) || DEFAULT_LOGO
  const logoAlt = mediaAlt(footer.logo) || 'MIND'
  const columns = footer.columns ?? []
  const legalLinks = footer.legalLinks ?? []
  const contact = footer.contact
  const hasContact = Boolean(
    contact?.phoneLabel ||
      contact?.tollFreeLabel ||
      contact?.email ||
      contact?.address,
  )

  return (
    <footer className="mt-auto border-t border-[#E5E7EB] bg-white">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={logoAlt}
                src={logoUrl}
                width={220}
                height={60}
                loading="lazy"
                decoding="async"
                className="h-auto max-w-[180px] w-full sm:max-w-[220px]"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#4B5563]">{footer.tagline}</p>
            {footer.secondaryTagline && (
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#4B5563]">
                {footer.secondaryTagline}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <FooterColumn key={column.id ?? column.title} title={column.title}>
                {(column.links ?? []).map((link) => (
                  <FooterLink key={link.id ?? link.href} href={link.href} label={link.label} />
                ))}
              </FooterColumn>
            ))}

            {hasContact && (
              <FooterColumn title="Contact">
                {contact?.phoneLabel && contact?.phoneHref && (
                  <li>
                    <a
                      href={contact.phoneHref}
                      className="text-sm text-[#001529]/80 transition-colors hover:text-[#008C95]"
                    >
                      {contact.phoneLabel}
                    </a>
                  </li>
                )}
                {contact?.tollFreeLabel && contact?.tollFreeHref && (
                  <li>
                    <a
                      href={contact.tollFreeHref}
                      className="text-sm text-[#001529]/80 transition-colors hover:text-[#008C95]"
                    >
                      {contact.tollFreeLabel}
                    </a>
                  </li>
                )}
                {contact?.email && (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-[#001529]/80 transition-colors hover:text-[#008C95]"
                    >
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact?.address && (
                  <li>
                    <span className="text-sm text-[#001529]/80">{contact.address}</span>
                  </li>
                )}
              </FooterColumn>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E7EB]">
        <div className="container py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
            <p className="text-sm text-[#6B7280]">
              © {year} {footer.copyrightText}
            </p>
            {legalLinks.length > 0 && (
              <div className="flex flex-wrap gap-6">
                {legalLinks.map((link) => (
                  <Link
                    key={link.id ?? link.href}
                    href={link.href}
                    className="text-sm text-[#6B7280] transition-colors hover:text-[#008C95]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
