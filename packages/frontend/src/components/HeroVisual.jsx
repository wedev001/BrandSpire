import { motion } from 'framer-motion';
import { Code2, TrendingUp, Star, Sparkles } from 'lucide-react';

/**
 * Hero visual — detailed laptop + phone composition at the center,
 * surrounded by four floating glass cards representing work pillars.
 */
export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full aspect-square max-w-[560px] xl:max-w-[620px] mx-auto"
    >
      {/* Ambient glow */}
      <div className="absolute inset-[10%] -z-10 rounded-full bg-violet-radial blur-2xl opacity-80" />

      {/* Orbital rings + particles */}
      <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full -z-0">
        <defs>
          <linearGradient id="hvRingA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hvRingB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.ellipse
          cx="300" cy="300" rx="265" ry="200"
          fill="none" stroke="url(#hvRingA)" strokeWidth="1.2"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%' }}
        />
        <motion.ellipse
          cx="300" cy="300" rx="215" ry="160"
          fill="none" stroke="url(#hvRingB)" strokeWidth="1"
          strokeDasharray="2 10"
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%' }}
        />
        {[
          [120, 200, 1.6], [490, 220, 1.8], [110, 380, 2.2], [495, 410, 1.4],
          [300, 60, 1.6], [300, 545, 1.4], [70, 300, 1.8], [535, 300, 1.6],
          [200, 110, 1.2], [410, 500, 1.2],
        ].map(([cx, cy, r], i) => (
          <motion.circle
            key={i} cx={cx} cy={cy} r={r} fill="#7dd3fc"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </svg>

      {/* Laptop — shifted slightly right so the phone has its own breathing room on the left. */}
      <div className="absolute left-[58%] top-[46%] -translate-x-1/2 -translate-y-1/2 w-[52%] sm:w-[50%]">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Laptop />
        </motion.div>
      </div>

      {/* Phone — clearly to the left of the laptop, on the same vertical centerline.
          Slight tilt adds depth without crowding the laptop content. */}
      <div className="absolute left-[18%] top-[46%] -translate-x-1/2 -translate-y-1/2 w-[18%] sm:w-[17%] z-20">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          style={{ rotate: -4 }}
        >
          <Phone />
        </motion.div>
      </div>

      {/* Floating cards */}
      <FloatingCard className="top-[4%] left-[2%] w-[160px]" delay={0} amplitude={10}>
        <div className="flex items-center gap-2 mb-2.5">
          <span className="h-7 w-7 rounded-lg grid place-items-center bg-gradient-to-br from-cyan-400/30 to-blue-600/20 border border-cyan-400/30 text-cyan-300">
            <Code2 size={14} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-800 dark:text-white truncate">Web & Apps</p>
            <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">Production-grade</p>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex gap-1">
            <span className="h-1.5 w-6 rounded bg-cyan-400/70" />
            <span className="h-1.5 w-10 rounded bg-blue-500/60" />
            <span className="h-1.5 w-4 rounded bg-slate-300 dark:bg-white/15" />
          </div>
          <div className="flex gap-1">
            <span className="h-1.5 w-3 rounded bg-slate-300 dark:bg-white/15" />
            <span className="h-1.5 w-12 rounded bg-blue-500/50" />
            <span className="h-1.5 w-5 rounded bg-cyan-400/60" />
          </div>
          <div className="flex gap-1">
            <span className="h-1.5 w-8 rounded bg-slate-300 dark:bg-white/15" />
            <span className="h-1.5 w-6 rounded bg-blue-500/40" />
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="top-[6%] right-[2%] w-[180px]" delay={0.8} amplitude={-12}>
        <div className="flex items-center justify-between mb-2">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-800 dark:text-white">Growth</p>
            <p className="text-[9px] text-slate-500 dark:text-slate-400">This quarter</p>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-500 dark:text-emerald-400 shrink-0">
            <TrendingUp size={11} /> +148%
          </span>
        </div>
        <svg viewBox="0 0 160 50" className="w-full h-10">
          <defs>
            <linearGradient id="hvSpark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="hvSparkFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,40 L20,34 L40,36 L60,26 L80,28 L100,16 L120,20 L140,8 L160,12 L160,50 L0,50 Z" fill="url(#hvSparkFill)" />
          <polyline points="0,40 20,34 40,36 60,26 80,28 100,16 120,20 140,8 160,12" fill="none" stroke="url(#hvSpark)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </FloatingCard>

      <FloatingCard className="bottom-[10%] left-[1%] w-[150px]" delay={0.4} amplitude={12}>
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full grid place-items-center bg-gradient-to-br from-amber-300/30 to-amber-500/10 border border-amber-400/30 shrink-0">
            <Star size={14} className="fill-amber-400 text-amber-400" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-800 dark:text-white">Launch-ready</p>
            <p className="text-[9px] text-slate-500 dark:text-slate-400">Concept work & prototypes</p>
          </div>
        </div>
        <div className="mt-2 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={9} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      </FloatingCard>

      <FloatingCard className="bottom-[6%] right-[2%] w-[170px]" delay={1.2} amplitude={-10}>
        <div className="flex items-center gap-2 mb-2">
          <span className="h-7 w-7 rounded-lg grid place-items-center bg-violet-gradient text-white shadow-glow shrink-0">
            <Sparkles size={13} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-slate-800 dark:text-white truncate">Brand & Design</p>
            <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">Crafted by hand</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          <span className="h-5 w-5 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600" />
          <span className="h-5 w-5 rounded-md bg-gradient-to-br from-blue-500 to-indigo-700" />
          <span className="h-5 w-5 rounded-md bg-gradient-to-br from-indigo-500 to-violet-700" />
          <span className="h-5 w-5 rounded-md border border-slate-300 dark:border-white/15" />
        </div>
      </FloatingCard>
    </motion.div>
  );
}

/* ---------------- Laptop ---------------- */
function Laptop() {
  return (
    <div className="relative">
      {/* Screen frame */}
      <div className="rounded-t-2xl border border-white/15 bg-gradient-to-br from-slate-800 via-slate-900 to-ink-950 p-[5px] shadow-2xl">
        {/* Bezel */}
        <div className="rounded-t-xl bg-[#04060d] p-[6px]">
          <div className="rounded-t-lg bg-gradient-to-br from-[#0a1024] to-[#04060d] aspect-[16/10] flex flex-col overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="h-2 w-2 rounded-full bg-red-400/80" />
              <span className="h-2 w-2 rounded-full bg-yellow-300/80" />
              <span className="h-2 w-2 rounded-full bg-green-400/80" />
              <div className="ml-3 flex-1 h-3.5 rounded-md bg-white/[0.06] flex items-center px-2 gap-1">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="text-[6px] text-slate-400 tracking-wide">brandspire.in/dashboard</span>
              </div>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-sm bg-white/15" />
                <span className="h-2 w-2 rounded-sm bg-white/15" />
              </div>
            </div>

            {/* App body */}
            <div className="flex-1 flex min-h-0">
              {/* Sidebar */}
              <div className="w-[18%] border-r border-white/[0.06] bg-white/[0.02] p-2 flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded bg-violet-gradient" />
                  <span className="h-1.5 w-6 rounded bg-white/30" />
                </div>
                <div className="space-y-1.5 mt-1">
                  <SideItem active />
                  <SideItem />
                  <SideItem />
                  <SideItem />
                  <SideItem />
                </div>
                <div className="mt-auto h-5 rounded-md bg-violet-gradient/30 border border-cyan-400/20" />
              </div>

              {/* Main */}
              <div className="flex-1 p-2.5 flex flex-col gap-2 min-w-0">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="h-2 w-16 rounded bg-white/30" />
                    <div className="h-1.5 w-10 rounded bg-white/15" />
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-4 w-10 rounded-md bg-white/[0.06] border border-white/10" />
                    <span className="h-4 w-12 rounded-md bg-violet-gradient" />
                  </div>
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-3 gap-1.5">
                  <KpiCard accent="from-cyan-400/40 to-blue-600/20" />
                  <KpiCard accent="from-blue-500/40 to-indigo-700/20" />
                  <KpiCard accent="from-indigo-500/40 to-violet-700/20" />
                </div>

                {/* Chart */}
                <div className="flex-1 rounded-md bg-white/[0.03] border border-white/[0.06] p-2 relative overflow-hidden min-h-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="h-1.5 w-12 rounded bg-white/25" />
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      <span className="h-1 w-4 rounded bg-white/15" />
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span className="h-1 w-4 rounded bg-white/15" />
                    </div>
                  </div>
                  <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="absolute inset-x-2 bottom-1 top-4 w-[calc(100%-16px)]">
                    <defs>
                      <linearGradient id="lapLineA" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                      <linearGradient id="lapFill" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,50 L20,42 L40,46 L60,30 L80,34 L100,22 L120,26 L140,14 L160,20 L180,10 L200,16 L200,60 L0,60 Z" fill="url(#lapFill)" />
                    <polyline points="0,50 20,42 40,46 60,30 80,34 100,22 120,26 140,14 160,20 180,10 200,16" fill="none" stroke="url(#lapLineA)" strokeWidth="1.6" />
                    <polyline points="0,55 20,50 40,52 60,42 80,44 100,34 120,36 140,28 160,32 180,24 200,28" fill="none" stroke="#3b82f6" strokeWidth="1.2" opacity=".5" />
                  </svg>
                </div>

                {/* Bottom rows */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="h-6 rounded-md bg-white/[0.04] border border-white/[0.06]" />
                  <div className="h-6 rounded-md bg-white/[0.04] border border-white/[0.06]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Base / hinge */}
      <div className="relative h-3 mx-[-6%]">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-slate-700 to-slate-900 rounded-b-2xl" />
        <div className="absolute inset-x-[42%] top-1 h-1 rounded-b-lg bg-slate-950/80" />
      </div>
      {/* Soft floor reflection */}
      <div className="mx-auto mt-1 h-3 w-[80%] rounded-full bg-blue-500/20 blur-md" />
    </div>
  );
}

function SideItem({ active }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={'h-2 w-2 rounded ' + (active ? 'bg-cyan-400' : 'bg-white/20')} />
      <span className={'h-1.5 rounded ' + (active ? 'w-10 bg-white/40' : 'w-7 bg-white/15')} />
    </div>
  );
}

function KpiCard({ accent }) {
  return (
    <div className="rounded-md p-1.5 bg-white/[0.04] border border-white/[0.06] space-y-1">
      <div className={'h-2 rounded bg-gradient-to-r ' + accent} />
      <div className="h-2.5 w-10 rounded bg-white/40" />
      <div className="h-1 w-6 rounded bg-white/15" />
    </div>
  );
}

/* ---------------- Phone ---------------- */
function Phone() {
  return (
    <div className="rounded-[26px] border border-white/15 bg-gradient-to-br from-slate-800 to-ink-950 p-[3px] shadow-[0_25px_60px_-10px_rgba(34,211,238,0.45)]">
      <div className="rounded-[22px] bg-[#04060d] p-[3px]">
        <div className="rounded-[19px] bg-gradient-to-br from-[#0a1024] to-[#04060d] aspect-[9/19] flex flex-col overflow-hidden relative">
          {/* Notch */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-2 w-10 rounded-full bg-black z-10" />
          {/* Status bar */}
          <div className="flex items-center justify-between px-3 pt-1.5 pb-0.5">
            <span className="text-[6px] font-semibold text-white/80">9:41</span>
            <div className="flex items-center gap-0.5">
              <span className="h-1 w-1 rounded-full bg-white/70" />
              <span className="h-1 w-1 rounded-full bg-white/70" />
              <span className="h-1.5 w-2 rounded-sm bg-white/70" />
            </div>
          </div>

          {/* App header */}
          <div className="px-2.5 pt-3 pb-1.5 flex items-center justify-between">
            <div>
              <p className="text-[5px] text-cyan-300/80 uppercase tracking-widest">Welcome back</p>
              <p className="text-[8px] font-bold text-white">BrandSpire</p>
            </div>
            <span className="h-3.5 w-3.5 rounded-full bg-violet-gradient" />
          </div>

          {/* Hero card */}
          <div className="mx-2 rounded-lg overflow-hidden relative h-12 bg-gradient-to-br from-cyan-400/60 via-blue-500/50 to-indigo-700/60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
            <div className="absolute bottom-1.5 left-2 right-2 space-y-0.5">
              <div className="h-1 w-3/4 rounded bg-white/70" />
              <div className="h-1 w-1/2 rounded bg-white/40" />
            </div>
          </div>

          {/* List rows */}
          <div className="px-2 mt-2 space-y-1.5">
            <Row />
            <Row />
            <Row />
          </div>

          {/* CTA */}
          <div className="px-2 mt-auto mb-1.5">
            <div className="h-4 rounded-full bg-violet-gradient flex items-center justify-center">
              <span className="h-1 w-6 rounded bg-white/90" />
            </div>
          </div>

          {/* Home indicator */}
          <div className="mx-auto mb-1 h-0.5 w-8 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-4 w-4 rounded-md bg-gradient-to-br from-cyan-400/50 to-blue-600/50 shrink-0" />
      <div className="flex-1 space-y-0.5">
        <span className="block h-1 w-3/4 rounded bg-white/40" />
        <span className="block h-0.5 w-1/2 rounded bg-white/20" />
      </div>
      <span className="h-1.5 w-3 rounded bg-cyan-400/70" />
    </div>
  );
}

/* ---------------- Floating glass card ---------------- */
function FloatingCard({ className = '', delay = 0, amplitude = 10, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: [0, amplitude, 0] }}
      transition={{
        opacity: { duration: 0.6, delay: 0.3 + delay },
        y: { duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay },
      }}
      className={
        'absolute z-30 rounded-2xl p-3 backdrop-blur-xl ' +
        'bg-white/85 dark:bg-white/[0.04] ' +
        'border border-slate-200/80 dark:border-white/10 ' +
        'shadow-[0_18px_50px_-12px_rgba(15,23,42,0.18)] dark:shadow-[0_18px_60px_-12px_rgba(0,0,0,0.6)] ' +
        className
      }
    >
      {children}
    </motion.div>
  );
}
