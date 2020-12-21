import ControlMessage from '../ControlMessage'

import ErrorResponse from './ErrorResponse'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class ErrorResponseSerializerV1 extends Serializer<ErrorResponse> {
    toArray(errorResponse: ErrorResponse) {
        return [
            VERSION,
            ControlMessage.TYPES.ErrorResponse,
            errorResponse.errorMessage,
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            errorMessage,
        ] = arr

        return new ErrorResponse({
            version, errorMessage
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.ErrorResponse, new ErrorResponseSerializerV1())
