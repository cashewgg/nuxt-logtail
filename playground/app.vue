<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
  import { useLogtail } from '#imports';

  const logtail = useLogtail()

  logtail.log('test logtail composable')
  console.log('test console log proxy')
</script>
