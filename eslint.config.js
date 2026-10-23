import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// Components installed from React Bits (npx shadcn add @react-bits/...). They are kept close to
// upstream so they stay easy to update, and they use an intentional "latest props in a ref" pattern
// that the React Compiler rules flag. Our own code is linted with the full rule set.
const REACT_BITS = [
  'src/components/AnimatedContent.tsx',
  'src/components/ClickSpark.tsx',
  'src/components/DarkVeil.tsx',
  'src/components/DecryptedText.tsx',
  'src/components/LogoLoop.tsx',
  'src/components/Magnet.tsx',
  'src/components/PillNav.tsx',
  'src/components/ScrollReveal.tsx',
  'src/components/SplitText.tsx',
  'src/components/SpotlightCard.tsx',
  'src/components/StarBorder.tsx',
]

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: REACT_BITS,
    rules: {
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'no-empty': 'off',
      'no-useless-assignment': 'off',
    },
  },
])
