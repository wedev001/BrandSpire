import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHero({ eyebrow, title, subtitle, breadcrumb }) {
  return (
    <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-14">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="absolute inset-0 -z-10 bg-radial-fade opacity-60" />
      <div className="max-w-app container-px text-center">
        {breadcrumb && (
          <nav className="flex items-center justify-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <Link to="/" className="hover:text-violetx-500">Home</Link>
            <ChevronRight size={12}/>
            <span className="text-slate-700 dark:text-slate-200">{breadcrumb}</span>
          </nav>
        )}
        {eyebrow && <span className="chip">{eyebrow}</span>}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
