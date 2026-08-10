import type { Metadata } from 'next'
import { AboutView } from '@/components/pages/about-view'
import { categories } from '@/lib/categories'

export const metadata: Metadata = {
  title: 'من نحن',
  description: 'تعرف على والي بلازا — خبرة في تجهيز المكاتب والشركات والقاعات بأثاث متين وتصميمات عصرية.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return <AboutView count={categories.length} />
}
