// @ts-nocheck
import ControlMessage from '../ControlMessage'

import UnsubscribeRequest from './UnsubscribeRequest'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class UnsubscribeRequestSerializerV1 extends Serializer<Todo> {
    toArray(unsubscribeRequest: Todo) {
        return [
            VERSION,
            ControlMessage.TYPES.UnsubscribeRequest,
            unsubscribeRequest.streamId,
            unsubscribeRequest.streamPartition,
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            streamId,
            streamPartition,
        ] = arr

        return new UnsubscribeRequest({
            version, streamId, streamPartition
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.UnsubscribeRequest, new UnsubscribeRequestSerializerV1())
