import type { Metadata } from 'next'
import { CategoriesIndex } from '@/components/pages/categories-index'
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
    <>
      <CategoriesIndex categories={categories} />
      <JsonLd data={listSchema} />
    </>
  )
}
