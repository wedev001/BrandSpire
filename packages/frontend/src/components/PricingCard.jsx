import { useRef, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Check, Star, Rocket, Sparkles, Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function fmt(n) {
  if (n >= 1000) {
    const k = n / 1000;
    return '₹' + (k % 1 === 0 ? k : k.toFixed(1)) + 'K';
  }
  return '₹' + n.toLocaleString('en-IN');
}

const TIER_META = {
  basic:    { Icon: Rocket,   accent: 'from-cyan-400 to-blue-600',   ring: 'from-cyan-400/40 to-blue-600/20',   chipText: 'text-cyan-600 dark:text-cyan-300'   },
  standard: { Icon: Sparkles, accent: 'from-blue-500 to-indigo-600', ring: 'from-blue-500/50 to-indigo-600/30', chipText: 'text-blue-600 dark:text-blue-300'    },
  premium:  { Icon: Crown,    accent: 'from-indigo-500 to-violet-600', ring: 'from-indigo-500/50 to-violet-600/30', chipText: 'text-violet-600 dark:text-violet-300' },
};

export default function PricingCard({ plan, index = 0, selected, dimmed, onSelect }) {
  const interactive = typeof onSelect === 'function';
  const range = plan.priceMin === plan.priceMax
    ? fmt(plan.priceMin) + (plan.suffix || '')
    : `${fmt(plan.priceMin)} – ${fmt(plan.priceMax)}${plan.suffix || ''}`;

  const meta = TIER_META[plan.id] || TIER_META.standard;
  const { Icon, accent, ring, chipText } = meta;

  // Cursor-follow glow
  const cardRef = useRef(null);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [hovered, setHovered] = useState(false);
  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  const glow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(59,130,246,0.18), transparent 70%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{ opacity: dimmed ? 0.55 : 1, scale: selected ? 1.025 : 1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={
        'relative rounded-3xl p-[1.5px] h-full will-change-transform ' +
        (plan.popular || selected
          ? `bg-gradient-to-br ${ring} shadow-glow`
          : 'bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/[0.08] dark:to-white/[0.02] hover:from-cyan-400/30 hover:to-blue-600/20 transition-colors duration-500')
      }
    >
      {/* Popular ribbon */}
      {plan.popular && (
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 + 0.2 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-gradient text-white shadow-glow z-10 whitespace-nowrap"
        >
          <Star size={10} className="fill-white" /> Most Popular
        </motion.span>
      )}

      <button
        ref={cardRef}
        type={interactive ? 'button' : undefined}
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={onMouseMove}
        className={
          'relative w-full text-left rounded-3xl p-6 sm:p-7 h-full flex flex-col overflow-hidden transition-colors duration-300 ' +
          'bg-white dark:bg-surface-card ' +
          (interactive ? 'cursor-pointer' : '')
        }
      >
        {/* Cursor-tracking glow */}
        <motion.span
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          animate={{ opacity: hovered ? 1 : 0 }}
        />

        {/* Corner gradient blob */}
        <span className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${accent} opacity-20 blur-3xl`} />

        {/* Header row — icon + selection radio */}
        <div className="relative flex items-start justify-between gap-3">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.05 }}
            className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${accent} grid place-items-center text-white shadow-lg`}
          >
            <Icon size={20} />
          </motion.span>
          {interactive && (
            <span
              className={
                'h-6 w-6 rounded-full border-2 grid place-items-center shrink-0 transition-all ' +
                (selected
                  ? 'bg-gradient-to-br ' + accent + ' border-transparent shadow-md'
                  : 'border-slate-300 dark:border-white/20 group-hover:border-violetx-500/50')
              }
            >
              {selected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="h-2.5 w-2.5 rounded-full bg-white"
                />
              )}
            </span>
          )}
        </div>

        {/* Plan name + tag */}
        <div className="relative mt-5">
          <h3 className="font-display text-2xl font-bold tracking-tight">{plan.name}</h3>
          <p className={`text-[11px] font-bold uppercase tracking-[0.18em] mt-1 ${chipText}`}>
            {plan.tag}
          </p>
        </div>

        {/* Price */}
        <div className="relative mt-5">
          <motion.p
            key={range}
            initial={{ opacity: 0.5, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`font-display text-3xl sm:text-4xl font-extrabold leading-none bg-gradient-to-r ${accent} bg-clip-text text-transparent`}
          >
            {range}
          </motion.p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            One-time · GST extra
          </p>
        </div>

        {plan.blurb && (
          <p className="relative mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {plan.blurb}
          </p>
        )}

        {/* Divider */}
        <div className="relative my-5 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />

        {/* Ideal for */}
        {plan.idealFor && plan.idealFor.length > 0 && (
          <div className="relative mb-5">
            <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-slate-500 dark:text-slate-400 mb-2">
              Ideal For
            </p>
            <div className="flex flex-wrap gap-1.5">
              {plan.idealFor.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.03]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        <p className="relative text-[10px] uppercase tracking-[0.18em] font-bold text-slate-500 dark:text-slate-400 mb-3">
          What's Included
        </p>
        <ul className="relative space-y-2.5 text-sm flex-1">
          {plan.features.map((f, idx) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 + 0.1 }}
              className="flex items-start gap-2.5"
            >
              <span className={`mt-0.5 h-5 w-5 rounded-full grid place-items-center shrink-0 bg-gradient-to-br ${accent} text-white shadow-sm`}>
                <Check size={11} strokeWidth={3} />
              </span>
              <span className="text-slate-700 dark:text-slate-300 leading-snug">{f}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA — only when used as static card (Home page) */}
        {!interactive && (
          <Link
            to="/contact"
            className={
              'group/cta relative mt-7 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 ' +
              (plan.popular
                ? 'bg-violet-gradient text-white shadow-glow hover:shadow-[0_16px_50px_-10px_rgba(59,130,246,0.65)] hover:-translate-y-0.5'
                : 'border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:border-violetx-500/60 hover:text-violetx-600 dark:hover:text-violetx-300')
            }
          >
            Get Started
            <ArrowRight size={15} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
          </Link>
        )}

        {/* Footer line for interactive cards */}
        {interactive && (
          <p className="relative mt-6 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {selected ? (
              <span className={chipText + ' inline-flex items-center gap-1'}>
                <Check size={12} /> Selected · customise below
              </span>
            ) : (
              'Click to select'
            )}
          </p>
        )}
      </button>
    </motion.div>
  );
}
