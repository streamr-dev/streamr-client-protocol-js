// @ts-nocheck
import ControlMessage from '../ControlMessage'

import UnsubscribeRequest from './UnsubscribeRequest'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 2

export default class UnsubscribeRequestSerializerV2 extends Serializer<Todo> {
    toArray(unsubscribeRequest: Todo) {
        return [
            VERSION,
            ControlMessage.TYPES.UnsubscribeRequest,
            unsubscribeRequest.requestId,
            unsubscribeRequest.streamId,
            unsubscribeRequest.streamPartition,
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            streamId,
            streamPartition,
        ] = arr

        return new UnsubscribeRequest({
            version, requestId, streamId, streamPartition
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.UnsubscribeRequest, new UnsubscribeRequestSerializerV2())
