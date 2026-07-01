import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { CountryFutureSection } from '@/app/(frontend)/components/sections/CountryFutureSection'
import { DrawThreadsSection } from '@/app/(frontend)/components/sections/DrawThreadsSection'
import { GovernmentServiceSection } from '@/app/(frontend)/components/sections/GovernmentServiceSection'
import { HeroSection } from '@/app/(frontend)/components/sections/HeroSection'
import { InitiativeCardsGrid } from '@/app/(frontend)/components/sections/InitiativeCardsGrid'
import { MinistryBuiltSection } from '@/app/(frontend)/components/sections/MinistryBuiltSection'
import { MinisterProfileSection } from '@/app/(frontend)/components/sections/MinisterProfileSection'
import { ShowYouSection } from '@/app/(frontend)/components/sections/ShowYouSection'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Briefcase, Target, TrendingUp, Users, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import type { Media } from '@/payload-types'

const initiativeIcons: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  target: Target,
  users: Users,
  'trending-up': TrendingUp,
}

const mediaUrl = (media: number | Media | null | undefined): string =>
  typeof media === 'object' && media ? getMediaUrl(media.url) : ''

const paragraphs = (items: { text: string }[] | null | undefined): string[] =>
  items?.map((item) => item.text) ?? []

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const homepage = decodedSlug === 'home' ? await getCachedGlobal('homepage', 2)() : null

  return (
    <article className={decodedSlug === 'home' ? undefined : 'pt-16 pb-24'}>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {homepage ? (
        <HeroSection
          title={homepage.hero.title}
          subtitle={homepage.hero.subtitle}
          primaryCTA={homepage.hero.primaryCTA}
          secondaryCTA={
            homepage.hero.secondaryCTA?.label && homepage.hero.secondaryCTA?.href
              ? { label: homepage.hero.secondaryCTA.label, href: homepage.hero.secondaryCTA.href }
              : undefined
          }
          backgroundImageInterval={homepage.hero.backgroundImageInterval ?? undefined}
          backgroundImage={(homepage.hero.backgroundImages ?? [])
            .map((row) => mediaUrl(row.image))
            .filter(Boolean)}
        />
      ) : (
        <RenderHero {...hero} />
      )}
      {homepage && (
        <ShowYouSection
          heading={homepage.showYou.heading}
          description={homepage.showYou.description}
          ctaLabel={homepage.showYou.cta.label}
          ctaHref={homepage.showYou.cta.href}
          cards={homepage.showYou.cards ?? []}
        />
      )}
      {homepage && (
        <MinistryBuiltSection
          heading={homepage.ministryBuilt.heading}
          description={paragraphs(homepage.ministryBuilt.description)}
          image={mediaUrl(homepage.ministryBuilt.image)}
          buttonLabel={homepage.ministryBuilt.button.label}
          buttonHref={homepage.ministryBuilt.button.href}
        />
      )}
      {homepage && (
        <MinisterProfileSection
          label={homepage.ministerProfile.label}
          bio={paragraphs(homepage.ministerProfile.bio)}
          name={homepage.ministerProfile.name}
          title={homepage.ministerProfile.title}
          image={mediaUrl(homepage.ministerProfile.image)}
        />
      )}
      {homepage && (
        <section className="bg-white py-12 md:py-16 lg:py-20">
          <div className="container mb-10 text-center md:mb-12">
            <h2 className="mx-auto max-w-3xl text-2xl font-bold leading-tight text-[#001529] sm:text-3xl lg:text-4xl">
              {homepage.initiatives.heading}
            </h2>
            <Link
              href={homepage.initiatives.cta.href}
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#001529] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {homepage.initiatives.cta.label}
            </Link>
          </div>
          <InitiativeCardsGrid
            cards={(homepage.initiatives.cards ?? []).map((card) => ({
              icon: initiativeIcons[card.icon] ?? Briefcase,
              title: card.title,
              description: card.description,
            }))}
          />
        </section>
      )}
      {homepage && (
        <GovernmentServiceSection
          heading={homepage.governmentService.heading}
          description={homepage.governmentService.description}
          ctaLabel={homepage.governmentService.cta.label}
          ctaHref={homepage.governmentService.cta.href}
          image={mediaUrl(homepage.governmentService.image)}
        />
      )}
      {homepage && (
        <DrawThreadsSection
          heading={homepage.drawThreads.heading}
          description={homepage.drawThreads.description}
          ctaLabel={homepage.drawThreads.cta.label}
          ctaHref={homepage.drawThreads.cta.href}
          tags={homepage.drawThreads.tags ?? []}
        />
      )}
      {homepage && (
        <CountryFutureSection
          heading={homepage.countryFuture.heading}
          subtitle={homepage.countryFuture.subtitle}
          primaryButtonLabel={homepage.countryFuture.primaryButton.label}
          primaryButtonHref={homepage.countryFuture.primaryButton.href}
          secondaryButtonLabel={homepage.countryFuture.secondaryButton?.label ?? undefined}
          secondaryButtonHref={homepage.countryFuture.secondaryButton?.href ?? undefined}
        />
      )}
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
