import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2,
  Calendar, Clock, ChevronDown, Sparkles, ArrowUpRight, ShieldCheck,
} from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Toast from '../components/Toast.jsx';
import { company } from '../data/site.js';
import { formatWhatsAppInquiryMessage, openWhatsApp } from '../lib/whatsapp.js';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email Us',
    value: company.email,
    sub: 'Reply within 4 hours',
    href: `mailto:${company.email}`,
    accent: 'from-cyan-400 to-blue-600',
    cta: 'Send an email',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us instantly',
    sub: 'Avg. reply in 15 mins',
    href: company.whatsapp,
    external: true,
    accent: 'from-emerald-400 to-teal-600',
    cta: 'Open WhatsApp',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: company.phoneDisplay,
    sub: 'Mon–Sat · 10am–7pm IST',
    href: `tel:+91${company.phone}`,
    accent: 'from-blue-500 to-indigo-600',
    cta: 'Place a call',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India · Remote-first',
    sub: 'Working with brands worldwide',
    accent: 'from-violet-500 to-fuchsia-600',
    cta: '',
  },
];

const projectTypes = ['Website', 'Web App', 'E-Commerce', 'Dashboard', 'SaaS', 'Other'];
const budgets = ['Under ₹25K', '₹25K – ₹75K', '₹75K – ₹2L', '₹2L+'];

