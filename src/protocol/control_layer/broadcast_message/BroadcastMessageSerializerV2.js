import ControlMessage from '../ControlMessage'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import StreamMessage from '../../message_layer/StreamMessage'

import BroadcastMessage from './BroadcastMessage'

const VERSION = 2

export default class BroadcastMessageSerializerV2 {
    static toArray(broadcastMessage, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            BroadcastMessage.TYPE,
            broadcastMessage.requestId,
            // TODO: use StreamMessage.getSerializer(streamMessageVersion).toArray() once refactored
            JSON.parse(broadcastMessage.streamMessage.serialize(streamMessageVersion)),
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            requestId,
            serializedStreamMsg,
        ] = arr

        return new BroadcastMessage(version, requestId, StreamMessageFactory.deserialize(serializedStreamMsg))
    }
}

ControlMessage.registerSerializer(VERSION, BroadcastMessage.TYPE, BroadcastMessageSerializerV2)
