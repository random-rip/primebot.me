<script setup lang="ts">
const { data } = useBotStatus()
</script>

<template>
  <p
    v-if="data?.registered_teams"
    class="text-lg font-semibold text-primary"
  >
    {{ data.registered_teams.toLocaleString('de-DE') }} Teams benutzen bereits den PrimeBot (. ❛ ᴗ ❛.)
  </p>
</template>
