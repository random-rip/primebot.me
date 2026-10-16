<script setup lang="ts">
const { data } = useBotStatus()
const { locale } = useI18n()
</script>

<template>
  <p
    v-if="data?.registered_teams"
    class="text-lg font-semibold text-primary"
  >
    {{ $t('teams.registered', { count: data.registered_teams.toLocaleString(locale) }) }}
  </p>
</template>
