import ControlMessage from '../ControlMessage'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import StreamMessage from '../../message_layer/StreamMessage'

import UnicastMessage from './UnicastMessage'

const VERSION = 1

export default class UnicastMessageSerializerV1 {
    static toArray(unicastMessage, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            UnicastMessage.TYPE,
            unicastMessage.requestId,
            // TODO: use StreamMessage.getSerializer(streamMessageVersion).toArray() once refactored
            JSON.parse(unicastMessage.streamMessage.serialize(streamMessageVersion)),
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            requestId,
            serializedStreamMsg,
        ] = arr

        return new UnicastMessage(version, requestId, StreamMessageFactory.deserialize(serializedStreamMsg))
    }
}

ControlMessage.registerSerializer(VERSION, UnicastMessage.TYPE, UnicastMessageSerializerV1)
