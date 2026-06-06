import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle, Calendar, Sparkles, ChevronDown, ShieldCheck, Code2, Clock, Award, Zap, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import PricingCard from '../components/PricingCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { pricing, addons, company } from '../data/site.js';

const fmt = (n) => {
  if (n >= 1000) {
    const k = n / 1000;
    return '₹' + (k % 1 === 0 ? k : k.toFixed(1)) + 'K';
  }
  return '₹' + n.toLocaleString('en-IN');
};

const guarantees = [
  { icon: ShieldCheck, label: '30-day support', sub: 'Free after launch' },
  { icon: Code2,       label: 'Source code',    sub: 'Full ownership' },
  { icon: Clock,       label: 'On-time ship',   sub: 'Milestone-driven' },
  { icon: Award,       label: 'No lock-in',     sub: 'Move freely' },
];

const presets = [
  { id: 'launch',  label: 'Launch Bundle',  addons: ['hosting', 'logo', 'analytics'],  hint: 'Get online in days' },
  { id: 'growth',  label: 'Growth Bundle',  addons: ['seo', 'analytics', 'whatsapp-bot'], hint: 'Built to convert' },
  { id: 'scale',   label: 'Scale Bundle',   addons: ['extra-pages', 'seo', 'hosting', 'whatsapp-bot'], hint: 'Go all-in' },
];

const faqs = [
  { q: 'How long does it take to build my website?',
    a: 'Basic packages ship in 5–7 days, Standard in 10–14 days, and Premium with dashboard in 3–5 weeks depending on scope. We share a clear milestone plan upfront.' },
  { q: 'What is included in "GST extra"?',
    a: 'All listed prices are pre-tax. 18% GST is added on the final invoice, with proper tax invoice for your records.' },
  { q: 'Do you offer maintenance after launch?',
    a: 'Yes — every package includes 30 days of free post-launch support. After that, monthly maintenance plans start at ₹1,500/month covering updates, backups and security.' },
  { q: 'Will I own the website code?',
    a: 'Absolutely. Full source code, design files and hosting credentials are handed over to you on completion. No vendor lock-in.' },
  { q: 'Can I upgrade my plan later?',
    a: 'Yes. You can always upgrade from Basic → Standard or Standard → Premium. We credit your earlier investment toward the new package.' },
];

