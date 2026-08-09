import Link from 'next/link'
import Image from 'next/image'
import { Phone, MapPin } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons'
import { categories } from '@/lib/categories'
import { PHONES, WHATSAPP_DISPLAY, WHATSAPP_URL, SITE } from '@/lib/site'

const pageLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/categories', label: 'كل الأقسام' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' },
]

export function Footer() {
  return (
    <footer className="mt-20 bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="flex flex-col items-start gap-4">
          <Image
            src="/images/logo-white.png"
            alt={SITE.name}
            width={220}
            height={172}
            className="h-16 w-auto"
          />
          <p className="text-sm leading-relaxed text-secondary-foreground/70 text-pretty">
            والي بلازا للأثاث المكتبي والمنزلي — نجهّز المكاتب والشركات والقاعات
            بأثاث متين وتصميمات عصرية وخدمة تركيب احترافية.
          </p>
        </div>

        <nav aria-label="روابط الصفحات">
          <h3 className="mb-4 text-base font-bold">روابط سريعة</h3>
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

        <nav aria-label="روابط الأقسام">
          <h3 className="mb-4 text-base font-bold">أبرز الأقسام</h3>
          <ul className="flex flex-col gap-2">
            {categories.slice(0, 7).map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-base font-bold">تواصل معنا</h3>
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
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-secondary-foreground/70 transition-colors hover:text-primary"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0" />
                <span dir="ltr">{WHATSAPP_DISPLAY}</span>
              </a>
            </li>
            <li className="flex items-center gap-2 text-sm text-secondary-foreground/70">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              معرض والي بلازا
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <p className="text-center text-xs text-secondary-foreground/60">
          {'© '}
          {new Date().getFullYear()}
          {` ${SITE.name} — جميع الحقوق محفوظة`}
        </p>
      </div>
    </footer>
  )
}
