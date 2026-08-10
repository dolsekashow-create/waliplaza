'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { Languages } from 'lucide-react'
import { dict, type Dict, type Lang } from '@/lib/i18n'
import type { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

const KEY = 'wp-lang'

type Ctx = { lang: Lang; t: Dict; toggle: () => void }
const LanguageContext = createContext<Ctx | null>(null)

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}

/** اسم ووصف القسم حسب اللغة الحالية */
export function useCategoryText(category: Category) {
  const { lang } = useLang()
  return lang === 'en'
    ? { name: category.nameEn || category.name, description: category.descriptionEn || category.description }
    : { name: category.name, description: category.description }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // العربية هي الافتراضية دائماً عند أول فتح
  const [lang, setLang] = useState<Lang>('ar')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved === 'en' || saved === 'ar') setLang(saved)
    } catch {
      /* التخزين غير متاح */
    }
  }, [])

  useEffect(() => {
    const el = document.documentElement
    el.lang = lang
    el.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const toggle = useCallback(() => {
    setLang((current) => {
      const next: Lang = current === 'ar' ? 'en' : 'ar'
      try {
        localStorage.setItem(KEY, next)
      } catch {
        /* التخزين غير متاح */
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ lang, t: dict[lang] as Dict, toggle }), [lang, toggle])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, t, toggle } = useLang()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
      className={cn(
        'flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-extrabold transition-colors hover:border-primary hover:text-primary',
        className,
      )}
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      {t.switchLang}
    </button>
  )
}
