import { Todo } from '../sharedTypes'

export default class UnsupportedVersionError extends Error {
    
    version: Todo

    constructor(version: Todo, message: Todo) {
        super(`Unsupported version: ${version}, message: ${message}`)
        this.version = version
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
