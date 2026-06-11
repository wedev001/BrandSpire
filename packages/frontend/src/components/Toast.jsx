import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, MailCheck, X } from 'lucide-react';

const toastStyles = {
  success: {
    icon: CheckCircle2,
    accent: 'from-emerald-400 to-teal-600',
    ring: 'ring-emerald-400/20',
    progress: 'from-emerald-400 via-cyan-400 to-blue-500',
  },
  mail: {
    icon: MailCheck,
    accent: 'from-cyan-400 to-blue-600',
    ring: 'ring-cyan-400/20',
    progress: 'from-cyan-400 via-blue-500 to-violet-500',
  },
  error: {
    icon: AlertCircle,
    accent: 'from-rose-400 to-red-600',
    ring: 'ring-rose-400/20',
    progress: 'from-rose-400 via-red-500 to-orange-400',
  },
};

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const style = toastStyles[toast.type] || toastStyles.success;
  const Icon = style.icon;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: -18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -14, scale: 0.98 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-4 top-24 z-[80] w-[calc(100vw-2rem)] max-w-sm"
    >
      <div className={`relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br ${style.accent} shadow-glow-lg`}>
        <div className={`relative rounded-2xl bg-white/95 dark:bg-surface-card/95 p-4 pr-11 ring-1 ${style.ring} backdrop-blur-xl`}>
          <span className={`absolute -right-8 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${style.accent} opacity-20 blur-2xl`} />
          <div className="relative flex gap-3">
            <span className={`mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${style.accent} text-white shadow-md`}>
              <Icon size={19} strokeWidth={2.3} />
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-bold tracking-tight text-slate-950 dark:text-white">
                {toast.title}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {toast.message}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification"
            className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X size={14} />
          </button>
          <motion.span
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${style.progress}`}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 4.8, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
