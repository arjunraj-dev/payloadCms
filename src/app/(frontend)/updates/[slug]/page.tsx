import { UpdateDetailContent } from '@/app/(frontend)/components/sections/UpdateDetailContent'
import {
  UpdateDetailBackLink,
  UpdateDetailHeader,
} from '@/app/(frontend)/components/sections/UpdateDetailHeader'
import { DEFAULT_SOCIAL_LINKS, getUpdateBySlug } from '@/app/(frontend)/updates/data'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const update = getUpdateBySlug(slug)

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
  const update = getUpdateBySlug(slug)

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
              date={update.date}
              category={update.category}
              socialLinks={DEFAULT_SOCIAL_LINKS}
            />

            <UpdateDetailContent
              image={update.image}
              imageAlt={update.imageAlt}
              paragraphs={update.paragraphs}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
