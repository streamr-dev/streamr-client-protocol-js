import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import PublishRequest from './PublishRequest'

const VERSION = 1

class PublishRequestV1 extends PublishRequest {
    constructor(streamMessageArgsArray, sessionToken) {
        super(VERSION, sessionToken)
        this.streamMessage = StreamMessageFactory.deserialize(streamMessageArgsArray)
    }

    getStreamMessage() {
        return this.streamMessage
    }

    toArray(messageLayerVersion) {
        const array = super.toArray()
        array.push(...[
            JSON.parse(this.streamMessage.serialize(messageLayerVersion)),
            this.sessionToken,
        ])
        return array
    }

    serialize(messageLayerVersion) {
        return JSON.stringify(this.toArray(messageLayerVersion))
    }
}

module.exports = PublishRequestV1
