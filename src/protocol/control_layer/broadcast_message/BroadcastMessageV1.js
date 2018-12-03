import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import StreamMessage from '../../message_layer/StreamMessage'
import BroadcastMessage from './BroadcastMessage'

const VERSION = 1

class BroadcastMessageV1 extends BroadcastMessage {
    constructor(streamMessageArgsArray) {
        super(VERSION, StreamMessageFactory.deserialize(streamMessageArgsArray))
    }

    toArray(messageLayerVersion = StreamMessage.DEFAULT_VERSION) {
        const array = super.toArray()
        array.push(JSON.parse(this.streamMessage.serialize(messageLayerVersion)))
        return array
    }

    serialize(messageLayerVersion = StreamMessage.DEFAULT_VERSION) {
        return JSON.stringify(this.toArray(messageLayerVersion))
    }
}

module.exports = BroadcastMessageV1
