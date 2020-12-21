import ControlMessage from '../ControlMessage'

import ResendResponseResent from './ResendResponseResent'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class ResendResponseResentSerializerV1 extends Serializer<ResendResponseResent> {
    toArray(resendResponseResent: ResendResponseResent) {
        return [
            VERSION,
            ControlMessage.TYPES.ResendResponseResent,
            resendResponseResent.streamId,
            resendResponseResent.streamPartition,
            resendResponseResent.requestId,
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

        return new ResendResponseResent({
            version, requestId, streamId, streamPartition
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.ResendResponseResent, new ResendResponseResentSerializerV1())
