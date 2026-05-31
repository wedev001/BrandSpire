import {
  Globe, LayoutDashboard, Wrench, Share2, Cpu, ServerCog,
  Sparkles, ShieldCheck, Clock, MessageSquare, Rocket, Cog, Code2, CheckCircle2,
} from 'lucide-react';

export const stats = [
  { value: 25, suffix: '+', label: 'Projects Completed',  icon: 'Users' },
  { value: 15, suffix: '+', label: 'Happy Clients',       icon: 'Smile' },
  { value: 3,  suffix: '+', label: 'Team Members',        icon: 'UserCog' },
  { value: 99, suffix: '%', label: 'Client Satisfaction', icon: 'Sparkles' },
];

export const services = [
  { icon: Globe,           title: 'Website Development',     desc: 'Modern, responsive, SEO-friendly websites that look great on every device.' },
  { icon: LayoutDashboard, title: 'Web Application Development', desc: 'Powerful web apps and custom dashboards tailored to how your team actually works.' },
  { icon: Wrench,          title: 'Maintenance & Support',   desc: 'Ongoing updates, monitoring and security so your product keeps running smoothly.' },
  { icon: Share2,          title: 'Social Media Management', desc: 'Strategic content and community management that turns followers into customers.' },
  { icon: Cpu,             title: 'SaaS & Automation Systems', desc: 'Custom SaaS products and automation tools that remove busywork from your day.' },
  { icon: ServerCog,       title: 'Hosting & Deployment',    desc: 'Fast, reliable hosting, domain setup and DevOps so launches are never the bottleneck.' },
];

export const whyUs = [
  { icon: Sparkles,    text: 'Modern technologies & best practices' },
  { icon: ShieldCheck, text: 'Scalable, secure & high performance' },
  { icon: MessageSquare, text: 'Transparent, honest communication' },
  { icon: Clock,       text: 'On-time delivery & long-term support' },
];

export const projects = [
  { title: 'Gym Website',          category: 'Website',    type: 'Web App',     img: 'gym',   color: 'from-cyan-400 to-blue-700' },
  { title: 'Cafe Website',         category: 'Website',    type: 'Web App',     img: 'cafe',  color: 'from-sky-400 to-blue-600' },
  { title: 'Coaching Dashboard',   category: 'Web App',    type: 'Dashboard',   img: 'coach', color: 'from-cyan-400 to-blue-600' },
  { title: 'E-Commerce Website',   category: 'E-Commerce', type: 'Website',     img: 'ecom',  color: 'from-blue-400 to-indigo-700' },
  { title: 'Real Estate Website',  category: 'Website',    type: 'Website',     img: 'real',  color: 'from-cyan-500 to-blue-800' },
  { title: 'School Management System', category: 'Web App', type: 'Web App',    img: 'sms',   color: 'from-sky-500 to-blue-700' },
];

export const portfolioCategories = ['All', 'Websites', 'Web Apps', 'Dashboards', 'E-Commerce'];

export const pricing = [
  {
    id: 'basic',
    name: 'Basic Website',
    tag: 'Package 01',
    blurb: 'Perfect for small businesses taking their first step online. Simple, clean, and mobile-friendly — everything you need to get started.',
    priceMin: 10000, priceMax: 15000, suffix: '',
    idealFor: ['Small gyms', 'Cafes & food spots', 'Salons & studios'],
    features: [
      'Responsive website (4–5 pages)',
      'Contact form for customer inquiries',
      'WhatsApp button for instant communication',
      'Fully mobile-friendly design',
    ],
    popular: false,
  },
  {
    id: 'standard',
    name: 'Standard Business',
    tag: 'Package 02 · Most Popular',
    blurb: 'Our most popular package. A modern, animated website that impresses visitors and drives real inquiries — designed to grow with your business.',
    priceMin: 15000, priceMax: 35000, suffix: '',
    idealFor: ['Growing brands', 'Service businesses', 'Local studios'],
    features: [
      'Everything in Basic',
      'Modern UI with smooth animations',
      'Photo gallery to showcase your work',
      'Advanced inquiry forms',
      'SEO basics to improve search visibility',
      'Enhanced analytics tracking',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium + Dashboard',
    tag: 'Package 03',
    blurb: 'For businesses ready to scale. A powerful, fully-featured website with a custom admin panel to manage bookings, members and analytics — all in one place.',
    priceMin: 50000, priceMax: 100000, suffix: '+',
    idealFor: ['Gyms with memberships', 'Coaching & academies', 'Multi-location'],
    features: [
      'Everything in Standard',
      'Custom admin panel',
      'Bookings & memberships',
      'Analytics dashboard',
      'User authentication',
      'Priority support',
    ],
    popular: false,
  },
];

export const addons = [
  { id: 'extra-pages',  label: '5 Extra Pages',           price: 4000 },
  { id: 'hosting',      label: 'Domain + Hosting (1yr)',  price: 3000 },
  { id: 'logo',         label: 'Custom Logo Design',      price: 5000 },
  { id: 'whatsapp-bot', label: 'WhatsApp Auto-Reply Bot', price: 6000 },
  { id: 'seo',          label: 'Advanced SEO Pack',       price: 8000 },
  { id: 'analytics',    label: 'Google Analytics Setup',  price: 2500 },
];

export const company = {
  phone: '8356937446',
  phoneDisplay: '+91 83569 37446',
  whatsapp: 'https://wa.me/918356937446',
  email: 'hello@brandspire.in',
};

export const process = [
  { icon: MessageSquare, title: 'Discuss',           desc: 'We understand your business & requirements.' },
  { icon: Rocket,        title: 'Plan & Design',     desc: 'We create modern design & a clear structure.' },
  { icon: Code2,         title: 'Develop',           desc: 'We build fast & scalable solutions.' },
  { icon: CheckCircle2,  title: 'Deploy & Support',  desc: 'We deploy and provide ongoing support.' },
];

export const testimonials = [
  { name: 'Rohit',  role: 'FitZone Gym',     text: 'Amazing work! Our gym website looks perfect and we get many new inquiries every week.', rating: 5 },
  { name: 'Priya',  role: 'Café Aroma',      text: 'Very professional and delivered on time. Highly recommended for any business.', rating: 5 },
  { name: 'Aman',   role: 'Coaching Hub',    text: 'Great communication and support. They genuinely understand our needs.', rating: 5 },
  { name: 'Neha',   role: 'BloomBoutique',   text: 'They turned our vague idea into a beautifully working product. 10/10.', rating: 5 },
];

export const team = [
  { name: 'You',                role: 'Founder',          dept: 'Product & DevOps' },
  { name: 'Frontend Engineer',  role: 'Frontend Lead',    dept: 'UI / UX Engineer' },
  { name: 'Backend Engineer',   role: 'Backend Lead',     dept: 'Backend Engineer' },
];
