// PostToolUse hook: formats and lints every file Claude edits, right after the edit.
import { execFileSync } from 'node:child_process'

let input = ''
for await (const chunk of process.stdin) input += chunk

const file = JSON.parse(input).tool_input?.file_path
if (!file || !/\.(tsx?|jsx?|css|json|md)$/.test(file)) process.exit(0)

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const run = args => execFileSync(npx, args, { stdio: 'pipe', shell: process.platform === 'win32' })

try {
  run(['prettier', '--write', '--ignore-unknown', file])
  if (/\.(tsx?|jsx?)$/.test(file)) run(['eslint', '--fix', file])
} catch (error) {
  // Exit code 2 sends the lint errors back to Claude so it fixes them before moving on.
  console.error(String(error.stdout || error.message))
  process.exit(2)
}
