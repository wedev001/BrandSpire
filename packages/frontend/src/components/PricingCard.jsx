import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

function fmt(n) { return '₹' + n.toLocaleString('en-IN'); }

export default function PricingCard({ plan, index = 0, selected, dimmed, onSelect }) {
  const interactive = typeof onSelect === 'function';
  const range = plan.priceMin === plan.priceMax
    ? fmt(plan.priceMin) + (plan.suffix || '')
    : `${fmt(plan.priceMin)} – ${fmt(plan.priceMax)}${plan.suffix || ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05, type: 'spring', bounce: 0.3 }}
      whileHover={{ y: -8, transition: { duration: 0.2, type: 'spring', stiffness: 300, damping: 30 } }}
      animate={{
        opacity: dimmed ? 0.55 : 1,
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={
        'relative rounded-2xl p-[1px] h-full transition-all duration-300 ' +
        (plan.popular ? 'bg-violet-gradient shadow-glow' : selected ? 'bg-gradient-to-br from-violetx-500/40 to-violetx-400/20 shadow-xl' : 'bg-slate-200 dark:bg-white/[0.06]') +
        (selected ? ' scale-102' : '')
      }
    >
      {plan.popular && (
        <span className="absolute -top-3 right-5 chip bg-violet-gradient text-white border-transparent shadow-glow z-10">
          <Star size={11} className="fill-white"/> Most Popular
        </span>
      )}
      <button
        type={interactive ? 'button' : undefined}
        onClick={onSelect}
        className={
          'w-full text-left rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ' +
          (selected 
            ? 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 shadow-lg' 
            : 'bg-white dark:bg-surface-card') +
          (interactive ? ' cursor-pointer hover:shadow-lg' : '')
        }
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className={`font-display text-xl font-bold transition-colors ${
            selected ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'
          }`}>{plan.name}</h3>
          {interactive && (
            <span className={
              'h-5 w-5 rounded-full border-2 grid place-items-center shrink-0 transition-all ' +
              (selected ? 'bg-violetx-500 border-violetx-500 shadow-lg shadow-violetx-500/50' : 'border-slate-300 dark:border-white/30 hover:border-violetx-500/50')
            }>
              {selected && <span className="h-2 w-2 rounded-full bg-white"/>}
            </span>
          )}
        </div>
        <p className={`text-xs font-semibold uppercase tracking-wider mt-1 transition-colors ${
          selected ? 'text-violetx-700 dark:text-violetx-200' : 'text-violetx-600 dark:text-violetx-300'
        }`}>
          {plan.tag}
        </p>

        <div className="mt-5">
          <p className={`font-display text-3xl font-bold leading-none transition-all ${
            selected ? 'text-gradient' : 'text-gradient'
          }`}>
            {range}
          </p>
          <p className={`text-xs mt-1.5 transition-colors ${
            selected ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'
          }`}>
            One-time investment · GST extra
          </p>
        </div>

        {plan.blurb && (
          <p className={`mt-4 text-sm leading-relaxed transition-colors ${
            selected ? 'text-slate-700 dark:text-slate-300' : 'text-slate-600 dark:text-slate-400'
          }`}>
            {plan.blurb}
          </p>
        )}

        <div className="divider-violet my-5"/>

        {plan.idealFor && plan.idealFor.length > 0 && (
          <>
            <p className={`text-[11px] uppercase tracking-wider font-semibold mb-2 transition-colors ${
              selected ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'
            }`}>
              Ideal For
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {plan.idealFor.map((t) => (
                <span key={t} className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                  selected
                    ? 'border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-white/[0.05]'
                    : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                }`}>
                  {t}
                </span>
              ))}
            </div>
          </>
        )}

        <p className={`text-[11px] uppercase tracking-wider font-semibold mb-2 transition-colors ${
          selected ? 'text-slate-600 dark:text-slate-300' : 'text-slate-500 dark:text-slate-400'
        }`}>
          What's Included
        </p>
        <ul className="space-y-2.5 text-sm flex-1">
          {plan.features.map((f, idx) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-start gap-2"
            >
              <motion.span
                whileHover={{ scale: 1.2 }}
                className="text-violetx-500 mt-0.5 shrink-0"
              >
                <Check size={16} />
              </motion.span>
              <span className="text-slate-700 dark:text-slate-300">{f}</span>
            </motion.li>
          ))}
        </ul>

        {!interactive && (
          <Link to="/contact" className={'mt-6 w-full justify-center ' + (plan.popular ? 'btn-primary' : 'btn-ghost')}>
            Get Started
          </Link>
        )}
      </button>
    </motion.div>
  );
}
