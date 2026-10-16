<script setup lang="ts">
const { locale } = useI18n()

const { data } = await useAsyncData(() => `feature-matrix-${locale.value}`, () => queryCollection(`features_${locale.value}`).first())

const columns = [
  { key: 'discord', label: 'Discord', icon: 'i-simple-icons-discord' },
  { key: 'telegram', label: 'Telegram', icon: 'i-simple-icons-telegram' },
  { key: 'primeLeague', label: 'Prime League InApp & E-Mail', icon: 'i-lucide-mail' }
] as const
</script>

<template>
  <div
    v-if="data"
    class="my-5 overflow-x-auto rounded-md border border-muted"
  >
    <table class="w-full text-sm">
      <thead class="bg-muted">
        <tr>
          <th class="px-4 py-3 text-left font-semibold">
            <span class="sr-only">{{ $t('features.feature') }}</span>
          </th>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-3 text-center font-semibold"
          >
            <span class="inline-flex items-center gap-1.5">
              <UIcon
                :name="column.icon"
                class="size-4 shrink-0"
              />
              {{ column.label }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-muted">
        <tr
          v-for="item in data.items"
          :key="item.label"
        >
          <td class="px-4 py-3">
            {{ item.label }}
          </td>
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-4 py-3 text-center"
          >
            <UIcon
              :name="item[column.key] ? 'i-lucide-circle-check' : 'i-lucide-circle-minus'"
              :class="item[column.key] ? 'text-success' : 'text-dimmed'"
              class="size-5"
            />
            <span class="sr-only">{{ $t(item[column.key] ? 'features.yes' : 'features.no') }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
