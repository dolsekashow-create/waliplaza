'use client'

import { Phone, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { WhatsAppIcon } from '@/components/icons'
import { useLang } from '@/components/language-provider'
import { PHONES, MAP_URL, whatsappLink } from '@/lib/site'

export function ContactView() {
  const { t } = useLang()

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 md:px-6">
      <ScrollReveal>
        <h1 className="mb-3 text-center text-4xl font-extrabold text-balance">{t.contactTitle}</h1>
        <p className="mx-auto mb-12 max-w-xl text-center leading-relaxed text-muted-foreground text-pretty">
          {t.contactLead}
        </p>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-2">
        <ScrollReveal>
          <div className="flex h-full flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
              <Phone className="h-7 w-7" aria-hidden="true" />
            </span>
            <h2 className="text-xl font-extrabold">{t.phoneCard}</h2>
            <ul className="flex flex-col gap-2">
              {PHONES.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="text-lg font-bold transition-colors hover:text-primary"
                    dir="ltr"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex h-full flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366]/15 text-[#1da851]">
              <WhatsAppIcon className="h-7 w-7" />
            </span>
            <h2 className="text-xl font-extrabold">{t.waCard}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{t.waCardText}</p>
            <div className="mt-auto flex w-full flex-col gap-2">
              {PHONES.map((phone) => (
                <Button
                  key={phone.wa}
                  asChild
                  className="rounded-full bg-[#25D366] px-6 text-white hover:bg-[#1da851]"
                >
                  <a
                    href={whatsappLink(t.msgGeneral, phone.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="size-4" />
                    <span dir="ltr">{phone.display}</span>
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.15}>
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
              <MapPin className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="text-start">
              <span className="block text-lg font-extrabold">{t.mapTitle}</span>
              <span className="block text-sm text-muted-foreground">{t.mapText}</span>
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-gradient-brand px-5 py-2 text-sm font-extrabold text-primary-foreground">
            {t.directions}
          </span>
        </a>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="mt-6 flex items-center justify-center gap-3 rounded-3xl bg-accent/60 p-6">
          <Clock className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-sm font-semibold text-muted-foreground">{t.hours}</p>
        </div>
      </ScrollReveal>
    </div>
  )
}
