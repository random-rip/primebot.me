<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#09090b' : 'white')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
    { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }
  ],
  htmlAttrs: {
    lang: 'de'
  }
})

useSeoMeta({
  titleTemplate: '%s - PrimeBot'
})
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />

    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
