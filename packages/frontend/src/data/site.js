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
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Modern, responsive, SEO-friendly websites that look great on every device.',
    accent: 'from-cyan-400 to-blue-600',
    bullets: ['Mobile-first design', 'Core Web Vitals tuned', 'On-page SEO'],
    tag: 'From ₹10K',
  },
  {
    icon: LayoutDashboard,
    title: 'Web Application Development',
    desc: 'Powerful web apps and custom dashboards tailored to how your team actually works.',
    accent: 'from-blue-500 to-indigo-600',
    bullets: ['Auth & roles', 'Custom dashboards', 'API integrations'],
    tag: 'Full-stack',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    desc: 'Ongoing updates, monitoring and security so your product keeps running smoothly.',
    accent: 'from-indigo-500 to-violet-600',
    bullets: ['Daily backups', '24/7 monitoring', 'Patch & updates'],
    tag: 'From ₹1.5K/mo',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    desc: 'Strategic content and community management that turns followers into customers.',
    accent: 'from-violet-500 to-fuchsia-600',
    bullets: ['Content calendar', 'Reels & posts', 'Community replies'],
    tag: 'Growth-focused',
  },
  {
    icon: Cpu,
    title: 'SaaS & Automation',
    desc: 'Custom SaaS products and automation tools that remove busywork from your day.',
    accent: 'from-sky-400 to-cyan-600',
    bullets: ['Workflow automation', 'Custom SaaS builds', 'No-code + code mix'],
    tag: 'Time-saving',
  },
  {
    icon: ServerCog,
    title: 'Hosting & Deployment',
    desc: 'Fast, reliable hosting, domain setup and DevOps so launches are never the bottleneck.',
    accent: 'from-emerald-400 to-teal-600',
    bullets: ['CI/CD pipelines', 'Global CDN', 'SSL & domain setup'],
    tag: 'DevOps-ready',
  },
];

export const whyUs = [
  {
    icon: Sparkles,
    title: 'Modern Stack',
    text: 'React, Next.js, Tailwind, Node — the same tools that power billion-dollar apps.',
    stat: '12+',
    statLabel: 'Tools mastered',
    accent: 'from-cyan-400 to-blue-600',
  },
  {
    icon: ShieldCheck,
    title: 'Built to Scale',
    text: 'Secure, performant and ready for your tenth-thousandth user, not just your first.',
    stat: '99.9%',
    statLabel: 'Uptime target',
    accent: 'from-blue-500 to-indigo-600',
  },
  {
    icon: MessageSquare,
    title: 'Real Conversations',
    text: 'WhatsApp updates, weekly demos, no jargon — you always know what we are building.',
    stat: '<2hr',
    statLabel: 'Avg. reply time',
    accent: 'from-indigo-500 to-violet-600',
  },
  {
    icon: Clock,
    title: 'On-Time, Always',
    text: 'Milestone-driven delivery with 30 days of free support after launch — guaranteed.',
    stat: '100%',
    statLabel: 'On-time ship rate',
    accent: 'from-emerald-400 to-teal-600',
  },
];

export const projects = [
  {
    title: 'Pulse Gym',
    category: 'Website',
    type: 'Web App',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format&fit=crop',
    color: 'from-cyan-400 to-blue-700',
    desc: 'Membership-driven fitness brand with class booking, trainer profiles and an integrated WhatsApp lead funnel.',
    stack: ['React', 'Tailwind', 'Node'],
    year: '2024',
  },
  {
    title: 'Brewline Cafe',
    category: 'Website',
    type: 'Web App',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80&auto=format&fit=crop',
    color: 'from-sky-400 to-blue-600',
    desc: 'Cozy menu-first cafe site with table reservations, daily specials and Instagram-style story highlights.',
    stack: ['Next.js', 'Tailwind', 'Sanity'],
    year: '2024',
  },
  {
    title: 'CoachOS',
    category: 'Web App',
    type: 'Dashboard',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop',
    color: 'from-cyan-400 to-blue-600',
    desc: 'All-in-one dashboard for coaching academies — batch scheduling, attendance, fee tracking and parent updates.',
    stack: ['React', 'TypeScript', 'Postgres'],
    year: '2025',
  },
  {
    title: 'Nova Mart',
    category: 'E-Commerce',
    type: 'Website',
    img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80&auto=format&fit=crop',
    color: 'from-blue-400 to-indigo-700',
    desc: 'Full-stack storefront with Razorpay checkout, inventory sync and a beautifully fast mobile experience.',
    stack: ['Next.js', 'Stripe', 'MongoDB'],
    year: '2025',
  },
  {
    title: 'Stellar Estates',
    category: 'Website',
    type: 'Website',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&auto=format&fit=crop',
    color: 'from-cyan-500 to-blue-800',
    desc: 'Luxury real-estate showcase with cinematic property tours, map search and high-intent lead capture.',
    stack: ['React', 'Mapbox', 'Framer Motion'],
    year: '2024',
  },
  {
    title: 'EduSphere SMS',
    category: 'Web App',
    type: 'Web App',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80&auto=format&fit=crop',
    color: 'from-sky-500 to-blue-700',
    desc: 'School management system covering admissions, timetabling, exams and parent communication in one portal.',
    stack: ['React', 'Node', 'Postgres'],
    year: '2025',
  },
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
  { name: 'Suraj',  role: 'FitZone Gym',     text: 'Amazing work! Our gym website looks perfect and we get many new inquiries every week.', rating: 5 },
  { name: 'Priya',  role: 'Café Aroma',      text: 'Very professional and delivered on time. Highly recommended for any business.', rating: 5 },
  { name: 'Aman',   role: 'Coaching Hub',    text: 'Great communication and support. They genuinely understand our needs.', rating: 5 },
  { name: 'Neha',   role: 'BloomBoutique',   text: 'They turned our vague idea into a beautifully working product. 10/10.', rating: 5 },
];

export const team = [
  {
    name: 'Arya More',
    role: 'Founder & CEO',
    dept: 'Product · Strategy · DevOps',
    bio: 'Started BrandSpire to help local businesses move at the speed of the internet. Drives product vision, client strategy and operations end-to-end.',
    accent: 'from-cyan-400 to-blue-600',
    skills: ['Product', 'Strategy', 'DevOps'],
  },
  {
    name: 'Suraj Singh',
    role: 'Frontend Lead',
    dept: 'UI · UX · Web Engineering',
    bio: 'Crafts the pixel-perfect, fast and accessible interfaces our clients ship — React, motion design, and design systems that scale.',
    accent: 'from-blue-500 to-indigo-600',
    skills: ['React', 'Tailwind', 'Motion'],
  },
  {
    name: 'Nilesh Dhole',
    role: 'Backend Lead',
    dept: 'APIs · Cloud · Architecture',
    bio: 'Builds the backbone — robust APIs, secure auth and cloud infrastructure that keep BrandSpire products fast and reliable at any scale.',
    accent: 'from-indigo-500 to-violet-600',
    skills: ['Node.js', 'Postgres', 'AWS'],
  },
  {
    name: 'Navin Idnani',
    role: 'Backend Engineer',
    dept: 'Data · Integrations · Automation',
    bio: 'Owns the data layer and third-party integrations — payments, analytics and automations that quietly do the heavy lifting behind every product.',
    accent: 'from-violet-500 to-fuchsia-600',
    skills: ['Python', 'SQL', 'Integrations'],
  },
];
