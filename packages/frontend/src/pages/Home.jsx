import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import HeroVisual from '../components/HeroVisual.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import PricingCard from '../components/PricingCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import StatsBar from '../components/StatsBar.jsx';
import ProjectCarousel from '../components/ProjectCarousel.jsx';
import { stats, services, projects, pricing, process } from '../data/site.js';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
        <div className="max-w-app container-px grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="chip">We Build. You Grow.</span>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Modern Digital Solutions <br />
              For Growing <span className="text-gradient">Businesses</span>
            </h1>
            <p className="mt-5 max-w-xl text-slate-600 dark:text-slate-400">
              We build high-performance websites, web apps and digital systems
              that help local businesses grow, automate and scale to the next level.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">Book Free Consultation</Link>
              <Link to="/portfolio" className="btn-ghost">View Our Work</Link>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {['#22d3ee','#3b82f6','#2563eb','#1d4ed8','#60a5fa'].map((c, i) => (
                  <span key={i} className="h-8 w-8 rounded-full border-2 border-ink-950"
                    style={{ background: `linear-gradient(135deg, ${c}, ${c}99)` }} />
                ))}
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Trusted by 20+ businesses</p>
                <p className="flex items-center gap-1 text-xs font-semibold">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-yellow-400 stroke-yellow-400" />)}
                  <span className="ml-1">5.0 (20+ Reviews)</span>
                </p>
              </div>
            </div>
          </motion.div>

          <HeroVisual />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="max-w-app container-px">
        <StatsBar items={stats} />
      </section>

      {/* SERVICES — left title + right grid */}
      <section className="section-y max-w-app container-px">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="chip">What We Do</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Complete digital solutions to grow your business online.
            </p>
            <Link to="/services" className="mt-6 btn-outline">
              Explore All Services <ArrowRight size={16}/>
            </Link>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {services.map((s, i) => <ServiceCard key={s.title} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS — left title + right carousel */}
      <section className="section-y max-w-app container-px">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="chip">Our Work</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Some of the websites and systems we have built.
            </p>
            <Link to="/portfolio" className="mt-6 btn-outline">
              View All Projects <ArrowRight size={16}/>
            </Link>
          </div>

          <div className="lg:col-span-8 pb-14">
            <ProjectCarousel projects={projects} />
          </div>
        </div>
      </section>

      {/* PRICING — left title + right cards */}
      <section className="section-y max-w-app container-px">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <span className="chip">Pricing</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Simple &amp; <span className="text-gradient">Transparent</span> Pricing
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Packages designed for every business size.
            </p>
            <Link to="/pricing" className="mt-6 btn-outline">
              View All Plans <ArrowRight size={16}/>
            </Link>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-5">
            {pricing.map((p, i) => <PricingCard key={p.name} plan={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="section-y max-w-app container-px">
        <SectionHeading
          center
          eyebrow="Our Process"
          title={<>How We <span className="text-gradient">Work</span></>}
          subtitle="A simple, transparent process from idea to launch."
        />
        <div className="mt-14 relative grid grid-cols-2 lg:grid-cols-4 gap-y-10">
          {/* dashed connectors (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0 border-t-2 border-dashed border-violetx-500/30" />
          {process.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative text-center px-3"
            >
              <div className="relative mx-auto h-24 w-24 rounded-full bg-violet-gradient-soft border border-violetx-500/40 grid place-items-center text-violetx-300 shadow-glow">
                <Icon size={30} />
                <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-violet-gradient text-white text-xs font-bold grid place-items-center shadow-glow">
                  {i + 1}
                </span>
              </div>
              <h4 className="mt-4 font-display font-bold text-lg">{title}</h4>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-[12rem] mx-auto">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-y max-w-app container-px">
        <div className="relative panel overflow-hidden p-8 sm:p-12 text-center">
          <div className="absolute inset-0 -z-10 bg-violet-radial opacity-70" />
          <h3 className="font-display text-3xl sm:text-4xl font-bold">
            Ready to <span className="text-gradient">spark</span> your brand?
          </h3>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Tell us about your project — we'll come back with a plan in 24 hours.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link to="/contact" className="btn-primary">Start Your Project <ArrowRight size={16}/></Link>
            <Link to="/pricing" className="btn-ghost">See Pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
