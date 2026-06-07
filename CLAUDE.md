# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type-check + production build → dist/
npm run build

# Preview production build locally
npm run preview
```

No test suite is configured. TypeScript checking runs as part of `npm run build` (`tsc -b`).

## Environment Setup

Create a `.env` file in the root with Firebase credentials:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Without real credentials the app still runs with dummy fallback values (no auth will work).

Admin login: `admin@gmail.com` / `admin123`

## Architecture

This is a React 19 + Vite + TypeScript SPA styled with Tailwind CSS v4. It is deployed to Netlify; `public/_redirects` handles React Router client-side routing.

### Routing

`src/router.tsx` — Two layout zones:
- `/` uses `AppLayout` (header + footer shell) with nested routes: home, about, register, login, 404
- `/portfolio/:slug` renders `PortfolioPage` standalone (no shell)

### State & Data Flow

**Portfolio data lives entirely in `localStorage`** — there is no database.

`src/lib/portfolioStore.ts` is the single source of truth for portfolio CRUD:
- `staticPortfolios` (from `src/data/site.ts`) are the hardcoded seed records
- User-created portfolios are written to `localStorage` under the key `digital-portfolios`
- Deletions are tracked separately under `deleted-portfolios`
- `getAllPortfolios()` merges static + saved, filtering deleted slugs
- Cross-tab reactivity is achieved by dispatching a custom `portfolio-store-updated` event alongside the native `storage` event
- `usePortfolioCards` hook (`src/hooks/usePortfolioCards.ts`) subscribes to these events to keep the home page grid live

**Registration form (`RegisterPage`)** serializes structured inputs (skills array, experience/education rows) into pipe-delimited strings via `createPortfolio()`, which parses them back into typed records.

### Auth

`src/lib/AuthContext.tsx` wraps Firebase Auth with a `useAuth()` hook. Two auth paths:
- **OAuth** (Google/GitHub) via `signInWithPopup` — real Firebase auth
- **Email mock** (`loginWithEmail`) — sets user state directly without Firebase, used for the admin login flow

Role (`"candidate"` | `"admin"`) is stored in `localStorage` under `authRole` and rehydrated on Firebase `onAuthStateChanged`.

Unauthenticated users clicking "Registrer" in the nav are redirected to `/login` (enforced in `AppLayout`).

### i18n

`src/lib/LanguageContext.tsx` + `src/lib/translations.ts` provide a two-level translation system (`no` / `en`). The `t()` helper is type-safe via `ValidPaths` — adding a new translation key requires updating both language objects in `translations.ts`.

### Key Files

| Path | Purpose |
|---|---|
| `src/data/site.ts` | Type definitions + static candidate/portfolio seed data |
| `src/lib/portfolioStore.ts` | All localStorage portfolio read/write/delete logic |
| `src/lib/firebase.ts` | Firebase app init + auth provider exports |
| `src/lib/AuthContext.tsx` | Auth state, login/logout, role management |
| `src/lib/LanguageContext.tsx` | i18n context + type-safe `t()` |
| `src/components/AppLayout.tsx` | Shell with sticky nav, language toggle, user menu |

### Legacy HTML Files

The root contains standalone HTML files (`index.html`, `mukta.html`, `farzana.html`, `varsha.html`, `Om_oss.html`, `registration.html`) — these are original static prototypes predating the React app and are not part of the Vite build.

The `Portfolio/` subdirectory is a separate, independent Vite+React project (unused/experimental).
