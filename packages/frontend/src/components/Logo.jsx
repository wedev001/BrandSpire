import { motion } from 'framer-motion';
import logo from '../assets/logo.svg';

/**
 * Logo component.
 *  - variant="mark"     → cropped square showing just the icon (b + dotted ring).
 *                          Renders "brandspire" + tagline text next to it.
 *  - variant="full"     → renders the complete logo SVG (icon + brandspire + tagline).
 *                          Useful for hero / footer / 404 etc.
 */
export default function Logo({ size = 40, variant = 'mark', className = '' }) {
  if (variant === 'full') {
    return (
      <motion.img
        src={logo}
        alt="BrandSpire"
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
        style={{ height: size, width: 'auto' }}
        className={'block drop-shadow-[0_0_24px_rgba(168,85,247,0.35)] ' + className}
      />
    );
  }

  // Cropped icon — the source SVG is 1254×1254 with the icon centered around (627, 510).
  // Show roughly an 800px-wide window of the source.
  const zoom = 1254 / 800;            // ≈ 1.5675
  const imgSize = Math.round(size * zoom);
  const mx = Math.round(-(225 / 800) * size); // shift left
  const my = Math.round(-(210 / 800) * size); // shift up

  return (
    <div className={'flex items-center gap-2.5 ' + className}>
      <motion.div
        whileHover={{ rotate: 6, scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 280, damping: 14 }}
        className="overflow-hidden rounded-lg shrink-0 bg-[#000003] border border-white/10"
        style={{ width: size, height: size }}
      >
        <img
          src={logo}
          alt="BrandSpire logo"
          width={imgSize}
          height={imgSize}
          style={{ marginLeft: mx, marginTop: my, display: 'block', maxWidth: 'none' }}
        />
      </motion.div>
      <div className="flex flex-col leading-none">
        <span className="font-display font-bold text-lg tracking-tight">
          <span className="text-slate-900 dark:text-white">brand</span>
          <span className="text-gradient">spire</span>
        </span>
        <span className="hidden sm:block text-[9px] tracking-[0.28em] text-violetx-400/80 uppercase mt-1">
          Tech · Innovate · Inspire
        </span>
      </div>
    </div>
  );
}
