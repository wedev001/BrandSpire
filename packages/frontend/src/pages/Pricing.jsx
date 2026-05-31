import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageCircle, Calendar, Sparkles, Plus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import PricingCard from '../components/PricingCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { pricing, addons, company } from '../data/site.js';

const fmt = (n) => '₹' + n.toLocaleString('en-IN');

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
        <div className="flex justify-center items-center gap-4">
          <span className={`text-sm font-medium ${billingFrequency === 'onetime' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
            One-Time Payment
          </span>
          <motion.button
            onClick={() => setBillingFrequency(billingFrequency === 'onetime' ? 'custom' : 'onetime')}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/20 transition-colors hover:bg-slate-300 dark:hover:bg-white/15"
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`absolute h-6 w-6 rounded-full bg-gradient-to-r from-violet-500 to-violetx-500 shadow-glow transition-all ${
                billingFrequency === 'custom' ? 'left-[26px]' : 'left-1'
              }`}
            />
          </motion.button>
          <span className={`text-sm font-medium ${billingFrequency === 'custom' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
            Custom Packages
          </span>
        </div>
      </section>

      {/* Pricing Cards — clickable for selection */}
      <section className="max-w-app container-px">
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
      </section>

      {/* Interactive Plan Builder */}
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

            <div className="mt-7 grid sm:grid-cols-2 gap-3">
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

      {/* Comparison Table */}
      <section className="section-y max-w-app container-px">
        <SectionHeading
          center
          eyebrow="Compare Packages"
          title={<>Side by <span className="text-gradient">Side</span></>}
          subtitle="A quick overview of what each tier includes."
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-surface-soft">
                <th className="text-left p-4 font-semibold text-slate-500 dark:text-slate-400">Feature</th>
                {pricing.map((p) => (
                  <th key={p.id} className="p-4 text-left">
                    <span className="font-display font-bold">{p.name}</span>
                    <span className="block text-xs font-normal text-violetx-600 dark:text-violetx-300 mt-0.5">
                      {fmt(p.priceMin)}–{fmt(p.priceMax)}{p.suffix}
                    </span>
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
                <tr key={feature} className={i % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-slate-50/60 dark:bg-white/[0.02]'}>
                  <td className="p-4 text-slate-700 dark:text-slate-300">{feature}</td>
                  {pricing.map((p) => {
                    // simple rules — basic gets first 2, standard adds 3-5, premium gets all
                    const tier = p.id === 'basic' ? 0 : p.id === 'standard' ? 1 : 2;
                    const featureTier = i <= 1 ? 0 : i <= 4 ? 1 : 2;
                    const included = tier >= featureTier;
                    return (
                      <td key={p.id} className="p-4">
                        {included ? (
                          <Check size={18} className="text-violetx-500" />
                        ) : (
                          <span className="text-slate-300 dark:text-white/15">—</span>
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
            <Link to="/contact" className="btn-ghost">Email Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
