import { useState } from 'react';
import { motion } from 'framer-motion';
import { TbMail, TbPhone, TbMapPin, TbSend } from 'react-icons/tb';
import { supabase } from '../lib/supabase';

const ease = [0.16, 1, 0.3, 1] as const;

const contactInfo = [
  { icon: TbMail, label: 'ایمیل', value: 'info@spark.ir', gradient: 'from-brand-400 to-emerald-500' },
  { icon: TbPhone, label: 'تلفن', value: '۰۲۱-۱۲۳۴-۵۶۷۸', gradient: 'from-blue-400 to-indigo-600' },
  { icon: TbMapPin, label: 'آدرس', value: 'تهران، خیابان ولیعصر', gradient: 'from-rose-400 to-red-600' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('contact_submissions').insert([form]);
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="section pt-32">
        <div className="container-xl text-center max-w-3xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="tag tag-brand">تماس با ما</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease }} className="mt-6 text-display-sm">
            در تماس باشید
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease }} className="mt-4 text-subtitle text-ink-500 dark:text-sand-500">
            تیم ما آماده پاسخگویی است
          </motion.p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container-xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
              <h2 className="text-title mb-8">اطلاعات تماس</h2>
              <div className="space-y-5">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-ink-100 dark:border-ink-800 bg-white dark:bg-ink-900 hover:shadow-sm transition-shadow">
                    <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${info.gradient} shadow-md flex items-center justify-center shrink-0`}>
                      <info.icon className="text-xl text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-ink-400 dark:text-sand-500">{info.label}</div>
                      <div className="font-semibold text-ink-800 dark:text-sand-200">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease }}>
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                <h2 className="text-title">پیام بفرستید</h2>
                {[
                  { id: 'name', label: 'نام و نام خانوادگی', type: 'text', placeholder: 'علی احمدی' },
                  { id: 'email', label: 'ایمیل', type: 'email', placeholder: 'ali@company.ir' },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="text-sm font-medium text-ink-700 dark:text-sand-300 mb-1.5 block">{field.label}</label>
                    <input
                      type={field.type}
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      placeholder={field.placeholder}
                      required
                      className="w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-sand-50 dark:bg-ink-800 px-4 py-3 text-sm text-ink-900 dark:text-sand-100 placeholder-ink-400 dark:placeholder-ink-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20 transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-medium text-ink-700 dark:text-sand-300 mb-1.5 block">پیام</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="پیام خود را بنویسید..."
                    required
                    rows={4}
                    className="w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-sand-50 dark:bg-ink-800 px-4 py-3 text-sm text-ink-900 dark:text-sand-100 placeholder-ink-400 dark:placeholder-ink-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20 transition-all resize-none"
                  />
                </div>
                {status === 'success' && (
                  <div className="rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 p-3 text-sm text-brand-700 dark:text-brand-300">
                    پیام شما با موفقیت ارسال شد. به زودی با شما تماس می‌گیریم.
                  </div>
                )}
                {status === 'error' && (
                  <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-700 dark:text-red-300">
                    خطایی رخ داد. لطفاً دوباره تلاش کنید.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn btn-md btn-primary w-full justify-center"
                >
                  {status === 'loading' ? 'در حال ارسال...' : (
                    <>
                      ارسال پیام
                      <TbSend className="text-base" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
