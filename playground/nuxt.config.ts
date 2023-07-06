export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtLogtail: {
    sourceToken: process.env.BETTERSTACK_SOURCE_TOKEN,
  },
  devtools: { enabled: true }
})
