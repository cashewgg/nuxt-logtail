import { Logtail as LogtailNode } from '@logtail/node'
import { Logtail as LogtailBrowser } from '@logtail/browser'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

import enableConsoleProxy from './utilities/enableConsoleProxy'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  const { sourceToken, proxyConsole } = runtimeConfig.public.nuxtLogtail

  if (!sourceToken) {
    console.info('[nuxt-logtail] Disabled logtail logging, empty sourceToken')

    return
  }

  if (typeof sourceToken !== 'string') {
    throw new Error('BetterStack source token must be string')
  }

  let logtail: LogtailNode | LogtailBrowser | null

  if (process.server) {
    logtail = new LogtailNode(sourceToken)
  } else {
    logtail = new LogtailBrowser(sourceToken)
  }

  if (proxyConsole) {
    enableConsoleProxy(logtail)
  }

  return {
    provide: {
      logtail
    }
  }
})
