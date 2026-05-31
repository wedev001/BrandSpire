import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={
        'relative h-10 w-10 rounded-full overflow-hidden ' +
        'border border-slate-200 dark:border-white/10 ' +
        'bg-white dark:bg-white/[0.04] ' +
        'text-slate-700 dark:text-violetx-200 ' +
        'shadow-sm hover:shadow-md dark:hover:shadow-violetx-500/20 ' +
        'transition-colors duration-300 ' + className
      }
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-violet-gradient-soft opacity-0 dark:opacity-100 transition-opacity duration-300 pointer-events-none"
      />
      <span className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ y: -14, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 14, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex"
            >
              <Moon size={17} strokeWidth={2.2} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ y: -14, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 14, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex"
            >
              <Sun size={17} strokeWidth={2.2} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
