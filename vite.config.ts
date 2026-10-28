/// <reference types="vitest/config" />
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Inlines the (single, ~12 kB gzipped) stylesheet into index.html at build time.
 * That removes one render-blocking round trip before the hero can paint.
 */
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset') return
      let source = String(html.source)
      for (const [file, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'asset' || !file.endsWith('.css')) continue
        const tag = new RegExp(`<link rel="stylesheet"[^>]*href="/${escapeRegExp(file)}"[^>]*>`)
        if (!tag.test(source)) continue
        source = source.replace(tag, () => `<style>${String(chunk.source)}</style>`)
        delete bundle[file]
      }
      html.source = source
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    rolldownOptions: {
      output: {
        // Group what the first paint needs into two files instead of many small shared chunks:
        // fewer requests on the critical path (lazy chunks still load on demand).
        codeSplitting: {
          groups: [
            { name: 'vendor', test: /node_modules[\\/](react|react-dom|scheduler|react-router|gsap|@gsap)[\\/]/ },
            { name: 'ui', test: /src[\\/]components[\\/](ui[\\/]|ErrorBoundary|PageLoader)/ },
          ],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
})
