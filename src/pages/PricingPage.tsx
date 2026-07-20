import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { TbCrown, TbRocket, TbBuilding } from 'react-icons/tb';

const plans = [
  {
    icon: TbRocket,
    name: 'رایگان',
    price: '۰',
    period: 'تومان / ماه',
    desc: 'برای تیم‌های کوچک',
    gradient: 'from-sand-300 to-sand-400',
    glow: '',
    features: ['تا ۵ کاربر', '۱۰ جلسه در ماه', 'چت سازمانی', 'تقویم پایه', 'پشتیبانی ایمیل'],
    cta: 'شروع رایگان',
    ctaClass: 'btn-secondary',
    popular: false,
  },
  {
    icon: TbCrown,
    name: 'حرفه‌ای',
    price: '۲۹۰,۰۰۰',
    period: 'تومان / ماه',
    desc: 'برای سازمان‌های در حال رشد',
    gradient: 'from-brand-400 to-emerald-500',
    glow: 'shadow-brand-500/30',
    features: ['تا ۵۰ کاربر', 'جلسات نامحدود', 'ویدیو کنفرانس HD', 'دستیار هوشمند', 'گزارشات پیشرفته', 'پشتیبانی اولویت‌دار'],
    cta: 'شروع کنید',
    ctaClass: 'btn-primary',
    popular: true,
  },
  {
    icon: TbBuilding,
    name: 'سازمانی',
    price: 'سفارشی',
    period: '',
    desc: 'برای سازمان‌های بزرگ',
    gradient: 'from-violet-400 to-purple-600',
    glow: 'shadow-violet-500/20',
    features: ['کاربران نامحدود', 'همه قابلیت‌های حرفه‌ای', 'استقرار اختصاصی', 'یکپارچه‌سازی API', 'مدیر اکانت اختصاصی', 'SLA تضمینی'],
    cta: 'تماس بگیرید',
    ctaClass: 'btn-secondary',
    popular: false,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function PricingPage() {
  return (
    <>
      <section className="section pt-32">
        <div className="container-xl text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="tag tag-brand">قیمت‌گذاری</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease }} className="mt-6 text-display-sm">
            طرح مناسب خود را انتخاب کنید
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease }} className="mt-4 text-subtitle text-ink-500 dark:text-sand-500">
            ۱۴ روز آزمایش رایگان، بدون نیاز به کارت بانکی
          </motion.p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container-xl">
          <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className={`relative rounded-3xl border p-8 flex flex-col gap-6 ${
                  plan.popular
                    ? 'border-brand-300 dark:border-brand-700 bg-white dark:bg-ink-900 shadow-2xl shadow-brand-500/10'
                    : 'border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 right-1/2 translate-x-1/2">
                    <span className="rounded-full bg-gradient-to-l from-brand-500 to-emerald-500 px-4 py-1 text-xs font-bold text-white shadow-md shadow-brand-500/30">
                      محبوب‌ترین
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${plan.gradient} shadow-lg ${plan.glow} flex items-center justify-center`}>
                    <plan.icon className="text-xl text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-ink-900 dark:text-white">{plan.name}</div>
                    <div className="text-xs text-ink-400 dark:text-sand-500">{plan.desc}</div>
                  </div>
                </div>

                <div>
                  <span className="text-4xl font-extrabold text-ink-900 dark:text-white">{plan.price}</span>
                  {plan.period && <span className="text-sm text-ink-400 dark:text-sand-500 mr-1">{plan.period}</span>}
                </div>

                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-ink-600 dark:text-sand-400">
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-brand-100 dark:bg-brand-900/30' : 'bg-sand-100 dark:bg-ink-800'}`}>
                        <Check className={`h-3 w-3 ${plan.popular ? 'text-brand-600 dark:text-brand-400' : 'text-ink-500'}`} />
                      </div>
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link to="/contact" className={`btn btn-md w-full justify-center ${plan.ctaClass}`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
