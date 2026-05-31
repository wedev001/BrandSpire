import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submission:', form);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', message: '' });
  }

  return (
    <>
      <PageHero
        breadcrumb="Contact"
        title={<>Let's Build Something <span className="text-gradient">Great</span> Together</>}
        subtitle="Have a project in mind? Let's discuss and turn your ideas into reality."
      />

      <section className="max-w-app container-px grid lg:grid-cols-3 gap-6">
        {/* Get In Touch card */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card lg:col-span-1"
        >
          <h3 className="font-display text-2xl font-bold">Get In Touch</h3>
          <ul className="mt-6 space-y-5">
            {[
              { icon: Mail,        label: 'Email',    value: 'hello@brandspire.in' },
              { icon: Phone,       label: 'Phone',    value: '+91 88765 43210' },
              { icon: MapPin,      label: 'Location', value: 'India · Remote-first' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us' },
            ].map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-start gap-4">
                <span className="icon-tile shrink-0"><Icon size={18}/></span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs text-slate-500 dark:text-slate-400">
            We're available<br/>Mon – Sat (10 AM – 7 PM IST).
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card lg:col-span-1 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your Name"     name="name"  value={form.name}  onChange={handleChange} required />
            <Field label="Email Address" name="email" value={form.email} onChange={handleChange} type="email" required />
          </div>
          <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Your Message</label>
            <textarea
              name="message" value={form.message} onChange={handleChange} required rows={5}
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violetx-500 transition-colors"
              placeholder="Tell us about your project..." />
          </div>
          <button type="submit" className="btn-primary w-full justify-center">
            {sent ? <><CheckCircle2 size={16}/> Sent! We'll be in touch.</> : <>Send Message <Send size={16}/></>}
          </button>
        </motion.form>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card lg:col-span-1 p-0 overflow-hidden flex flex-col"
        >
          <div className="relative flex-1 min-h-[260px] bg-gradient-to-br from-violetx-500/15 to-violetx-700/10 grid-bg">
            <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 300" preserveAspectRatio="none">
              <path d="M0 200 Q 100 150 200 180 T 400 160" stroke="#3b82f6" strokeWidth="1.5" fill="none"/>
              <path d="M0 100 Q 80 120 160 90 T 320 110 L 400 80" stroke="#3b82f6" strokeWidth="1" fill="none" opacity=".6"/>
              <path d="M120 0 L 130 300" stroke="#3b82f6" strokeWidth="1" opacity=".4"/>
              <path d="M270 0 L 260 300" stroke="#3b82f6" strokeWidth="1" opacity=".4"/>
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="mx-auto h-14 w-14 rounded-full bg-violet-gradient grid place-items-center shadow-glow"
              >
                <MapPin className="text-white" size={26}/>
              </motion.div>
              <p className="mt-3 text-sm font-semibold">BrandSpire HQ</p>
              <p className="text-xs text-slate-400">Remote-first · India</p>
            </div>
          </div>
          <div className="p-5 border-t border-white/10">
            <p className="font-display font-semibold">We are available</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Mon – Sat (10 AM – 7 PM IST)</p>
          </div>
        </motion.div>
      </section>
    </>
  );
}

function Field({ label, name, value, onChange, type = 'text', required }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange} required={required}
        className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-violetx-500 transition-colors"
        placeholder={label}
      />
    </div>
  );
}
