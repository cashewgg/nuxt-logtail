<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
  import { useLogtail } from '#imports';

  const logtail = useLogtail()

  logtail.info('test')
</script>
