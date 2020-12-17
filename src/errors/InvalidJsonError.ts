import { Todo } from '../sharedTypes'

export default class InvalidJsonError extends Error {

    streamId: Todo
    jsonString: Todo
    parseError: Todo
    streamMessage: Todo

    constructor(streamId: Todo, jsonString: Todo, parseError: Todo, streamMessage: Todo) {
        super(`Invalid JSON in stream ${streamId}: ${jsonString}. Error while parsing was: ${parseError}`)
        this.streamId = streamId
        this.jsonString = jsonString
        this.parseError = parseError
        this.streamMessage = streamMessage
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}
