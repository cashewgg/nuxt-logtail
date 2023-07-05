import { Logtail } from '@logtail/node'
import { Ref } from '@vue/reactivity';

type SerializeConsoleLog = (...args: any[]) => string
type EnableConsoleProxy = (logtail: Ref<Logtail | null>) => void

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

const enableConsoleProxy: EnableConsoleProxy = (logtail) => {
  const legacyLog = console.log
  const legacyWarn = console.warn
  const legacyError = console.error
  const legacyInfo = console.info

  console.log = (...args) => {
    legacyLog(...args)
    logtail.value?.log(serializeConsoleLog(...args))
  }

  console.info = (...args) => {
    legacyInfo(...args)
    logtail.value?.info(serializeConsoleLog(...args))
  }

  console.warn = (...args) => {
    legacyWarn(...args)
    logtail.value?.warn(serializeConsoleLog(...args))
  }

  console.error = (...args) => {
    legacyError(...args)
    logtail.value?.error(serializeConsoleLog(...args))
  }
}

export default enableConsoleProxy
