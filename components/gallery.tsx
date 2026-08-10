'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons'
import { useSelection, buildSingleMessage } from '@/components/selection'
import { PHONES, whatsappLink } from '@/lib/site'
import { useLang } from '@/components/language-provider'
import { cn } from '@/lib/utils'

export function Gallery({ images, category }: { images: string[]; category: string }) {
  const [open, setOpen] = useState<number | null>(null)
  const { has, toggle } = useSelection()
  const { t } = useLang()

  const close = useCallback(() => setOpen(null), [])
  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? null : (i + delta + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    if (open === null) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(-1)
      if (event.key === 'ArrowLeft') step(1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, step])

  const item = (i: number) => ({ image: images[i], category, index: i + 1 })

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {images.map((image, i) => {
          const selected = has(image)
          return (
            <li key={image} className="relative">
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`${category} ${i + 1}`}
                className={cn(
                  'group relative block aspect-square w-full overflow-hidden rounded-2xl border-2 bg-muted outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50',
                  selected ? 'border-primary' : 'border-border',
                )}
              >
                <Image
                  src={image}
                  alt={`${category} ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  loading={i < 6 ? 'eager' : 'lazy'}
                />
              </button>

              <button
                type="button"
                onClick={() => toggle(item(i))}
                aria-pressed={selected}
                aria-label={`${selected ? t.removeItem : t.addToOrder} — ${category} ${i + 1}`}
                className={cn(
                  'absolute top-2 left-2 flex h-9 items-center gap-1 rounded-full px-2.5 text-xs font-extrabold shadow-md transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  selected
                    ? 'bg-gradient-brand text-primary-foreground'
                    : 'bg-background/90 text-foreground backdrop-blur hover:bg-background',
                )}
              >
                {selected ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden="true" />
                    {t.added}
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" aria-hidden="true" />
                    {t.addToOrder}
                  </>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={category}
          >
            <button
              type="button"
              onClick={close}
              aria-label={t.close}
              className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(1)
                  }}
                  aria-label={t.next}
                  className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    step(-1)
                  }}
                  aria-label={t.prev}
                  className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}

            <div
              className="flex w-full max-w-4xl flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={open}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="relative h-[60vh] w-full"
              >
                <Image
                  src={images[open]}
                  alt={`${category} ${open + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </motion.div>

              <p className="text-sm font-bold text-white/80">
                {category} — {t.itemNo} {open + 1} {t.of} {images.length}
              </p>

              <div className="flex w-full max-w-md flex-wrap items-center justify-center gap-2">
                {PHONES.map((phone) => (
                  <a
                    key={phone.wa}
                    href={whatsappLink(buildSingleMessage(item(open), t.msgSingle, t.itemNo), phone.wa)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3 text-xs font-extrabold text-white transition-colors hover:bg-[#1da851]"
                  >
                    <WhatsAppIcon className="h-5 w-5 shrink-0" />
                    <span dir="ltr">{phone.display}</span>
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => toggle(item(open))}
                  className={cn(
                    'flex h-12 flex-1 items-center justify-center gap-2 rounded-xl px-5 text-sm font-extrabold transition-colors',
                    has(images[open])
                      ? 'bg-gradient-brand text-primary-foreground'
                      : 'bg-white/10 text-white hover:bg-white/20',
                  )}
                >
                  {has(images[open]) ? (
                    <>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      {t.addedToOrder}
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5" aria-hidden="true" />
                      {t.addToOrder}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
