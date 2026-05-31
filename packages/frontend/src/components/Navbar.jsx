import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';

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
          ? 'bg-white/70 dark:bg-ink-950/70 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10'
          : 'bg-transparent border-b border-transparent')
      }
    >
      <nav className="max-w-app container-px h-16 flex items-center justify-between">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  'relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ' +
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

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link to="/contact" className="btn-primary hidden md:inline-flex">
            Get Free Quote
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 dark:border-white/15"
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-slate-200/60 dark:border-white/10 bg-white/90 dark:bg-ink-950/95 backdrop-blur-xl"
          >
            <ul className="container-px max-w-app py-4 flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      'block px-3 py-2.5 rounded-lg text-sm font-medium ' +
                      (isActive
                        ? 'bg-violet-gradient-soft text-slate-900 dark:text-white border border-violetx-500/30'
                        : 'text-slate-700 dark:text-slate-300')
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li className="flex items-center justify-between pt-2 mt-2 border-t border-slate-200/60 dark:border-white/10">
                <ThemeToggle />
                <Link to="/contact" className="btn-primary">Get Free Quote</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
