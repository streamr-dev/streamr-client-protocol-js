import ControlMessage from '../ControlMessage'

import ErrorResponse from './ErrorResponse'

import { Serializer } from '../../../Serializer'
import { PLACEHOLDER_REQUEST_ID_PROTOCOL_V1 } from '../../../sharedTypes'

const VERSION = 1

export default class ErrorResponseSerializerV1 extends Serializer<ErrorResponse> {
    toArray(errorResponse: ErrorResponse) {
        return [
            VERSION,
            ControlMessage.TYPES.ErrorResponse,
            errorResponse.errorMessage,
        ]
    }

    fromArray(arr: any) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            errorMessage,
        ] = arr

        return new ErrorResponse({
            version, errorMessage,
            requestId: PLACEHOLDER_REQUEST_ID_PROTOCOL_V1
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.ErrorResponse, new ErrorResponseSerializerV1())