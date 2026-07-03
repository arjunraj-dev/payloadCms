import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Update } from '../../../payload-types'

export const revalidateUpdate: CollectionAfterChangeHook<Update> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating update at path: /updates/${doc.slug}`)

    revalidatePath(`/updates/${doc.slug}`)
    revalidatePath('/updates')
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Update> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/updates/${doc?.slug}`)
    revalidatePath('/updates')
  }

  return doc
}
