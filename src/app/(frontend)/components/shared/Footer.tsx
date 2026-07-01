import Link from 'next/link'
import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media } from '@/payload-types'

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

  const logoUrl = typeof footer.logo === 'object' ? getMediaUrl((footer.logo as Media).url) : ''
  const logoAlt = typeof footer.logo === 'object' ? (footer.logo as Media).alt || '' : ''
  const columns = footer.columns ?? []
  const legalLinks = footer.legalLinks ?? []
  const contact = footer.contact

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
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#4B5563]">
              {footer.tagline}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <FooterColumn key={column.id ?? column.title} title={column.title}>
                {(column.links ?? []).map(({ label, href }) => (
                  <FooterLink key={href} href={href} label={label} />
                ))}
              </FooterColumn>
            ))}

            {contact && (
              <FooterColumn title="Contact">
                {contact.phoneHref && contact.phoneLabel && (
                  <li>
                    <a
                      href={contact.phoneHref}
                      className="text-sm text-[#001529]/80 transition-colors hover:text-[#008C95]"
                    >
                      {contact.phoneLabel}
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-[#001529]/80 transition-colors hover:text-[#008C95]"
                    >
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.address && (
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
        <div className="container flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6B7280]">
            © {year} {footer.copyrightText}
          </p>
          <div className="flex gap-6">
            {legalLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-[#6B7280] transition-colors hover:text-[#008C95]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
