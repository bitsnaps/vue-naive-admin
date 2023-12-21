import vue from '@vitejs/plugin-vue'

/**
 * * Unocss plug -in, atomic CSS
 * https://github.com/antfu/unocss
 */
import Unocss from 'unocss/vite'

// rollup packaging analysis plugin
import visualizer from 'rollup-plugin-visualizer'
// compression
import viteCompression from 'vite-plugin-compression'
// vite-vuedevtool
import VueDevTools from 'vite-plugin-vue-devtools'

import { configHtmlPlugin } from './html'
import { configMockPlugin } from './mock'
import unplugin from './unplugin'

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [VueDevTools(), vue(), ...unplugin, configHtmlPlugin(viteEnv, isBuild), Unocss()]

  if (viteEnv?.VITE_USE_MOCK) {
    plugins.push(configMockPlugin(isBuild))
  }

  if (viteEnv.VITE_USE_COMPRESS) {
    plugins.push(viteCompression({ algorithm: viteEnv.VITE_COMPRESS_TYPE || 'gzip' }))
  }

  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    )
  }

  return plugins
}
