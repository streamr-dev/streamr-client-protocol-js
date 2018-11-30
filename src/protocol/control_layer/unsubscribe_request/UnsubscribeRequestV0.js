import UnsubscribeRequest from './UnsubscribeRequest'

const VERSION = 0

class UnsubscribeRequestV0 extends UnsubscribeRequest {
    constructor(streamId, streamPartition) {
        super(VERSION, streamId, streamPartition)
    }

    toObject() {
        return {
            type: 'unsubscribe',
            stream: this.streamId,
            partition: this.streamPartition,
        }
    }

    serialize() {
        return JSON.stringify(this.toObject())
    }

    static getConstructorArguments(msg) {
        return [msg.stream, msg.partition]
    }
}

module.exports = UnsubscribeRequestV0
