<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const { data: page } = await useAsyncData(() => `page-${route.path}`, () => queryCollection(`pages_${locale.value}`).path(route.path).first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: page.value.seo?.title || page.value.title,
  ogTitle: page.value.seo?.title || page.value.title,
  description: page.value.seo?.description || page.value.description,
  ogDescription: page.value.seo?.description || page.value.description
})

const tocLinks = computed(() => page.value?.body?.toc?.links ?? [])
</script>

<template>
  <UContainer v-if="page">
    <UPage>
      <UPageHeader
        :title="page.title"
        :description="page.description"
      />

      <UPageBody>
        <ContentRenderer :value="page" />
      </UPageBody>

      <template
        v-if="tocLinks.length"
        #right
      >
        <UContentToc
          :links="tocLinks"
          :title="$t('page.toc')"
        />
      </template>
    </UPage>
  </UContainer>
</template>
