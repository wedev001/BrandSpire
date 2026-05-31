# BrandSpire

> **Tech · Innovate · Inspire** — Modern digital solutions for ambitious businesses.

BrandSpire is a startup that builds high-performance websites, web apps, dashboards and automation systems for growing teams. This repository is a **monorepo** that hosts both the marketing site (frontend) and a placeholder backend service, ready for future API and admin integrations.

![Stack](https://img.shields.io/badge/stack-React%2018%20·%20Vite%205%20·%20Tailwind%203%20·%20Framer%20Motion-9333ea?style=for-the-badge)
![Monorepo](https://img.shields.io/badge/npm--workspaces-monorepo-3b6bff?style=for-the-badge)

---

## ✨ Highlights

- **Multi-page React site** — Home, Services, Portfolio, Pricing, About, Contact.
- **Light / Dark mode toggle** with localStorage persistence and animated transitions.
- **Fully responsive** mobile-first layout (sm → 2xl).
- **Best-in-class animations** via Framer Motion — hero motion, counter animations, route transitions, scroll reveals.
- **Brand identity** baked in — gradient logo, custom Tailwind theme, custom scrollbar.
- **Monorepo** with npm workspaces so the backend slots in cleanly later.
- **Accessibility-conscious** — keyboard focus rings, reduced-motion support, semantic HTML.

---

## 📝 Latest Updates (v1.1.0)

### ✨ Pricing Section Enhancements
- **Interactive Billing Toggle** — New toggle switch for One-Time Payment vs. Custom Packages with smooth animations
- **Removed Testimonials** — Focused feature list without customer testimonials section for cleaner UI
- **Fixed Card Selection Styling** — Subtle gradient backgrounds in light/dark modes, no bright blue overlay
- **Better Text Contrast** — Improved readability in both light and dark modes for selected cards
- **Enhanced Animations** — Staggered feature list animations with hover effects on checkmarks

### 🎨 Theme Toggle Button Updates
- **Modern Design** — Sleek gradient slider with improved shadows and borders
- **Enhanced Animations** — Rotating Sun/Moon icons with smooth 180° transitions
- **Better Accessibility** — Improved border contrast and hover states
- **Responsive** — Perfect scaling on all screen sizes

### 💾 Selection Indicators
- **Light Mode** — Subtle gradient background (from-slate-50 to-slate-100) with violet accent radio button
- **Dark Mode** — Subtle gradient background (from-slate-800 to-slate-900) with glowing selection indicator
- **No Bright Overlays** — Clean, professional appearance throughout the selection experience

---

## 🗂 Project structure

```
BrandSpire/
├── package.json              # workspace root
├── README.md
├── .gitignore
└── packages/
    ├── frontend/             # React + Vite marketing site
    │   ├── public/
    │   │   └── favicon.svg
    │   ├── src/
    │   │   ├── assets/       # logo, brand artwork
    │   │   ├── components/   # Navbar, Footer, Cards, ThemeToggle, …
    │   │   ├── context/      # ThemeContext (light/dark)
    │   │   ├── data/         # site.js — services, projects, pricing, etc.
    │   │   ├── pages/        # Home, Services, Portfolio, Pricing, About, Contact, 404
    │   │   ├── App.jsx
    │   │   ├── main.jsx
    │   │   └── index.css
    │   ├── index.html
    │   ├── tailwind.config.js
    │   ├── postcss.config.js
    │   ├── vite.config.js
    │   └── package.json
    └── backend/              # placeholder Express API
        ├── src/index.js
        ├── .env.example
        ├── README.md
        └── package.json
```

---

## 🚀 Getting started

**Requirements:** Node.js 18+ and npm 9+.

```bash
# 1) install all workspace deps (frontend + backend) in one shot
npm install

# 2) run the frontend dev server (http://localhost:5173)
npm run dev

# 3) (optional) run the backend API (http://localhost:4000)
npm run dev:backend
```

### Other scripts (root)

| Command                  | What it does                                    |
|--------------------------|-------------------------------------------------|
| `npm run dev`            | Start the frontend dev server                   |
| `npm run dev:frontend`   | Same as above (explicit)                        |
| `npm run dev:backend`    | Start the backend API in watch mode             |
| `npm run build`          | Production build of the frontend                |
| `npm run preview`        | Preview the production build locally            |
| `npm run start:backend`  | Run the backend without watch                   |
| `npm run clean`          | Remove all `node_modules` and `dist` folders    |

---

## 🎨 Brand & theming

- **Primary gradient:** `cyan → blue → violet` (`#22d3ee → #3b6bff → #9333ea`).
- **Display font:** Space Grotesk · **Body font:** Inter (loaded from Google Fonts).
- **Theme toggle** lives in the top nav. Selection is persisted in `localStorage` (`brandspire-theme`).
- **Tailwind theme** lives in `packages/frontend/tailwind.config.js` — extend `brand`, `accent`, `ink` palettes there.

---

## 🧩 Tech stack

| Layer        | Tech                                                                   |
|--------------|------------------------------------------------------------------------|
| Framework    | **React 18** with **Vite 5**                                           |
| Styling      | **Tailwind CSS 3** (dark mode via `class`)                             |
| Animation    | **Framer Motion 11**                                                   |
| Routing      | **React Router 6** (with `AnimatePresence` page transitions)           |
| Icons        | **lucide-react**                                                       |
| Backend (WIP)| **Express 4**, CORS, dotenv                                            |
| Tooling      | **npm workspaces**, ESLint (frontend)                                  |

---

## 🛣 Roadmap

- [ ] Wire `Contact` form to `POST /api/contact` once backend is hosted.
- [ ] Add CMS for portfolio items (or move `data/site.js` to MDX).
- [ ] Admin dashboard for leads (auth + DB).
- [ ] Blog / case-study section.
- [ ] Sitemap, robots.txt, OG image generator.
- [ ] CI/CD (GitHub Actions → Vercel for frontend, Render/Fly for backend).

---

## 📄 License

MIT © BrandSpire
