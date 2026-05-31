import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggleTheme}
      className={
        'relative inline-flex h-10 w-20 items-center rounded-full border-2 ' +
        'border-slate-300/60 dark:border-violetx-500/40 bg-gradient-to-r from-slate-50 to-slate-100 ' +
        'dark:from-slate-800 dark:to-slate-900 transition-all duration-300 ' +
        'hover:border-slate-400 dark:hover:border-violetx-500/60 hover:shadow-lg dark:hover:shadow-violetx-500/20 ' + className
      }
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 600, damping: 35 }}
        className={
          'absolute top-[3px] h-8 w-8 rounded-full bg-gradient-to-br from-violetx-500 to-violet-600 ' +
          'shadow-lg dark:shadow-violetx-500/60 transition-all ' +
          (isDark ? 'left-[34px]' : 'left-[3px]')
        }
      />
      <span className="flex w-full justify-between px-2.5 text-slate-600 dark:text-slate-300 relative z-0">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="z-10"
            >
              <Sun size={16} className="text-slate-400" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, scale: 0.5, rotate: 180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: -180 }}
              transition={{ duration: 0.3 }}
              className="ml-auto z-10"
            >
              <Moon size={16} className="text-slate-500" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
