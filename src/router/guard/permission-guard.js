import { getToken, refreshAccessToken, isNullOrWhitespace } from '@/utils'

const WHITE_LIST = ['/login', '/404']
export function createPermissionGuard(router) {
  router.beforeEach(async (to) => {
    const token = getToken()

    /** There is no token situation */
    if (isNullOrWhitespace(token)) {
      if (WHITE_LIST.includes(to.path)) return true
      return { path: 'login', query: { ...to.query, redirect: to.path } }
    }

    /** In the case of token */
    if (to.path === '/login') return { path: '/' }

    refreshAccessToken()
    return true
  })
}
