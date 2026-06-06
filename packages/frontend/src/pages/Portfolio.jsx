import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';

export default function Portfolio() {
  return (
    <>
      <PageHero
        breadcrumb="Portfolio"
        title={<>Our <span className="text-gradient">Portfolio</span></>}
        subtitle="Concept work and sample builds to show our approach and design direction."
      />

      <section className="section-y max-w-app container-px">
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-card p-10 text-center">
          <p className="text-sm uppercase tracking-[0.22em] font-semibold text-violetx-500">Temporary hide</p>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">Portfolio is temporarily hidden</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We are updating this section with final content. For now, please explore our services or contact us to discuss your project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/services" className="btn-primary">Explore Services</Link>
            <Link to="/contact" className="btn-ghost">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
