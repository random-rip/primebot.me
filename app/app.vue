<script setup lang="ts">
import { de, en } from '@nuxt/ui/locale'

const colorMode = useColorMode()
const { locale } = useI18n()
// lang + dir on <html>, hreflang alternates, canonical and og:locale
const head = useLocaleHead()

const uiLocales = { de, en }

const color = computed(() => colorMode.value === 'dark' ? '#09090b' : 'white')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
    { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }
  ]
})

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs,
  link: head.value.link,
  meta: head.value.meta
}))

useSeoMeta({
  titleTemplate: '%s - PrimeBot'
})
</script>

<template>
  <UApp :locale="uiLocales[locale]">
    <NuxtRouteAnnouncer />

    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
