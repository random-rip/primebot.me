<script setup lang="ts">
const { data, status } = useBotStatus()

const services = computed(() => [
  { label: 'Discord Bot', icon: 'i-simple-icons-discord', online: data.value?.discord_status },
  { label: 'Telegram Bot', icon: 'i-simple-icons-telegram', online: data.value?.telegram_status },
  { label: 'Prime League API', icon: 'i-lucide-server', online: data.value?.prime_league_status }
])
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-3">
    <UCard
      v-for="service in services"
      :key="service.label"
    >
      <div class="flex items-center justify-between gap-4">
        <span class="flex items-center gap-2 font-medium">
          <UIcon
            :name="service.icon"
            class="size-5"
          />
          {{ service.label }}
        </span>

        <USkeleton
          v-if="status === 'idle' || status === 'pending'"
          class="h-6 w-16"
        />
        <UBadge
          v-else-if="status === 'error'"
          :label="$t('status.unknown')"
          color="neutral"
          variant="subtle"
        />
        <UBadge
          v-else
          :label="$t(service.online ? 'status.online' : 'status.offline')"
          :color="service.online ? 'success' : 'error'"
          variant="subtle"
        />
      </div>
    </UCard>
  </div>
</template>
