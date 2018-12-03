import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import UnicastMessage from './UnicastMessage'

const VERSION = 1

class UnicastMessageV1 extends UnicastMessage {
    constructor(streamMessageArgsArray, subId) {
        super(VERSION, StreamMessageFactory.deserialize(streamMessageArgsArray), subId)
    }
}

module.exports = UnicastMessageV1
