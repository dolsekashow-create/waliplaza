'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PHONES } from '@/lib/site'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'الرئيسية' },
  { href: '/categories', label: 'الأقسام' },
  { href: '/about', label: 'من نحن' },
  { href: '/contact', label: 'تواصل معنا' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  /** إبراز رابط الأقسام ما دام الزائر لم يفتحه بعد */
  const hint = !pathname.startsWith('/categories')

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
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="والي بلازا — الرئيسية">
          <Image
            src="/images/logo.png"
            alt="والي بلازا"
            width={200}
            height={157}
            priority
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="التنقل الرئيسي">
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
          <Button
            asChild
            className="hidden rounded-full bg-gradient-brand px-5 text-primary-foreground hover:opacity-90 sm:flex"
          >
            <a href={`tel:${PHONES[0].tel}`}>
              <Phone className="size-4" />
              اتصل بنا
            </a>
          </Button>

          <span className="relative flex md:hidden">
            {/* حلقات متمددة حول الزر — أنيميشن بالجافاسكريبت ليعمل في كل المتصفحات */}
            {!open &&
              [0, 0.7].map((delay) => (
                <motion.span
                  key={delay}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl border-2"
                  style={{ borderColor: '#F26B12' }}
                  initial={{ opacity: 0.9, scale: 1 }}
                  animate={{ opacity: [0.9, 0], scale: [1, 1.75] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay }}
                />
              ))}

            <motion.button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={open}
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border-2"
              animate={
                open
                  ? { backgroundColor: 'rgba(0,0,0,0)', borderColor: '#E6E1DC', color: '#1E1E1E' }
                  : {
                      backgroundColor: ['#F26B12', '#F26B12', 'rgba(242,107,18,0)', 'rgba(242,107,18,0)'],
                      borderColor: ['#F26B12', '#F26B12', '#E6E1DC', '#E6E1DC'],
                      color: ['#FFFFFF', '#FFFFFF', '#1E1E1E', '#1E1E1E'],
                    }
              }
              transition={
                open
                  ? { duration: 0.2 }
                  : { duration: 1.2, times: [0, 0.49, 0.5, 1], repeat: Infinity, ease: 'linear' }
              }
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </span>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-card md:hidden" aria-label="قائمة الجوال">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {links.map((link) => {
              const highlight = hint && link.href === '/categories'
              return (
                <li key={link.href} className="border-b border-border/60 last:border-0">
                  <Link
                    href={link.href}
                        className={cn(
                      'my-1.5 block rounded-xl px-3 py-2.5 text-sm font-bold transition-colors',
                      highlight
                        ? 'hint-glow border border-primary bg-accent text-primary'
                        : 'text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className="py-3">
              <a
                href={`tel:${PHONES[0].tel}`}
                className="flex items-center gap-2 text-sm font-bold text-primary"
                dir="ltr"
              >
                <Phone className="h-4 w-4" />
                {PHONES[0].display}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
