import { Logtail as Logtail } from '@logtail/node'
import { ref, Ref } from '@vue/reactivity';
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

import enableConsoleProxy from './utilities/enableConsoleProxy'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const logtail: Ref<Logtail | null> = ref(null);

  const { sourceToken, proxyConsole } = runtimeConfig.public.nuxtLogtail

  if (typeof sourceToken !== 'string') {
    throw new Error('BetterStack source token must be string')
  }

  if (logtail.value) {
    return;
  }

  logtail.value = new Logtail(sourceToken);

  if (proxyConsole) {
    enableConsoleProxy(logtail)
  }

  return {
    provide: {
      logtail
    }
  }
})
