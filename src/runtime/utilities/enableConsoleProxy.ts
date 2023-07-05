import { Browser as LogtailBrowser, Node as LogtailNode } from '@logtail/js'

type SerializeConsoleLog = (...args) => string
type ConsoleLog = (...args) => void
type ConsoleProxyFunction = (logtail: LogtailBrowser | LogtailNode) => void

declare global {
	interface Console {
    legacyLog: ConsoleLog
    legacyWarn: ConsoleLog
    legacyError: ConsoleLog
    legacyInfo: ConsoleLog
	}
}

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
	console.legacyLog = console.log
	console.legacyWarn = console.warn
	console.legacyError = console.error
	console.legacyInfo = console.info

	console.log = (...args) => {
		console.legacyLog(...args)
		logtail.log(serializeConsoleLog(...args))
	}

	console.info = (...args) => {
		console.legacyInfo(...args)
		logtail.info(serializeConsoleLog(...args))
	}

	console.warn = (...args) => {
		console.legacyWarn(...args)
    logtail.warn(serializeConsoleLog(...args))
	}

	console.error = (...args) => {
		console.legacyError(...args)
    logtail.error(serializeConsoleLog(...args))
	}
}

export default enableConsoleProxy
