<script setup lang="ts">
const { data: page } = await useAsyncData('landing', () => queryCollection('landing').first())
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
  <div v-if="page">
    <UPageHero
      :headline="page.hero.headline"
      :title="page.title"
      :description="page.description"
      :links="page.hero.links"
    />

    <UPageSection
      id="features"
      :headline="page.features.headline"
      :title="page.features.title"
      :description="page.features.description"
      :features="page.features.items"
    />

    <UPageSection>
      <UPageCTA
        :title="page.cta.title"
        :description="page.cta.description"
        :links="page.cta.links"
        variant="subtle"
      />
    </UPageSection>
  </div>
</template>
