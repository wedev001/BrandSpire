import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo.jsx';
import { company } from '../data/site.js';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-slate-200 dark:border-white/10">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violetx-500/50 to-transparent" />
      <div className="max-w-app container-px py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-sm">
            BrandSpire builds modern digital solutions — websites, web apps, SaaS and automation — that help ambitious teams ship faster and grow further.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {[
              { icon: Instagram, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Facebook, href: '#' },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} aria-label="social"
                className="h-9 w-9 grid place-items-center rounded-full border border-slate-300 dark:border-white/15 hover:bg-violet-gradient hover:text-white hover:border-transparent transition-all">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {['Home','Services','Pricing','About','Contact'].map((l) => (
              <li key={l}>
                <Link
                  to={l === 'Home' ? '/' : `/${l.toLowerCase()}`}
                  className="hover:text-violetx-600 dark:hover:text-violetx-300 transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <Mail size={15} className="mt-0.5 text-violetx-500"/>
              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${company.email}`} target="_blank" rel="noopener noreferrer" className="hover:text-violetx-600 transition-colors">
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-2"><Phone size={15} className="mt-0.5 text-violetx-500"/> {company.phoneDisplay}</li>
            <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 text-violetx-500"/> India · Remote-first</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-white/10">
        <div className="max-w-app container-px py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <p>© {year} BrandSpire. All rights reserved.</p>
          <p>Crafted with intent · Tech · Innovate · Inspire</p>
        </div>
      </div>
    </footer>
  );
}
