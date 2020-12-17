import ControlMessage from '../ControlMessage'

import UnsubscribeResponse from './UnsubscribeResponse'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 2

export default class UnsubscribeResponseSerializerV2 extends Serializer<Todo> {
    toArray(unsubscribeResponse: Todo) {
        return [
            VERSION,
            ControlMessage.TYPES.UnsubscribeResponse,
            unsubscribeResponse.requestId,
            unsubscribeResponse.streamId,
            unsubscribeResponse.streamPartition,
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

        return new UnsubscribeResponse({
            version, requestId, streamId, streamPartition
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.UnsubscribeResponse, new UnsubscribeResponseSerializerV2())
