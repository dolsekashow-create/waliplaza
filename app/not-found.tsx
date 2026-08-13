'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useLang } from '@/components/language-provider'

export default function NotFound() {
  const { t } = useLang()
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-24 text-center md:px-6">
      <Image
        src="/images/logo.png"
        alt="Wali Plaza"
        width={220}
        height={172}
        className="h-16 w-auto opacity-90"
      />
      <p className="text-6xl font-extrabold text-gradient">404</p>
      <h1 className="text-2xl font-extrabold text-balance">{t.notFoundTitle}</h1>
      <p className="leading-relaxed text-muted-foreground text-pretty">{t.notFoundText}</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="rounded-full bg-gradient-brand px-8 text-primary-foreground hover:opacity-90">
          <Link href="/">{t.backHome}</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full bg-transparent px-8">
          <Link href="/categories">{t.allCategories}</Link>
        </Button>
      </div>
    </div>
  )
}
