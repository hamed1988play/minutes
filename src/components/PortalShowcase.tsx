import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  TbCalendarEvent,
  TbMessageCircle,
  TbVideoPlus,
  TbCheckbox,
  TbNotebook,
  TbRobot,
  TbChartBar,
  TbUsers,
  TbHash,
  TbCalendarPlus,
} from 'react-icons/tb';

/* ─── Coloured icon badge ─── */
function IconBadge({
  icon: Icon,
  gradient,
  size = 'md',
}: {
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const dim = size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-14 w-14' : 'h-10 w-10';
  const ico = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';
  return (
    <div className={`${dim} rounded-2xl ${gradient} flex items-center justify-center shadow-md shrink-0`}>
      <Icon className={`${ico} text-white`} />
    </div>
  );
}

const menuItems = [
  {
    id: 'request',
    icon: TbCalendarPlus,
    label: 'درخواست جلسه',
    gradient: 'bg-gradient-to-br from-emerald-400 to-teal-600',
    preview: 'request',
  },
  {
    id: 'calendar',
    icon: TbCalendarEvent,
    label: 'تقویم',
    gradient: 'bg-gradient-to-br from-brand-400 to-brand-600',
    preview: 'screenshot',
  },
  {
    id: 'chat',
    icon: TbMessageCircle,
    label: 'چت سازمانی',
    gradient: 'bg-gradient-to-br from-blue-400 to-indigo-600',
    preview: 'chat',
  },
  {
    id: 'channels',
    icon: TbHash,
    label: 'کانال‌ها',
    gradient: 'bg-gradient-to-br from-violet-400 to-purple-600',
    preview: 'channels',
  },
  {
    id: 'video',
    icon: TbVideoPlus,
    label: 'ویدیو کنفرانس',
    gradient: 'bg-gradient-to-br from-rose-400 to-red-600',
    preview: 'video',
  },
  {
    id: 'tasks',
    icon: TbCheckbox,
    label: 'اقدامات',
    gradient: 'bg-gradient-to-br from-amber-400 to-orange-500',
    preview: 'tasks',
  },
  {
    id: 'notes',
    icon: TbNotebook,
    label: 'یادداشت‌ها',
    gradient: 'bg-gradient-to-br from-teal-400 to-cyan-600',
    preview: 'notes',
  },
  {
    id: 'contacts',
    icon: TbUsers,
    label: 'مخاطبین',
    gradient: 'bg-gradient-to-br from-sky-400 to-blue-600',
    preview: 'contacts',
  },
  {
    id: 'reports',
    icon: TbChartBar,
    label: 'گزارشات',
    gradient: 'bg-gradient-to-br from-orange-400 to-rose-500',
    preview: 'reports',
  },
  {
    id: 'ai',
    icon: TbRobot,
    label: 'اسپارک (دستیار)',
    gradient: 'bg-gradient-to-br from-brand-500 to-emerald-600',
    preview: 'ai',
  },
];

/* ─── Preview panels ─── */
function CalendarScreenshot() {
  return (
    <div className="p-4 flex flex-col gap-3 h-full bg-white dark:bg-ink-900">
      <div className="flex items-center gap-2.5 border-b border-ink-100 dark:border-ink-800 pb-3">
        <IconBadge icon={TbCalendarEvent} gradient="bg-gradient-to-br from-brand-400 to-brand-600" size="sm" />
        <span className="font-bold text-ink-900 dark:text-white text-sm">تقویم شمسی — خرداد ۱۴۰۴</span>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] text-ink-400 dark:text-sand-500 mb-1">
        {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((d) => (
          <div key={d} className="py-1 font-semibold">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5 flex-1">
        {Array.from({ length: 35 }).map((_, i) => {
          const day = i - 3;
          const isToday = day === 21;
          const hasEvent = [12, 18, 21, 25, 28].includes(day);
          return (
            <div
              key={i}
              className={`rounded-lg flex flex-col items-center justify-center text-xs cursor-pointer transition-all py-1 ${
                day < 1 || day > 31
                  ? 'text-ink-200 dark:text-ink-700'
                  : isToday
                  ? 'bg-gradient-to-br from-brand-500 to-emerald-500 text-white font-bold shadow-md'
                  : hasEvent
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 font-semibold'
                  : 'text-ink-700 dark:text-sand-300 hover:bg-sand-50 dark:hover:bg-ink-800'
              }`}
            >
              {day > 0 && day <= 31 ? day : ''}
              {hasEvent && !isToday && day > 0 && day <= 31 && (
                <span className="h-1 w-1 rounded-full bg-brand-400 mt-0.5" />
              )}
            </div>
          );
        })}
      </div>
      <div className="space-y-1.5 border-t border-ink-100 dark:border-ink-800 pt-3">
        {[
          { time: '۱۰:۰۰', title: 'بررسی هفتگی', color: 'bg-gradient-to-l from-brand-500 to-emerald-500' },
          { time: '۱۴:۳۰', title: 'طراحی محصول', color: 'bg-gradient-to-l from-blue-500 to-indigo-500' },
          { time: '۱۶:۰۰', title: 'گفتگو با مشتری', color: 'bg-gradient-to-l from-amber-500 to-orange-500' },
        ].map((ev, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-lg p-2 hover:bg-sand-50 dark:hover:bg-ink-800/60 transition-colors cursor-pointer">
            <div className={`h-2 w-2 rounded-full ${ev.color}`} />
            <span className="text-xs font-mono text-ink-400 dark:text-sand-500 w-10 shrink-0">{ev.time}</span>
            <span className="text-xs font-medium text-ink-800 dark:text-sand-200">{ev.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequestPreview() {
  return (
    <div className="p-6 flex flex-col gap-4 h-full bg-white dark:bg-ink-900">
      <div className="flex items-center gap-3 border-b border-ink-100 dark:border-ink-800 pb-4">
        <IconBadge icon={TbCalendarPlus} gradient="bg-gradient-to-br from-emerald-400 to-teal-600" size="sm" />
        <span className="font-bold text-ink-900 dark:text-white text-sm">درخواست جلسه جدید</span>
      </div>
      <div className="space-y-3">
        {[
          { label: 'موضوع جلسه', placeholder: 'بررسی هفتگی تیم' },
          { label: 'تاریخ و ساعت', placeholder: 'شنبه ۲۲ خرداد — ۱۰:۰۰' },
          { label: 'شرکت‌کنندگان', placeholder: 'علی، سارا، محمد...' },
          { label: 'مکان / لینک', placeholder: 'اتاق جلسه A' },
        ].map((f, i) => (
          <div key={i}>
            <div className="text-xs font-medium text-ink-500 dark:text-sand-500 mb-1">{f.label}</div>
            <div className="h-9 rounded-xl bg-sand-50 dark:bg-ink-800 border border-ink-100 dark:border-ink-700 flex items-center px-3 text-xs text-ink-300 dark:text-ink-600">
              {f.placeholder}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <div className="h-10 rounded-xl bg-gradient-to-l from-emerald-500 to-teal-500 text-white text-sm font-semibold flex items-center justify-center shadow-md shadow-emerald-500/30">
          ارسال درخواست جلسه
        </div>
      </div>
    </div>
  );
}

function ChatPreview() {
  const msgs = [
    { me: true, name: 'علی', color: 'from-emerald-400 to-teal-500', text: 'جلسه هفتگی چه ساعتی است؟', time: '۱۰:۱۲' },
    { me: false, name: 'سارا', color: 'from-blue-400 to-indigo-500', text: 'ساعت ۱۴ است. دستور جلسه هم آماده شد.', time: '۱۰:۱۴' },
    { me: true, name: 'علی', color: 'from-emerald-400 to-teal-500', text: 'ممنون، یادآوری بگذار.', time: '۱۰:۱۵' },
    { me: false, name: '🤖', color: 'from-brand-400 to-emerald-500', text: 'یادآوری ۳۰ دقیقه قبل ثبت شد.', time: '۱۰:۱۵', bot: true },
  ];
  return (
    <div className="flex flex-col h-full bg-white dark:bg-ink-900">
      <div className="px-4 py-3 border-b border-ink-100 dark:border-ink-800 flex items-center gap-2.5">
        <IconBadge icon={TbMessageCircle} gradient="bg-gradient-to-br from-blue-400 to-indigo-600" size="sm" />
        <div>
          <div className="text-sm font-bold text-ink-900 dark:text-white">تیم مدیریت</div>
          <div className="text-[11px] text-emerald-500 font-medium">۵ عضو فعال</div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden p-4 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.me ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex gap-2 max-w-[80%] ${m.me ? '' : 'flex-row-reverse'}`}>
              <div className={`h-7 w-7 shrink-0 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-[11px] font-bold shadow-sm`}>
                {m.bot ? '🤖' : m.name[0]}
              </div>
              <div className={`rounded-2xl px-3 py-2 text-xs shadow-sm ${m.me ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 'bg-sand-50 text-ink-800 dark:bg-ink-800 dark:text-sand-200 border border-ink-100 dark:border-ink-700'}`}>
                <p>{m.text}</p>
                <span className={`text-[9px] mt-0.5 block ${m.me ? 'text-blue-100' : 'text-ink-400'}`}>{m.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-ink-100 dark:border-ink-800">
        <div className="h-9 rounded-xl bg-sand-50 dark:bg-ink-800 border border-ink-200 dark:border-ink-700 flex items-center px-3 text-xs text-ink-300 dark:text-ink-600">
          پیام خود را بنویسید...
        </div>
      </div>
    </div>
  );
}

function ChannelsPreview() {
  const channels = ['اطلاعیه‌های عمومی', 'تیم توسعه', 'بازاریابی', 'پشتیبانی', 'مالی'];
  return (
    <div className="flex h-full bg-white dark:bg-ink-900">
      <div className="w-36 border-l border-ink-100 dark:border-ink-800 p-3 space-y-1 bg-sand-50/60 dark:bg-ink-950/40">
        <div className="text-[10px] font-bold text-ink-400 dark:text-sand-500 px-2 mb-2 uppercase tracking-wide">کانال‌ها</div>
        {channels.map((c, i) => (
          <div key={i} className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs cursor-pointer transition-colors ${i === 0 ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300 font-semibold' : 'text-ink-500 hover:bg-sand-100 dark:text-sand-500 dark:hover:bg-ink-800'}`}>
            <TbHash className="h-3 w-3 shrink-0" />
            <span className="truncate">{c}</span>
          </div>
        ))}
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-ink-100 dark:border-ink-800 pb-2 mb-3">
          <TbHash className="h-4 w-4 text-violet-500" />
          <span className="text-sm font-bold text-ink-900 dark:text-white">اطلاعیه‌های عمومی</span>
        </div>
        {[
          { avatar: 'م', color: 'from-violet-400 to-purple-500', text: 'جلسه هماهنگی فردا ساعت ۱۰ برگزار می‌شود.' },
          { avatar: 'س', color: 'from-blue-400 to-indigo-500', text: 'به‌روزرسانی نرم‌افزار با موفقیت انجام شد.' },
          { avatar: 'ع', color: 'from-emerald-400 to-teal-500', text: 'رویداد تیمی آخر هفته فراموش نشود.' },
        ].map((msg, i) => (
          <div key={i} className="flex gap-2">
            <div className={`h-7 w-7 shrink-0 rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>{msg.avatar}</div>
            <div className="rounded-xl bg-sand-50 dark:bg-ink-800 border border-ink-100 dark:border-ink-700 px-3 py-2 text-xs text-ink-700 dark:text-sand-300">{msg.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoPreview() {
  return (
    <div className="flex flex-col h-full bg-ink-900 p-4 gap-3">
      <div className="flex items-center gap-2.5 border-b border-ink-700 pb-3">
        <IconBadge icon={TbVideoPlus} gradient="bg-gradient-to-br from-rose-400 to-red-600" size="sm" />
        <div>
          <div className="text-sm font-bold text-white">جلسه ویدیویی</div>
          <div className="text-[11px] text-rose-400">در حال برگزاری • ۳ نفر</div>
        </div>
        <div className="mr-auto flex items-center gap-1 bg-red-500/20 border border-red-500/40 text-red-400 text-[10px] rounded-md px-2 py-0.5 font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
          LIVE
        </div>
      </div>
      <div className="flex-1 rounded-2xl bg-ink-800 relative overflow-hidden">
        <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="w-full h-full object-cover opacity-50" />
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs rounded-lg px-2 py-1 backdrop-blur-sm">علی محمدی</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: 'سارا ر.', color: 'from-blue-400 to-indigo-500' },
          { name: 'محمد ک.', color: 'from-emerald-400 to-teal-500' },
          { name: 'نرگس م.', color: 'from-violet-400 to-purple-500' },
        ].map((p, i) => (
          <div key={i} className="aspect-video rounded-xl bg-ink-800 flex items-center justify-center border border-ink-700">
            <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xs font-bold shadow-md`}>{p.name[0]}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {['میکروفون', 'دوربین', 'اشتراک'].map((btn, i) => (
          <div key={i} className="h-8 px-3 rounded-xl bg-ink-700 border border-ink-600 text-sand-300 text-xs flex items-center">{btn}</div>
        ))}
        <div className="h-8 px-3 rounded-xl bg-gradient-to-l from-red-500 to-rose-600 text-white text-xs flex items-center font-semibold shadow-md shadow-red-500/30">پایان</div>
      </div>
    </div>
  );
}

function TasksPreview() {
  const tasks = [
    { title: 'تهیه گزارش ماهانه', tag: 'فوری', done: false, tagColor: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' },
    { title: 'بررسی درخواست‌های جدید', tag: 'بالا', done: true, tagColor: 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' },
    { title: 'جلسه هماهنگی فروش', tag: 'معمولی', done: false, tagColor: 'bg-sand-100 text-ink-500 dark:bg-ink-800 dark:text-sand-400' },
    { title: 'به‌روزرسانی مستندات', tag: 'کم', done: false, tagColor: 'bg-sand-100 text-ink-500 dark:bg-ink-800 dark:text-sand-400' },
  ];
  return (
    <div className="p-4 flex flex-col gap-3 h-full bg-white dark:bg-ink-900">
      <div className="flex items-center gap-2.5 border-b border-ink-100 dark:border-ink-800 pb-3">
        <IconBadge icon={TbCheckbox} gradient="bg-gradient-to-br from-amber-400 to-orange-500" size="sm" />
        <span className="font-bold text-ink-900 dark:text-white text-sm">اقدامات</span>
        <span className="mr-auto text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300 rounded-full px-2 py-0.5 font-semibold">{tasks.filter(t => !t.done).length} باز</span>
      </div>
      <div className="space-y-2">
        {tasks.map((t, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-ink-100 dark:border-ink-800 p-3 hover:bg-sand-50 dark:hover:bg-ink-800/50 transition-colors cursor-pointer">
            <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${t.done ? 'border-emerald-500 bg-emerald-500' : 'border-ink-300 dark:border-ink-600'}`}>
              {t.done && <svg viewBox="0 0 10 8" fill="none" className="h-2 w-2"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span className={`text-xs font-medium flex-1 ${t.done ? 'line-through text-ink-400' : 'text-ink-800 dark:text-sand-200'}`}>{t.title}</span>
            <span className={`text-[10px] font-semibold rounded-md px-1.5 py-0.5 shrink-0 ${t.tagColor}`}>{t.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotesPreview() {
  const notes = [
    { title: 'ایده‌های جدید محصول', lines: 4, color: 'bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800/50', dot: 'bg-amber-400' },
    { title: 'خلاصه جلسه یکشنبه', lines: 3, color: 'bg-teal-50 border-teal-200 dark:bg-teal-900/10 dark:border-teal-800/50', dot: 'bg-teal-400' },
    { title: 'اهداف فصل جدید', lines: 5, color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800/50', dot: 'bg-blue-400' },
    { title: 'فهرست خرید تجهیزات', lines: 3, color: 'bg-rose-50 border-rose-200 dark:bg-rose-900/10 dark:border-rose-800/50', dot: 'bg-rose-400' },
  ];
  return (
    <div className="p-4 flex flex-col gap-3 h-full bg-white dark:bg-ink-900">
      <div className="flex items-center gap-2.5 border-b border-ink-100 dark:border-ink-800 pb-3">
        <IconBadge icon={TbNotebook} gradient="bg-gradient-to-br from-teal-400 to-cyan-600" size="sm" />
        <span className="font-bold text-ink-900 dark:text-white text-sm">یادداشت‌ها</span>
      </div>
      <div className="grid grid-cols-2 gap-2 flex-1">
        {notes.map((note, i) => (
          <div key={i} className={`rounded-xl border p-3 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-all ${note.color}`}>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${note.dot}`} />
              <div className="text-xs font-semibold text-ink-800 dark:text-sand-200 leading-tight">{note.title}</div>
            </div>
            <div className="space-y-1">
              {Array.from({ length: note.lines }).map((_, j) => (
                <div key={j} className="h-1.5 rounded-full bg-ink-200/60 dark:bg-ink-700/60" style={{ width: `${70 + (j % 3) * 10}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsPreview() {
  const contacts = [
    { name: 'علی محمدی', role: 'مدیر فنی', color: 'from-emerald-400 to-teal-500', online: true },
    { name: 'سارا رضایی', role: 'طراح محصول', color: 'from-blue-400 to-indigo-500', online: true },
    { name: 'محمد کریمی', role: 'مدیر فروش', color: 'from-violet-400 to-purple-500', online: false },
    { name: 'نرگس احمدی', role: 'توسعه‌دهنده', color: 'from-rose-400 to-pink-500', online: true },
  ];
  return (
    <div className="p-4 flex flex-col gap-3 h-full bg-white dark:bg-ink-900">
      <div className="flex items-center gap-2.5 border-b border-ink-100 dark:border-ink-800 pb-3">
        <IconBadge icon={TbUsers} gradient="bg-gradient-to-br from-sky-400 to-blue-600" size="sm" />
        <span className="font-bold text-ink-900 dark:text-white text-sm">مخاطبین</span>
      </div>
      <div className="space-y-1.5">
        {contacts.map((c, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-sand-50 dark:hover:bg-ink-800/60 transition-colors cursor-pointer group">
            <div className="relative">
              <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-sm font-bold shadow-md`}>
                {c.name[0]}
              </div>
              <span className={`absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2 border-white dark:border-ink-900 ${c.online ? 'bg-emerald-400' : 'bg-ink-300'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-ink-800 dark:text-sand-200">{c.name}</div>
              <div className="text-xs text-ink-400 dark:text-sand-500 truncate">{c.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsPreview() {
  const bars = [65, 80, 45, 90, 70, 55, 85];
  const days = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
  return (
    <div className="p-4 flex flex-col gap-3 h-full bg-white dark:bg-ink-900">
      <div className="flex items-center gap-2.5 border-b border-ink-100 dark:border-ink-800 pb-3">
        <IconBadge icon={TbChartBar} gradient="bg-gradient-to-br from-orange-400 to-rose-500" size="sm" />
        <span className="font-bold text-ink-900 dark:text-white text-sm">گزارشات هفتگی</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'جلسات برگزار شده', value: '۲۴', color: 'from-brand-400 to-emerald-500', num: 'text-brand-600 dark:text-brand-400' },
          { label: 'اقدامات تکمیل شده', value: '۵۸', color: 'from-orange-400 to-rose-500', num: 'text-orange-600 dark:text-orange-400' },
        ].map((s, i) => (
          <div key={i} className="rounded-xl bg-sand-50 dark:bg-ink-800 border border-ink-100 dark:border-ink-700 p-3">
            <div className="text-[11px] text-ink-400 dark:text-sand-500 leading-tight">{s.label}</div>
            <div className={`text-2xl font-extrabold mt-1 bg-gradient-to-l ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <div className="text-[10px] text-ink-400 dark:text-sand-500 mb-2">جلسات هر روز</div>
        <div className="flex items-end gap-1.5 h-20">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-brand-500 to-emerald-400 transition-all"
                style={{ height: `${h}%` }}
              />
              <span className="text-[9px] text-ink-400 dark:text-sand-500">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIPreview() {
  const conversation = [
    { me: true, text: 'یه جلسه فردا ساعت ۱۰ با تیم طراحی تنظیم کن' },
    { me: false, text: 'جلسه «هماهنگی تیم طراحی» برای فردا ۱۰:۰۰ ایجاد شد. شرکت‌کنندگان را اضافه کنم؟' },
    { me: true, text: 'آره، سارا و محمد رو دعوت کن' },
    { me: false, text: 'دعوت‌نامه ارسال شد. یادآوری ۳۰ دقیقه قبل هم فعال شد.' },
  ];
  return (
    <div className="flex flex-col h-full bg-white dark:bg-ink-900">
      <div className="px-4 py-3 border-b border-ink-100 dark:border-ink-800 flex items-center gap-2.5">
        <IconBadge icon={TbRobot} gradient="bg-gradient-to-br from-brand-500 to-emerald-600" size="sm" />
        <div>
          <div className="text-sm font-bold text-ink-900 dark:text-white">اسپارک</div>
          <div className="text-[11px] text-brand-500 font-medium">دستیار هوشمند فارسی</div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden p-4 space-y-3">
        {conversation.map((m, i) => (
          <div key={i} className={`flex ${m.me ? 'justify-start' : 'justify-end'}`}>
            {!m.me && (
              <div className="flex gap-2 max-w-[85%] flex-row-reverse">
                <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-brand-400 to-emerald-500 flex items-center justify-center shadow-sm">
                  <TbRobot className="text-white text-sm" />
                </div>
                <div className="rounded-2xl px-3 py-2 text-xs bg-gradient-to-br from-brand-500 to-emerald-600 text-white shadow-md shadow-brand-500/20">
                  {m.text}
                </div>
              </div>
            )}
            {m.me && (
              <div className="max-w-[85%] rounded-2xl px-3 py-2 text-xs bg-sand-100 text-ink-800 dark:bg-ink-800 dark:text-sand-200 border border-ink-100 dark:border-ink-700">
                {m.text}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-ink-100 dark:border-ink-800">
        <div className="h-9 rounded-xl bg-gradient-to-l from-brand-50 to-emerald-50 dark:from-ink-800 dark:to-ink-800 border border-brand-200/60 dark:border-ink-700 flex items-center px-3 gap-2 text-xs text-ink-400 dark:text-ink-500">
          <TbRobot className="text-brand-400 text-sm shrink-0" />
          فرمان خود را بنویسید...
        </div>
      </div>
    </div>
  );
}

type PreviewKey = 'screenshot' | 'request' | 'chat' | 'channels' | 'video' | 'tasks' | 'notes' | 'contacts' | 'reports' | 'ai';

const previewMap: Record<PreviewKey, () => JSX.Element> = {
  screenshot: CalendarScreenshot,
  request: RequestPreview,
  chat: ChatPreview,
  channels: ChannelsPreview,
  video: VideoPreview,
  tasks: TasksPreview,
  notes: NotesPreview,
  contacts: ContactsPreview,
  reports: ReportsPreview,
  ai: AIPreview,
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function PortalShowcase() {
  const [activeId, setActiveId] = useState('calendar');
  const [autoPlay, setAutoPlay] = useState(true);
  const activeIndex = menuItems.findIndex((m) => m.id === activeId);
  const activeItem = menuItems[activeIndex];

  const goNext = useCallback(() => {
    setActiveId(menuItems[(activeIndex + 1) % menuItems.length].id);
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    setActiveId(menuItems[(activeIndex - 1 + menuItems.length) % menuItems.length].id);
  }, [activeIndex]);

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(goNext, 4000);
    return () => clearInterval(t);
  }, [autoPlay, goNext]);

  const PreviewComponent = previewMap[activeItem.preview as PreviewKey];

  return (
    <div className="w-full">
      {/* Browser chrome */}
      <div className="rounded-3xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 shadow-2xl shadow-ink-900/15 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-5 py-3 bg-sand-50/80 dark:bg-ink-950/80 border-b border-ink-100 dark:border-ink-800">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="h-6 rounded-md bg-sand-100 dark:bg-ink-800 border border-ink-100 dark:border-ink-700 flex items-center px-3 gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80 shrink-0" />
              <span className="text-xs text-ink-400 dark:text-sand-500 truncate">app.spark.ir — {activeItem.label}</span>
            </div>
          </div>
          <span className="text-xs text-ink-400 dark:text-ink-500 font-medium hidden sm:block">پرتال اسپارک</span>
        </div>

        {/* App layout */}
        <div className="flex" style={{ minHeight: 440 }}>
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col w-48 border-l border-ink-100 dark:border-ink-800 bg-sand-50/60 dark:bg-ink-950/50 shrink-0 py-3 gap-0.5 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveId(item.id); setAutoPlay(false); }}
                  className={`relative flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-right transition-all duration-200 group w-full ${
                    isActive
                      ? 'bg-white dark:bg-ink-800 shadow-sm'
                      : 'hover:bg-sand-100 dark:hover:bg-ink-800/60'
                  }`}
                >
                  {/* Animated icon badge */}
                  <div className={`h-7 w-7 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 ${
                    isActive
                      ? `${item.gradient} scale-110`
                      : 'bg-sand-200 dark:bg-ink-700 group-hover:scale-105'
                  }`}>
                    <Icon className={`text-sm ${isActive ? 'text-white' : 'text-ink-500 dark:text-sand-400'}`} />
                  </div>
                  <span className={`text-xs font-medium truncate transition-colors ${
                    isActive
                      ? 'text-ink-900 dark:text-white'
                      : 'text-ink-500 dark:text-sand-400'
                  }`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-bar"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-l-full bg-gradient-to-b from-brand-400 to-brand-600"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main preview */}
          <main className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
                className="absolute inset-0"
              >
                <PreviewComponent />
              </motion.div>
            </AnimatePresence>

            {/* Arrow controls */}
            <button
              onClick={() => { goPrev(); setAutoPlay(false); }}
              className="absolute top-1/2 right-3 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/95 dark:bg-ink-800/95 border border-ink-200 dark:border-ink-700 shadow-md flex items-center justify-center text-ink-500 hover:text-ink-800 dark:text-sand-400 dark:hover:text-white transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => { goNext(); setAutoPlay(false); }}
              className="absolute top-1/2 left-3 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/95 dark:bg-ink-800/95 border border-ink-200 dark:border-ink-700 shadow-md flex items-center justify-center text-ink-500 hover:text-ink-800 dark:text-sand-400 dark:hover:text-white transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </main>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-sand-50/60 dark:bg-ink-950/40 border-t border-ink-100 dark:border-ink-800">
          {/* Mobile scrollable menu */}
          <div className="flex gap-1.5 overflow-x-auto md:hidden">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveId(item.id); setAutoPlay(false); }}
                  className={`shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                    item.id === activeId
                      ? `${item.gradient} text-white shadow-sm`
                      : 'bg-sand-100 text-ink-500 dark:bg-ink-800 dark:text-sand-400'
                  }`}
                >
                  <Icon className="text-sm" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Dot indicators */}
          <div className="hidden md:flex items-center gap-1.5 mr-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveId(item.id); setAutoPlay(false); }}
                className={`rounded-full transition-all duration-300 ${
                  item.id === activeId ? 'w-6 h-2 bg-gradient-to-l from-brand-400 to-emerald-500' : 'w-2 h-2 bg-ink-200 dark:bg-ink-700 hover:bg-ink-300'
                }`}
                aria-label={item.label}
              />
            ))}
          </div>

          <button
            onClick={() => setAutoPlay((v) => !v)}
            className="hidden md:flex items-center gap-1.5 text-xs text-ink-400 dark:text-sand-500 hover:text-ink-600 dark:hover:text-sand-300 transition-colors mr-4"
          >
            <span className={`h-2 w-2 rounded-full ${autoPlay ? 'bg-emerald-400 animate-pulse' : 'bg-ink-300 dark:bg-ink-600'}`} />
            {autoPlay ? 'پخش خودکار' : 'متوقف'}
          </button>
        </div>
      </div>
    </div>
  );
}
