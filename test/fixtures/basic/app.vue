<template>
  <div>basic</div>
</template>

<script setup>
  import { useLogtail } from '#imports';

  const logger = useLogtail()

  logger.log('test logtail composable')
  console.log('test console log proxy')
</script>
