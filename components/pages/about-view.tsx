'use client'

import Image from 'next/image'
import { Gem, ShieldCheck, Wrench, BadgeCheck } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { useLang } from '@/components/language-provider'

export function AboutView({ count }: { count: number }) {
  const { t } = useLang()

  const values = [
    { icon: Gem, title: t.v1t, text: `${count} ${t.v1d}` },
    { icon: ShieldCheck, title: t.v2t, text: t.v2d },
    { icon: Wrench, title: t.v3t, text: t.v3d },
    { icon: BadgeCheck, title: t.v4t, text: t.v4d },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
      <ScrollReveal>
        <h1 className="mb-3 text-center text-4xl font-extrabold text-balance">{t.aboutTitle}</h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground text-pretty">
          {t.aboutLead}
        </p>
      </ScrollReveal>

      <ScrollReveal>
        <div className="relative mb-12 aspect-16/9 overflow-hidden rounded-3xl border border-border shadow-lg">
          <Image
            src="/images/showroom.jpg"
            alt="Wali Plaza"
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
