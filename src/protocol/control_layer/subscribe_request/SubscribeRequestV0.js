import SubscribeRequest from './SubscribeRequest'

const VERSION = 0

class SubscribeRequestV0 extends SubscribeRequest {
    constructor(streamId, streamPartition, apiKey, sessionToken) {
        super(VERSION, streamId, streamPartition, sessionToken, apiKey)
    }

    toObject() {
        return {
            type: 'subscribe',
            stream: this.streamId,
            partition: this.streamPartition,
            authKey: this.apiKey,
            sessionToken: this.sessionToken,
        }
    }

    serialize() {
        return JSON.stringify(this.toObject())
    }

    static getConstructorArguments(msg) {
        return [msg.stream, msg.partition, msg.authKey, msg.sessionToken]
    }
}

module.exports = SubscribeRequestV0
