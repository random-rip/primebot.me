<script setup lang="ts">
const { data: navigation } = await useNavigation()

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

// Pages without a translation (e.g. /settings) have no localized route, the switcher is hidden there
const otherLocale = computed(() => {
  const other = locales.value.find(l => l.code !== locale.value)
  const to = other && switchLocalePath(other.code)
  return other && to ? { ...other, to } : undefined
})
</script>

<template>
  <UHeader>
    <template #title>
      <AppLogo />
    </template>

    <UNavigationMenu
      :items="navigation?.header"
      variant="link"
    />

    <template #right>
      <UTooltip
        v-if="otherLocale"
        :text="$t('language.switch')"
      >
        <UButton
          :to="otherLocale.to"
          :locale="false"
          :label="otherLocale.code.toUpperCase()"
          :aria-label="otherLocale.name"
          :hreflang="otherLocale.language"
          icon="i-lucide-languages"
          color="neutral"
          variant="ghost"
        />
      </UTooltip>

      <UColorModeButton />

      <UButton
        v-for="link in navigation?.cta"
        :key="link.label"
        v-bind="link"
        class="hidden lg:flex"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="navigation?.header"
        orientation="vertical"
        class="-mx-2.5"
      />

      <div class="mt-4 flex flex-col gap-2">
        <UButton
          v-for="link in navigation?.cta"
          :key="link.label"
          v-bind="link"
          block
        />
      </div>
    </template>
  </UHeader>
</template>
