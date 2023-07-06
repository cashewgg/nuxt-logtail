<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
  import { useLogtail, onMounted } from '#imports';
  import { useFetch } from '#app';

  const logger = useLogtail()

  const { data } = await useFetch('/api/ping')

  onMounted(() => {
    logger.log('test composable')
  })
</script>
