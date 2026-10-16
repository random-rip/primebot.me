// https://nuxt.com/docs/api/configuration/nuxt-config
import { globSync } from 'node:fs'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-studio'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  runtimeConfig: {
    public: {
      // PrimeBot backend, empty = same origin (primebot.me serves the API under /api)
      apiBase: ''
    }
  },

  compatibilityDate: '2026-10-01',

  nitro: {
    prerender: {
      // Dropdown links are not part of the server-rendered HTML, so the crawler alone misses pages
      // content/de/* → /*, content/en/* → /en/*
      routes: globSync('{de,en}/**/*.md', { cwd: 'content' })
        .map(file => '/' + file.replace(/^de\//, '').replace(/\.md$/, '').replace(/\/?index$/, '')),
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    locales: [
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    baseUrl: 'https://primebot.me',
    // Static site: no redirects based on the browser language, the switcher in the header is enough
    detectBrowserLanguage: false,
    customRoutes: 'config',
    pages: {
      // Not translated yet, only available in German at /settings
      settings: false
    }
  },

  studio: {
    repository: {
      provider: 'github',
      // TODO: set to the final repository
      owner: 'OrbisK',
      repo: 'primebot-nuxt',
      branch: 'main'
    }
  }
})
