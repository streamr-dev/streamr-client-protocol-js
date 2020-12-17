import { Todo } from '../sharedTypes'

export default class UnsupportedTypeError extends Error {
    
    type: Todo
    
    constructor(type: Todo, message: Todo) {
        super(`Unsupported type: ${type}, message: ${message}`)
        this.type = type
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
