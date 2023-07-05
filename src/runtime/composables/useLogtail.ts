import { Logtail } from '@logtail/node'
import { Ref } from '@vue/reactivity';
import { useNuxtApp } from '#app';

export default function useLogtail(): Ref<Logtail | null> {
  const { $logtail } = useNuxtApp()

  return $logtail
}
