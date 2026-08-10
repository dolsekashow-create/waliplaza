'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons'
import { useLang } from '@/components/language-provider'
import { PHONES, MAP_URL, DEVELOPER, SITE } from '@/lib/site'
import type { Category } from '@/lib/types'

export function Footer({ categories }: { categories: Category[] }) {
  const { lang, t } = useLang()

  const pageLinks = [
    { href: '/', label: t.home },
    { href: '/categories', label: t.allCategories },
    { href: '/about', label: t.about },
    { href: '/contact', label: t.contact },
  ]

  return (
    <footer className="mt-20 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="flex flex-col items-start gap-4">
          <Image
            src="/images/logo-white.png"
            alt={SITE.nameEn}
            width={220}
            height={172}
            className="h-16 w-auto"
          />
          <p className="text-sm leading-relaxed text-secondary-foreground/70 text-pretty">
            {t.footerAbout}
          </p>
        </div>

        <nav aria-label="pages">
          <h3 className="mb-4 text-base font-bold">{t.quickLinks}</h3>
          <ul className="flex flex-col gap-2">
            {pageLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="categories">
          <h3 className="mb-4 text-base font-bold">{t.topCategories}</h3>
          <ul className="flex flex-col gap-2">
            {categories.slice(0, 7).map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                >
                  {lang === 'en' ? category.nameEn : category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-base font-bold">{t.contactUs}</h3>
          <ul className="flex flex-col gap-3">
            {PHONES.map((phone) => (
              <li key={phone.tel}>
                <a
                  href={`tel:${phone.tel}`}
                  className="flex items-center gap-2 text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span dir="ltr">{phone.display}</span>
                </a>
              </li>
            ))}
            {PHONES.map((phone) => (
              <li key={`wa-${phone.wa}`}>
                <a
                  href={`https://wa.me/${phone.wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0" />
                  <span dir="ltr">{phone.display}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
              >
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                {t.onMap}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between md:px-6">
          <p className="text-center text-xs text-secondary-foreground/60">
            {'© '}
            {new Date().getFullYear()}
            {` ${lang === 'en' ? SITE.nameEn : SITE.name} — ${t.rights}`}
          </p>

          <a
            href={DEVELOPER.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-full border border-white/10 py-1.5 pe-4 ps-1.5 transition-colors hover:border-white/30"
          >
            <Image
              src={DEVELOPER.logo}
              alt={DEVELOPER.name}
              width={64}
              height={64}
              className="h-9 w-9 rounded-full object-cover ring-1 ring-white/15"
            />
            <span className="text-xs text-secondary-foreground/60">
              {t.developedBy}{' '}
              <span className="font-bold text-secondary-foreground/90 transition-colors group-hover:text-primary">
                {DEVELOPER.name}
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
