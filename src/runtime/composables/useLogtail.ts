import { Browser as LogtailBrowser, Node as LogtailNode } from '@logtail/js'
import { useNuxtApp } from '#imports'

export default function useLogtail(): LogtailBrowser | LogtailNode {
  const { $logtail } = useNuxtApp()

  return $logtail
}
