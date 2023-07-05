import { Logtail as LogtailNode } from '@logtail/node'
import { Logtail as LogtailBrowser } from '@logtail/browser'
import { useNuxtApp } from '#imports'

export default function useLogtail(): LogtailBrowser | LogtailNode {
  const { $logtail } = useNuxtApp()

  return $logtail
}
