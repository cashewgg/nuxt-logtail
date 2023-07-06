import { Logtail } from '@logtail/browser'
import { ref, Ref } from '@vue/reactivity';
import { useRuntimeConfig } from '#app';

type SerializeConsoleLog = (...args: any[]) => string
type NuxtLogtailLogFunction = (...args: any[]) => void

interface NuxtLogtailLogger {
  log: NuxtLogtailLogFunction
  info: NuxtLogtailLogFunction
  warn: NuxtLogtailLogFunction
  error: NuxtLogtailLogFunction
}

const serializeConsoleLog: SerializeConsoleLog = (...args) => {
  const result = []

  // Format if first argument is a string
  if (typeof args[0] === 'string') {
    const formattedMessage = args.shift().replace(/%[csdifoO]/g, (match: any) => {
      // Keep raw token if no substitution args left
      if (args.length === 0) return match

      switch (match) {
        // Formatting (omitted)
        case '%c':
          args.shift()
          return ''

        // String
        case '%s':
          return String(args.shift())

        // Integer
        case '%d':
        case '%i':
          return parseInt(args.shift())

        // Float
        case '%f':
          return parseFloat(args.shift())

        // Object
        case '%o':
        case '%O':
          return JSON.stringify(args.shift())
      }

      // Keep raw token if not replaced
      return match
    })

    if (formattedMessage.length > 0) {
      result.push(formattedMessage)
    }
  }

  // Serialize remaining arguments
  const formattedArgs = args.map((arg) => typeof arg === 'string' ? arg : JSON.stringify(arg))

  result.push(...formattedArgs)

  return result.join(' ')
};

export default function useLogtail(): Ref<NuxtLogtailLogger | null> {
  const runtimeConfig = useRuntimeConfig()
  const logger: Ref<NuxtLogtailLogger | null> = ref(null);

  const { sourceToken } = runtimeConfig.public.nuxtLogtail

  if (typeof sourceToken !== 'string') {
    throw new Error('BetterStack source token must be string')
  }

  if (logger.value) {
    return logger
  }

  const logtail = new Logtail(sourceToken)

  logger.value = {
    log(...args) {
      console.log(...args)
      logtail.log(serializeConsoleLog(...args))
    },

    info(...args) {
      console.info(...args)
      logtail.info(serializeConsoleLog(...args))
    },

    warn(...args) {
      console.warn(...args)
      logtail.warn(serializeConsoleLog(...args))
    },

    error(...args) {
      console.error(...args)
      logtail.error(serializeConsoleLog(...args))
    }
  }

  return logger
}
