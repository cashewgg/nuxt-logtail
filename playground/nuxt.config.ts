export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtLogtail: {
    sourceToken: process.env.BETTERSTACK_SOURCE_TOKEN,
    proxyConsole: true
  },
  devtools: { enabled: true }
})
