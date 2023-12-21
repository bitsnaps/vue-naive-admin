import { defineStore } from 'pinia'
import { useDark } from '@vueuse/core'

const isDark = useDark()
export const useAppStore = defineStore('app', {
  state() {
    return {
      collapsed: false,
      isDark,
    }
  },
  actions: {
    switchCollapsed() {
      this.collapsed = !this.collapsed
    },
    setCollapsed(collapsed) {
      this.collapsed = collapsed
    },
    /** Set the dark mode */
    setDark(isDark) {
      this.isDark = isDark
    },
    /** Switch/close the dark mode */
    toggleDark() {
      this.isDark = !this.isDark
    },
  },
})
