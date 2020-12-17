import { Todo } from '../sharedTypes'

export function parse(millisOrString: Todo) {
    if (typeof millisOrString === 'number') {
        return millisOrString
    }

    const timestamp = Number(millisOrString) || Date.parse(millisOrString)

    if (Number.isInteger(timestamp)) {
        return timestamp
    }

    throw new Error(`Invalid timestamp: ${millisOrString}`)
}
