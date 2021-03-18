function formatValue(value: any): string {
    if (Array.isArray(value)) {
        return '[' + value.map((v) => formatValue(v)).join(',') + ']'
    } else if (!isNaN(value)) {
        return value.toString()
    } else {
        return `'${value}'`
    }

}

/**
 * Form a log-friendly string representation of a message
 * @param className -- name of the message class
 * @param addEndingDots -- whether to add "..." at the end of the body, signalling that some values are not shown
 * @param args -- pairs of (key, value) to print out, .e.g, ['streamId', '7wa7APtlTq6EC5iTCBy6dw'] => streamId='7wa7APtlTq6EC5iTCBy6dw'
 */
export function formLogFriendlyString(className: string, addEndingDots: boolean, ...args: any[]) {
    if (args.length % 2 !== 0) {
        throw new Error(`even amount of rest arguments required (got ${args.length})`)
    }
    let body = ''
    for (let i = 0; i < args.length - 1; i += 2) {
        const key = args[i].toString()
        const value =  formatValue(args[i+1])
        const delimiter = i < args.length - 3 ? ', ' : ''
        body += `${key}=${value}${delimiter}`
    }
    if (addEndingDots) {
        body += ', ...'
    }
    return `${className}{${body}}`
}
