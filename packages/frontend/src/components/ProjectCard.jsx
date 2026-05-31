import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, index = 0 }) {
  const { title, category, type, img, color, desc, stack = [], year } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/[0.08] dark:to-white/[0.02] hover:from-cyan-400/50 hover:to-blue-600/30 transition-colors duration-500"
    >
      <div className="relative h-full rounded-2xl bg-white dark:bg-surface-card overflow-hidden flex flex-col">
        {/* Image */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden">
          {img ? (
            <img
              src={img}
              alt={title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
          )}

          {/* Color tint + dark gradient for legibility */}
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-40 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Top-row badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/90 dark:bg-black/50 backdrop-blur-md text-slate-800 dark:text-white border border-white/40 dark:border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {type}
            </span>
            {year && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/40 backdrop-blur-md text-white/90 border border-white/10">
                {year}
              </span>
            )}
          </div>

          {/* Hover overlay with view button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30 backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-gradient text-white text-sm font-semibold shadow-glow translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <ExternalLink size={14} /> View Case Study
            </span>
          </div>

          {/* Bottom title (sits on the image) */}
          <div className="absolute left-4 right-4 bottom-3">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/70 font-semibold">{category}</p>
            <h3 className="font-display text-xl font-bold text-white leading-tight drop-shadow">{title}</h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex-1 flex flex-col">
          {desc && (
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
          )}

          {stack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {stack.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.03]"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-violetx-600 dark:group-hover:text-violetx-300 transition-colors">
              Live · Production
            </span>
            <span className="h-9 w-9 grid place-items-center rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 group-hover:bg-violet-gradient group-hover:text-white group-hover:border-transparent group-hover:rotate-45 transition-all duration-300">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
