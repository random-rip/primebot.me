export function useNavigation() {
  return useAsyncData('navigation', () => queryCollection('navigation').first())
}
