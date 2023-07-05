import { eventHandler } from 'h3'

export default eventHandler(() => {
  console.log('test ping endpoint')

  return 'pong'
})
