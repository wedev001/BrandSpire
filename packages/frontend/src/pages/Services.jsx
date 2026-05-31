import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { services, testimonials, whyUs } from '../data/site.js';

export default function Services() {
  return (
    <>
      <PageHero
        breadcrumb="Services"
        title={<>Our <span className="text-gradient">Services</span></>}
        subtitle="Everything you need to build, grow and scale your business online."
      />

      {/* 3x2 grid */}
      <section className="max-w-app container-px">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-y max-w-app container-px">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[5/4] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-violetx-500/15 to-violetx-700/10"
          >
            <div className="absolute inset-0 grid-bg opacity-50" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <div className="mx-auto h-24 w-24 rounded-2xl bg-violet-gradient grid place-items-center shadow-glow">
                  <Users size={40} className="text-white" />
                </div>
                <p className="mt-4 font-display text-lg font-bold">A team built to build for you.</p>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950 to-transparent" />
          </motion.div>

          <div>
            <span className="chip">Why Choose Us</span>
            <h3 className="mt-3 font-display text-3xl sm:text-4xl font-bold">
              We Build Solutions <br/> That Drive <span className="text-gradient">Real Results</span>
            </h3>
            <ul className="mt-6 space-y-3.5">
              {whyUs.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="icon-tile shrink-0">
                    <Icon size={16}/>
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">{text}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-7 btn-primary inline-flex">
              Let's Work Together <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-y max-w-app container-px">
        <SectionHeading center eyebrow="Testimonials" title={<>What Our <span className="text-gradient">Clients Say</span></>} />
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {testimonials.slice(0,3).map((t) => (
            <div key={t.name} className="card">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} size={14} className="fill-yellow-400 stroke-yellow-400" />
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">"{t.text}"</p>
              <p className="mt-4 text-sm font-semibold">— {t.name}, <span className="text-slate-500 font-normal">{t.role}</span></p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
