import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, X, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { to: '/',          label: 'خانه' },
  { to: '/features',  label: 'قابلیت‌ها' },
  { to: '/services',  label: 'خدمات' },
  { to: '/pricing',   label: 'قیمت‌گذاری' },
  { to: '/contact',   label: 'تماس' },
];

export default function Header() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-ink-950/90 backdrop-blur-md shadow-sm shadow-ink-900/5 border-b border-ink-100 dark:border-ink-800'
            : 'bg-transparent'
        }`}
      >
        <div className="container-xl flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 shadow-md shadow-brand-600/30">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth={2.5}>
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-lg font-extrabold text-ink-900 dark:text-white tracking-tight">اسپارک</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-ink-200/80 dark:border-ink-700/80 bg-white/80 dark:bg-ink-900/80 backdrop-blur-sm px-2 py-1.5">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? 'text-brand-700 dark:text-brand-300'
                      : 'text-ink-500 dark:text-sand-400 hover:text-ink-800 dark:hover:text-sand-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-brand-50 dark:bg-brand-900/30"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="h-9 w-9 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 flex items-center justify-center text-ink-500 dark:text-sand-400 hover:text-ink-800 dark:hover:text-sand-100 transition-colors"
              aria-label="تغییر تم"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/contact" className="hidden md:flex btn btn-sm btn-primary">
              ورود / ثبت‌نام
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden h-9 w-9 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 flex items-center justify-center text-ink-600 dark:text-sand-400"
              aria-label="منو"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 z-50 w-72 bg-white dark:bg-ink-900 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100 dark:border-ink-800">
                <span className="text-lg font-extrabold text-ink-900 dark:text-white">اسپارک</span>
                <button onClick={() => setMobileOpen(false)} className="h-8 w-8 rounded-lg bg-sand-100 dark:bg-ink-800 flex items-center justify-center text-ink-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {navLinks.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400'
                          : 'text-ink-600 dark:text-sand-400 hover:bg-sand-50 dark:hover:bg-ink-800'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
              <div className="p-4 border-t border-ink-100 dark:border-ink-800">
                <Link to="/contact" className="btn btn-md btn-primary w-full justify-center">
                  ورود / ثبت‌نام
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
