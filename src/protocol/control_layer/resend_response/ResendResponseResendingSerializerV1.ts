// @ts-nocheck
import ControlMessage from '../ControlMessage'

import ResendResponseResending from './ResendResponseResending'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class ResendResponseResendingSerializerV1 extends Serializer<Todo> {
    toArray(resendResponseResending: Todo) {
        return [
            VERSION,
            ControlMessage.TYPES.ResendResponseResending,
            resendResponseResending.streamId,
            resendResponseResending.streamPartition,
            resendResponseResending.requestId,
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            streamId,
            streamPartition,
            requestId,
        ] = arr

        return new ResendResponseResending({
            version, requestId, streamId, streamPartition
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.ResendResponseResending, new ResendResponseResendingSerializerV1())
