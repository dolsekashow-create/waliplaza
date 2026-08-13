'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ImageOff } from 'lucide-react'
import { CategoryIcon } from '@/components/category-icon'
import type { Category } from '@/lib/types'
import { useCategoryText, useLang } from '@/components/language-provider'

export function CategoryCard({ category }: { category: Category }) {
  const cover = category.images[0]
  const { t } = useLang()
  const { name, description } = useCategoryText(category)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        {cover ? (
          <Image
            src={cover}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-muted-foreground">
            <ImageOff className="h-8 w-8" aria-hidden="true" />
          </span>
        )}
        <span className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-xl bg-background/85 text-primary shadow-sm backdrop-blur">
          <CategoryIcon name={category.icon} className="h-5 w-5" />
        </span>
        {category.images.length > 0 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-foreground/75 px-2.5 py-1 text-xs font-bold text-background">
            {category.images.length} {t.imageCount}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-extrabold text-balance">{name}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
        <span className="mt-auto flex items-center gap-1 pt-2 text-sm font-bold text-primary">
          {t.browseSection}
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}
