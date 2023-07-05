import { addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// Module options TypeScript interface definition
export interface ModuleOptions {
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
  hooks: {
    'vite:extendConfig': (viteInlineConfig) => {
      viteInlineConfig.plugins = [
        ...(viteInlineConfig.plugins || []),
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
        }),
      ]
      viteInlineConfig.optimizeDeps = {
        ...viteInlineConfig.optimizeDeps,
        include: ['stack-trace', 'cross-fetch']
      }
    },
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.nuxtLogtail = defu(nuxt.options.runtimeConfig.public.nuxtLogtail, {
      ...options
    })

    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    addImportsDir(resolver.resolve('runtime/composables'))
  }
})
