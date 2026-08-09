export const SITE = {
  name: 'والي بلازا',
  nameEn: 'Wali Plaza',
  tagline: 'أثاث مكتبي ومنزلي',
  url: 'https://www.waliplaza.com',
  description:
    'والي بلازا للأثاث المكتبي والمنزلي — مكاتب رئاسية ومدراء وموظفين، ترابيزات اجتماعات، ويرك ستيشن، خزنات وفايل كابينات مصفحة، دواليب ولوكرات حديد، كنب، كراسي قاعات ومسارح، وأنظمة صوتيات.',
  ogImage: '/images/og.jpg',
  locale: 'ar_EG',
} as const

/** أرقام الهاتف كما تُعرض وكما تُطلب */
export const PHONES = [
  { display: '+249 91 230 8288', tel: '+249912308288' },
  { display: '+249 91 239 8880', tel: '+249912398880' },
]

export const WHATSAPP_NUMBER = '201008602174'
export const WHATSAPP_DISPLAY = '01008602174'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

export function whatsappLink(message?: string) {
  if (!message) return WHATSAPP_URL
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}
