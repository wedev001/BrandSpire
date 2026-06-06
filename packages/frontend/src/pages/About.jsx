import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target, Eye, Heart, Sparkles, ArrowRight, MessageCircle, Quote,
  Code2, Layers, Database, Cloud, Rocket, Flag, Users, Globe,
} from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import StatsBar from '../components/StatsBar.jsx';
import { stats, team, company } from '../data/site.js';

const pillars = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'Empower local businesses with modern, world-class digital products — without the agency bloat or jargon.',
    accent: 'from-cyan-400 to-blue-600',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    desc: 'Be the go-to studio for founders who want enterprise-grade craft at startup speed.',
    accent: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Heart,
    title: 'Our Values',
    desc: 'Transparency, craftsmanship, on-time delivery and partnerships that outlast a single project.',
    accent: 'from-violet-500 to-fuchsia-600',
  },
];

const milestones = [
  { year: '2026', title: 'BrandSpire founded', desc: 'Arya More starts BrandSpire in Maharashtra with a focus on local businesses.', icon: Flag },
  { year: '2026', title: 'First 10 clients', desc: 'Shipped websites for gyms, cafes and coaching academies across the state.', icon: Users },
  { year: '2027', title: 'Web app capability', desc: 'Expanded into custom dashboards, SaaS builds and full-stack web applications.', icon: Rocket },
  { year: '2027', title: 'Going global', desc: 'Onboarded our first clients outside India — remote-first, async-friendly.', icon: Globe },
];

const stack = [
  { name: 'React',     icon: Code2,    accent: 'from-cyan-400 to-blue-600' },
  { name: 'Next.js',   icon: Layers,   accent: 'from-slate-500 to-slate-800' },
  { name: 'Tailwind',  icon: Sparkles, accent: 'from-sky-400 to-cyan-600' },
  { name: 'Node.js',   icon: Code2,    accent: 'from-emerald-400 to-teal-600' },
  { name: 'Postgres',  icon: Database, accent: 'from-blue-500 to-indigo-600' },
  { name: 'AWS',       icon: Cloud,    accent: 'from-amber-400 to-orange-600' },
];

