import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TbSettingsAutomation,
  TbHeadset,
  TbCode,
  TbSchool,
  TbCloudUpload,
  TbShieldLock,
} from 'react-icons/tb';

const services = [
  {
    icon: TbSettingsAutomation,
    title: 'پیاده‌سازی و راه‌اندازی',
    desc: 'تیم متخصص ما فرآیند راه‌اندازی را از صفر تا اجرا همراهی می‌کند.',
    gradient: 'from-brand-400 to-emerald-500',
    glow: 'shadow-brand-500/20',
  },
  {
    icon: TbHeadset,
    title: 'پشتیبانی ۲۴/۷',
    desc: 'تیم پشتیبانی همیشه در دسترس برای پاسخ به سوالات و رفع مشکلات.',
    gradient: 'from-blue-400 to-indigo-600',
    glow: 'shadow-blue-500/20',
  },
  {
    icon: TbCode,
    title: 'یکپارچه‌سازی API',
    desc: 'اتصال اسپارک به سیستم‌های موجود سازمان با APIهای استاندارد.',
    gradient: 'from-violet-400 to-purple-600',
    glow: 'shadow-violet-500/20',
  },
  {
    icon: TbSchool,
    title: 'آموزش و آنبوردینگ',
    desc: 'دوره‌های آموزشی اختصاصی برای تیم شما جهت استفاده بهینه.',
    gradient: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-500/20',
  },
  {
    icon: TbCloudUpload,
    title: 'مهاجرت داده',
    desc: 'انتقال امن داده‌ها از سیستم‌های قبلی بدون از دست رفتن اطلاعات.',
    gradient: 'from-teal-400 to-cyan-600',
    glow: 'shadow-teal-500/20',
  },
  {
    icon: TbShieldLock,
    title: 'امنیت و انطباق',
    desc: 'اطمینان از رعایت استانداردهای امنیتی و حریم خصوصی داده‌ها.',
    gradient: 'from-rose-400 to-red-600',
    glow: 'shadow-rose-500/20',
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function ServicesPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-xl text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="tag tag-brand">خدمات</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease }} className="mt-6 text-display-sm">
            خدمات حرفه‌ای اسپارک
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease }} className="mt-4 text-subtitle text-ink-500 dark:text-sand-500">
            از راه‌اندازی تا پشتیبانی مستمر، در کنار شما هستیم
          </motion.p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container-xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                className="card p-7 glow group"
              >
                <div className={`flex h-13 w-13 h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient} shadow-xl ${s.glow} transition-transform duration-300 group-hover:scale-110`}>
                  <s.icon className="text-2xl text-white" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900 dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-ink-500 dark:text-sand-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm bg-sand-100/50 dark:bg-ink-900/50">
        <div className="container-md text-center">
          <h2 className="text-title">مشاوره رایگان</h2>
          <p className="mt-3 text-ink-500 dark:text-sand-500">با کارشناسان ما صحبت کنید</p>
          <Link to="/contact" className="btn btn-md btn-primary mt-6">درخواست مشاوره</Link>
        </div>
      </section>
    </>
  );
}
