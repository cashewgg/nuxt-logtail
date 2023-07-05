import { Browser as LogtailBrowser, Node as LogtailNode } from '@logtail/js'
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

import enableConsoleProxy from './utilities/enableConsoleProxy'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  const { sourceToken, proxyConsole } = runtimeConfig.public.nuxtLogtail

  if (!sourceToken) {
    throw new Error('Missing BetterStack source token')
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
