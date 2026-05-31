import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

function ProjectArt({ color, label }) {
  return (
    <div className={`relative h-44 sm:h-48 w-full rounded-xl overflow-hidden bg-gradient-to-br ${color}`}>
      <div className="absolute inset-0 opacity-25 mix-blend-overlay grid-bg" />
      <div className="absolute inset-3 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 p-3 flex flex-col justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/80" />
          <span className="h-2 w-2 rounded-full bg-yellow-300/80" />
          <span className="h-2 w-2 rounded-full bg-green-400/80" />
        </div>
        <div className="space-y-1.5">
          <div className="h-2 w-2/3 rounded bg-white/40" />
          <div className="h-2 w-1/2 rounded bg-white/25" />
          <div className="flex gap-1.5 pt-1">
            <span className="h-7 w-12 rounded bg-white/15" />
            <span className="h-7 w-12 rounded bg-white/15" />
            <span className="h-7 w-12 rounded bg-white/30" />
          </div>
        </div>
        <span className="self-end text-[10px] font-semibold tracking-wider uppercase text-white/80">{label}</span>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="card card-hover group shrink-0"
    >
      <ProjectArt color={project.color} label={project.type} />
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{project.title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{project.category}</p>
        </div>
        <span className="h-9 w-9 grid place-items-center rounded-full border border-slate-200 dark:border-white/10 group-hover:bg-violet-gradient group-hover:text-white group-hover:border-transparent transition-all">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </motion.article>
  );
}
