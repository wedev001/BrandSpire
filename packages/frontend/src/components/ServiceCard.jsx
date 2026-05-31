import { motion } from 'framer-motion';

export default function ServiceCard({ icon: Icon, title, desc, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="card card-hover relative overflow-hidden group"
    >
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-violet-gradient opacity-0 group-hover:opacity-20 blur-3xl transition-opacity" />
      <div className="icon-tile">
        <Icon size={20} />
      </div>
      <h3 className="mt-4 font-semibold text-lg">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
