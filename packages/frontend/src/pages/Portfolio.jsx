import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { projects, portfolioCategories } from '../data/site.js';

const filterMap = {
  All: () => true,
  Websites: (p) => p.category === 'Website',
  'Web Apps': (p) => p.category === 'Web App',
  Dashboards: (p) => p.type === 'Dashboard',
  'E-Commerce': (p) => p.category === 'E-Commerce',
};

export default function Portfolio() {
  const [active, setActive] = useState('All');
  const filtered = useMemo(() => projects.filter(filterMap[active]), [active]);

  return (
    <>
      <PageHero
        breadcrumb="Portfolio"
        title={<>Our <span className="text-gradient">Portfolio</span></>}
        subtitle="Concept work and sample builds to show our approach and design direction."
      />

      <section className="max-w-app container-px">
        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-full border border-white/10 bg-surface-soft">
            {portfolioCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={
                  'px-4 py-1.5 rounded-full text-sm font-semibold transition-all ' +
                  (active === c
                    ? 'bg-violet-gradient text-white shadow-glow'
                    : 'text-slate-600 dark:text-slate-300 hover:text-violetx-300')
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
        </motion.div>

        <div className="mt-12 flex justify-center gap-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={
                'h-9 w-9 grid place-items-center rounded-full text-sm font-semibold transition-all ' +
                (n === 1
                  ? 'bg-violet-gradient text-white shadow-glow'
                  : 'border border-white/10 text-slate-400 hover:text-white hover:border-violetx-500')
              }
            >
              {n}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
