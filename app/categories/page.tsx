import type { Metadata } from 'next'
import { CategoryCard } from '@/components/category-card'
import { ScrollReveal } from '@/components/scroll-reveal'
import { JsonLd } from '@/components/json-ld'
import { categories } from '@/lib/categories'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'الأقسام',
  description: 'تصفح جميع أقسام والي بلازا للأثاث المكتبي والمنزلي وتجهيزات القاعات.',
  alternates: { canonical: '/categories' },
}

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'أقسام والي بلازا',
  itemListElement: categories.map((category, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: category.name,
    url: `${SITE.url}/categories/${category.slug}`,
  })),
}

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <ScrollReveal>
        <h1 className="mb-3 text-center text-4xl font-extrabold text-balance">
          كل <span className="text-gradient">الأقسام</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-center leading-relaxed text-muted-foreground text-pretty">
          {categories.length} قسماً من الأثاث المكتبي والمنزلي وتجهيزات القاعات.
        </p>
      </ScrollReveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, i) => (
          <ScrollReveal key={category.slug} delay={Math.min(i, 6) * 0.05}>
            <CategoryCard category={category} />
          </ScrollReveal>
        ))}
      </div>

      <JsonLd data={listSchema} />
    </div>
  )
}
