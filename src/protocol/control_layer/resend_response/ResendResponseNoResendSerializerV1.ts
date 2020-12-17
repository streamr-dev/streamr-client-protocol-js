import ControlMessage from '../ControlMessage'

import ResendResponseNoResend from './ResendResponseNoResend'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class ResendResponseNoResendSerializerV1 extends Serializer<Todo> {
    toArray(resendResponseNoResend: Todo) {
        return [
            VERSION,
            ControlMessage.TYPES.ResendResponseNoResend,
            resendResponseNoResend.streamId,
            resendResponseNoResend.streamPartition,
            resendResponseNoResend.requestId,
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

        return new ResendResponseNoResend({
            version, requestId, streamId, streamPartition
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.ResendResponseNoResend, new ResendResponseNoResendSerializerV1())
