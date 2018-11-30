import StreamMessageFactory from '../../message_layer/StreamMessageFactory'
import PublishRequest from './PublishRequest'

const VERSION = 1

class PublishRequestV1 extends PublishRequest {
    constructor(streamMessageArgsArray, sessionToken, apiKey) {
        super(VERSION, sessionToken, apiKey)
        this.streamMessage = StreamMessageFactory.deserialize(streamMessageArgsArray)
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            this.streamMessage.toArray(),
            this.sessionToken,
            this.apiKey,
        ])
        return array
    }

    serialize() {
        return JSON.stringify(this.toArray())
    }
}

module.exports = PublishRequestV1
