import type { Metadata, Viewport } from 'next'
import { Cairo } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { PageTransition } from '@/components/page-transition'
import { JsonLd } from '@/components/json-ld'
import { SelectionProvider } from '@/components/selection'
import { LanguageProvider } from '@/components/language-provider'
import { categories } from '@/lib/categories'
import { PHONES, SITE, PRIMARY_EMAIL, SOCIALS } from '@/lib/site'
import './globals.css'

const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.nameEn} - ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'والي بلازا',
    'أثاث مكتبي',
    'مكاتب رئاسية',
    'ترابيزات اجتماعات',
    'ويرك ستيشن',
    'خزنات مصفحة',
    'فايل كابين',
    'لوكرات حديد',
    'كراسي قاعات ومسارح',
    'أنظمة صوتيات',
    'Wali Plaza',
    'office furniture Sudan',
  ],
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
}

export const viewport: Viewport = { themeColor: '#F26B12' }

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  name: SITE.name,
  alternateName: SITE.nameEn,
  url: SITE.url,
  image: `${SITE.url}/images/logo.png`,
  description: SITE.description,
  telephone: PHONES.map((p) => p.tel),
  email: PRIMARY_EMAIL,
  sameAs: [SOCIALS.facebook, SOCIALS.instagram, SOCIALS.tiktok],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} bg-background`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <LanguageProvider>
          <SelectionProvider>
            <Navbar />
            <main id="main">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer categories={categories} />
            <WhatsAppButton />
          </SelectionProvider>
        </LanguageProvider>
        <JsonLd data={organizationSchema} />
      </body>
    </html>
  )
}
