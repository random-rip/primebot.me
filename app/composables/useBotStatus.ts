export interface BotStatus {
  registered_teams: number
  discord_status: boolean
  telegram_status: boolean
  prime_league_status: boolean
}

// Live data from the PrimeBot backend, always fetched in the browser so it stays current on a static build
export function useBotStatus() {
  const { apiBase } = useRuntimeConfig().public

  return useFetch<BotStatus>('/api/v1/status/', {
    key: 'bot-status',
    baseURL: apiBase,
    server: false,
    lazy: true
  })
}
