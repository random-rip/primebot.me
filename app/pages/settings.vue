<script setup lang="ts">
// Reached via the temporary link the bot sends on `/settings`, e.g. /settings?enc=…&hash=…&platform=discord
interface Setting {
  key: string
  value: boolean | string
}

interface TeamSettings {
  team_id: number
  team_name: string
  channel_name: string | null
  platforms: string[] | null
  settings: Setting[] | null
  expiring_at: string | null
  logo_url: string | null
}

interface SettingField {
  key: string
  label: string
  description: string
  discordOnly?: boolean
}

const sections: { title: string, description: string, fields: SettingField[] }[] = [{
  title: 'Benachrichtigungen',
  description: 'Lege fest, bei welchen Ereignissen der PrimeBot eine Nachricht schickt.',
  fields: [
    { key: 'WEEKLY_MATCH_DAY', label: 'Wöchentliche Benachrichtigung', description: 'Eine Übersicht über eure Matches der kommenden sieben Tage.' },
    { key: 'NEW_MATCHES_NOTIFICATION', label: 'Neue Matches', description: 'Wenn eurem Team neue Matches zugeordnet werden.' },
    { key: 'LINEUP_NOTIFICATION', label: 'Lineup-Änderungen', description: 'Wenn euer Gegner ein Lineup aufstellt oder ändert.' },
    { key: 'TEAM_SCHEDULING_SUGGESTION', label: 'Eigene Terminvorschläge', description: 'Wenn euer Team neue Terminvorschläge macht.' },
    { key: 'ENEMY_SCHEDULING_SUGGESTION', label: 'Terminvorschläge vom Gegner', description: 'Wenn euer Gegner neue Terminvorschläge macht.' },
    { key: 'SCHEDULING_CONFIRMATION', label: 'Terminbestätigungen', description: 'Wenn ein Termin für ein Match feststeht.' },
    { key: 'NEW_COMMENTS_OF_UNKNOWN_USERS', label: 'Neue Kommentare', description: 'Wenn jemand außerhalb eures Teams ein Match kommentiert.' },
    { key: 'MATCH_RESULT', label: 'Matchergebnisse', description: 'Wenn das Ergebnis eines Matches eingetragen wurde.' }
  ]
}, {
  title: 'Discord',
  description: 'Zusätzliche Funktionen, die es nur auf Discord gibt.',
  fields: [
    { key: 'ENEMY_SCHEDULING_SUGGESTION_POLL', label: 'Umfrage bei Terminvorschlägen', description: 'Startet eine Umfrage, wenn euer Gegner Termine vorschlägt.', discordOnly: true },
    { key: 'CREATE_DISCORD_EVENT_ON_SCHEDULING_CONFIRMATION', label: 'Discord-Event bei Terminbestätigungen', description: 'Legt für bestätigte Matches ein Event auf eurem Server an.', discordOnly: true }
  ]
}]

const scoutingOptions = ['op.gg', 'u.gg', 'xdx.gg']

const languageOptions = [
  { label: 'Deutsch', value: 'de' },
  { label: 'Englisch', value: 'en' }
]

const errorMessages: Record<string, string> = {
  url_expired: 'Der Link ist abgelaufen. Fordere mit /settings einen neuen an.',
  missing_content: 'Es fehlen Einstellungen. Lade die Seite neu und versuche es noch einmal.',
  invalid_content: 'Die Einstellungen sind ungültig. Lade die Seite neu und versuche es noch einmal.'
}

useSeoMeta({
  title: 'Einstellungen',
  robots: 'noindex'
})

const route = useRoute()
const toast = useToast()
const { apiBase } = useRuntimeConfig().public

const credentials = computed(() => ({
  enc: typeof route.query.enc === 'string' ? route.query.enc : '',
  hash: typeof route.query.hash === 'string' ? route.query.hash : '',
  platform: typeof route.query.platform === 'string' ? route.query.platform : ''
}))
const hasCredentials = computed(() => !!credentials.value.enc && !!credentials.value.hash)

// The link is personal and short-lived, so this is never prerendered
const { data: team, error } = useFetch<TeamSettings>('/api/v1/settings/', {
  baseURL: apiBase,
  query: credentials,
  server: false,
  immediate: hasCredentials.value
})

// Editable copy of the settings as key → value, sent back as a list on save
const form = ref<Record<string, boolean | string>>({})
watch(team, (value) => {
  form.value = Object.fromEntries((value?.settings ?? []).map(setting => [setting.key, setting.value]))
}, { immediate: true })

const isDiscord = computed(() => (team.value?.platforms ?? [credentials.value.platform]).includes('discord'))
const visibleSections = computed(() => sections
  .map(section => ({ ...section, fields: section.fields.filter(field => !field.discordOnly || isDiscord.value) }))
  .filter(section => section.fields.length))

