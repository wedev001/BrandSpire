import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import StatsBar from '../components/StatsBar.jsx';
import { stats, team } from '../data/site.js';

export default function About() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        title={<>About <span className="text-gradient">BrandSpire</span></>}
        subtitle="We're a team of builders, problem-solvers and innovators passionate about helping businesses grow with technology."
      />

      {/* Mission / Vision / Values + Image */}
      <section className="max-w-app container-px grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-5 order-2 lg:order-1">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To empower local businesses with modern digital solutions and automation.' },
            { icon: Eye,    title: 'Our Vision',  desc: 'To become a leading digital solutions company that builds products people love.' },
            { icon: Heart,  title: 'Our Values',  desc: 'Transparency, quality, innovation and long-term relationships.' },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-4"
            >
              <span className="icon-tile shrink-0"><Icon size={20}/></span>
              <div>
                <h3 className="font-display text-lg font-bold">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-violetx-500/15 to-violetx-700/10 order-1 lg:order-2"
        >
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <div className="mx-auto h-24 w-24 rounded-2xl bg-violet-gradient grid place-items-center shadow-glow">
                <Users size={40} className="text-white" />
              </div>
              <p className="mt-4 font-display text-lg font-bold">A small team. A big mission.</p>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950 to-transparent" />
        </motion.div>
      </section>

      {/* Stats */}
      <section className="section-y max-w-app container-px">
        <StatsBar items={stats} />
      </section>

      {/* Team */}
      <section className="section-y max-w-app container-px">
        <SectionHeading center eyebrow="Our Team" title={<>Meet Our <span className="text-gradient">Team</span></>} subtitle="The people behind BrandSpire." />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.06 }}
              className="card card-hover text-center"
            >
              <div className="mx-auto h-24 w-24 rounded-full bg-violet-gradient grid place-items-center text-white text-3xl font-bold font-display shadow-glow">
                {m.name.charAt(0)}
              </div>
              <h4 className="mt-4 font-display font-bold text-lg">{m.name}</h4>
              <p className="text-sm text-violetx-300 font-semibold">{m.role}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{m.dept}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
