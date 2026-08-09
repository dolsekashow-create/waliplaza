import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, Phone, ImageOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Gallery } from '@/components/gallery'
import { CategoryCard } from '@/components/category-card'
import { CategoryIcon } from '@/components/category-icon'
import { ScrollReveal } from '@/components/scroll-reveal'
import { JsonLd } from '@/components/json-ld'
import { WhatsAppIcon } from '@/components/icons'
import { categories, getCategory } from '@/lib/categories'
import { PHONES, SITE, whatsappLink } from '@/lib/site'

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

  const related = categories.filter((c) => c.slug !== category.slug && c.images.length > 0).slice(0, 3)

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
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <nav aria-label="مسار التنقل" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-primary">
              الرئيسية
            </Link>
          </li>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <li>
            <Link href="/categories" className="transition-colors hover:text-primary">
              الأقسام
            </Link>
          </li>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <li className="font-semibold text-foreground">{category.name}</li>
        </ol>
      </nav>

      <ScrollReveal>
        <div className="mb-10 flex flex-col items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground">
              <CategoryIcon name={category.icon} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-balance md:text-3xl">{category.name}</h1>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground text-pretty">
                {category.description}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-wrap gap-2 md:w-auto">
            <Button
              asChild
              className="flex-1 rounded-full bg-gradient-brand px-6 text-primary-foreground hover:opacity-90 md:flex-none"
            >
              <a href={`tel:${PHONES[0].tel}`}>
                <Phone className="size-4" />
                اتصل للاستفسار
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1 rounded-full bg-transparent px-6 md:flex-none">
              <a
                href={whatsappLink(`السلام عليكم، أرغب في الاستفسار عن: ${category.name}`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-4" />
                واتساب
              </a>
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {category.images.length > 0 ? (
        <Gallery images={category.images} category={category.name} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-muted/40 px-6 py-16 text-center">
          <ImageOff className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
          <p className="text-lg font-bold">صور هذا القسم قيد التحديث</p>
          <p className="max-w-md leading-relaxed text-muted-foreground text-pretty">
            المنتجات متوفرة بالمعرض — تواصل معنا وسنرسل لك الصور والمقاسات المتاحة.
          </p>
          <Button asChild className="mt-2 rounded-full bg-gradient-brand px-8 text-primary-foreground hover:opacity-90">
            <a
              href={whatsappLink(`السلام عليكم، أرغب في صور ومقاسات: ${category.name}`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-4" />
              اطلب الصور عبر واتساب
            </a>
          </Button>
        </div>
      )}

      <section className="mt-20">
        <ScrollReveal>
          <h2 className="mb-8 text-center text-2xl font-extrabold text-balance">أقسام أخرى</h2>
        </ScrollReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((c, i) => (
            <ScrollReveal key={c.slug} delay={i * 0.08}>
              <CategoryCard category={c} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <JsonLd data={breadcrumbSchema} />
    </div>
  )
}
