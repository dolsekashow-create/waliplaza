import type { Metadata } from 'next'
import { ContactView } from '@/components/pages/contact-view'

export const metadata: Metadata = {
  title: 'تواصل معنا',
  description: 'تواصل مع والي بلازا للاستفسار عن الأثاث المكتبي وتجهيزات القاعات وطلب عرض سعر.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return <ContactView />
}
