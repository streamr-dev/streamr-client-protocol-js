import UnsubscribeRequest from './UnsubscribeRequest'

const VERSION = 1

class UnsubscribeRequestV1 extends UnsubscribeRequest {
    constructor(streamId, streamPartition) {
        super(VERSION, streamId, streamPartition)
    }

    toArray() {
        const array = super.toArray()
        array.push(...[
            this.streamId,
            this.streamPartition,
        ])
        return array
    }

    serialize() {
        return JSON.stringify(this.toArray())
    }
}

module.exports = UnsubscribeRequestV1
