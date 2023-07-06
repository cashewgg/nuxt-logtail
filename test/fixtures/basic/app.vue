<template>
  <div>basic</div>
</template>

<script setup>
  import { useLogtail } from '#imports';

  const logger = useLogtail()

  logger.value.log('test logtail composable')
  console.log('test console log proxy')
</script>
