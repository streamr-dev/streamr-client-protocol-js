import ControlMessage from '../ControlMessage'
import StreamMessage from '../../message_layer/StreamMessage'

import BroadcastMessage from './BroadcastMessage'

const VERSION = 2

export default class BroadcastMessageSerializerV2 {
    static toArray(broadcastMessage, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            BroadcastMessage.TYPE,
            broadcastMessage.requestId,
            StreamMessage.getSerializer(streamMessageVersion).toArray(broadcastMessage.streamMessage),
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type, // eslint-disable-line no-unused-vars
            requestId,
            serializedStreamMsg,
        ] = arr

        return new BroadcastMessage(version, requestId, StreamMessage.deserialize(serializedStreamMsg))
    }
}

ControlMessage.registerSerializer(VERSION, BroadcastMessage.TYPE, BroadcastMessageSerializerV2)
