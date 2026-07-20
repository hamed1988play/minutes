import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, Play, ChevronLeft, Check } from 'lucide-react';
import {
  TbCalendarEvent,
  TbUsers,
  TbRobot,
  TbShieldCheck,
  TbMessageCircle,
  TbSparkles,
  TbChartBar,
} from 'react-icons/tb';
import PortalShowcase from '../components/PortalShowcase';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count.toLocaleString('fa-IR')}{suffix}</span>;
}

const stats = [
  { value: 500,   suffix: '+',  label: 'سازمان' },
  { value: 10000, suffix: '+',  label: 'کاربر' },
  { value: 98,    suffix: '%',  label: 'رضایت' },
  { value: 24,    suffix: '/۷', label: 'پشتیبانی' },
];

const features = [
  {
    icon: TbCalendarEvent,
    title: 'مدیریت جلسات',
    desc: 'برنامه‌ریزی، دعوت و صورت‌جلسه',
    gradient: 'from-brand-400 to-emerald-500',
  },
  {
    icon: TbUsers,
    title: 'همکاری تیمی',
    desc: 'گفتگو و اشتراک‌گذاری لحظه‌ای',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    icon: TbRobot,
    title: 'هوش مصنوعی',
    desc: 'دستیار فارسی و خودکارسازی',
    gradient: 'from-violet-400 to-purple-600',
  },
  {
    icon: TbShieldCheck,
    title: 'امنیت',
    desc: 'رمزنگاری و کنترل دسترسی',
    gradient: 'from-amber-400 to-orange-500',
  },
];

