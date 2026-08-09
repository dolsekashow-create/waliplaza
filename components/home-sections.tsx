'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, Truck, ShieldCheck, Wrench, Headset, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WhatsAppIcon } from '@/components/icons'
import { ScrollReveal } from '@/components/scroll-reveal'
import { CategoryRow } from '@/components/category-row'
import type { Category } from '@/lib/types'
import { PHONES, WHATSAPP_URL } from '@/lib/site'

const heroImages = [
  '/images/executive-desks/01.jpg',
  '/images/meeting-tables/01.jpg',
  '/images/hall-chairs/01.jpg',
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <Image
        src="/images/executive-desks/02.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-secondary via-secondary/85 to-secondary/40"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-6 md:py-28">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-start gap-6"
        >
          <h1 className="text-4xl leading-tight font-extrabold text-balance md:text-5xl">
            <span className="text-gradient">والي بلازا</span>
            <br />
            نجهّز مكتبك بالكامل
          </h1>

          <Image
            src="/images/logo-white.png"
            alt="والي بلازا للأثاث المكتبي والمنزلي"
            width={300}
            height={235}
            className="h-20 w-auto md:h-24"
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-gradient-brand px-8 text-base text-primary-foreground shadow-glow hover:opacity-90"
            >
              <Link href="/categories">تصفح الأقسام</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/25 bg-transparent px-8 text-base text-secondary-foreground hover:bg-white/10"
            >
              <a href={`tel:${PHONES[0].tel}`}>
                <Phone className="size-5" />
                اطلب عرض سعر
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="relative col-span-2 aspect-16/10 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image src={heroImages[0]} alt="مكاتب رئاسية" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" priority />
          </div>
          {heroImages.slice(1).map((src, i) => (
            <div key={src} className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-xl">
              <Image src={src} alt={i === 0 ? 'ترابيزات اجتماعات' : 'كراسي قاعات'} fill sizes="25vw" className="object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const features = [
  { icon: ShieldCheck, title: 'خامات متينة', text: 'حديد ومعالجات مقاومة للصدأ وخشب عالي الكثافة يتحمل الاستخدام اليومي.' },
  { icon: Wrench, title: 'تركيب احترافي', text: 'فريق متخصص يتولى النقل والتركيب وضبط القطع في مكانها.' },
  { icon: Truck, title: 'تجهيز كامل', text: 'نجهّز المكتب أو القاعة من الألف للياء بقطع متناسقة في اللون والتصميم.' },
  { icon: Headset, title: 'استشارة مجانية', text: 'نساعدك في اختيار المقاسات والتوزيع المناسب لمساحتك قبل الشراء.' },
]

export function WhyUs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <ScrollReveal>
        <h2 className="mb-3 text-center text-3xl font-extrabold text-balance">لماذا والي بلازا؟</h2>
        <p className="mx-auto mb-10 max-w-xl text-center leading-relaxed text-muted-foreground text-pretty">
          خبرة في تجهيز المكاتب والشركات والقاعات، وجودة تظهر في التفاصيل.
        </p>
      </ScrollReveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, i) => (
          <ScrollReveal key={feature.title} delay={i * 0.08}>
            <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-gradient-brand group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-lg font-extrabold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{feature.text}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}

export function CategoriesPreview({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-muted/40 py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal>
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-extrabold text-balance">أقسامنا</h2>
            <p className="mx-auto mt-2 max-w-xl leading-relaxed text-muted-foreground text-pretty">
              تشكيلة متكاملة من الأثاث المكتبي وتجهيزات القاعات — اضغط على أي منتج
              لتصفح القسم بالكامل.
            </p>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-border">
          {categories.slice(0, 6).map((category) => (
            <ScrollReveal key={category.slug}>
              <CategoryRow category={category} limit={5} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-10 text-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-gradient-brand px-10 text-base text-primary-foreground shadow-glow hover:opacity-90"
            >
              <Link href="/categories">كل الأقسام</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

const points = [
  { title: 'تشكيلة متكاملة', text: 'من المكتب الرئاسي حتى كرسي القاعة — كل شيء من مكان واحد.' },
  { title: 'خامات متينة', text: 'حديد معالج وخشب عالي الكثافة يتحمل الاستخدام اليومي لسنوات.' },
  { title: 'تركيب احترافي', text: 'فريق متخصص يتولى النقل والتركيب وضبط القطع في مكانها.' },
  { title: 'استشارة مجانية', text: 'نساعدك في اختيار المقاسات والتوزيع الأنسب لمساحتك قبل الشراء.' },
]

export function ContactCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <ScrollReveal>
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-border shadow-xl">
            <Image
              src="/images/showroom.jpg"
              alt="معرض والي بلازا للأثاث المكتبي والمنزلي"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 right-4 rounded-2xl bg-gradient-brand px-5 py-3 text-center text-primary-foreground shadow-lg">
              <p className="text-2xl font-extrabold leading-none">15</p>
              <p className="mt-1 text-[11px] font-bold">قسماً متكاملاً</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-balance">جاهزون لتجهيز مكتبك</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground text-pretty">
                تواصل معنا لمعرفة الأسعار والمتوفر حالياً، أو أرسل مقاسات المكان
                ونرشح لك التوزيع المناسب.
              </p>
            </div>

            <ul className="flex flex-col gap-4">
              {points.map((point) => (
                <li key={point.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-extrabold">{point.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                      {point.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gradient-brand px-8 text-base text-primary-foreground shadow-glow hover:opacity-90"
              >
                <a href={`tel:${PHONES[0].tel}`}>
                  <Phone className="size-5" />
                  اتصل الآن
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full bg-transparent px-8 text-base"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" />
                  واتساب
                </a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