const now = useNow({ interval: 1000 })
const remainingMs = computed(() => team.value?.expiring_at ? new Date(team.value.expiring_at).getTime() - now.value.getTime() : 0)
const isExpired = computed(() => !!team.value && remainingMs.value <= 0)
const countdown = computed(() => {
  const totalSeconds = Math.max(0, Math.floor(remainingMs.value / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const saving = ref(false)

async function save() {
  if (!team.value) {
    return
  }

  saving.value = true
  try {
    team.value = await $fetch<TeamSettings>('/api/v1/settings/', {
      baseURL: apiBase,
      method: 'POST',
      body: {
        ...team.value,
        settings: Object.entries(form.value).map(([key, value]) => ({ key, value })),
        enc: credentials.value.enc,
        hash: credentials.value.hash
      }
    })
    toast.add({ title: 'Einstellungen gespeichert', color: 'success', icon: 'i-lucide-check' })
  } catch (e) {
    const code = (e as { data?: { errors?: string[] } }).data?.errors?.find(code => code in errorMessages)
    toast.add({
      title: 'Speichern fehlgeschlagen',
      description: code ? errorMessages[code] : 'Versuche es später noch einmal.',
      color: 'error',
      icon: 'i-lucide-circle-alert'
    })
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <UContainer>
    <UPage class="mx-auto max-w-3xl">
      <UEmpty
        v-if="!hasCredentials || error"
        icon="i-lucide-link-2-off"
        title="Link ungültig"
        description="Dieser Einstellungs-Link ist ungültig oder abgelaufen. Schreibe /settings in euren Channel, um einen neuen Link zu bekommen."
        variant="naked"
        size="lg"
        :actions="[{ label: 'Zur Startseite', to: '/', color: 'neutral', variant: 'subtle' }]"
        class="py-24"
      />

      <template v-else>
        <UPageHeader
          title="Einstellungen"
          :ui="{ wrapper: 'flex-row items-center flex-wrap justify-between' }"
        >
          <template #headline>
            <div class="flex items-center gap-3">
              <USkeleton
                v-if="!team"
                class="size-8 rounded-full"
              />
              <UAvatar
                v-else
                :src="team.logo_url ?? undefined"
                :alt="team.team_name"
                size="md"
              />
              <USkeleton
                v-if="!team"
                class="h-5 w-40"
              />
              <span
                v-else
                class="text-highlighted"
              >{{ team.team_name }}</span>
            </div>
          </template>

          <template #description>
            <template v-if="team?.channel_name">
              Für den Channel <span class="font-medium text-highlighted">{{ team.channel_name }}</span>.
            </template>
            Änderungen gelten erst nach dem Speichern.
          </template>

          <template #links>
            <UBadge
              v-if="team"
              :label="isExpired ? 'Link abgelaufen' : `Gültig noch ${countdown}`"
              :color="isExpired ? 'error' : remainingMs < 5 * 60 * 1000 ? 'warning' : 'neutral'"
              icon="i-lucide-timer"
              variant="subtle"
              size="lg"
              class="font-mono tabular-nums"
            />
          </template>
        </UPageHeader>

        <UPageBody>
          <UAlert
            v-if="isExpired"
            title="Der Link ist abgelaufen"
            description="Schreibe /settings in euren Channel, um einen neuen Link zu bekommen. Ungespeicherte Änderungen gehen dabei verloren."
            color="error"
            variant="subtle"
            icon="i-lucide-timer-off"
          />

          <section
            v-for="section in visibleSections"
            :key="section.title"
            class="space-y-4"
          >
            <div>
              <h2 class="text-lg font-semibold text-highlighted">
                {{ section.title }}
              </h2>
              <p class="text-sm text-muted">
                {{ section.description }}
              </p>
            </div>

            <UPageCard variant="subtle">
              <template
                v-for="(field, index) in section.fields"
                :key="field.key"
              >
                <UFormField
                  :name="field.key"
                  :label="field.label"
                  :description="field.description"
                  class="flex items-center justify-between gap-4"
                >
                  <USkeleton
                    v-if="!team"
                    class="h-5 w-9 rounded-full"
                  />
                  <USwitch
                    v-else
                    :model-value="form[field.key] === true"
                    :disabled="isExpired"
                    @update:model-value="form[field.key] = $event"
                  />
                </UFormField>
                <USeparator v-if="index < section.fields.length - 1" />
              </template>
            </UPageCard>
          </section>

          <section class="space-y-4">
            <div>
              <h2 class="text-lg font-semibold text-highlighted">
                Allgemein
              </h2>
              <p class="text-sm text-muted">
                Sprache des Bots und die Seite für Multi-Links zu Lineups.
              </p>
            </div>

            <UPageCard variant="subtle">
              <UFormField
                name="SCOUTING_WEBSITE"
                label="Scouting-Seite"
                description="Wird für Links zu den Spieler:innen eurer Gegner verwendet."
                class="flex items-center justify-between gap-4"
              >
                <USelect
                  v-model="form.SCOUTING_WEBSITE as string"
                  :items="scoutingOptions"
                  :loading="!team"
                  :disabled="isExpired"
                  class="w-32"
                />
              </UFormField>
              <USeparator />
              <UFormField
                name="LANGUAGE"
                label="Sprache"
                description="In dieser Sprache schreibt der PrimeBot in euren Channel."
                class="flex items-center justify-between gap-4"
              >
                <USelect
                  v-model="form.LANGUAGE as string"
                  :items="languageOptions"
                  :loading="!team"
                  :disabled="isExpired"
                  class="w-32"
                />
              </UFormField>
            </UPageCard>
          </section>

          <div class="flex justify-end">
            <UButton
              label="Speichern"
              icon="i-lucide-save"
              size="lg"
              :loading="saving"
              :disabled="!team || isExpired"
              @click="save"
            />
          </div>
        </UPageBody>
      </template>
    </UPage>
  </UContainer>
</template>
