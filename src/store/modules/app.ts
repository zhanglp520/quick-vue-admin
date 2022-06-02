import { defineStore } from 'pinia'

interface AppState {
  language: string
}

export const useAppStore = defineStore('appState', {
  state: (): AppState => {
    return {
      language: 'zh',
    }
  },
  getters: {
    getLanguage(): string {
      return this.language
    },
  },
  actions: {
    setLanguage(language: string) {
      this.language = language
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'test',
        storage: localStorage,
        paths: ['language'],
      },
    ],
  },
})