const faqs = [
  { q: 'How quickly will I hear back after submitting?',
    a: 'You will hear back within 4 business hours during weekdays. For urgent requests, WhatsApp gets a reply within 15 minutes during working hours.' },
  { q: 'Do you sign NDAs before discussion?',
    a: 'Absolutely. Share your project context and we will send across a mutual NDA before any deeper conversation.' },
  { q: 'Can we start with a smaller scope first?',
    a: 'Yes — we can begin with a lean first milestone and expand the project later as your needs evolve.' },
];

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [projectType, setProjectType] = useState('Website');
  const [budget, setBudget] = useState(budgets[1]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [toast, setToast] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    if (!toast) return undefined;

    const timer = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timer);
  }, [toast]);
  
  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, projectType, budget }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || 'Could not send. Please try again.');
      }
      
      const whatsappMessage = formatWhatsAppInquiryMessage(form, projectType, budget);
      openWhatsApp(whatsappMessage);

      setStatus('sent');
      setToast({
        type: data.emailSent ? 'mail' : 'success',
        title: data.emailSent ? 'Email sent successfully' : 'Project inquiry received',
        message: data.emailSent
          ? `Your message has been sent to ${company.email}. We will reply shortly.`
          : 'Your inquiry is saved. WhatsApp is opening so you can confirm the details instantly.',
      });
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      const message = err?.message || 'Could not send. Please try again.';
      setErrorMsg(message);
      setToast({
        type: 'error',
        title: 'Message was not sent',
        message,
      });
      setTimeout(() => setStatus('idle'), 5000);
    }
  }

  return (
    <>
      <AnimatePresence>
        {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>

      <PageHero
        breadcrumb="Contact"
        title={<>Let's build something <span className="text-gradient">great</span> together</>}
        subtitle="Tell us about your project — we'll come back with a clear plan and a fixed quote within 24 hours."
      />

      {/* Contact methods — 4 interactive tiles */}
      <section className="max-w-app container-px">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactMethods.map((m, i) => {
            const Wrap = m.href ? 'a' : 'div';
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/[0.08] dark:to-white/[0.02] hover:from-cyan-400/40 hover:to-blue-600/30 transition-colors duration-500"
              >
                <Wrap
                  href={m.href}
                  target={m.external ? '_blank' : undefined}
                  rel={m.external ? 'noopener noreferrer' : undefined}
                  className="relative block h-full rounded-2xl bg-white dark:bg-surface-card p-5 overflow-hidden"
                >
                  <span className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${m.accent} opacity-15 blur-3xl group-hover:opacity-30 transition-opacity duration-500`} />

                  <div className="relative flex items-start justify-between gap-3">
                    <motion.span
                      whileHover={{ rotate: -8, scale: 1.06 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 16 }}
                      className={`h-11 w-11 rounded-xl bg-gradient-to-br ${m.accent} grid place-items-center text-white shadow-md`}
                    >
                      <m.icon size={18} strokeWidth={2.2} />
                    </motion.span>
                    {m.href && (
                      <span className={`h-7 w-7 grid place-items-center rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 group-hover:bg-gradient-to-br ${m.accent} group-hover:text-white group-hover:border-transparent group-hover:rotate-45 transition-all duration-300`}>
                        <ArrowUpRight size={13} />
                      </span>
                    )}
                  </div>

                  <p className="relative mt-4 text-[10px] uppercase tracking-[0.18em] font-bold text-slate-500 dark:text-slate-400">
                    {m.label}
                  </p>
                  <p className="relative mt-1 font-semibold text-slate-900 dark:text-white break-words">
                    {m.value}
                  </p>
                  <p className="relative mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {m.sub}
                  </p>

                  {/* Bottom gradient line on hover */}
                  <span className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-full">
                    <span className={`block h-full bg-gradient-to-r ${m.accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} />
                  </span>
                </Wrap>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Main grid — Form (left, 2 cols) + Info side (right, 1 col) */}
      <section className="section-y max-w-app container-px">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 relative rounded-3xl p-[1.5px] bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-violet-600/30"
          >
            <div className="relative rounded-3xl bg-white dark:bg-surface-card p-6 sm:p-8 overflow-hidden">
              <span className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-15 blur-3xl" />

              <div className="relative flex items-center gap-3">
                <span className="chip"><Sparkles size={12} /> Project Brief</span>
              </div>
              <h2 className="relative mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight">
                Tell us about your <span className="text-gradient">idea</span>
              </h2>
              <p className="relative mt-2 text-sm text-slate-600 dark:text-slate-400">
                The more context the better — we will reply with next steps within 4 business hours.
              </p>

              {/* Project type chips */}
              <div className="relative mt-7">
                <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-slate-500 dark:text-slate-400 mb-2.5">
                  Project Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((t) => {
                    const active = projectType === t;
                    return (
                      <motion.button
                        key={t}
                        type="button"
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setProjectType(t)}
                        className={
                          'px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all ' +
                          (active
                            ? 'border-transparent bg-violet-gradient text-white shadow-glow'
                            : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-violetx-500/50 hover:bg-violet-gradient-soft')
                        }
                      >
                        {t}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Budget chips */}
              <div className="relative mt-6">
                <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-slate-500 dark:text-slate-400 mb-2.5">
                  Estimated Budget
                </p>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => {
                    const active = budget === b;
                    return (
                      <motion.button
                        key={b}
                        type="button"
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setBudget(b)}
                        className={
                          'px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all ' +
                          (active
                            ? 'border-violetx-500 bg-violet-gradient-soft text-violetx-600 dark:text-violetx-300'
                            : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-violetx-500/50')
                        }
                      >
                        {b}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Fields */}
              <div className="relative mt-6 grid sm:grid-cols-2 gap-4">
                <Field label="Your Name" name="name" value={form.name} onChange={handleChange} required />
                <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="relative mt-4">
                <Field label="Phone (Optional)" name="phone" value={form.phone} onChange={handleChange} />
              </div>
              <div className="relative mt-4">
                <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-1.5">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="What do you want to build? Any references, deadlines, or constraints we should know?"
                  className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violetx-500 focus:ring-2 focus:ring-violetx-500/20 transition-all resize-none"
                />
              </div>

              <div className="relative mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  Your details are private. No spam, ever.
                </p>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ y: status === 'sending' ? 0 : -1 }}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                  className="btn-primary justify-center min-w-[200px] disabled:opacity-80"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {status === 'sending' ? (
                      <motion.span key="sending" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                        <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        Sending…
                      </motion.span>
                    ) : status === 'sent' ? (
                      <motion.span key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                        <CheckCircle2 size={16} /> Sent — check WhatsApp to confirm
                      </motion.span>
                    ) : status === 'error' ? (
                      <motion.span key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                        Retry <Send size={15} />
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                        Send Message <Send size={15} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
              {status === 'error' && errorMsg && (
                <p className="relative mt-3 text-sm text-rose-500">{errorMsg}</p>
              )}
            </div>
          </motion.form>

          {/* SIDE — Office hours + Quick Schedule */}
          <div className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-3xl p-[1px] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/[0.08] dark:to-white/[0.02]"
            >
              <div className="relative rounded-3xl bg-white dark:bg-surface-card p-6 overflow-hidden">
                <span className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-15 blur-3xl" />
                <span className="h-11 w-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-white shadow-md inline-flex">
                  <Clock size={18} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">Working Hours</h3>
                <ul className="mt-3 text-sm space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li className="flex items-center justify-between">
                    <span>Mon – Fri</span>
                    <span className="font-semibold">10:00 – 19:00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 – 14:00</span>
                  </li>
                  <li className="flex items-center justify-between text-slate-400">
                    <span>Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </li>
                </ul>
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Currently accepting projects
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative rounded-3xl p-[1px] bg-gradient-to-br from-blue-500/40 to-violet-600/30"
            >
              <div className="relative rounded-3xl bg-violet-gradient p-6 overflow-hidden text-white">
                <span className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-white opacity-10 blur-3xl" />
                <Calendar size={22} />
                <h3 className="mt-3 font-display text-lg font-bold leading-tight">Prefer a quick call?</h3>
                <p className="mt-1.5 text-sm text-white/85 leading-relaxed">
                  Book a free 20-min discovery call. No pressure, just clear next steps.
                </p>
                <a
                  href={company.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-violetx-700 font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle size={15} /> Book on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ — pre-contact reassurance */}
      <section className="section-y max-w-app container-px">
        <SectionHeading
          center
          eyebrow="Before You Ask"
          title={<>A few quick <span className="text-gradient">answers</span></>}
          subtitle="Common things people want to know before reaching out."
        />
        <div className="mt-10 max-w-3xl mx-auto space-y-3">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div
                key={f.q}
                className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-surface-card"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold">{f.q}</span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 h-7 w-7 grid place-items-center rounded-full border border-slate-200 dark:border-white/10 text-violetx-500"
                  >
                    <ChevronDown size={15} />
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
                      <p className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function Field({ label, name, value, onChange, type = 'text', required }) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={label}
        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violetx-500 focus:ring-2 focus:ring-violetx-500/20 transition-all"
      />
    </div>
  );
}
