export const SITE = {
  name: 'والي بلازا',
  nameEn: 'Wali Plaza',
  tagline: 'أثاث مكتبي ومنزلي',
  taglineEn: 'Office & Home Furniture',
  url: 'https://www.waliplaza.com',
  description:
    'والي بلازا للأثاث المكتبي والمنزلي — مكاتب رئاسية ومدراء وموظفين، ترابيزات اجتماعات، ويرك ستيشن، خزنات وفايل كابينات مصفحة، دواليب ولوكرات حديد، كنب، كراسي قاعات ومسارح، وأنظمة صوتيات.',
  descriptionEn:
    'Wali Plaza — office and home furniture: executive desks, meeting tables, workstations, fireproof safes and filing cabinets, steel lockers, sofas, auditorium seating and sound systems.',
  ogImage: '/images/og.jpg',
  locale: 'ar_EG',
} as const

/** أرقام الهاتف — نفس الأرقام متاحة للاتصال والواتساب */
export const PHONES = [
  { display: '+249 91 230 8288', tel: '+249912308288', wa: '249912308288' },
  { display: '+249 91 239 8880', tel: '+249912398880', wa: '249912398880' },
]

/** الرقم الافتراضي للواتساب */
export const WHATSAPP_NUMBER = PHONES[1].wa
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export const MAP_URL = 'https://maps.app.goo.gl/h8N3dmhYDZ484esWA'

export const DEVELOPER = {
  name: 'Zero-Nine',
  url: 'https://www.zero--nine.online/',
  logo: '/images/zero-nine.jpg',
}

export function whatsappLink(message?: string, number: string = WHATSAPP_NUMBER) {
  const base = `https://wa.me/${number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
