# Project instructions for Claude

Personal portfolio of Raul Azzi Corsi. React 19 + TypeScript + Vite, Tailwind CSS v4, React Router,
TanStack Query, Supabase (auth + Postgres), Formspree (email), deployed on Vercel.

Read this file before every task. Follow it over your own defaults.

## Commands

- `npm run dev`: local server at http://localhost:5173
- `npm run lint`, `npm run format:check`, `npm test`, `npm run build`: all four must pass before you commit.
- Never run `npm run format` on the whole repo without being asked. lint-staged formats staged files on commit.

## Architecture

```
src/
  pages/        one component per route, lazy-loaded in App.tsx (default export)
  layouts/      SiteLayout (public pages), AdminLayout (login + dashboard)
  sections/     the blocks of the home page (Hero, About, Projects, Skills, Path, Contact, Nav, Footer)
  components/   reusable UI; components/ui = design-system primitives (Button, TextField, Spinner, StatusMessage)
  hooks/        custom hooks: all data fetching and form logic lives here (useRepos, useContactForm, useAuth…)
  services/     the only place that talks to the network (github.ts, supabase.ts, contact.ts, messages.ts, featured.ts)
  contexts/     React contexts: the context object in camelCase.ts, the provider in PascalCase.tsx
  lib/          pure functions with no React (validation, formatting, query client)
  data/site.ts  all static copy and links
```

Data flows one way: **service → hook (TanStack Query) → page/section → presentational component**.

Rules:

1. Components never call `fetch` or Supabase directly. Put the call in `services/`, wrap it in a hook in `hooks/`.
2. Presentational components receive data through props and hold no business logic.
3. Every view that shows API data handles **loading** (skeleton or spinner), **error** (`StatusMessage` with retry) and
   **empty** states.
4. Reuse `Button`/`buttonStyles`, `TextField`, `StatusMessage`, `ProjectCard`, `PageHeader` instead of new markup.
5. Use design tokens (`bg-ink`, `text-fg`, `text-fg-muted`, `border-line`, `text-accent`…), never raw hex colors, so
   both themes keep working.
6. New pages are lazy-loaded with `React.lazy`. Heavy libraries (Supabase SDK, WebGL) are imported on demand, never in
   the initial bundle.
7. GitHub data goes through `useRepos`/`useRepo`; never add a second request for data already in the cache.
8. Do not edit the React Bits components listed in `eslint.config.js` unless the task is about them.

## Naming conventions

- Components and their files: `PascalCase` (`ProjectCard.tsx`). One exported component per file.
- Hooks: `useSomething`, file `useSomething.ts`.
- Services, utils, contexts objects: `camelCase.ts`.
- Tests next to the file they test: `Thing.test.tsx`.
- Props types: `ThingProps`. Booleans start with `is`/`has` or read as adjectives (`loading`, `featured`).
- UI copy is in English.

## Git workflow (GitHub Flow)

- `main` is protected and always deployable; Vercel deploys every push to `main`.
- Never commit to `main`. Start every task on a new branch from an up-to-date `main`:
  `feature/<name>`, `fix/<name>`, `chore/<name>` or `docs/<name>` (kebab-case).
- Commits follow **Conventional Commits**: `type(scope): description` in the imperative, lowercase, no period.
  Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`.
  Example: `feat(contact): validate message length`.
- Small commits, one logical change each. commitlint rejects anything else.
- Open a pull request into `main`; CI (lint, format, tests, build) must be green before merging.

## Testing

Vitest + Testing Library. Test behavior the user sees (labels, roles, text), not implementation details. Any change
to the contact form or to route protection must keep `src/components/ContactForm.test.tsx`,
`src/lib/validation.test.ts` and `src/components/ProtectedRoute.test.tsx` passing; add tests for new logic.

## Secrets

`.env` is git-ignored; document new variables in `.env.example`. Never read, print or commit `.env`.
