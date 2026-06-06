import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { services, whyUs, process, company } from '../data/site.js';

export default function Services() {
  return (
    <>
      <PageHero
        breadcrumb="Services"
        title={<>Our <span className="text-gradient">Services</span></>}
        subtitle="Everything you need to build, grow and scale your business online."
      />

      {/* Services grid */}
      <section className="max-w-app container-px">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
      </section>

      {/* Why Choose Us — interactive tiles with stats */}
      <section className="section-y max-w-app container-px">
        <SectionHeading
          center
          eyebrow="Why Choose Us"
          title={<>Built for <span className="text-gradient">results</span>, not just for show</>}
          subtitle="Four reasons teams keep coming back to BrandSpire."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyUs.map(({ icon: Icon, title, text, stat, statLabel, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/[0.08] dark:to-white/[0.02] hover:from-cyan-400/40 hover:to-blue-600/30 transition-colors duration-500"
            >
              <div className="relative h-full rounded-2xl bg-white dark:bg-surface-card p-6 overflow-hidden">
                <span className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent} opacity-15 blur-3xl group-hover:opacity-30 transition-opacity duration-500`} />

                {/* Big stat */}
                <p className={`font-display text-4xl font-extrabold leading-none bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>
                  {stat}
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-slate-500 dark:text-slate-400 mt-1.5">
                  {statLabel}
                </p>

                {/* Divider */}
                <div className="my-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />

                {/* Icon + title */}
                <div className="flex items-center gap-3">
                  <motion.span
                    whileHover={{ rotate: -6, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                    className={`h-10 w-10 rounded-xl bg-gradient-to-br ${accent} grid place-items-center text-white shadow-md shrink-0`}
                  >
                    <Icon size={17} strokeWidth={2.2} />
                  </motion.span>
                  <h4 className="font-display font-bold text-base leading-tight">{title}</h4>
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {text}
                </p>

                {/* Bottom gradient line on hover */}
                <span className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-full">
                  <span className={`block h-full bg-gradient-to-r ${accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Process — interactive horizontal timeline */}
      <section className="section-y max-w-app container-px">
        <SectionHeading
          center
          eyebrow="How We Work"
          title={<>From idea to <span className="text-gradient">launched</span> in 4 steps</>}
          subtitle="A simple, milestone-driven process — you always know what's next."
        />
        <div className="mt-14 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-violetx-500/40 to-transparent" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative text-center group"
              >
                <div className="relative mx-auto h-24 w-24">
                  {/* Gradient ring */}
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-600/20 group-hover:from-cyan-400 group-hover:to-blue-600 transition-colors duration-500" />
                  {/* Inner */}
                  <span className="absolute inset-[3px] rounded-full bg-white dark:bg-surface-card grid place-items-center text-violetx-600 dark:text-violetx-300 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors duration-300">
                    <Icon size={28} strokeWidth={2.2} />
                  </span>
                  {/* Number badge */}
                  <span className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-violet-gradient text-white text-sm font-bold grid place-items-center shadow-glow border-2 border-white dark:border-ink-950">
                    {i + 1}
                  </span>
                </div>
                <h4 className="mt-5 font-display font-bold text-lg">{title}</h4>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-[14rem] mx-auto leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA banner */}
      <section className="section-y max-w-app container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-violet-600/40"
        >
          <div className="relative rounded-3xl bg-white dark:bg-surface-card p-8 sm:p-12 overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute inset-0 -z-10 bg-violet-radial opacity-60" />
            <span className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-20 blur-3xl" />
            <span className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 opacity-20 blur-3xl" />

            <div className="relative grid lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <span className="chip"><Sparkles size={12} /> Ready When You Are</span>
                <h3 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                  Have a project in mind? <br />
                  <span className="text-gradient">Let's make it real.</span>
                </h3>
                <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-lg">
                  Tell us what you're building — we'll come back with a clear plan and a fixed quote within 24 hours.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary">
                    Start a Project <ArrowRight size={16} />
                  </Link>
                  <a
                    href={company.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Right-side mini stats */}
              <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                {[
                  { v: 'Ready', l: 'For launch' },
                  { v: '< 24h', l: 'Proposal turnaround' },
                  { v: '3', l: 'Team members' },
                  { v: 'Concept', l: 'First delivery' },
                ].map((s, i) => (
                  <motion.div
                    key={s.l}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-sm p-4"
                  >
                    <p className="font-display text-2xl font-extrabold text-gradient leading-none">{s.v}</p>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mt-2">
                      {s.l}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
