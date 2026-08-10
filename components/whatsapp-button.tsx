'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons'
import { useLang } from '@/components/language-provider'
import { PHONES, whatsappLink } from '@/lib/site'

export function WhatsAppButton() {
  const [open, setOpen] = useState(false)
  const { t } = useLang()

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2">
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-1 w-60 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <li className="border-b border-border px-4 py-2.5 text-xs font-bold text-muted-foreground">
              {t.chooseNumber}
            </li>
            {PHONES.map((phone) => (
              <li key={phone.wa} className="border-b border-border last:border-0">
                <a
                  href={whatsappLink(t.msgGeneral, phone.wa)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-bold transition-colors hover:bg-accent"
                >
                  <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#1da851]" />
                  <span dir="ltr">{phone.display}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.whatsapp}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform hover:scale-105 focus-visible:ring-3 focus-visible:ring-[#25D366]/40 focus-visible:outline-none"
      >
        {!open && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-[#25D366]"
            animate={{ opacity: [0.5, 0], scale: [1, 1.6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        {open ? <X className="h-6 w-6" /> : <WhatsAppIcon className="h-7 w-7" />}
      </button>
    </div>
  )
}
