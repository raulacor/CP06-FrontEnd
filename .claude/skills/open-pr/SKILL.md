---
name: open-pr
description: Push the current branch and open a GitHub pull request into main with the project's template. Use when the user asks to open, create or submit a PR.
---

# Open a pull request

1. Confirm the branch is not `main` and the working tree is clean (`git status`).
2. Run `npm run lint`, `npm test`, `npm run build`. Stop and report if anything fails.
3. `git push -u origin HEAD`.
4. Create the PR with the GitHub CLI, title in Conventional Commits format and body following
   `.github/pull_request_template.md`:
   `gh pr create --base main --title "feat(scope): summary" --body-file <file>`.
5. Run `gh pr checks --watch` and report the CI result and the PR URL. Never merge it yourself unless asked.
