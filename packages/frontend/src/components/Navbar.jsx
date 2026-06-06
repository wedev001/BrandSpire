import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { company } from '../data/site.js';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={
        'fixed top-0 inset-x-0 z-50 transition-all duration-300 ' +
        (scrolled
          ? 'bg-white/90 dark:bg-ink-950/95 shadow-[0_35px_120px_-90px_rgba(15,23,42,0.35)] border-b border-slate-200/70 dark:border-white/10 backdrop-blur-xl'
          : 'bg-transparent border-b border-transparent')
      }
    >
      <nav className="max-w-app container-px mx-auto flex flex-wrap items-center justify-between gap-3 py-3 sm:py-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            <span className="hidden lg:inline-flex rounded-full bg-slate-100 dark:bg-white/5 px-3 py-2">Launch-ready startup</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1 lg:gap-3 md:flex-1 justify-center">
          <ul className="flex flex-wrap items-center justify-center gap-1 lg:gap-2">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    'relative px-3 py-2 rounded-lg text-sm transition-colors duration-200 ' +
                    (isActive
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white')
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-lg bg-violet-gradient-soft border border-violetx-500/30"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <a
            href={company.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden lg:inline-flex"
          >
            Get Free Quote
          </a>
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 dark:border-white/15 bg-white/80 dark:bg-ink-950/80 backdrop-blur-sm shadow-sm"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-slate-200/60 dark:border-white/10 bg-white/95 dark:bg-ink-950/95 backdrop-blur-xl"
          >
            <div className="container-px max-w-app py-4">
              <ul className="flex flex-col gap-2">
                {links.map((l) => (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        'block w-full rounded-2xl px-4 py-3 text-sm font-medium transition-colors ' +
                        (isActive
                          ? 'bg-violet-gradient-soft text-slate-900 dark:text-white border border-violetx-500/30'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5')
                      }
                    >
                      {l.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between gap-3">
                <ThemeToggle />
                <a
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 text-center"
                >
                  Get Free Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
