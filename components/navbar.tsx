'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { LanguageToggle, useLang } from '@/components/language-provider'
import { PHONES } from '@/lib/site'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useLang()
  const hint = !pathname.startsWith('/categories')

  const links = [
    { href: '/', label: t.home },
    { href: '/categories', label: t.categories },
    { href: '/about', label: t.about },
    { href: '/contact', label: t.contact },
  ]

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all',
        scrolled ? 'glass border-border shadow-sm' : 'border-transparent bg-background',
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="Wali Plaza">
          <Image
            src="/images/logo.png"
            alt="Wali Plaza"
            width={200}
            height={157}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="main">
          {links.map((link) => {
            const active = pathname === link.href
            const highlight = hint && link.href === '/categories'
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full border border-transparent px-4 py-2 text-sm font-bold transition-colors',
                  active ? 'bg-accent text-accent-foreground' : 'text-foreground/75 hover:text-primary',
                  highlight && 'hint-glow bg-accent text-primary',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden md:flex" />

          <a
            href={`tel:${PHONES[0].tel}`}
            className="hidden items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 md:flex"
          >
            <Phone className="h-4 w-4" />
            {t.callUs}
          </a>

          <LanguageToggle variant="icon" className="md:hidden" />

          <span className="relative flex md:hidden">
            {!open && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-xl border-2"
                style={{ borderColor: '#F26B12' }}
                initial={{ opacity: 0.45, scale: 1 }}
                animate={{ opacity: [0.45, 0], scale: [1, 1.45] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
            )}

            <motion.button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.closeMenu : t.openMenu}
              aria-expanded={open}
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border-2"
              animate={
                open
                  ? { backgroundColor: 'rgba(0,0,0,0)', borderColor: '#E6E1DC', color: '#1E1E1E' }
                  : {
                      backgroundColor: ['rgba(242,107,18,0.9)', 'rgba(242,107,18,0.9)', 'rgba(242,107,18,0.12)', 'rgba(242,107,18,0.12)'],
                      borderColor: ['#F26B12', '#F26B12', '#F0C4A4', '#F0C4A4'],
                      color: ['#FFFFFF', '#FFFFFF', '#C4560E', '#C4560E'],
                    }
              }
              transition={
                open
                  ? { duration: 0.2 }
                  : { duration: 1.8, times: [0, 0.49, 0.5, 1], repeat: Infinity, ease: 'linear' }
              }
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </span>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-card md:hidden" aria-label="mobile">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {links.map((link) => {
              const highlight = hint && link.href === '/categories'
              return (
                <li key={link.href} className="border-b border-border/60 last:border-0">
                  <Link
                    href={link.href}
                    className={cn(
                      'my-1.5 block rounded-xl px-3 py-2.5 text-sm font-bold transition-colors',
                      highlight ? 'hint-glow border border-primary bg-accent text-primary' : 'text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            {PHONES.map((phone) => (
              <li key={phone.tel} className="border-b border-border/60 last:border-0">
                <a
                  href={`tel:${phone.tel}`}
                  className="flex items-center gap-2 px-3 py-3 text-sm font-bold text-primary"
                  dir="ltr"
                >
                  <Phone className="h-4 w-4" />
                  {phone.display}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
