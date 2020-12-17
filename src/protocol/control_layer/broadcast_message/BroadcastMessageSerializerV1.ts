import ControlMessage from '../ControlMessage'
import StreamMessage from '../../message_layer/StreamMessage'

import BroadcastMessage from './BroadcastMessage'

import { Serializer } from '../../../Serializer'
import { Todo } from '../../../sharedTypes'

const VERSION = 1

export default class BroadcastMessageSerializerV1 extends Serializer<Todo> {
    toArray(broadcastMessage: Todo, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            ControlMessage.TYPES.BroadcastMessage,
            StreamMessage.getSerializer(streamMessageVersion).toArray(broadcastMessage.streamMessage),
        ]
    }

    fromArray(arr: Todo) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            serializedStreamMsg
        ] = arr

        return new BroadcastMessage({
            version,
            streamMessage: StreamMessage.deserialize(serializedStreamMsg),
        })
    }
}

ControlMessage.registerSerializer(VERSION, ControlMessage.TYPES.BroadcastMessage, new BroadcastMessageSerializerV1())
