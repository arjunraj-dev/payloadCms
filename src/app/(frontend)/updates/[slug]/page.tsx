import { UpdateDetailContent } from '@/app/(frontend)/components/sections/UpdateDetailContent'
import {
  UpdateDetailBackLink,
  UpdateDetailHeader,
} from '@/app/(frontend)/components/sections/UpdateDetailHeader'
import { DEFAULT_SOCIAL_LINKS } from '@/app/(frontend)/updates/data'
import { mediaAlt, mediaUrl, paragraphs } from '@/utilities/cms'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Args = {
  params: Promise<{
    slug: string
  }>
}

const categoryLabels: Record<string, string> = {
  announcements: 'Announcement',
  events: 'Event',
  statements: 'Statement',
  media: 'Media',
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'updates',
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return docs.map(({ slug }) => ({ slug }))
}

async function getUpdateBySlug(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'updates',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: false,
  })

  return docs[0] ?? null
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const update = await getUpdateBySlug(slug)

  if (!update) {
    return {
      title: 'Update not found | MIND',
    }
  }

  return {
    title: `${update.title} | Updates | MIND`,
    description: update.excerpt,
  }
}

export default async function UpdateDetailPage({ params }: Args) {
  const { slug } = await params
  const update = await getUpdateBySlug(slug)

  if (!update) {
    notFound()
  }

  return (
    <main className="bg-white">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="flex items-start gap-6 lg:gap-12 xl:gap-16">
          <div className="w-14 shrink-0 sm:w-20">
            <UpdateDetailBackLink />
          </div>

          <div className="min-w-0 flex-1">
            <UpdateDetailHeader
              title={update.title}
              date={new Date(update.date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              category={categoryLabels[update.category] ?? update.category}
              socialLinks={DEFAULT_SOCIAL_LINKS}
            />

            <UpdateDetailContent
              image={mediaUrl(update.image)}
              imageAlt={mediaAlt(update.image) || update.title}
              paragraphs={paragraphs(update.content)}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
