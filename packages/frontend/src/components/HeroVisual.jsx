import { motion } from 'framer-motion';

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full aspect-square max-w-[560px] xl:max-w-[600px] mx-auto"
    >
      {/* Outer glow */}
      <div className="absolute inset-0 -z-10 bg-violet-radial blur-xl" />

      {/* Swirling blue rings */}
      <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full -z-0">
        <defs>
          <linearGradient id="vringA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee"/>
            <stop offset="100%" stopColor="#1d4ed8"/>
          </linearGradient>
          <linearGradient id="vringB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity=".9"/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%' }}
        >
          <ellipse cx="300" cy="300" rx="270" ry="200" stroke="url(#vringA)" strokeWidth="2" fill="none" opacity=".55"/>
        </motion.g>
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%' }}
        >
          <ellipse cx="300" cy="300" rx="220" ry="160" stroke="url(#vringB)" strokeWidth="1.6" fill="none" opacity=".7" strokeDasharray="4 8"/>
        </motion.g>
        {/* floating dots */}
        {[
          [80,300,4],[520,300,4],[300,80,3],[300,520,3],
          [120,180,2],[480,180,2],[120,420,2],[480,420,2],
          [200,120,2],[400,120,2],[200,480,2],[400,480,2],
        ].map(([cx,cy,r], i) => (
          <motion.circle
            key={i} cx={cx} cy={cy} r={r} fill="#3b82f6"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3 + (i%4), repeat: Infinity, delay: i*0.2 }}
          />
        ))}
      </svg>

      {/* Laptop */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] sm:w-[64%] xl:w-[62%]"
      >
        <div className="rounded-t-2xl border border-white/15 bg-gradient-to-br from-slate-900 to-ink-950 p-1.5 shadow-2xl">
          <div className="rounded-t-xl bg-[#04060d] aspect-[16/10] p-3 flex flex-col gap-2 overflow-hidden">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-400/80"/>
              <span className="h-2 w-2 rounded-full bg-yellow-300/80"/>
              <span className="h-2 w-2 rounded-full bg-green-400/80"/>
              <span className="ml-2 h-3 w-24 rounded bg-white/5"/>
            </div>
            <div className="grid grid-cols-5 gap-2 mt-1 flex-1">
              <div className="col-span-1 space-y-1.5">
                <div className="h-2.5 rounded bg-violet-gradient opacity-80"/>
                <div className="h-2 rounded bg-white/10"/>
                <div className="h-2 rounded bg-white/10"/>
                <div className="h-2 rounded bg-white/10"/>
                <div className="h-2 rounded bg-white/10"/>
              </div>
              <div className="col-span-4 space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-10 rounded bg-gradient-to-br from-cyan-400/50 to-violetx-700/40"/>
                  <div className="h-10 rounded bg-gradient-to-br from-violetx-400/40 to-violetx-700/40"/>
                  <div className="h-10 rounded bg-gradient-to-br from-violetx-500/40 to-violetx-700/40"/>
                </div>
                <div className="h-20 rounded bg-gradient-to-br from-violetx-500/15 to-violetx-700/10 relative overflow-hidden">
                  <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                    <defs>
                      <linearGradient id="lineg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee"/>
                        <stop offset="100%" stopColor="#1d4ed8"/>
                      </linearGradient>
                    </defs>
                    <polyline points="0,48 25,42 50,44 75,30 100,34 125,22 150,26 175,14 200,18" fill="none" stroke="url(#lineg)" strokeWidth="2"/>
                    <polyline points="0,54 25,50 50,52 75,40 100,42 125,32 150,34 175,26 200,28" fill="none" stroke="#3b82f6" strokeWidth="1.4" opacity=".5"/>
                  </svg>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-8 rounded bg-white/[0.08]"/>
                  <div className="h-8 rounded bg-white/[0.08]"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-2.5 mx-[-7%] bg-gradient-to-b from-slate-700 to-slate-900 rounded-b-2xl"/>
      </motion.div>

      {/* Phone */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute left-[8%] bottom-[12%] w-[22%] sm:w-[20%]"
      >
        <div className="rounded-[28px] border border-white/15 bg-gradient-to-br from-slate-900 to-ink-950 p-1.5 shadow-glow-lg">
          <div className="rounded-[22px] bg-[#04060d] aspect-[9/18] p-2 flex flex-col gap-1.5">
            <div className="h-1 w-10 mx-auto rounded-full bg-white/20"/>
            <div className="h-16 rounded-lg bg-gradient-to-br from-cyan-400/55 to-violetx-700/40"/>
            <div className="space-y-1">
              <div className="h-1.5 rounded bg-white/15"/>
              <div className="h-1.5 w-3/4 rounded bg-white/15"/>
              <div className="h-1.5 w-1/2 rounded bg-white/15"/>
            </div>
            <div className="h-10 rounded-lg bg-white/5 mt-1"/>
            <div className="mt-auto h-7 rounded-full bg-violet-gradient"/>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
