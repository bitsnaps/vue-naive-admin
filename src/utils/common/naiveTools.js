import * as NaiveUI from 'naive-ui'
import { isNullOrUndef } from '@/utils'
import { naiveThemeOverrides as themeOverrides } from '~/settings'
import { useAppStore } from '@/store/modules/app'

export function setupMessage(NMessage) {
  let loadingMessage = null
  class Message {
    /**
     * rule:
     * * Loading Message only display only one, the new message will replace the displayed MESSAGE that is being displayed
     * * Loading Message will not be automatically cleared, unless it is replaced with non -Loading Message, non -Loading Message defaults to automatically clear after 2 seconds
     */

    removeMessage(message = loadingMessage, duration = 2000) {
      setTimeout(() => {
        if (message) {
          message.destroy()
          message = null
        }
      }, duration)
    }

    showMessage(type, content, option = {}) {
      if (loadingMessage && loadingMessage.type === 'loading') {
        // If you exist, replace the displaying message that is being displayed
        loadingMessage.type = type
        loadingMessage.content = content

        if (type !== 'loading') {
          // Non -Loading MESSAGE needs to be set up automatically
          this.removeMessage(loadingMessage, option.duration)
        }
      } else {
        // There is no display Loading, and a new message is created.
        let message = NMessage[type](content, option)
        if (type === 'loading') {
          loadingMessage = message
        }
      }
    }

    loading(content) {
      this.showMessage('loading', content, { duration: 0 })
    }

    success(content, option = {}) {
      this.showMessage('success', content, option)
    }

    error(content, option = {}) {
      this.showMessage('error', content, option)
    }

    info(content, option = {}) {
      this.showMessage('info', content, option)
    }

    warning(content, option = {}) {
      this.showMessage('warning', content, option)
    }
  }

  return new Message()
}

export function setupDialog(NDialog) {
  NDialog.confirm = function (option = {}) {
    const showIcon = !isNullOrUndef(option.title)
    return NDialog[option.type || 'warning']({
      showIcon,
      positiveText: 'Sure',
      negativeText: 'Cancel',
      onPositiveClick: option.confirm,
      onNegativeClick: option.cancel,
      onMaskClick: option.cancel,
      ...option,
    })
  }

  return NDialog
}

export function setupNaiveDiscreteApi() {
  const appStore = useAppStore()
  const configProviderProps = computed(() => ({
    theme: appStore.isDark ? NaiveUI.darkTheme : undefined,
    themeOverrides,
  }))
  const { message, dialog, notification, loadingBar } = NaiveUI.createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar'],
    { configProviderProps }
  )

  window.$loadingBar = loadingBar
  window.$notification = notification
  window.$message = setupMessage(message)
  window.$dialog = setupDialog(dialog)
}
