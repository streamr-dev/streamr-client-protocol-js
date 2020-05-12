import ControlMessage from '../ControlMessage'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import StreamMessage from '../../message_layer/StreamMessage'

import BroadcastMessage from './BroadcastMessage'

const VERSION = 1

export default class BroadcastMessageSerializerV1 {
    static toArray(broadcastMessage, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            BroadcastMessage.TYPE,
            // TODO: use StreamMessage.getSerializer(streamMessageVersion).toArray() once refactored
            JSON.parse(broadcastMessage.streamMessage.serialize(streamMessageVersion)),
        ]
    }

    static fromArray(arr, parseContent = true) {
        const [
            version,
            type,
            serializedStreamMsg
        ] = arr

        return new BroadcastMessage(version, null, StreamMessageFactory.deserialize(serializedStreamMsg, parseContent))
    }
}

ControlMessage.registerSerializer(VERSION, BroadcastMessage.TYPE, BroadcastMessageSerializerV1)
