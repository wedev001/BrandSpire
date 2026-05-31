import { motion } from 'framer-motion';
import { Users, Smile, UserCog, Sparkles } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter.jsx';

const ICONS = { Users, Smile, UserCog, Sparkles };

export default function StatsBar({ items }) {
  return (
    <div className="panel-soft p-6 sm:p-7">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:divide-x md:divide-white/[0.06]">
        {items.map((s, i) => {
          const Icon = ICONS[s.icon] || Sparkles;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-3 md:px-4"
            >
              <span className="icon-tile shrink-0">
                <Icon size={18} />
              </span>
              <div>
                <p className="font-display text-2xl sm:text-3xl font-bold leading-none">
                  <AnimatedCounter to={s.value} suffix={s.suffix} />
                </p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{s.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
