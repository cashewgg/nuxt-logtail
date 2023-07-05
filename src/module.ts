import { addImportsDir, addPlugin, createResolver, defineNuxtModule, extendViteConfig } from '@nuxt/kit'
import { defu } from 'defu'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// Module options TypeScript interface definition
export interface ModuleOptions {
  sourceToken: string | null | undefined
  proxyConsole: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-logtail',
    configKey: 'nuxtLogtail'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    sourceToken: null,
    proxyConsole: false,
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.nuxtLogtail = defu(nuxt.options.runtimeConfig.public.nuxtLogtail, {
      ...options
    })

    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    addImportsDir(resolver.resolve('runtime/composables'))

    extendViteConfig((config) => {
      config.plugins = config.plugins || []
      config.plugins.push(
        nodePolyfills({
          // To exclude specific polyfills, add them to this list.
          exclude: [
            'fs', // Excludes the polyfill for `fs` and `node:fs`.
          ],
          // Whether to polyfill specific globals.
          globals: {
            Buffer: true, // can also be 'build', 'dev', or false
            global: true,
            process: true,
          },
          // Whether to polyfill `node:` protocol imports.
          protocolImports: true,
        })
      )

      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.exclude = config.optimizeDeps.exclude || []
      config.optimizeDeps.include.push(
        'stack-trace',
        'cross-fetch'
      )
    })
  }
})
