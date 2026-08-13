'use client'

import Link from 'next/link'
import { ChevronLeft, Phone, ImageOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Gallery } from '@/components/gallery'
import { CategoryCard } from '@/components/category-card'
import { CategoryIcon } from '@/components/category-icon'
import { ScrollReveal } from '@/components/scroll-reveal'
import { WhatsAppIcon } from '@/components/icons'
import { useCategoryText, useLang } from '@/components/language-provider'
import { PHONES, whatsappLink } from '@/lib/site'
import type { Category } from '@/lib/types'

export function CategoryView({
  category,
  related,
}: {
  category: Category
  related: Category[]
}) {
  const { t } = useLang()
  const { name, description } = useCategoryText(category)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <nav aria-label="breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-primary">
              {t.home}
            </Link>
          </li>
          <ChevronLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" aria-hidden="true" />
          <li>
            <Link href="/categories" className="transition-colors hover:text-primary">
              {t.categories}
            </Link>
          </li>
          <ChevronLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" aria-hidden="true" />
          <li className="font-semibold text-foreground">{name}</li>
        </ol>
      </nav>

      <ScrollReveal>
        <div className="mb-10 flex flex-col items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-primary-foreground">
              <CategoryIcon name={category.icon} className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-balance md:text-3xl">{name}</h1>
              <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground text-pretty">
                {description}
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
                {t.callUs}
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1 rounded-full bg-transparent px-6 md:flex-none">
              <a
                href={whatsappLink(`${t.msgImages} ${name}`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-4" />
                {t.whatsapp}
              </a>
            </Button>
          </div>
        </div>
      </ScrollReveal>

      {category.images.length > 0 ? (
        <Gallery images={category.images} category={name} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-border bg-muted/40 px-6 py-16 text-center">
          <ImageOff className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
          <p className="text-lg font-bold">{t.imagesSoonTitle}</p>
          <p className="max-w-md leading-relaxed text-muted-foreground text-pretty">{t.imagesSoonText}</p>
          <Button asChild className="mt-2 rounded-full bg-gradient-brand px-8 text-primary-foreground hover:opacity-90">
            <a
              href={whatsappLink(`${t.msgImages} ${name}`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-4" />
              {t.askForImages}
            </a>
          </Button>
        </div>
      )}

      <section className="mt-20">
        <ScrollReveal>
          <h2 className="mb-8 text-center text-2xl font-extrabold text-balance">{t.otherCategories}</h2>
        </ScrollReveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((c, i) => (
            <ScrollReveal key={c.slug} delay={i * 0.08}>
              <CategoryCard category={c} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
