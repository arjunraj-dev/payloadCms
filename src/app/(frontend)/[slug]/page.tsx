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
import { InitiativesHomeSection } from '@/app/(frontend)/components/sections/InitiativesHomeSection'
import { MinistryBuiltSection } from '@/app/(frontend)/components/sections/MinistryBuiltSection'
import { MinisterProfileSection } from '@/app/(frontend)/components/sections/MinisterProfileSection'
import { ShowYouSection } from '@/app/(frontend)/components/sections/ShowYouSection'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobalSafe } from '@/utilities/getGlobals'
import { mediaUrl, paragraphs } from '@/utilities/cms'
import { getPillarCardIconSrc } from '@/utilities/pillarCardIcons'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

const GOVERNMENT_SERVICE_IMAGE_FALLBACKS = {
  family: '/govermant-service/39a9165c48e18d3272f1bf8fca93a48d5c38bba5.png',
  laptop: '/govermant-service/38a45de76275c4f1afdaa13b5c28eb300c3f9ebe.png',
  celebrating: '/govermant-service/0e3b072b9794f7bbcb2e51da77d0c3a9838f48bf.png',
} as const

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
  const homepage = decodedSlug === 'home' ? await getCachedGlobalSafe('homepage', 2)() : null

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
          titleVariant="display"
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
          layout="banner"
          label={homepage.ministerProfile.label}
          bio={paragraphs(homepage.ministerProfile.bio)}
          name={homepage.ministerProfile.name}
          title={homepage.ministerProfile.title}
          image={mediaUrl(homepage.ministerProfile.image)}
        />
      )}
      {homepage && (
        <InitiativesHomeSection
          heading={homepage.initiatives.heading}
          ctaLabel={homepage.initiatives.cta.label}
          ctaHref={homepage.initiatives.cta.href}
          cards={(homepage.initiatives.cards ?? []).map((card) => ({
            iconSrc: getPillarCardIconSrc(card.title) ?? '',
            title: card.title,
            description: card.description,
          }))}
        />
      )}
      {homepage && (
        <GovernmentServiceSection
          heading={homepage.governmentService.heading}
          description={homepage.governmentService.description}
          ctaLabel={homepage.governmentService.cta.label}
          ctaHref={homepage.governmentService.cta.href}
          familyImage={
            mediaUrl(homepage.governmentService.images?.family) ||
            GOVERNMENT_SERVICE_IMAGE_FALLBACKS.family
          }
          laptopImage={
            mediaUrl(homepage.governmentService.images?.laptop) ||
            GOVERNMENT_SERVICE_IMAGE_FALLBACKS.laptop
          }
          celebratingImage={
            mediaUrl(homepage.governmentService.images?.celebrating) ||
            GOVERNMENT_SERVICE_IMAGE_FALLBACKS.celebrating
          }
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

  try {
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
  } catch (error) {
    console.error(`Failed to load page "${slug}":`, error)
    return null
  }
})
