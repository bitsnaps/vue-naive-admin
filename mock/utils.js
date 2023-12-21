export function resolveToken(authorization) {
  /**
   * * jwt token
   * * Bearer + token
   * ! Authentication: Bearer
   */
  const reqTokenSplit = authorization.split(' ')
  if (reqTokenSplit.length === 2) {
    return reqTokenSplit[1]
  }
  return ''
}
