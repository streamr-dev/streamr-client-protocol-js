import ControlMessage from '../ControlMessage'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'

import UnicastMessage from './UnicastMessage'
import StreamMessage from '../../message_layer/StreamMessage'

const VERSION = 2

export default class UnicastMessageSerializerV2 {

    static toArray(unicastMessage, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            UnicastMessage.TYPE,
            unicastMessage.requestId,
            unicastMessage.streamMessage.serialize(streamMessageVersion)
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            requestId,
            serializedStreamMsg
        ] = arr

        return new UnicastMessage(version, requestId, StreamMessageFactory.deserialize(serializedStreamMsg))
    }

}

ControlMessage.registerSerializer(VERSION, UnicastMessage.TYPE, UnicastMessageSerializerV2)
