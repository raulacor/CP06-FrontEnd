/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_USER?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_FORMSPREE_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
