---
name: new-feature
description: Implement a feature or fix in this portfolio end to end — branch, code that follows the architecture, tests, checks and Conventional Commits. Use whenever asked to add or change functionality.
---

# New feature workflow

1. **Branch.** `git switch main && git pull`, then `git switch -c feature/<kebab-name>` (or `fix/`, `chore/`, `docs/`).
2. **Plan against CLAUDE.md.** Decide which layers change: `services/` (network) → `hooks/` (state, TanStack Query)
   → `pages/` or `sections/` → presentational `components/`. Reuse `components/ui` primitives.
3. **Implement** in small steps. Every API-backed view gets loading, error (with retry) and empty states.
   New routes are added lazily in `src/App.tsx`.
4. **Test.** Add or update Vitest + Testing Library tests next to the changed files. Query by role/label/text.
5. **Check.** Run `npm run lint`, `npm test` and `npm run build`. Fix everything before committing.
6. **Commit** in logical steps with Conventional Commits, e.g. `feat(projects): add language filter`.
   Never commit `.env` or to `main` (a hook blocks it).
7. **Hand off** with a summary of what changed and how to verify it. Use the `open-pr` skill if asked to open a PR.
