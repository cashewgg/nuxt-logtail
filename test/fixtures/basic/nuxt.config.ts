import NuxtLogtail from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    NuxtLogtail
  ],
  nuxtLogtail: {
    sourceToken: process.env.BETTERSTACK_SOURCE_TOKEN,
    proxyConsole: true
  },
})
