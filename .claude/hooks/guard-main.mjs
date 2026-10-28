// PreToolUse hook: blocks `git commit` while on main, so Claude always works on a feature branch.
import { execSync } from 'node:child_process'

let input = ''
for await (const chunk of process.stdin) input += chunk

const command = JSON.parse(input).tool_input?.command ?? ''
if (!/\bgit\s+commit\b/.test(command)) process.exit(0)

let branch = ''
try {
  branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim()
} catch {
  process.exit(0) // not a git repo: nothing to guard
}
if (branch === 'main') {
  console.error(
    'Blocked: you are on main. Create a branch first, e.g. `git switch -c feature/<name>` (see CLAUDE.md → Git workflow).',
  )
  process.exit(2) // exit code 2 = block the tool call and show this message to Claude
}
