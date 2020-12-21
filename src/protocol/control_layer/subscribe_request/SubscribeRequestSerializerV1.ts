import ControlMessage from '../ControlMessage'

import SubscribeRequest from './SubscribeRequest'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class SubscribeRequestSerializerV1 extends Serializer<SubscribeRequest> {
    toArray(subscribeRequest: SubscribeRequest) {
        return [
            VERSION,
            ControlMessage.TYPES.SubscribeRequest,
            subscribeRequest.streamId,
            subscribeRequest.streamPartition,
            subscribeRequest.sessionToken,
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            streamId,
            streamPartition,
            sessionToken,
        ] = arr

        return new SubscribeRequest({
            version, streamId, streamPartition, sessionToken
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.SubscribeRequest, new SubscribeRequestSerializerV1())
