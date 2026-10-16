<script setup lang="ts">
const { data: navigation } = await useNavigation()
</script>

<template>
  <UFooter :ui="{ container: 'border-t border-default lg:py-8' }">
    <template #left>
      <p class="text-sm text-muted">
        © {{ new Date().getFullYear() }} PrimeBot
      </p>
    </template>

    <template #right>
      <UButton
        v-for="link in navigation?.footer"
        :key="link.label"
        v-bind="link"
        color="neutral"
        variant="link"
        size="sm"
      />
    </template>
  </UFooter>
</template>
