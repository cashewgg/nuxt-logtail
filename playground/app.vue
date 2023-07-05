<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
  import { useLogtail } from '#imports';
  import { useFetch } from '#app';

  const logtail = useLogtail()

  const { data } = await useFetch('/api/ping')

  console.log(data.value)

  logtail.value?.log('test logtail composable')
  console.log('test console log proxy')
</script>
