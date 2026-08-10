'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Check, Plus } from 'lucide-react'
import { useSelection } from '@/components/selection'
import { CategoryIcon } from '@/components/category-icon'
import { cn } from '@/lib/utils'
import type { Category } from '@/lib/types'
import { useCategoryText, useLang } from '@/components/language-provider'

export function CategoryRow({ category, limit = 5 }: { category: Category; limit?: number }) {
  const { has, toggle } = useSelection()
  const { t } = useLang()
  const { name } = useCategoryText(category)
  const images = category.images.slice(0, limit)
  if (images.length === 0) return null

  return (
    <section className="py-8" aria-labelledby={`row-${category.slug}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3
          id={`row-${category.slug}`}
          className="flex items-center gap-2.5 text-xl font-extrabold text-balance md:text-2xl"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
            <CategoryIcon name={category.icon} className="h-5 w-5" />
          </span>
          {name}
        </h3>

        <Link
          href={`/categories/${category.slug}`}
          className="flex shrink-0 items-center gap-1 rounded-full border border-border px-4 py-1.5 text-xs font-extrabold transition-colors hover:border-primary hover:text-primary md:text-sm"
        >
          {t.viewAll}
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5">
        {images.map((image, i) => {
          const selected = has(image)
          const item = { image, category: name, index: i + 1 }
          return (
            <li
              key={image}
              className="relative w-40 shrink-0 snap-start sm:w-48 md:w-auto md:shrink"
            >
              <Link
                href={`/categories/${category.slug}`}
                className={cn(
                  'group block overflow-hidden rounded-2xl border-2 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg',
                  selected ? 'border-primary' : 'border-border',
                )}
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={image}
                    alt={`${name} ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="truncate px-3 py-2.5 text-xs font-bold md:text-sm">
                  {name} — {t.itemNo} {i + 1}
                </p>
              </Link>

              <button
                type="button"
                onClick={() => toggle(item)}
                aria-pressed={selected}
                aria-label={`${selected ? t.removeItem : t.addToOrder} — ${name} ${i + 1}`}
                className={cn(
                  'absolute top-2 left-2 flex h-8 items-center gap-1 rounded-full px-2 text-[11px] font-extrabold shadow-md transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  selected
                    ? 'bg-gradient-brand text-primary-foreground'
                    : 'bg-background/90 text-foreground backdrop-blur hover:bg-background',
                )}
              >
                {selected ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.added}
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    {t.add}
                  </>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
