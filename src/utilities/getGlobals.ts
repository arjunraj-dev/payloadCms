import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 0): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

async function getGlobalUpdatedAt(slug: Global): Promise<string> {
  const payload = await getPayload({ config: configPromise })
  const global = await payload.findGlobal({
    slug,
    depth: 0,
    select: {
      updatedAt: true,
    },
  })

  return global.updatedAt ?? 'unknown'
}

async function getCachedGlobalBySlug<T extends Global>(
  slug: T,
  depth: number,
): Promise<DataFromGlobalSlug<T>> {
  const updatedAt = await getGlobalUpdatedAt(slug)

  return unstable_cache(async () => getGlobal<T>(slug, depth), [slug, String(depth), updatedAt], {
    tags: [`global_${slug}`],
  })()
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 * Cache keys include updatedAt so imports/restores pick up new CMS content.
 */
export const getCachedGlobal = <T extends Global>(slug: T, depth = 0) => () =>
  getCachedGlobalBySlug<T>(slug, depth)

/**
 * Same as getCachedGlobal but returns null when the database is unavailable
 * or the global cannot be loaded (e.g. schema not pushed yet).
 */
export const getCachedGlobalSafe = <T extends Global>(slug: T, depth = 0) => async () => {
  try {
    return await getCachedGlobalBySlug<T>(slug, depth)
  } catch (error) {
    console.error(`Failed to load global "${slug}":`, error)
    return null
  }
}
