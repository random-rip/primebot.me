<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const { data: page } = await useAsyncData(() => `landing-${route.path}`, () => queryCollection(`pages_${locale.value}`).path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  title,
  titleTemplate: '%s',
  ogTitle: title,
  description,
  ogDescription: description
})
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
