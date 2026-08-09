import { Hero, WhyUs, CategoriesPreview, ContactCta } from '@/components/home-sections'
import { JsonLd } from '@/components/json-ld'
import { SITE } from '@/lib/site'
import { categoriesWithImages } from '@/lib/categories'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  inLanguage: 'ar',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesPreview categories={categoriesWithImages} />
      <WhyUs />
      <ContactCta />
      <JsonLd data={websiteSchema} />
    </>
  )
}
