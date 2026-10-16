// https://nuxt.com/docs/api/configuration/nuxt-config
import { globSync } from 'node:fs'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
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
      routes: globSync('**/*.md', { cwd: 'content' })
        .map(file => '/' + file.replace(/\.md$/, '').replace(/(^|\/)index$/, '')),
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
