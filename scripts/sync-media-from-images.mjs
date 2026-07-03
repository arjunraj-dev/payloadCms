#!/usr/bin/env node
/**
 * Restore Payload media files into public/media/ after a database-only dump.
 * The DB stores metadata; actual uploads live on disk and are gitignored.
 *
 * Usage: node scripts/sync-media-from-images.mjs
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const MEDIA_DIR = path.join(ROOT, 'public/media')
const IMAGES_DIR = path.join(ROOT, 'public/images')

/** Map CMS filename -> source path under public/images */
const SOURCE_MAP = {
  'smart-gov.png': 'hero-section-images/smart-gov.png',
  'ai-training.png': 'hero-section-images/ai-training.png',
  'bahamas-future.png': 'hero-section-images/bahamas-future.png',
  'group-9.png': 'services/group-9.png',
  'renewing-vision.png': 'hero-section-images/renewing-vision.png',
  'responsible-ai.png': 'hero-section-images/responsible-ai.png',
  'my-gateway.png': 'hero-section-images/my-gateway.png',
  'minister-portrait.jpg': 'minister-portrait.jpg',
  'ministry-robotic-hand.jpg': 'ministry-robotic-hand.jpg',
  'mind-logo.svg': 'mind-logo.svg',
  'about.png': 'about.png',
  'why-matters.jpg': 'why-matters.jpg',
  'minister-wayne.jpg': 'minister-wayne.jpg',
  'planned.jpg': 'planned.jpg',
  'develop.jpg': 'develop.jpg',
  'In-progress.jpg': 'In-progress.jpg',
  'coming.jpg': 'coming.jpg',
  'Live.jpg': 'Live.jpg',
}

function parseVariant(filename) {
  const match = filename.match(/^(.+)-(\d+)x(\d+)\.([a-z]+)$/i)
  if (!match) return null
  return {
    basename: match[1],
    width: Number(match[2]),
    height: Number(match[3]),
    out: filename,
    ext: `.${match[4]}`,
  }
}

function findSourcePath(basename, copied) {
  for (const [filename, sourcePath] of copied) {
    const stem = path.basename(filename, path.extname(filename))
    if (stem === basename) return sourcePath
  }
  return null
}

async function copyOriginal(filename) {
  const rel = SOURCE_MAP[filename]
  if (!rel) {
    console.warn(`  skip: no source mapping for ${filename}`)
    return null
  }

  const src = path.join(IMAGES_DIR, rel)
  if (!fs.existsSync(src)) {
    console.warn(`  skip: missing source ${src}`)
    return null
  }

  const dest = path.join(MEDIA_DIR, filename)
  await fs.promises.copyFile(src, dest)
  console.log(`  copied ${filename}`)
  return dest
}

async function generateVariant(sourcePath, variant) {
  const dest = path.join(MEDIA_DIR, variant.out)
  if (fs.existsSync(dest)) return

  const ext = variant.ext.toLowerCase()
  if (ext === '.svg') {
    await fs.promises.copyFile(sourcePath, dest)
    return
  }

  let pipeline = sharp(sourcePath).resize(variant.width, variant.height, {
    fit: 'inside',
    withoutEnlargement: false,
  })

  if (ext === '.jpg' || ext === '.jpeg') pipeline = pipeline.jpeg({ quality: 90 })
  else if (ext === '.png') pipeline = pipeline.png()

  await pipeline.toFile(dest)
  console.log(`  generated ${variant.out}`)
}

async function main() {
  if (!process.env.DATABASE_URL) {
    const envPath = path.join(ROOT, '.env')
    if (fs.existsSync(envPath)) {
      const env = fs.readFileSync(envPath, 'utf8')
      for (const line of env.split('\n')) {
        const m = line.match(/^DATABASE_URL=(.*)$/)
        if (m) process.env.DATABASE_URL = m[1].replace(/^["']|["']$/g, '')
      }
    }
  }

  if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL not set')
    process.exit(1)
  }

  await fs.promises.mkdir(MEDIA_DIR, { recursive: true })

  console.log('==> Copying original media files...')
  const originals = Object.keys(SOURCE_MAP)
  const copied = new Map()

  for (const filename of originals) {
    const dest = await copyOriginal(filename)
    if (dest) copied.set(filename, dest)
  }

  console.log('==> Generating size variants from database...')
  const variantList = execSync(
    `psql "${process.env.DATABASE_URL}" -t -A -c "SELECT DISTINCT f FROM (
      SELECT filename AS f FROM media WHERE filename IS NOT NULL
      UNION SELECT sizes_thumbnail_filename FROM media WHERE sizes_thumbnail_filename IS NOT NULL
      UNION SELECT sizes_square_filename FROM media WHERE sizes_square_filename IS NOT NULL
      UNION SELECT sizes_small_filename FROM media WHERE sizes_small_filename IS NOT NULL
      UNION SELECT sizes_medium_filename FROM media WHERE sizes_medium_filename IS NOT NULL
      UNION SELECT sizes_large_filename FROM media WHERE sizes_large_filename IS NOT NULL
      UNION SELECT sizes_xlarge_filename FROM media WHERE sizes_xlarge_filename IS NOT NULL
      UNION SELECT sizes_og_filename FROM media WHERE sizes_og_filename IS NOT NULL
    ) x ORDER BY 1;"`,
    { encoding: 'utf8' },
  )
    .trim()
    .split('\n')
    .filter(Boolean)

  for (const filename of variantList) {
    if (fs.existsSync(path.join(MEDIA_DIR, filename))) continue

    const variant = parseVariant(filename)
    if (!variant) continue

    const sourcePath = findSourcePath(variant.basename, copied)
    if (!sourcePath) continue

    await generateVariant(sourcePath, variant)
  }

  console.log('')
  console.log('==> Media sync complete.')
  console.log(`    Files in: ${MEDIA_DIR}`)
  console.log('    Restart dev server if it is running, then reload the site.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
