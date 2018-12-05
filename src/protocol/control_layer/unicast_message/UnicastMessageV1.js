import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import UnicastMessage from './UnicastMessage'

const VERSION = 1

class UnicastMessageV1 extends UnicastMessage {
    constructor(subId, streamMessageArgsArray) {
        super(VERSION, subId)
        this.streamMessage = StreamMessageFactory.deserialize(streamMessageArgsArray)
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            JSON.parse(this.streamMessage.serialize(messageLayerVersion)),
        ])
        return array
    }
}

module.exports = UnicastMessageV1
