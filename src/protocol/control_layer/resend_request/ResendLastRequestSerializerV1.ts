// @ts-nocheck
import ControlMessage from '../ControlMessage'

import ResendLastRequest from './ResendLastRequest'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class ResendLastRequestSerializerV1 extends Serializer<Todo> {
    toArray(resendLastRequest: Todo) {
        return [
            VERSION,
            ControlMessage.TYPES.ResendLastRequest,
            resendLastRequest.streamId,
            resendLastRequest.streamPartition,
            resendLastRequest.requestId,
            resendLastRequest.numberLast,
            resendLastRequest.sessionToken,
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            streamId,
            streamPartition,
            requestId,
            numberLast,
            sessionToken,
        ] = arr

        return new ResendLastRequest({
            version, requestId, streamId, streamPartition, numberLast, sessionToken
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.ResendLastRequest, new ResendLastRequestSerializerV1())
