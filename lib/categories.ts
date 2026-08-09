import { readdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import { categoryMeta } from '@/lib/category-meta'
import type { Category } from '@/lib/types'

export type { Category }

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images')
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])

const slugs = categoryMeta.map((c) => c.slug)
/** الأطول أولاً حتى لا يلتقط slug قصير ملفاً يخص slug أطول */
const slugsByLength = [...slugs].sort((a, b) => b.length - a.length)

function isImage(file: string) {
  return EXTENSIONS.has(path.extname(file).toLowerCase())
}

/** الرقم في آخر الاسم للترتيب: executive-desks-12.jpg → 12 */
function orderOf(file: string) {
  const match = path.basename(file, path.extname(file)).match(/(\d+)$/)
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER
}

function sortImages(files: string[]) {
  return files.sort((a, b) => orderOf(a) - orderOf(b) || a.localeCompare(b, 'en'))
}

/**
 * يقرأ صور كل قسم تلقائياً من public/images بطريقتين:
 *   1. اسم الملف يبدأ بـ slug القسم:  executive-desks-7.jpg
 *   2. مجلد فرعي باسم الـ slug:      public/images/executive-desks/anything.jpg
 * لا حاجة لتعديل أي كود عند إضافة صور جديدة.
 */
function scanImages(): Record<string, string[]> {
  const result: Record<string, string[]> = Object.fromEntries(slugs.map((s) => [s, []]))
  if (!existsSync(IMAGES_DIR)) return result

  for (const entry of readdirSync(IMAGES_DIR, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!slugs.includes(entry.name)) continue
      const files = readdirSync(path.join(IMAGES_DIR, entry.name))
        .filter(isImage)
        .map((file) => `/images/${entry.name}/${file}`)
      result[entry.name].push(...sortImages(files))
      continue
    }

    if (!isImage(entry.name)) continue
    const base = path.basename(entry.name, path.extname(entry.name))
    const slug = slugsByLength.find((s) => base === s || base.startsWith(`${s}-`))
    if (slug) result[slug].push(`/images/${entry.name}`)
  }

  for (const slug of slugs) result[slug] = sortImages(result[slug])
  return result
}

const imagesBySlug = scanImages()

export const categories: Category[] = categoryMeta.map((meta) => ({
  ...meta,
  images: imagesBySlug[meta.slug] ?? [],
}))

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export const categoriesWithImages = categories.filter((c) => c.images.length > 0)

export function cover(category: Category) {
  return category.images[0]
}
