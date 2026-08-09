import type { Metadata } from 'next'
import Image from 'next/image'
import { Gem, ShieldCheck, Wrench, Headset } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { categories } from '@/lib/categories'

export const metadata: Metadata = {
  title: 'من نحن',
  description: 'تعرف على والي بلازا — خبرة في تجهيز المكاتب والشركات والقاعات بأثاث متين وتصميمات عصرية.',
  alternates: { canonical: '/about' },
}

const values = [
  { icon: Gem, title: 'تشكيلة واسعة', text: `${categories.length} قسماً يغطي احتياجات المكتب والقاعة والمنزل في مكان واحد.` },
  { icon: ShieldCheck, title: 'جودة قبل السعر', text: 'نختار الخامات والموردين بعناية، ونفضّل القطعة التي تدوم على القطعة الأرخص.' },
  { icon: Wrench, title: 'خدمة متكاملة', text: 'من الاستشارة والمقاسات حتى التوصيل والتركيب وضبط القطع في مكانها.' },
  { icon: Headset, title: 'متابعة بعد البيع', text: 'نظل على تواصل معك بعد التسليم لأي ملاحظة أو احتياج إضافي.' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
      <ScrollReveal>
        <h1 className="mb-3 text-center text-4xl font-extrabold text-balance">
          من <span className="text-gradient">نحن</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground text-pretty">
          والي بلازا للأثاث المكتبي والمنزلي — نساعد الشركات والمؤسسات على تجهيز
          مساحاتها بأثاث عملي ومتين وتصميمات تعكس صورة احترافية.
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="relative mb-12 aspect-16/9 overflow-hidden rounded-3xl border border-border shadow-lg">
          <Image
            src="/images/meeting-tables/02.jpg"
            alt="قاعة اجتماعات مجهزة من والي بلازا"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      </ScrollReveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {values.map((value, i) => (
          <ScrollReveal key={value.title} delay={i * 0.08}>
            <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <value.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="mb-1.5 text-lg font-extrabold">{value.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{value.text}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
