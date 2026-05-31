/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Kept the `violetx` key so existing components keep compiling — values now blue.
        violetx: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        ink: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          800: '#0b1220',
          900: '#070b16',
          950: '#04060d',
        },
        surface: {
          DEFAULT: '#0b1426',
          soft:    '#0e1a30',
          card:    '#101d36',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          strong:  'rgba(59,130,246,0.28)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'violet-gradient':      'linear-gradient(135deg, #22d3ee 0%, #2563eb 100%)',
        'violet-gradient-soft': 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(37,99,235,0.10) 100%)',
        'violet-radial':        'radial-gradient(ellipse at center, rgba(59,130,246,0.35), transparent 65%)',
      },
      boxShadow: {
        glow:     '0 10px 50px -12px rgba(59,130,246,0.55)',
        'glow-lg':'0 20px 80px -10px rgba(59,130,246,0.65)',
        soft:     '0 10px 30px -10px rgba(0,0,0,0.45)',
      },
      animation: {
        'float':     'float 6s ease-in-out infinite',
        'spin-slow': 'spin 22s linear infinite',
        'orbit':     'orbit 14s linear infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        orbit: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
      },
    },
  },
  plugins: [],
};
