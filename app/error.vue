<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const { t } = useI18n()
const head = useLocaleHead()

useHead(() => ({
  htmlAttrs: head.value.htmlAttrs
}))

useSeoMeta({
  title: () => t('error.title'),
  description: () => t('error.description')
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
