/**
 * بيانات الأقسام (الاسم والوصف والأيقونة) — بدون صور.
 * الصور تُقرأ تلقائياً من مجلد public/images حسب اسم الملف. انظر lib/categories.ts
 */
export type CategoryMeta = {
  slug: string
  name: string
  description: string
  icon: string
}

export const categoryMeta: CategoryMeta[] = [
  {
    slug: 'executive-desks',
    name: 'مكاتب رئاسية',
    description: 'مكاتب فاخرة بتصميمات تليق بمكتب المدير العام، بخامات ولمسات نهائية راقية.',
    icon: 'Crown',
  },
  {
    slug: 'executive-lounge',
    name: 'جلوس رئاسي',
    description: 'أطقم جلوس فاخرة تكمل المكتب الرئاسي وتليق باستقبال كبار الزوار.',
    icon: 'Sofa',
  },
  {
    slug: 'manager-desks',
    name: 'مكاتب مدراء إدارات',
    description: 'مكاتب عملية بمساحة عمل مريحة ووحدات تخزين جانبية.',
    icon: 'Briefcase',
  },
  {
    slug: 'manager-lounge',
    name: 'جلوس مكاتب مدراء إدارات',
    description: 'أطقم جلوس وكراسي زوار تكمل مكتب مدير الإدارة بتنسيق متناسق.',
    icon: 'Armchair',
  },
  {
    slug: 'staff-desks',
    name: 'مكاتب موظفين',
    description: 'مكاتب وكراسي للموظفين بتصميم عملي ومتين يناسب الاستخدام اليومي.',
    icon: 'Users',
  },
  {
    slug: 'secretary-desks',
    name: 'مكاتب سكرتارية',
    description: 'مكاتب سكرتارية بوحدات تخزين ومساحة عمل منظمة تناسب مكتب المدير.',
    icon: 'Laptop',
  },
  {
    slug: 'workstations',
    name: 'ويرك ستيشن',
    description: 'وحدات عمل جماعية بفواصل ووحدات تخزين لاستغلال المساحة بكفاءة.',
    icon: 'LayoutGrid',
  },
  {
    slug: 'reception-counters',
    name: 'كاونترات إستقبال',
    description: 'كاونترات ومكاتب استقبال بمقاسات وتصميمات مختلفة تناسب المداخل والصالات.',
    icon: 'Store',
  },
  {
    slug: 'meeting-tables',
    name: 'ترابيزات اجتماعات',
    description: 'ترابيزات اجتماعات بمقاسات مختلفة تتسع من 6 إلى 20 شخصاً.',
    icon: 'Presentation',
  },
  {
    slug: 'safes',
    name: 'خزنات مصفحة ضد الحريق والرصاص',
    description: 'خزنات آمنة بأقفال رقمية ومفتاحية لحماية المستندات والنقود.',
    icon: 'ShieldCheck',
  },
  {
    slug: 'armored-filing',
    name: 'فايل كابين مصفح ضد الحريق والرصاص',
    description: 'دواليب ملفات مصفحة بأدراج مقاومة للحريق لحفظ الأوراق المهمة.',
    icon: 'FileLock2',
  },
  {
    slug: 'steel-filing',
    name: 'فايل كابين حديد',
    description: 'دواليب ملفات حديد بأدراج انزلاقية وأقفال أمان.',
    icon: 'Files',
  },
  {
    slug: 'steel-cabinets',
    name: 'دولاب حديد',
    description: 'دواليب حديد بأبواب زجاجية أو معدنية لتخزين الملفات والأدوات.',
    icon: 'Archive',
  },
  {
    slug: 'steel-lockers',
    name: 'لوكرات حديد',
    description: 'لوكرات بعيون متعددة للمصانع والمدارس والنوادي وأماكن العمل.',
    icon: 'LockKeyhole',
  },
  {
    slug: 'steel-sofas',
    name: 'كنب حديد',
    description: 'كنب وبنوك انتظار حديد للاستقبال والعيادات وصالات الانتظار.',
    icon: 'Armchair',
  },
  {
    slug: 'padded-sofas',
    name: 'كنب حديد مبطن',
    description: 'أطقم كنب مبطنة بخامات فاخرة للمكاتب والاستقبال والمنزل.',
    icon: 'Sofa',
  },
  {
    slug: 'leather-chairs',
    name: 'كراسي جلد فاخرة',
    description: 'كراسي مكتب بجلد طبيعي وصناعي فاخر بمساند مريحة وقواعد متينة.',
    icon: 'RockingChair',
  },
  {
    slug: 'medical-chairs',
    name: 'كراسي طبية دوار وثابت',
    description: 'كراسي طبية دوارة وثابتة للعيادات والمستشفيات بارتفاع قابل للضبط.',
    icon: 'Stethoscope',
  },
  {
    slug: 'lab-chairs',
    name: 'كراسي معامل دوار وثابت',
    description: 'كراسي معامل دوارة وثابتة بخامات مقاومة للمواد الكيميائية.',
    icon: 'FlaskConical',
  },
  {
    slug: 'hall-chairs',
    name: 'كراسي قاعات ومسارح',
    description: 'كراسي مسرح بمساند طي وأرجل ثابتة للقاعات والمدرجات.',
    icon: 'Theater',
  },
  {
    slug: 'vip-hall-chairs',
    name: 'كرسي مسرح وقاعات VIP',
    description: 'كراسي VIP بمساند قابلة للاستلقاء وخامات جلد فاخرة.',
    icon: 'Star',
  },
  {
    slug: 'podiums',
    name: 'منصات ندوات',
    description: 'منصات خطابة ومنابر للندوات والمؤتمرات بتصميمات خشبية وعصرية.',
    icon: 'Megaphone',
  },
  {
    slug: 'bank-equipment',
    name: 'مستلزمات البنوك والصرافات',
    description: 'تجهيزات ومستلزمات فروع البنوك ومكاتب الصرافة.',
    icon: 'Banknote',
  },
  {
    slug: 'sound-systems',
    name: 'أنظمة الصوتيات للقاعات',
    description: 'ميكروفونات مؤتمرات وأنظمة صوت متكاملة للقاعات وغرف الاجتماعات.',
    icon: 'Mic',
  },
]
