import ControlMessage from '../ControlMessage'

import ErrorResponse from './ErrorResponse'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 2

export default class ErrorResponseSerializerV2 extends Serializer<Todo> {
    toArray(errorResponse: Todo) {
        return [
            VERSION,
            ControlMessage.TYPES.ErrorResponse,
            errorResponse.requestId,
            errorResponse.errorMessage,
            errorResponse.errorCode,
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            errorMessage,
            errorCode,
        ] = arr

        return new ErrorResponse({
            version, requestId, errorMessage, errorCode
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.ErrorResponse, new ErrorResponseSerializerV2())
