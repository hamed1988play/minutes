import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Check } from 'lucide-react';
import {
  TbCalendarEvent,
  TbMessageCircle,
  TbVideoPlus,
  TbCheckbox,
  TbCalendarStats,
  TbNotebook,
  TbRobot,
  TbChartBar,
} from 'react-icons/tb';

const features = [
  {
    icon: TbCalendarEvent,
    title: 'مدیریت جلسات',
    desc: 'از درخواست جلسه تا صورت‌جلسه',
    items: ['دعوت خودکار شرکت‌کنندگان', 'دستور جلسه و اولویت‌بندی', 'صورت‌جلسه هوشمند', 'خروجی PDF و Word'],
    gradient: 'from-brand-400 to-emerald-500',
    glow: 'shadow-brand-500/20',
  },
  {
    icon: TbMessageCircle,
    title: 'چت سازمانی',
    desc: 'ارتباط سریع و امن تیم',
    items: ['پیام‌رسانی لحظه‌ای', 'گروه‌های تخصصی', 'ارسال فایل و تصویر', 'وضعیت پیام'],
    gradient: 'from-blue-400 to-indigo-600',
    glow: 'shadow-blue-500/20',
  },
  {
    icon: TbVideoPlus,
    title: 'ویدیو کنفرانس',
    desc: 'جلسات آنلاین با کیفیت',
    items: ['کیفیت HD و 4K', 'اشتراک صفحه', 'ضبط جلسات', 'دعوت مهمان'],
    gradient: 'from-rose-400 to-red-600',
    glow: 'shadow-rose-500/20',
  },
  {
    icon: TbCheckbox,
    title: 'مدیریت اقدامات',
    desc: 'پیگیری شفاف کارها',
    items: ['تخصیص وظیفه', 'اولویت و مهلت', 'فلوچارت اقدامات', 'آرشیو خودکار'],
    gradient: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-500/20',
  },
  {
    icon: TbCalendarStats,
    title: 'تقویم شمسی',
    desc: 'برنامه‌ریزی هوشمند',
    items: ['نمایش روز/هفته/ماه', 'مناسبت‌های شمسی', 'تقویم‌های چندگانه', 'همگام‌سازی گوگل'],
    gradient: 'from-teal-400 to-cyan-600',
    glow: 'shadow-teal-500/20',
  },
  {
    icon: TbNotebook,
    title: 'یادداشت‌ها',
    desc: 'ثبت اطلاعات و ایده‌ها',
    items: ['یادداشت متنی و صوتی', 'تبدیل گفتار به متن', 'دسته‌بندی و برچسب', 'جستجوی پیشرفته'],
    gradient: 'from-violet-400 to-purple-600',
    glow: 'shadow-violet-500/20',
  },
  {
    icon: TbRobot,
    title: 'دستیار اسپارک',
    desc: 'هوش مصنوعی فارسی',
    items: ['فرمان‌های طبیعی', 'ایجاد خودکار جلسه', 'پاسخگویی سوالات', 'یادگیری تعاملات'],
    gradient: 'from-brand-500 to-emerald-600',
    glow: 'shadow-brand-500/20',
  },
  {
    icon: TbChartBar,
    title: 'گزارشات',
    desc: 'تحلیل داده‌های سازمان',
    items: ['نمودارهای تعاملی', 'فیلتر پیشرفته', 'خروجی Excel', 'گزارش عملکرد'],
    gradient: 'from-orange-400 to-rose-500',
    glow: 'shadow-orange-500/20',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function FeaturesPage() {
  const [active, setActive] = useState(0);

  return (
    <>
      {/* Hero */}
      <section className="section pt-32">
        <div className="container-xl text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="tag tag-brand">قابلیت‌ها</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }} className="mt-6 text-display-sm">
            همه چیز در یک پلتفرم
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease }} className="mt-4 text-subtitle text-ink-500 dark:text-sand-500">
            ابزارهای یکپارچه برای مدیریت کامل سازمان
          </motion.p>
        </div>
      </section>

      {/* Mobile Tabs */}
      <section className="lg:hidden px-4">
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4">
          {features.map((f, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active === i
                  ? `bg-gradient-to-l ${f.gradient} text-white shadow-md`
                  : 'bg-sand-100 text-ink-600 dark:bg-ink-800 dark:text-sand-400'
              }`}
            >
              <f.icon className="text-base" />
              {f.title}
            </button>
          ))}
        </div>
      </section>

      {/* Mobile Active Feature */}
      <section className="lg:hidden section-sm">
        <div className="container-xl">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${features[active].gradient} shadow-xl ${features[active].glow}`}>
              {(() => { const I = features[active].icon; return <I className="text-2xl text-white" />; })()}
            </div>
            <h2 className="mt-5 text-xl font-bold">{features[active].title}</h2>
            <p className="mt-2 text-ink-500 dark:text-sand-500">{features[active].desc}</p>
            <ul className="mt-6 space-y-3">
              {features[active].items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-ink-600 dark:text-sand-400">
                  <Check className="h-4 w-4 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Desktop Grid */}
      <section className="hidden lg:block section">
        <div className="container-xl">
          <div className="grid grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05, ease }}
                className="card p-6 glow group"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg ${f.glow} transition-transform duration-300 group-hover:scale-110`}>
                  <f.icon className="text-xl text-white" />
                </div>
                <h3 className="mt-5 font-bold text-base">{f.title}</h3>
                <p className="mt-1 text-sm text-ink-500 dark:text-sand-500">{f.desc}</p>
                <ul className="mt-5 space-y-2">
                  {f.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-ink-600 dark:text-sand-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-sand-100/50 dark:bg-ink-900/50">
        <div className="container-md text-center">
          <h2 className="text-title">آماده‌اید؟</h2>
          <p className="mt-3 text-ink-500 dark:text-sand-500">همین الان شروع کنید</p>
          <Link to="/contact" className="btn btn-md btn-primary mt-6">شروع رایگان</Link>
        </div>
      </section>
    </>
  );
}