export default function Pricing() {
  const [selectedId, setSelectedId] = useState('standard');
  const [selectedAddons, setSelectedAddons] = useState(new Set());
  const [openFaq, setOpenFaq] = useState(0);
  const [billingFrequency, setBillingFrequency] = useState('onetime');

  const selectedPlan = useMemo(
    () => pricing.find((p) => p.id === selectedId) || pricing[1],
    [selectedId]
  );

  const addonsList = [...selectedAddons].map((id) => addons.find((a) => a.id === id)).filter(Boolean);
  const addonsTotal = addonsList.reduce((sum, a) => sum + a.price, 0);
  const totalMin = selectedPlan.priceMin + addonsTotal;
  const totalMax = selectedPlan.priceMax + addonsTotal;

  const toggleAddon = (id) =>
    setSelectedAddons((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <>
      <PageHero
        breadcrumb="Pricing"
        title={<>Choose Your <span className="text-gradient">Package</span></>}
        subtitle="Transparent, fair pricing. Pick a tier, customise it with add-ons, and see your total live."
      />

      {/* Billing Frequency Toggle */}
      <section className="max-w-app container-px py-8">
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="Billing type"
            className="relative inline-flex p-1 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 shadow-sm"
          >
            {[
              { id: 'onetime', label: 'One-Time Payment' },
              { id: 'custom', label: 'Custom Packages' },
            ].map((opt) => {
              const active = billingFrequency === opt.id;
              return (
                <button
                  key={opt.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setBillingFrequency(opt.id)}
                  className={
                    'relative z-10 px-5 sm:px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ' +
                    (active
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white')
                  }
                >
                  {active && (
                    <motion.span
                      layoutId="billingToggleActive"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 -z-10 rounded-full bg-violet-gradient shadow-glow"
                    />
                  )}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust strip — universal guarantees */}
      <section className="max-w-app container-px pb-4">
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200 dark:divide-white/[0.06]">
            {guarantees.map(({ icon: Icon, label, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-4 sm:p-5"
              >
                <span className="h-10 w-10 rounded-xl grid place-items-center bg-violet-gradient-soft border border-violetx-500/30 text-violetx-600 dark:text-violetx-300 shrink-0">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{label}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards — clickable for selection */}
      <AnimatePresence mode="wait">
        {billingFrequency === 'onetime' ? (
          <motion.section
            key="onetime"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-app container-px"
          >
            <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-6">
              Click a package to customise it below
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {pricing.map((plan, i) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  index={i}
                  selected={selectedId === plan.id}
                  dimmed={selectedId !== plan.id}
                  onSelect={() => setSelectedId(plan.id)}
                />
              ))}
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="custom"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-app container-px"
          >
            <div className="relative panel overflow-hidden p-8 sm:p-12 text-center">
              <div className="absolute inset-0 -z-10 bg-violet-radial opacity-60" />
              <span className="chip mx-auto"><Sparkles size={12}/> Custom Packages</span>
              <h3 className="mt-4 font-display text-3xl sm:text-4xl font-bold tracking-tight">
                Built around <span className="text-gradient">your goals</span>
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Need something beyond our standard tiers? Bespoke web apps, advanced dashboards,
                integrations or ongoing retainers — we'll scope it together and send a fixed quote.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <MessageCircle size={16}/> Discuss on WhatsApp
                </a>
                <Link to="/contact" className="btn-ghost">
                  <Calendar size={16}/> Book a Free Call
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Interactive Plan Builder */}
      {billingFrequency === 'onetime' && (
      <section className="section-y max-w-app container-px">
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-3">
            <span className="chip"><Sparkles size={12}/> Build Your Plan</span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Customise{' '}
              <AnimatePresence mode="wait">
                <motion.span
                  key={selectedPlan.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-gradient inline-block"
                >
                  {selectedPlan.name}
                </motion.span>
              </AnimatePresence>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl">
              Add the optional services you need. The total on the right updates in real time.
            </p>

            {/* Quick preset bundles */}
            <div className="mt-5">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-2">
                <Zap size={12} className="text-violetx-500" /> Quick Presets
                {selectedAddons.size > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedAddons(new Set())}
                    className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-violetx-500 transition-colors normal-case tracking-normal"
                  >
                    <X size={11} /> Clear all
                  </button>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => {
                  const matches = p.addons.every((a) => selectedAddons.has(a)) && selectedAddons.size === p.addons.length;
                  return (
                    <motion.button
                      key={p.id}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedAddons(new Set(p.addons))}
                      className={
                        'group inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-semibold transition-all ' +
                        (matches
                          ? 'border-transparent bg-violet-gradient text-white shadow-glow'
                          : 'border-slate-200 dark:border-white/10 hover:border-violetx-500/50 hover:bg-violet-gradient-soft')
                      }
                    >
                      <Sparkles size={13} className={matches ? 'text-white' : 'text-violetx-500'} />
                      {p.label}
                      <span className={'text-[10px] font-medium opacity-70 ' + (matches ? 'text-white/80' : 'text-slate-500 dark:text-slate-400')}>
                        · {p.hint}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {addons.map((a, i) => {
                const active = selectedAddons.has(a.id);
                return (
                  <motion.button
                    key={a.id}
                    type="button"
                    onClick={() => toggleAddon(a.id)}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: i * 0.04 }}
                    whileTap={{ scale: 0.98 }}
                    className={
                      'flex items-center justify-between gap-3 p-4 rounded-xl border text-left transition-all ' +
                      (active
                        ? 'border-violetx-500/60 bg-violet-gradient-soft shadow-glow'
                        : 'border-slate-200 dark:border-white/10 hover:border-violetx-500/40')
                    }
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={
                          'h-6 w-6 rounded-md grid place-items-center shrink-0 transition-all ' +
                          (active ? 'bg-violet-gradient' : 'border border-slate-300 dark:border-white/20')
                        }
                      >
                        {active && <Check size={14} className="text-white" />}
                      </span>
                      <span className="text-sm font-semibold truncate">{a.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-violetx-600 dark:text-violetx-300 shrink-0">
                      +{fmt(a.price)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Summary card */}
          <div className="lg:col-span-2">
            <div className="card lg:sticky lg:top-24 p-0 overflow-hidden">
              <div className="bg-violet-gradient p-5 text-white">
                <p className="text-xs uppercase tracking-wider opacity-80">Your Selection</p>
                <p className="font-display text-2xl font-bold mt-1">{selectedPlan.name}</p>
                <p className="text-xs opacity-80 mt-0.5">{selectedPlan.tag}</p>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Base package</span>
                  <span className="text-sm font-semibold">
                    {fmt(selectedPlan.priceMin)} – {fmt(selectedPlan.priceMax)}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {addonsList.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-slate-200 dark:border-white/10">
                        <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                          Add-ons ({addonsList.length})
                        </p>
                        <ul className="space-y-1.5">
                          {addonsList.map((a) => (
                            <motion.li
                              key={a.id}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -8 }}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-slate-700 dark:text-slate-300 truncate pr-2">{a.label}</span>
                              <span className="text-violetx-600 dark:text-violetx-300 shrink-0">+{fmt(a.price)}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Estimated total</span>
                    <motion.span
                      key={totalMin + '-' + totalMax}
                      initial={{ scale: 1.08, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="font-display text-2xl font-bold text-gradient"
                    >
                      {fmt(totalMin)} – {fmt(totalMax)}
                    </motion.span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">GST extra · One-time</p>
                </div>

                <a
                  href={company.whatsapp}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-full justify-center"
                >
                  <MessageCircle size={16}/> WhatsApp Us
                </a>
                <Link to="/contact" className="btn-ghost w-full justify-center">
                  <Calendar size={16}/> Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Comparison Table */}
      <section className="section-y max-w-app container-px">
        <SectionHeading
          center
          eyebrow="Compare Packages"
          title={<>Side by <span className="text-gradient">Side</span></>}
          subtitle="A quick overview of what each tier includes."
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-card">
          <table className="w-full text-sm min-w-[680px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-surface-soft border-b border-slate-200 dark:border-white/10">
                <th className="text-left p-5 font-semibold text-slate-500 dark:text-slate-400 uppercase text-xs tracking-wider">
                  Feature
                </th>
                {pricing.map((p) => (
                  <th
                    key={p.id}
                    className={
                      'p-5 text-left align-top relative ' +
                      (p.popular ? 'bg-violet-gradient-soft' : '')
                    }
                  >
                    {p.popular && (
                      <span className="absolute top-2 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-violet-gradient text-white shadow-glow">
                        <Star size={9} className="fill-white" /> Most Popular
                      </span>
                    )}
                    <span className="font-display font-bold text-base">{p.name}</span>
                    <span className="block text-xs font-semibold text-violetx-600 dark:text-violetx-300 mt-1">
                      {fmt(p.priceMin)}–{fmt(p.priceMax)}{p.suffix}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedId(p.id)}
                      className={
                        'mt-3 text-[11px] font-semibold inline-flex items-center gap-1 transition-colors ' +
                        (selectedId === p.id
                          ? 'text-violetx-600 dark:text-violetx-300'
                          : 'text-slate-500 dark:text-slate-400 hover:text-violetx-600')
                      }
                    >
                      {selectedId === p.id ? <><Check size={12} /> Selected</> : 'Select this plan →'}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                'Responsive mobile-first design',
                'Contact form + WhatsApp button',
                'Photo gallery showcase',
                'Modern animations + advanced UI',
                'Basic SEO optimization',
                'Custom admin panel',
                'Bookings & memberships',
                'Analytics dashboard',
                'Priority support',
              ].map((feature, i) => (
                <tr
                  key={feature}
                  className="border-b border-slate-100 dark:border-white/[0.04] last:border-0 hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors group/row"
                >
                  <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{feature}</td>
                  {pricing.map((p) => {
                    const tier = p.id === 'basic' ? 0 : p.id === 'standard' ? 1 : 2;
                    const featureTier = i <= 1 ? 0 : i <= 4 ? 1 : 2;
                    const included = tier >= featureTier;
                    return (
                      <td
                        key={p.id}
                        className={
                          'p-4 ' +
                          (p.popular ? 'bg-violet-gradient-soft/40 dark:bg-violet-gradient-soft/30' : '')
                        }
                      >
                        {included ? (
                          <span className="inline-flex h-7 w-7 rounded-full bg-violetx-500/15 border border-violetx-500/30 items-center justify-center group-hover/row:bg-violetx-500/25 transition-colors">
                            <Check size={14} className="text-violetx-600 dark:text-violetx-300" strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="inline-flex h-7 w-7 rounded-full bg-slate-100 dark:bg-white/[0.04] items-center justify-center">
                            <X size={14} className="text-slate-300 dark:text-white/20" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-y max-w-app container-px">
        <SectionHeading
          center
          eyebrow="Questions"
          title={<>Frequently <span className="text-gradient">Asked</span></>}
        />
        <div className="mt-10 max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-surface-card">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-violetx-500"
                  >
                    <ChevronDown size={18}/>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom CTA */}
      <section className="section-y max-w-app container-px">
        <div className="relative panel overflow-hidden p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="absolute inset-0 -z-10 bg-violet-radial opacity-50"/>
          <div>
            <h4 className="font-display text-2xl font-bold">Need something custom?</h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
              Got a different idea or a bigger ambition? Tell us about it — we shape custom solutions every week.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle size={16}/> WhatsApp
            </a>
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${company.email}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">Email Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
