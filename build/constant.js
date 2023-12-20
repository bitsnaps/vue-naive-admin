export const OUTPUT_DIR = 'dist'

export const PROXY_CONFIG = {
  /**
   * @desc    Replace the matching value
   * @Request path  http://localhost:3100/api/user
   * @Forwarding path  http://localhost:8080/user
   */
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp('^/api'), ''),
  },
  /**
   * @desc    Do not replace the matching value
   * @Request path  http://localhost:3100/api/v2/user
   * @Forwarding path  http://localhost:8080/api/v2/user
   */
  '/api/v2': {
    target: 'http://localhost:8080',
    changeOrigin: true,
  },
  /**
   * @desc    Replace some matching value
   * @Request path  http://localhost:3100/api/v3/user
   * @Forwarding path  http://localhost:8080/user
   */
  '/api/v3': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp('^/api'), ''),
  },
}
