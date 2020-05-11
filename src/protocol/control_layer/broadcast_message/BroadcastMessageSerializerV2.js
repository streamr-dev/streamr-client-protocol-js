import ControlMessage from '../ControlMessage'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import BroadcastMessage from './BroadcastMessage'
import StreamMessage from '../../message_layer/StreamMessage'

const VERSION = 2

export default class BroadcastMessageSerializerV2 {

    static toArray(broadcastMessage, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            BroadcastMessage.TYPE,
            broadcastMessage.requestId,
            broadcastMessage.streamMessage.serialize(streamMessageVersion)
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
