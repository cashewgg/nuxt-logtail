import { addImportsDir, createResolver, defineNuxtModule, extendViteConfig } from '@nuxt/kit'
import { defu } from 'defu'

// Module options TypeScript interface definition
export interface ModuleOptions {
  sourceToken: string | null | undefined
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-logtail',
    configKey: 'nuxtLogtail'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    sourceToken: null
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.nuxtLogtail = defu(nuxt.options.runtimeConfig.public.nuxtLogtail, {
      ...options
    })

    if (!options.sourceToken) {
      console.info('[nuxt-logtail] Disabled logtail logging, empty sourceToken')

      return
    }

    const { resolve } = createResolver(import.meta.url)

    addImportsDir(resolve('runtime/composables'))

    extendViteConfig((config) => {
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
