import ControlMessage from '../ControlMessage'

import UnsubscribeResponse from './UnsubscribeResponse'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class UnsubscribeResponseSerializerV1 extends Serializer<Todo> {
    toArray(unsubscribeResponse: Todo) {
        return [
            VERSION,
            ControlMessage.TYPES.UnsubscribeResponse,
            unsubscribeResponse.streamId,
            unsubscribeResponse.streamPartition,
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            streamId,
            streamPartition,
        ] = arr

        return new UnsubscribeResponse({
            version, streamId, streamPartition
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.UnsubscribeResponse, new UnsubscribeResponseSerializerV1())
