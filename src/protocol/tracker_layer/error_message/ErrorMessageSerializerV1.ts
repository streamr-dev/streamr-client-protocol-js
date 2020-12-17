// @ts-nocheck
import TrackerMessage from '../TrackerMessage'

import ErrorMessage from './ErrorMessage'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class ErrorMessageSerializerV1 extends Serializer<Todo> {
    toArray(errorMessage: Todo) {
        return [
            VERSION,
            TrackerMessage.TYPES.ErrorMessage,
            errorMessage.requestId,
            errorMessage.errorCode,
            errorMessage.targetNode,
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            errorCode,
            targetNode
        ] = arr

        return new ErrorMessage({
            version, requestId, errorCode, targetNode
        })
    }
}

TrackerMessage.registerSerializer(VERSION, TrackerMessage.TYPES.ErrorMessage, new ErrorMessageSerializerV1())
