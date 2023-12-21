import { useUserStore } from '@/store'

export function addBaseParams(params) {
  if (!params.userId) {
    params.userId = useUserStore().userId
  }
}

export function resolveResError(code, message) {
  switch (code) {
    case 400:
      message = message ?? 'Request parameter error'
      break
    case 401:
      message = message ?? 'Log in to expire'
      useUserStore().logout()
      break
    case 403:
      message = message ?? 'permission denied'
      break
    case 404:
      message = message ?? 'Resources or interfaces do not exist'
      break
    case 500:
      message = message ?? 'Server abnormalities'
      break
    default:
      message = message ?? `【${code}】: Unknown!`
      break
  }
  return message
}
