import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import UnicastMessage from './UnicastMessage'

const VERSION = 1

class UnicastMessageV1 extends UnicastMessage {
    constructor(subId, streamMessageArgsArray) {
        super(VERSION, subId, StreamMessageFactory.deserialize(streamMessageArgsArray))
    }
}

module.exports = UnicastMessageV1
