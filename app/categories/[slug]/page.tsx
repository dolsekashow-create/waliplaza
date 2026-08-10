import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoryView } from '@/components/pages/category-view'
import { JsonLd } from '@/components/json-ld'
import { categories, getCategory } from '@/lib/categories'
import { SITE } from '@/lib/site'

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
    openGraph: {
      title: `${category.name} | ${SITE.name}`,
      description: category.description,
      url: `${SITE.url}/categories/${category.slug}`,
      images: category.images[0] ? [{ url: category.images[0], alt: category.name }] : undefined,
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const related = categories
    .filter((c) => c.slug !== category.slug && c.images.length > 0)
    .slice(0, 3)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'الأقسام', item: `${SITE.url}/categories` },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `${SITE.url}/categories/${category.slug}`,
      },
    ],
  }

  return (
    <>
      <CategoryView category={category} related={related} />
      <JsonLd data={breadcrumbSchema} />
    </>
  )
}
