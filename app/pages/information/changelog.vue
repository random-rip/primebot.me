<script setup lang="ts">
// Layout based on https://github.com/nuxt-ui-templates/changelog
const repo = 'random-rip/primebot_backend'

interface Release {
  id: number
  tag_name: string
  name: string | null
  body: string | null
  html_url: string
  published_at: string
  draft: boolean
  prerelease: boolean
}

// Title and description stay editable in content/information/changelog.md
const { data: page } = await useAsyncData('page-/information/changelog', () => queryCollection('pages').path('/information/changelog').first())

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('de-DE', { dateStyle: 'medium', timeZone: 'UTC' })
}

// GitHub release notes contain bare `@handle` mentions, link them like GitHub does (skipping emails and inline code)
function linkMentions(markdown: string) {
  return markdown
    .split(/(`[^`]*`)/)
    .map(part => part.startsWith('`')
      ? part
      : part.replace(/(^|[^\w.`/-])@([a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38})/gi, '$1[@$2](https://github.com/$2)'))
    .join('')
}

// Fetched at build time (prerender), so a rebuild picks up new releases
const { data: versions } = await useAsyncData(`changelog-${repo}`, () =>
  $fetch<Release[]>(`https://api.github.com/repos/${repo}/releases`, {
    query: { per_page: 100 },
    headers: { accept: 'application/vnd.github+json' }
  }).then(all => all
    .filter(release => !release.draft && !release.prerelease)
    .map(release => ({
      id: release.id,
      title: release.name || release.tag_name,
      date: release.published_at,
      to: release.html_url,
      target: '_blank' as const,
      markdown: release.body ? linkMentions(release.body) : ''
    }))), {
  default: () => []
})
</script>

<template>
  <div class="xl:grid xl:grid-cols-2">
    <UPageSection
      :title="page?.title"
      :description="page?.description"
      orientation="vertical"
      :links="[{
        label: 'GitHub Releases',
        icon: 'i-simple-icons-github',
        variant: 'ghost',
        size: 'md',
        to: `https://github.com/${repo}/releases`,
        target: '_blank'
      }]"
      :ui="{
        root: 'border-b border-default xl:border-b-0 xl:sticky xl:top-(--ui-header-height) xl:h-[calc(100vh-var(--ui-header-height))] overflow-hidden',
        container: 'h-full items-center justify-center',
        wrapper: 'flex flex-col',
        title: 'text-left text-4xl',
        description: 'text-left max-w-lg',
        links: 'gap-1 justify-start -ms-2.5'
      }"
    >
      <template #top>
        <SkyBg />

        <div class="absolute -right-1/2 top-1/2 z-[-1] size-60 -translate-y-1/2 rounded-full bg-primary blur-[300px] sm:size-100" />
      </template>

      <template #default />
    </UPageSection>

    <section class="px-4 sm:px-6 xl:-ms-30 xl:flex-1 xl:px-0">
      <p
        v-if="!versions.length"
        class="py-16 text-muted sm:py-24"
      >
        Die Changelogs konnten nicht geladen werden. Alle Releases findest du auf
        <ULink
          :to="`https://github.com/${repo}/releases`"
          target="_blank"
          class="text-primary"
        >
          GitHub
        </ULink>.
      </p>

      <UChangelogVersions
        v-else
        :indicator-motion="false"
        :ui="{
          root: 'py-16 sm:py-24 lg:py-32',
          indicator: 'inset-y-0'
        }"
      >
        <UChangelogVersion
          v-for="version in versions"
          :key="version.id"
          :title="version.title"
          :date="version.date"
          :to="version.to"
          :target="version.target"
          :ui="{
            root: 'flex items-start',
            container: 'max-w-xl min-w-0',
            header: 'border-b border-default pb-4',
            title: 'text-3xl',
            date: 'text-xs/9 text-highlighted font-mono',
            indicator: 'sticky top-(--ui-header-height) pt-16 -mt-16 sm:pt-24 sm:-mt-24 lg:pt-32 lg:-mt-32'
          }"
        >
          <template #date>
            {{ formatDate(version.date) }}
          </template>

          <template #body>
            <!-- release notes use h2 for sections, keep them below the release title -->
            <MDC
              v-if="version.markdown"
              class="[&_a]:wrap-break-word [&_li]:wrap-break-word [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-lg [&_h3]:text-base"
              :value="version.markdown"
              :cache-key="`release-${version.id}`"
            />
          </template>
        </UChangelogVersion>
      </UChangelogVersions>
    </section>
  </div>
</template>
