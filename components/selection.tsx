'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Trash2, X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons'
import { whatsappLink } from '@/lib/site'

export type SelectedItem = {
  /** مسار الصورة — المعرّف الفريد */
  image: string
  /** اسم القسم */
  category: string
  /** ترتيب الصورة داخل القسم */
  index: number
}

type SelectionContextValue = {
  items: SelectedItem[]
  has: (image: string) => boolean
  toggle: (item: SelectedItem) => void
  remove: (image: string) => void
  clear: () => void
}

const SelectionContext = createContext<SelectionContextValue | null>(null)

export function useSelection() {
  const context = useContext(SelectionContext)
  if (!context) throw new Error('useSelection must be used inside SelectionProvider')
  return context
}

/** نص الرسالة المرسلة على واتساب */
export function buildMessage(items: SelectedItem[]) {
  const origin = typeof window === 'undefined' ? '' : window.location.origin
  const lines = items.map(
    (item, i) => `${i + 1}. ${item.category} — رقم ${item.index}\n${origin}${item.image}`,
  )
  return `السلام عليكم، أرغب في الاستفسار عن المنتجات التالية:\n\n${lines.join('\n\n')}`
}

/** رسالة منتج واحد */
export function buildSingleMessage(item: SelectedItem) {
  const origin = typeof window === 'undefined' ? '' : window.location.origin
  return `السلام عليكم، أرغب في الاستفسار عن هذا المنتج:\n${item.category} — رقم ${item.index}\n${origin}${item.image}`
}

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<SelectedItem[]>([])
  const [open, setOpen] = useState(false)

  const has = useCallback((image: string) => items.some((i) => i.image === image), [items])

  const toggle = useCallback((item: SelectedItem) => {
    setItems((current) =>
      current.some((i) => i.image === item.image)
        ? current.filter((i) => i.image !== item.image)
        : [...current, item],
    )
  }, [])

  const remove = useCallback((image: string) => {
    setItems((current) => current.filter((i) => i.image !== image))
  }, [])

  const clear = useCallback(() => {
    setItems([])
    setOpen(false)
  }, [])

  const value = useMemo(() => ({ items, has, toggle, remove, clear }), [items, has, toggle, remove, clear])

  return (
    <SelectionContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 pl-20 sm:pl-3"
          >
            <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              {open && (
                <ul className="max-h-56 divide-y divide-border overflow-y-auto">
                  {items.map((item) => (
                    <li key={item.image} className="flex items-center justify-between gap-3 px-4 py-2.5">
                      <span className="truncate text-sm font-semibold">
                        {item.category} — رقم {item.index}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(item.image)}
                        aria-label="إزالة من الطلب"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center gap-2 p-3 ps-4">
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-2 text-sm font-extrabold"
                  aria-expanded={open}
                >
                  <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-gradient-brand px-2 text-primary-foreground">
                    {items.length}
                  </span>
                  <span className="hidden sm:inline">منتج في طلبك</span>
                </button>

                <button
                  type="button"
                  onClick={clear}
                  aria-label="إفراغ الطلب"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>

                <a
                  href={whatsappLink(buildMessage(items))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-extrabold text-white transition-colors hover:bg-[#1da851]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  إرسال الطلب على واتساب
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SelectionContext.Provider>
  )
}
