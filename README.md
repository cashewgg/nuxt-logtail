<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: NuxtLogtail
- Package name: nuxt-logtail
- Description: Logtail implementation for nuxt 3
-->

# NuxtLogtail

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Logtail implementation for nuxt 3.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

- [🏀 Online playground](https://stackblitz.com/github/kesuio/nuxt-logtail?file=playground%2Fapp.vue)
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- ⛰ &nbsp;SSR compatible
- 🚠 &nbsp;Hooks into console

## Quick Setup

1. Add `nuxt-logtail` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-logtail

# Using yarn
yarn add --dev nuxt-logtail

# Using npm
npm install --save-dev nuxt-logtail
```

2. Add `nuxt-logtail` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-logtail'
  ]
})
```

That's it! You can now use NuxtLogtail in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-logtail/latest.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-version-href]: https://npmjs.com/package/nuxt-logtail

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-logtail.svg?style=flat&colorA=18181B&colorB=28CF8D

[npm-downloads-href]: https://npmjs.com/package/nuxt-logtail

[license-src]: https://img.shields.io/npm/l/nuxt-logtail.svg?style=flat&colorA=18181B&colorB=28CF8D

[license-href]: https://npmjs.com/package/nuxt-logtail

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js

[nuxt-href]: https://nuxt.com
