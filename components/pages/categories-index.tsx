'use client'

import { CategoryCard } from '@/components/category-card'
import { ScrollReveal } from '@/components/scroll-reveal'
import { useLang } from '@/components/language-provider'
import type { Category } from '@/lib/types'

export function CategoriesIndex({ categories }: { categories: Category[] }) {
  const { t } = useLang()

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <ScrollReveal>
        <h1 className="mb-3 text-center text-4xl font-extrabold text-balance">{t.allCategoriesTitle}</h1>
        <p className="mx-auto mb-10 max-w-xl text-center leading-relaxed text-muted-foreground text-pretty">
          {categories.length} {t.categoriesCount}
        </p>
      </ScrollReveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => (
          <ScrollReveal key={category.slug} delay={Math.min(i, 6) * 0.05}>
            <CategoryCard category={category} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
