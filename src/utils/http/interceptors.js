import { getToken } from '@/utils'
import { resolveResError } from './helpers'

export function reqResolve(config) {
  // The request that does not require Token does not require token
  if (config.noNeedToken) {
    return config
  }

  const token = getToken()
  if (!token) {
    return Promise.reject({ code: 401, message: '登录已过期，请重新登录！' })
  }

  /**
   * *Add token
   * ! Certification plan: JWT Bearer
   */
  config.headers.Authorization = config.headers.Authorization || 'Bearer ' + token

  return config
}

export function reqReject(error) {
  return Promise.reject(error)
}

export function resResolve(response) {
  // TODO: Processing different response.headers
  const { data, status, config, statusText } = response
  if (data?.code !== 0) {
    const code = data?.code ?? status

    /** According to Code processing corresponding operations, and return the processing MESSAGE */
    const message = resolveResError(code, data?.message ?? statusText)

    /** Need an error reminder */
    !config.noNeedTip && window.$message?.error(message)
    return Promise.reject({ code, message, error: data || response })
  }
  return Promise.resolve(data)
}

export function resReject(error) {
  if (!error || !error.response) {
    const code = error?.code
    /** According to Code processing corresponding operations, and return the processing MESSAGE*/
    const message = resolveResError(code, error.message)
    window.$message?.error(message)
    return Promise.reject({ code, message, error })
  }
  const { data, status, config } = error.response
  const code = data?.code ?? status
  const message = resolveResError(code, data?.message ?? error.message)
  /** Need an error reminder */
  !config?.noNeedTip && window.$message?.error(message)
  return Promise.reject({ code, message, error: error.response?.data || error.response })
}
