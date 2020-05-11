import ControlMessage from '../ControlMessage'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'

import BroadcastMessage from './BroadcastMessage'

const VERSION = 1

export default class BroadcastMessageSerializerV1 {

    static toArray(broadcastMessage, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            BroadcastMessage.TYPE,
            broadcastMessage.streamMessage.serialize(streamMessageVersion)
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            serializedStreamMsg
        ] = arr

        return new BroadcastMessage(version, null, StreamMessageFactory.deserialize(serializedStreamMsg))
    }
}

ControlMessage.registerSerializer(VERSION, BroadcastMessage.TYPE, BroadcastMessageSerializerV1)
