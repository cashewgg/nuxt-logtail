import { Browser as LogtailBrowser, Node as LogtailNode } from '@logtail/js'

type SerializeConsoleLog = (...args) => string
type ConsoleProxyFunction = (logtail: LogtailBrowser | LogtailNode) => void

const serializeConsoleLog: SerializeConsoleLog = (...args) => {
  const result = []

  // Format if first argument is a string
  if (typeof args[0] === 'string') {
    const formattedMessage = args.shift().replace(/%[csdifoO]/g, (match) => {
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

const enableConsoleProxy: ConsoleProxyFunction = (logtail) => {
  const legacyLog = console.log
  const legacyWarn = console.warn
  const legacyError = console.error
  const legacyInfo = console.info

  console.log = (...args) => {
    legacyLog(...args)
    logtail.log(serializeConsoleLog(...args))
    logtail.flush()
  }

  console.info = (...args) => {
    legacyInfo(...args)
    logtail.info(serializeConsoleLog(...args))
    logtail.flush()
  }

  console.warn = (...args) => {
    legacyWarn(...args)
    logtail.warn(serializeConsoleLog(...args))
    logtail.flush()
  }

  console.error = (...args) => {
    legacyError(...args)
    logtail.error(serializeConsoleLog(...args))
    logtail.flush()
  }
}

export default enableConsoleProxy
