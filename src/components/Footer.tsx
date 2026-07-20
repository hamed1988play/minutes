import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 dark:border-ink-800 bg-sand-50/50 dark:bg-ink-950/50 py-12">
      <div className="container-xl">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-7 w-7 rounded-lg bg-brand-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-extrabold text-ink-900 dark:text-white">اسپارک</span>
            </div>
            <p className="text-sm text-ink-500 dark:text-sand-500">سامانه هوشمند مدیریت سازمانی</p>
          </div>
          {[
            { title: 'محصول', links: [['قابلیت‌ها', '/features'], ['قیمت‌گذاری', '/pricing'], ['خدمات', '/services']] },
            { title: 'شرکت', links: [['درباره ما', '/'], ['تماس', '/contact'], ['وبلاگ', '/']] },
            { title: 'پشتیبانی', links: [['مستندات', '/'], ['راهنما', '/'], ['وضعیت سرویس', '/']] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-ink-800 dark:text-sand-200 mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-ink-400 dark:text-sand-500 hover:text-ink-700 dark:hover:text-sand-300 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-ink-100 dark:border-ink-800 flex items-center justify-between text-xs text-ink-400 dark:text-sand-500">
          <span>© ۱۴۰۴ اسپارک. همه حقوق محفوظ است.</span>
          <span>ساخته شده با ❤ در ایران</span>
        </div>
      </div>
    </footer>
  );
}
