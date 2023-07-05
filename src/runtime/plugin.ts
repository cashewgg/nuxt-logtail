import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { Browser as LogtailBrowser, Node as LogtailNode } from '@logtail/js'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  if (!runtimeConfig.public.nuxtLogtail.sourceToken) {
    throw new Error('Missing BetterStack source token')
  }

  if (typeof runtimeConfig.public.nuxtLogtail.sourceToken !== 'string') {
    throw new Error('BetterStack source token must be string')
  }

  const { sourceToken } = runtimeConfig.public.nuxtLogtail

  let logtail: LogtailNode | LogtailBrowser | null

  // @ts-ignore
  if (process.server) {
    logtail = new LogtailNode(sourceToken)
  } else {
    logtail = new LogtailBrowser(sourceToken)
  }

  return {
    provide: {
      logtail
    }
  }
})
