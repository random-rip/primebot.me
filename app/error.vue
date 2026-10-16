<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

useHead({
  htmlAttrs: {
    lang: 'de'
  }
})

useSeoMeta({
  title: 'Seite nicht gefunden',
  description: 'Die gesuchte Seite existiert nicht.'
})
</script>

<template>
  <UApp>
    <AppHeader />

    <UMain>
      <UContainer>
        <UError :error="error" />
      </UContainer>
    </UMain>

    <AppFooter />
  </UApp>
</template>
