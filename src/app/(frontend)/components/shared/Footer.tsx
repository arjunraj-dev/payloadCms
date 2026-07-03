import Link from 'next/link'
import React from 'react'

const DEFAULT_LOGO = '/images/mind-logo.svg'

const whatWeConnectLinks = [
  { label: 'Vision 2040', href: '/vision-2040' },
  { label: 'ICTA', href: '/icta' },
  { label: 'DIT', href: '/dit' },
  { label: 'URCA', href: '/urca' },
  { label: 'METI', href: '/meti' },
  { label: 'Port Authority', href: '/port-authority' },
] as const

const linksColumn = [
  { label: 'About', href: '/about' },
  { label: 'Progress', href: '/progress' },
  { label: 'Updates & Press Room', href: '/updates' },
  { label: 'Agencies', href: '/agencies' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
] as const

const serviceLinks = [
  { label: 'MyGateway', href: '/mygateway' },
  { label: 'Digital Transformation', href: '/digital-transformation' },
  { label: 'ICT Literacy & Inclusion', href: '/ict-literacy-inclusion' },
] as const

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Sitemap', href: '/sitemap' },
] as const

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

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[#E5E7EB] bg-white">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(200px,280px)_1fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="MIND"
                src={DEFAULT_LOGO}
                width={220}
                height={60}
                loading="lazy"
                decoding="async"
                className="h-auto max-w-[180px] w-full sm:max-w-[220px]"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#4B5563]">
              The Ministry of Innovation and National Development — building a digital future for
              The Bahamas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FooterColumn title="What We Connect">
              {whatWeConnectLinks.map(({ label, href }) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </FooterColumn>

            <FooterColumn title="Links">
              {linksColumn.map(({ label, href }) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </FooterColumn>

            <FooterColumn title="Service">
              {serviceLinks.map(({ label, href }) => (
                <FooterLink key={href} href={href} label={label} />
              ))}
            </FooterColumn>

            <FooterColumn title="Contact">
              <li>
                <a
                  href="tel:+12423271530"
                  className="text-sm text-[#001529]/80 transition-colors hover:text-[#008C95]"
                >
                  (242) 327-1530
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@mind.gov.bs"
                  className="text-sm text-[#001529]/80 transition-colors hover:text-[#008C95]"
                >
                  info@mind.gov.bs
                </a>
              </li>
              <li>
                <span className="text-sm text-[#001529]/80">West Bay Street, Nassau, Bahamas</span>
              </li>
            </FooterColumn>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E7EB]">
        <div className="container flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6B7280]">
            © {year} Ministry of Innovation and National Development
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