export default function About() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        title={<>About <span className="text-gradient">BrandSpire</span></>}
        subtitle="A small studio with a senior bar — building modern websites, apps and SaaS for ambitious businesses."
      />

      {/* Story / Founder quote */}
      <section className="max-w-app container-px">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <span className="chip"><Sparkles size={12} /> Our Story</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Started by a builder, <br className="hidden sm:block" />
              <span className="text-gradient">for builders.</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              BrandSpire began in 2026 when <strong className="text-slate-900 dark:text-white">Arya More</strong> noticed
              how many local businesses were stuck with cookie-cutter templates or overpriced agencies. He wanted to
              build a studio that paired senior engineering with the warmth of a small team — one that could ship a
              modern, fast, beautiful website at startup-friendly prices.
            </p>
            <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
              Today we are a tight crew of engineers, designers and operators shipping production-grade work for
              gyms, cafes, coaching academies, e-commerce brands and SaaS founders — across India and beyond.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Work With Us <ArrowRight size={16} />
              </Link>
              <Link to="/portfolio" className="btn-ghost">See Our Work</Link>
            </div>
          </motion.div>

          {/* Founder quote card */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 relative rounded-3xl p-[1.5px] bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-violet-600/30"
          >
            <div className="relative rounded-3xl bg-white dark:bg-surface-card p-7 overflow-hidden">
              <span className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-15 blur-3xl" />
              <Quote size={26} className="text-violetx-500" />
              <p className="mt-4 font-display text-lg leading-snug text-slate-800 dark:text-slate-100">
                "I wanted to build the studio I always wished my clients could hire — fast, honest, senior, and obsessed with the details."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-white font-bold font-display shadow-md">
                  AM
                </span>
                <div>
                  <p className="font-semibold text-sm">Arya More</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Founder & CEO · BrandSpire</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values — interactive tiles */}
      <section className="section-y max-w-app container-px">
        <SectionHeading
          center
          eyebrow="What We Stand For"
          title={<>The <span className="text-gradient">principles</span> behind every project</>}
          subtitle="Three pillars that shape how we work, what we ship and who we ship with."
        />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {pillars.map(({ icon: Icon, title, desc, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/[0.08] dark:to-white/[0.02] hover:from-cyan-400/40 hover:to-blue-600/30 transition-colors duration-500"
            >
              <div className="relative h-full rounded-2xl bg-white dark:bg-surface-card p-7 overflow-hidden">
                <span className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${accent} opacity-15 blur-3xl group-hover:opacity-30 transition-opacity duration-500`} />

                <motion.span
                  whileHover={{ rotate: -8, scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                  className={`relative inline-flex h-12 w-12 rounded-2xl bg-gradient-to-br ${accent} grid place-items-center text-white shadow-md`}
                >
                  <Icon size={20} strokeWidth={2.2} />
                </motion.span>

                <h3 className="relative mt-5 font-display font-bold text-xl">{title}</h3>
                <p className="relative mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {desc}
                </p>

                {/* Bottom animated line */}
                <span className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-full">
                  <span className={`block h-full bg-gradient-to-r ${accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="section-y max-w-app container-px">
        <StatsBar items={stats} />
      </section>

      {/* Timeline — Our Journey */}
      <section className="section-y max-w-app container-px">
        <SectionHeading
          center
          eyebrow="Our Journey"
          title={<>From idea to <span className="text-gradient">today</span></>}
          subtitle="The chapters that shaped BrandSpire."
        />
        <div className="mt-14 relative">
          {/* Vertical gradient line (mobile) / horizontal (desktop) */}
          <div className="absolute lg:hidden left-7 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-blue-500/40 to-violet-500/40" />
          <div className="hidden lg:block absolute top-9 left-[8%] right-[8%] h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-violetx-500/30 to-transparent" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-5">
            {milestones.map(({ year, title, desc, icon: Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative lg:text-center pl-16 lg:pl-0"
              >
                <div className="absolute left-0 top-0 lg:static lg:mx-auto h-14 w-14 lg:h-[72px] lg:w-[72px] rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-white shadow-glow border-4 border-white dark:border-ink-950">
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <p className={`mt-0 lg:mt-4 text-[11px] font-bold uppercase tracking-[0.18em] bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent`}>
                  {year}
                </p>
                <h4 className="mt-1 font-display font-bold text-lg">{title}</h4>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed lg:max-w-[14rem] lg:mx-auto">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-y max-w-app container-px">
        <SectionHeading
          center
          eyebrow="Tech Stack"
          title={<>The tools we <span className="text-gradient">build with</span></>}
          subtitle="Battle-tested technologies we pick on purpose — modern, fast, and well-supported."
        />
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {stack.map(({ name, icon: Icon, accent }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-xl p-[1px] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/[0.08] dark:to-white/[0.02] hover:from-cyan-400/40 hover:to-blue-600/30 transition-colors duration-500"
            >
              <div className="relative h-full rounded-xl bg-white dark:bg-surface-card p-4 flex items-center gap-3 overflow-hidden">
                <span className={`pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full bg-gradient-to-br ${accent} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-500`} />
                <span className={`h-9 w-9 rounded-lg bg-gradient-to-br ${accent} grid place-items-center text-white shadow-sm`}>
                  <Icon size={16} strokeWidth={2.2} />
                </span>
                <span className="font-semibold text-sm">{name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section-y max-w-app container-px">
        <SectionHeading
          center
          eyebrow="Our Team"
          title={<>Meet Our <span className="text-gradient">Team</span></>}
          subtitle="A small, senior crew that ships — founded by Arya More, with engineers who've built for startups and enterprises alike."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((m, i) => {
            const initials = m.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/[0.08] dark:to-white/[0.02] hover:from-cyan-400/40 hover:to-blue-600/30 transition-colors duration-500"
              >
                <div className="relative h-full rounded-2xl bg-white dark:bg-surface-card p-6 overflow-hidden">
                  <div className={`absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${m.accent} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`} />

                  <div className="relative inline-flex">
                    <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${m.accent} grid place-items-center text-white text-2xl font-bold font-display shadow-lg`}>
                      {initials}
                    </div>
                    {i === 0 && (
                      <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-400 text-amber-950 shadow-md">
                        Founder
                      </span>
                    )}
                  </div>

                  <h4 className="mt-5 font-display font-bold text-lg leading-tight">{m.name}</h4>
                  <p className={`text-sm font-semibold mt-0.5 bg-gradient-to-r ${m.accent} bg-clip-text text-transparent`}>
                    {m.role}
                  </p>
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                    {m.dept}
                  </p>
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {m.bio}
                  </p>
                  {m.skills && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {m.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-white/[0.03]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-y max-w-app container-px">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-violet-600/40"
        >
          <div className="relative rounded-3xl bg-white dark:bg-surface-card p-8 sm:p-12 overflow-hidden text-center">
            <div className="absolute inset-0 -z-10 bg-violet-radial opacity-60" />
            <span className="pointer-events-none absolute -top-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-20 blur-3xl" />
            <span className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 opacity-20 blur-3xl" />

            <span className="chip mx-auto"><Sparkles size={12} /> Let's Build</span>
            <h3 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight max-w-2xl mx-auto">
              Like how we think? <span className="text-gradient">Let's make something together.</span>
            </h3>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Tell us about your project — we will come back with a clear plan and a fixed quote within 24 hours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
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
        </motion.div>
      </section>
    </>
  );
}
