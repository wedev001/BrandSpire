import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion';

export default function AnimatedCounter({ to = 100, duration = 1.4, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (inView) {
      const controls = animate(value, to, { duration, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, to, duration, value]);

  return (
    <span ref={ref}>{display}{suffix}</span>
  );
}
