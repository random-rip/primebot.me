<script setup lang="ts">
const { data: navigation } = await useNavigation()
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
