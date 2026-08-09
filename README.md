# والي بلازا | Wali Plaza

موقع عربي (RTL بالكامل) لعرض منتجات **والي بلازا** للأثاث المكتبي والمنزلي. موقع عرض فقط — بدون أسعار وبدون سلة شراء، والتواصل عبر الهاتف والواتساب.

## التشغيل

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
```

## الصفحات

| المسار | الصفحة |
| --- | --- |
| `/` | الرئيسية |
| `/categories` | كل الأقسام |
| `/categories/[slug]` | صفحة القسم مع معرض صور وlightbox |
| `/about` | من نحن |
| `/contact` | تواصل معنا |

---

## إضافة صور جديدة

**الموقع يقرأ الصور تلقائياً من مجلد `public/images` — لا تحتاج لتعديل أي كود.**

كل ما عليك: ارفع الصورة باسم يبدأ بـ **slug القسم**.

### أسماء الأقسام

| القسم | اسم المجلد |
| --- | --- |
| مكاتب رئاسية | `executive-desks` |
| جلوس رئاسي | `executive-lounge` |
| مكاتب مدراء إدارات | `manager-desks` |
| جلوس مكاتب مدراء إدارات | `manager-lounge` |
| مكاتب موظفين | `staff-desks` |
| مكاتب سكرتارية | `secretary-desks` |
| ويرك ستيشن | `workstations` |
| كاونترات إستقبال | `reception-counters` |
| ترابيزات اجتماعات | `meeting-tables` |
| خزنات مصفحة ضد الحريق والرصاص | `safes` |
| فايل كابين مصفح ضد الحريق والرصاص | `armored-filing` |
| فايل كابين حديد | `steel-filing` |
| دولاب حديد | `steel-cabinets` |
| لوكرات حديد | `steel-lockers` |
| كنب حديد | `steel-sofas` |
| كنب حديد مبطن | `padded-sofas` |
| كراسي جلد فاخرة | `leather-chairs` |
| كراسي طبية دوار وثابت | `medical-chairs` |
| كراسي معامل دوار وثابت | `lab-chairs` |
| كراسي قاعات ومسارح | `hall-chairs` |
| كرسي مسرح وقاعات VIP | `vip-hall-chairs` |
| منصات ندوات | `podiums` |
| مستلزمات البنوك والصرافات | `bank-equipment` |
| أنظمة الصوتيات للقاعات | `sound-systems` |

### طريقتان للتسمية

**١. اسم الملف يبدأ بالـ slug** (الأسهل)

```
steel-filing-1.jpg
steel-filing-2.jpg
executive-desks-7.jpg
```

**٢. مجلد فرعي باسم الـ slug** (للكميات الكبيرة)

```
public/images/steel-filing/أي-اسم.jpg
public/images/steel-filing/1234.jpg
```

داخل المجلد الاسم حر تماماً.

### الرفع من GitHub

1. افتح المستودع → `public/images`
2. `Add file` → `Upload files` → اسحب الصور → `Commit changes`
3. Vercel ينشر تلقائياً خلال دقيقة، والصور تظهر في أقسامها

لا تعديل على أي ملف كود. لعمل مجلد جديد أثناء الرفع، اكتب اسمه ثم `/` في خانة اسم الملف.

**الترتيب:** الرقم في آخر الاسم يحدد الترتيب (`-1` أولاً)، والصورة الأولى هي غلاف القسم في الصفحة الرئيسية.

**الصيغ المدعومة:** jpg · jpeg · png · webp · avif

**تنبيه:** لا تسمِّ أي صورة عامة (شعار مثلاً) باسم يبدأ بـ slug قسم، وإلا ستظهر داخله. الملفات الحالية `logo.png` و `og.jpg` و `showroom.jpg` خارج الأقسام لأن أسماءها لا تطابق أي slug.

### إضافة أو تعديل قسم

الأسماء والأوصاف في **`lib/category-meta.ts`** — عدّل الوصف أو أضف قسماً جديداً هناك، وسيبحث الموقع تلقائياً عن صوره بنفس القاعدة. أسماء الأيقونات المتاحة في `components/category-icon.tsx`.

### عند الوصول لـ 500 صورة

رفع مئات الصور داخل المستودع سيبطئ الـ build. عند تجاوز ~150 صورة، انقل الصور إلى **Cloudinary** أو **Supabase Storage**، ثم عدّل `lib/categories.ts` ليقرأ من هناك — وهو الملف الوحيد الذي سيتغير.

## قبل النشر

2. **الدومين**: `lib/site.ts` مضبوط على `https://www.waliplaza.com` — عدّله لو اختلف.
3. **بيانات التواصل**: أرقام الهاتف والواتساب كلها في `lib/site.ts` فقط.
4. **فحص الأنواع**: بعد `pnpm install` شغّل `npx tsc --noEmit`، وإذا مرّت احذف `typescript.ignoreBuildErrors` من `next.config.mjs`.

## ملاحظات

- قسم **فايل كابين حديد** بدون صور حالياً؛ يعرض رسالة «الصور قيد التحديث» مع زر واتساب.
- تحسين الصور مفعّل عبر `next/image` (AVIF/WebP تلقائياً حسب المتصفح).
- السيو: Metadata كاملة + OpenGraph + بيانات منظمة (FurnitureStore / ItemList / BreadcrumbList) + `sitemap.xml` و `robots.txt`.
