import { addImportsDir, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'

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