const testimonials = [
  { quote: 'زمان جلسات ما ۴۰٪ کاهش پیدا کرد.', author: 'علی م.', role: 'مدیر فنی' },
  { quote: 'پیگیری کارها کاملاً شفاف شده است.', author: 'سارا ر.', role: 'مدیر پروژه' },
  { quote: 'دستیار هوشمند فارسی واقعاً عالی است.', author: 'محمد ک.', role: 'مدیر عامل' },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [testimonial, setTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTestimonial((n) => (n + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center pt-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,rgba(16,185,129,0.10),transparent_60%)]" />
          <motion.div
            animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[20%] left-[10%] h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 40, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
            className="absolute bottom-[30%] right-[5%] h-80 w-80 rounded-full bg-teal-300/10 blur-3xl"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] [background-size:80px_80px]" />
        </div>

        <motion.div style={{ y, opacity }} className="relative container-xl py-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
              <span className="tag tag-brand">
                <TbSparkles className="h-3.5 w-3.5" />
                نسل جدید مدیریت سازمانی
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="mt-8 text-display"
            >
              <span className="block text-ink-900 dark:text-white">مدیریت هوشمند جلسات</span>
              <span className="block gradient-text">ساده‌تر و سریع‌تر</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-6 text-subtitle text-ink-500 dark:text-sand-400 max-w-2xl mx-auto"
            >
              همه‌چیز برای جلسات، اقدامات و ارتباط تیمی
              <br className="hidden sm:block" />
              در یک پلتفرم یکپارچه با هوش مصنوعی فارسی
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link to="/contact" className="btn btn-lg btn-primary">
                شروع رایگان
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <button className="btn btn-lg btn-secondary">
                <Play className="h-4 w-4" />
                دموی ویدیویی
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-extrabold text-ink-900 dark:text-white sm:text-4xl">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-ink-400 dark:text-sand-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-12 w-6 rounded-full border-2 border-ink-200 dark:border-ink-700 flex items-start justify-center p-1.5"
          >
            <div className="h-2 w-1.5 rounded-full bg-ink-300 dark:bg-ink-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <section className="relative border-y border-ink-100 dark:border-ink-800 bg-sand-100/50 dark:bg-ink-900/50">
        <div className="container-xl py-8">
          <motion.div
            key={testimonial}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-4"
          >
            <p className="text-lg font-medium text-ink-700 dark:text-sand-200">
              "{testimonials[testimonial].quote}"
            </p>
            <div className="flex items-center gap-2 text-sm text-ink-400 dark:text-sand-500">
              <span className="font-medium text-ink-600 dark:text-sand-300">{testimonials[testimonial].author}</span>
              <span>•</span>
              <span>{testimonials[testimonial].role}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PORTAL SHOWCASE */}
      <section className="section relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.06),transparent)]" />
        </div>
        <div className="relative container-xl">
          <div className="text-center max-w-2xl mx-auto">
            <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="tag tag-brand">
              <TbChartBar className="h-3.5 w-3.5" />
              نمای پرتال
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-title mt-4"
            >
              همه ابزارها در یک پرتال
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mt-4 text-ink-500 dark:text-sand-500"
            >
              روی هر بخش کلیک کنید تا نمای کامل آن را ببینید
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-12"
          >
            <PortalShowcase />
          </motion.div>
        </div>
      </section>

      {/* CHAT COLLABORATION */}
      <section className="section relative overflow-hidden bg-ink-900 dark:bg-ink-950">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_50%,rgba(16,185,129,0.15),transparent)]" />
        </div>
        <div className="relative container-xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="tag bg-emerald-400/20 text-emerald-300">
                <TbMessageCircle className="h-3.5 w-3.5" />
                همکاری تیمی
              </span>
              <h2 className="mt-6 text-display-sm text-white">
                ارتباط تیمی
                <br />
                <span className="text-emerald-400">سریع و ساده</span>
              </h2>
              <p className="mt-4 text-subtitle text-sand-400">
                تیم شما همیشه و همه‌جا به هم وصل است؛ گفتگوی زنده، اشتراک فایل و تصمیم‌گیری سریع.
              </p>
              <ul className="mt-8 space-y-3">
                {['گفتگوی زنده و گروهی', 'اشتراک فایل و تصویر', 'نمایش وضعیت و حضور', 'یکپارچه با ایمیل'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sand-300">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="h-3 w-3 text-emerald-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/features" className="btn btn-md mt-8 bg-emerald-500 text-ink-900 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20">
                بیشتر بدانید
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <div className="rounded-3xl bg-ink-800/50 p-6 backdrop-blur-sm border border-ink-700/50">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-ink-700/50">
                  <div className="flex -space-x-2 space-x-reverse">
                    {[
                      { letter: 'ع', color: 'from-emerald-400 to-teal-500' },
                      { letter: 'س', color: 'from-blue-400 to-indigo-500' },
                      { letter: 'م', color: 'from-violet-400 to-purple-500' },
                    ].map((a, i) => (
                      <div key={i} className={`h-9 w-9 rounded-full bg-gradient-to-br ${a.color} flex items-center justify-center text-white text-xs font-bold ring-2 ring-ink-800`}>
                        {a.letter}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">تیم توسعه</div>
                    <div className="text-xs text-emerald-400">۳ عضو فعال</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { me: true, color: 'from-emerald-400 to-teal-500', name: 'علی', text: 'جلسه بررسی هفتگی آماده است؟', time: '۱۰:۰۲' },
                    { me: false, color: 'from-blue-400 to-indigo-500', name: 'سارا', text: 'بله، صورت‌جلسه هم نوشته شد.', time: '۱۰:۰۴' },
                    { me: true, color: 'from-emerald-400 to-teal-500', name: 'علی', text: 'رضایی و احمدی رو هم دعوت کنید.', time: '۱۰:۰۵' },
                    { me: false, color: 'from-violet-400 to-purple-500', name: 'محمد', text: 'دعوت‌نامه ارسال شد. یادآوری فعال شد.', time: '۱۰:۰۶' },
                  ].map((msg, i) => (
                    <div key={i} className={`flex ${msg.me ? 'justify-start' : 'justify-end'}`}>
                      <div className={`flex gap-2 max-w-[85%] ${msg.me ? 'flex-row' : 'flex-row-reverse'}`}>
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                          {msg.name[0]}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 text-sm ${msg.me ? 'bg-emerald-500 text-ink-900' : 'bg-ink-700 text-sand-200'}`}>
                          <p>{msg.text}</p>
                          <span className={`text-[10px] mt-1 block ${msg.me ? 'text-emerald-800' : 'text-ink-500'}`}>{msg.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl overflow-hidden border border-ink-700/50">
                  <img
                    src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="همکاری تیمی"
                    className="w-full h-44 object-cover"
                    loading="lazy"
                  />
                  <div className="p-3 bg-ink-800">
                    <div className="text-xs text-sand-400">اعضای تیم در حال همکاری زنده</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="section bg-sand-50 dark:bg-ink-950">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-title">
              همه‌چیز در یکجا
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-4 text-ink-500 dark:text-sand-500">
              ابزارهای یکپارچه برای مدیریت کامل سازمان
            </motion.p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="card p-6 glow group"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <f.icon className="h-6 w-6 text-white text-xl" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink-900 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-500 dark:text-sand-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
            <Link to="/features" className="btn btn-md btn-secondary">
              مشاهده همه قابلیت‌ها
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* AI ASSISTANT */}
      <section className="section bg-ink-900 dark:bg-ink-950 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_50%,rgba(16,185,129,0.15),transparent)]" />
        </div>
        <div className="relative container-xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="tag bg-brand-400/20 text-brand-300">
                <TbRobot className="h-3.5 w-3.5" />
                دستیار هوشمند
              </span>
              <h2 className="mt-6 text-display-sm text-white">دستیار هوشمند فارسی</h2>
              <p className="mt-4 text-subtitle text-sand-400">
                به زبان فارسی فرمان دهید؛ جلسه بسازید، اقدام ثبت کنید و گزارش بگیرید.
              </p>
              <ul className="mt-8 space-y-3">
                {['درک فرمان‌های فارسی روزمره', 'ساخت خودکار جلسه و اقدام', 'یادگیری از رفتار شما', 'پاسخ به پرسش‌های شما'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sand-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/features" className="btn btn-md mt-8 bg-brand-400 text-ink-900 hover:bg-brand-300">
                بیشتر بدانید
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <div className="rounded-3xl bg-ink-800/50 p-6 backdrop-blur-sm border border-ink-700/50">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-ink-700/30">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-400 to-emerald-500 flex items-center justify-center shadow-md shadow-brand-500/30">
                    <TbRobot className="text-white text-lg" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">اسپارک</div>
                    <div className="text-xs text-brand-400">دستیار هوشمند فارسی • آنلاین</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { me: true, text: 'یک جلسه برای شنبه ساعت ۱۰ تنظیم کن' },
                    { me: false, text: 'جلسه با موضوع "بررسی هفتگی" برای شنبه ۱۰ صبح ایجاد شد. شرکت‌کنندگان را مشخص می‌کنید؟' },
                    { me: true, text: 'رضایی و احمدی رو هم دعوت کن' },
                    { me: false, text: 'دعوت‌نامه ارسال شد. یادآوری ۲۴ ساعت قبل فعال شود؟' },
                  ].map((msg, i) => (
                    <div key={i} className={`flex ${msg.me ? 'justify-start' : 'justify-end'}`}>
                      {!msg.me && (
                        <div className="flex gap-2 max-w-[80%] flex-row-reverse">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-400 to-emerald-500 flex items-center justify-center shadow-sm shrink-0">
                            <TbRobot className="text-white text-sm" />
                          </div>
                          <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-gradient-to-br from-brand-500/20 to-emerald-600/20 text-sand-200 border border-brand-500/20">
                            {msg.text}
                          </div>
                        </div>
                      )}
                      {msg.me && (
                        <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-ink-700 text-sand-200">
                          {msg.text}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_100%,rgba(16,185,129,0.06),transparent_70%)]" />
        </div>
        <div className="relative container-md text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-display-sm">
            همین حالا شروع کنید
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-4 text-subtitle text-ink-500 dark:text-sand-500">
            ۱۴ روز استفاده رایگان، بدون نیاز به کارت بانکی
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-10">
            <Link to="/contact" className="btn btn-lg btn-primary">
              شروع رایگان
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
