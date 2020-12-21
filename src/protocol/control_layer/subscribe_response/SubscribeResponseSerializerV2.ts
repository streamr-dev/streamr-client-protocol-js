import ControlMessage from '../ControlMessage'

import SubscribeResponse from './SubscribeResponse'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 2

export default class SubscribeResponseSerializerV2 extends Serializer<SubscribeResponse> {
    toArray(subscribeResponse: SubscribeResponse) {
        return [
            VERSION,
            ControlMessage.TYPES.SubscribeResponse,
            subscribeResponse.requestId,
            subscribeResponse.streamId,
            subscribeResponse.streamPartition,
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

        return new SubscribeResponse({
            version, requestId, streamId, streamPartition
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.SubscribeResponse, new SubscribeResponseSerializerV2())
