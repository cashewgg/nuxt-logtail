import { eventHandler } from 'h3'
import { useLogtail } from '#nuxtLogtail/server'

export default eventHandler(() => {
  console.log('test ping endpoint')
  const logger = useLogtail()

  logger.value?.log('test composable on server')

  return 'pong'
})
