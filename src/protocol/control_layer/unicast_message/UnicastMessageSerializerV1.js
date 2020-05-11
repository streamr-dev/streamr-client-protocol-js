import ControlMessage from '../ControlMessage'
import StreamMessageFactory from '../../message_layer/StreamMessageFactory'

import UnicastMessage from './UnicastMessage'
import StreamMessage from '../../message_layer/StreamMessage'

const VERSION = 1

export default class UnicastMessageSerializerV1 {

    static toArray(unicastMessage, streamMessageVersion = StreamMessage.LATEST_VERSION) {
        return [
            VERSION,
            UnicastMessage.TYPE,
            unicastMessage.streamMessage.serialize(streamMessageVersion)
        ]
    }

    static fromArray(arr) {
        const [
            version,
            type,
            serializedStreamMsg
        ] = arr

        return new UnicastMessage(version, null, StreamMessageFactory.deserialize(serializedStreamMsg))
    }

}

ControlMessage.registerSerializer(VERSION, UnicastMessage.TYPE, UnicastMessageSerializerV1)
