import { useRef, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ServiceCard({
  icon: Icon,
  title,
  desc,
  index = 0,
  accent = 'from-cyan-400 to-blue-600',
  bullets = [],
  tag,
}) {
  // Cursor-tracking glow
  const ref = useRef(null);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const [hovered, setHovered] = useState(false);
  const onMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(e.clientX - r.left);
    mouseY.set(e.clientY - r.top);
  };
  const glow = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(59,130,246,0.16), transparent 70%)`;

  const number = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/[0.08] dark:to-white/[0.02] hover:from-cyan-400/40 hover:to-blue-600/30 transition-colors duration-500 h-full"
    >
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={onMouseMove}
        className="relative h-full rounded-2xl bg-white dark:bg-surface-card p-6 sm:p-7 overflow-hidden flex flex-col"
      >
        {/* Cursor-tracking glow */}
        <motion.span
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner gradient blob */}
        <span className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${accent} opacity-15 blur-3xl group-hover:opacity-30 transition-opacity duration-500`} />

        {/* Number badge */}
        <span className="absolute top-5 right-5 font-display text-xs font-bold text-slate-300 dark:text-white/15 tracking-wider group-hover:text-slate-400 dark:group-hover:text-white/30 transition-colors">
          {number}
        </span>

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: -8, scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 300, damping: 16 }}
          className={`relative inline-flex h-12 w-12 rounded-2xl bg-gradient-to-br ${accent} grid place-items-center text-white shadow-lg`}
        >
          <Icon size={20} strokeWidth={2.2} />
        </motion.div>

        {/* Title */}
        <h3 className="relative mt-5 font-display font-bold text-lg leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="relative mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {desc}
        </p>

        {/* Bullets */}
        {bullets.length > 0 && (
          <ul className="relative mt-4 space-y-1.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className={`h-4 w-4 rounded-full bg-gradient-to-br ${accent} grid place-items-center text-white shrink-0`}>
                  <Check size={9} strokeWidth={3.5} />
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer — tag + arrow CTA */}
        <div className="relative mt-auto pt-5 flex items-center justify-between gap-3">
          {tag ? (
            <span className={`text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>
              {tag}
            </span>
          ) : <span />}
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 group-hover:text-violetx-600 dark:group-hover:text-violetx-300 transition-colors"
            aria-label={`Learn more about ${title}`}
          >
            Learn more
            <span className={`h-7 w-7 grid place-items-center rounded-full border border-slate-200 dark:border-white/10 group-hover:bg-gradient-to-br ${accent} group-hover:text-white group-hover:border-transparent group-hover:rotate-45 transition-all duration-300`}>
              <ArrowUpRight size={13} />
            </span>
          </Link>
        </div>

        {/* Bottom gradient line that draws in on hover */}
        <span className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-full">
          <span className={`block h-full bg-gradient-to-r ${accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} />
        </span>
      </div>
    </motion.div>
  );
}
