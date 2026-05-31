import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <section className="pt-32 pb-24 max-w-app container-px text-center">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="font-display text-7xl sm:text-9xl font-bold text-gradient"
      >
        404
      </motion.h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-primary mt-6 inline-flex">Back home</Link>
    </section>
  );
}
