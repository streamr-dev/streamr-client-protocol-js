import ControlMessage from '../ControlMessage'

import ErrorResponse from './ErrorResponse'

const VERSION = 1

export default class ErrorResponseSerializerV1 {
    static toArray(errorResponse) {
        return [
            VERSION,
            ErrorResponse.TYPE,
            errorResponse.errorMessage,
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            errorMessage,
        ] = arr

        return new ErrorResponse(version, null, errorMessage)
    }
}

ControlMessage.registerSerializer(VERSION, ErrorResponse.TYPE, ErrorResponseSerializerV1)
