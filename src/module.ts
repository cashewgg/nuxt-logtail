import { fileURLToPath } from 'url'
import { addImports, addTemplate, createResolver, defineNuxtModule, extendViteConfig, resolveModule } from '@nuxt/kit'
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
    const { resolve } = createResolver(import.meta.url)
    const resolveRuntimeModule = (path: string) => resolveModule(path, { paths: resolve('./runtime') })

    nuxt.options.runtimeConfig.public.nuxtLogtail = defu(nuxt.options.runtimeConfig.public.nuxtLogtail, {
      ...options
    })

    if (!options.sourceToken) {
      console.info('Logtail logging disabled, empty sourceToken')
    }

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // Add NuxtLogtail composables
    addImports({
      name: 'useLogtail',
      as: 'useLogtail',
      from: resolve(runtimeDir, 'composables/useLogtail')
    })

    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.alias = nitroConfig.alias || {}

      // Inline module runtime in Nitro bundle
      nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
        inline: [resolve('./runtime')]
      })
      nitroConfig.alias['#nuxtLogtail/server'] = resolveRuntimeModule('./composables')
    })

    addTemplate({
      filename: 'types/nuxt-logtail.d.ts',
      getContents: () => [
        'declare module \'#nuxtLogtail/server\' {',
        `  const useLogtail: typeof import('${resolve('./runtime/composables')}').useLogtail`,
        '}'
      ].join('\n')
    })

    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {}
      config.optimizeDeps.include = config.optimizeDeps.include || []
      config.optimizeDeps.exclude = config.optimizeDeps.exclude || []
      config.optimizeDeps.include.push(
        'cross-fetch'
      )
    })
  }
})
